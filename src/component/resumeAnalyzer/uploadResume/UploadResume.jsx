import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import LoaderModal from 'component/chatbot/LoaderModal';
import { PREFERENCE_MODAL, SCORE_MODAL } from 'constants/modalTypeConstant';
import {
	addResumeSectionState,
	addState,
	hideCustomModal,
	removeState,
	showAlert,
	showCustomModal,
} from 'store/sagaActions';
import ScoreModal from 'component/modal/resumeAnalyzer/ScoreModal';
import { useMutationAPI } from 'apis/mutation';
import UploadComponent from 'component/profile/subcomponents/UploadComponent';
import { updateInfo } from 'store/reducer/resume/infoSlice';
import { updateAllExperienceExperience } from 'store/reducer/resume/workExperienceSlice';
import { generateUniqueId } from 'utils/common';
import { updateAllEducation } from 'store/reducer/resume/educationSlice';
import { transformSkills } from 'utils/resumeValidator';
import { addAllSkill } from 'store/reducer/resume/skillSlice';
import { sectionsName } from 'constants/resumeBuilder';
import { updateAllcertificates } from 'store/reducer/resume/certificateSlice';
import { addAllLanguage } from 'store/reducer/resume/languageSlice';
import { addAllHobby } from 'store/reducer/resume/hobbiesSlice';
import { updateAllReferences } from 'store/reducer/resume/referenceSlice';
import { addAllActivity } from 'store/reducer/resume/extraCCActivitiesSlice';
import { updateAllLinks } from 'store/reducer/resume/linkSlice';
import {
	handleAlert,
	removeInvalidFields,
	resetResumeDetails,
} from 'utils/helperFunctions/helperFunction';

import './UploadResume.css';

function UploadResume() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { userDetails } = useSelector((state) => state.common);
	const { uploadFile, resumeAnalysis, resumeParser, updateProfile } = useMutationAPI();

	const [file, setFile] = useState(null);
	const [pdfLoading, setPdfLoading] = useState(false);
	const [resumeFile, setResumeFile] = useState(null);

	const resumeAnalyzerAndCustomizer =
		userDetails?.topups?.find((entry) => entry.topup?.name === 'resumeAnalyzerAndCustomizer')
			?.usage || false;

	const { mutate: resumeAnalysisMutation, status: resumeAnalysisStatus } = useMutation({
		mutationFn: (val) => resumeAnalysis(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries(['userDetails']);
				dispatch(addState({ name: 'analysisData', value: data?.data?.Analysis }));
				dispatch(
					addState({
						name: 'reportData',
						value: data?.data?.Analysis?.fullReport,
					})
				);
				dispatch(
					addState({
						name: 'issueCount',
						value: {
							urgent:
								data?.data?.Analysis?.grandTotalIssues?.urgentIssuesCount -
								data?.data?.Analysis?.sections?.personalInfo?.issuesCount
									?.urgentIssuesCount,
							optional:
								data?.data?.Analysis?.grandTotalIssues?.optionalIssuesCount -
								data?.data?.Analysis?.sections?.personalInfo?.issuesCount
									?.optionalIssuesCount,
							critical:
								data?.data?.Analysis?.grandTotalIssues?.criticalIssuesCount -
								data?.data?.Analysis?.sections?.personalInfo?.issuesCount
									?.criticalIssuesCount,
						},
					})
				);
			}
		},
		onError: () => {
			setPdfLoading(false);
			handleAlert(dispatch, 'Failed to analyze the document', 'error');
			dispatch(hideCustomModal());
		},
	});

	const { mutate: updateProfileDetails } = useMutation({
		mutationFn: (val) => updateProfile(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries(['userDetails', 'fetchRecommendedJobs']);
				handleAlert(
					dispatch,
					'Your resume has been updated',
					'',
					'bg-[#1A1A1AE5]  rounded-lg ',
					'white',
					'16px',
					false
				);
			}
		},
	});

	const updateUserProfile = (parsedData = null) => {
		const skills = parsedData?.skills && transformSkills(parsedData?.skills);
		const mergedSkills = Object.values(parsedData?.skills).flat();
		const payload = {
			email: userDetails?.email || null,
			phone: userDetails?.phone
				? {
						code: userDetails?.countryCode,
						number: userDetails?.phone,
					}
				: null,
			designation: parsedData?.designation || null,
			// company: 'Solulab',
			experience: parsedData?.totalExperience,
			industryExperience: parsedData?.industryExperience,
			location: parsedData?.personalInfo?.location,
			skills: mergedSkills,
			resume: {
				file: resumeFile,
				detail: {
					education: parsedData?.education?.map((item) => ({
						degree: item?.degree,
						duration: item?.duration,
						fieldOfStudy: item?.fieldOfStudy ?? '',
						instituteName: item?.instituteName,
					})),
					workExperience: parsedData?.workExperience?.map((item) => ({
						designation: item?.designation,
						company: item?.company,
						duration: {
							from: item?.duration.from || '',
							tillNow: item?.duration.tillNow,
							...(item?.duration.to ? { to: item?.duration.to } : {}),
						},
						location: item?.location,
						bulletPoint: item?.bulletPoint,
					})),

					skills: skills,
				},
			},
			social: {
				...(parsedData?.personalInfo?.social?.linkedIn?.url
					? {
							linkedIn: {
								url: parsedData?.personalInfo?.social?.linkedIn.url,
							},
						}
					: {}),
			},
			userText: parsedData?.resumeText,
		};
		const cleanedData = removeInvalidFields(payload);
		updateProfileDetails(cleanedData);
	};

	const { mutate } = useMutation({
		mutationFn: (val) => uploadFile(val),
		onSuccess: (data) => {
			if (data) {
				const payload = {
					resume_uri: data?.data?.data?.items.url,
					userId: userDetails?._user,
				};
				setResumeFile(data?.data?.data?.items);
				const formData = new FormData();
				formData.append('file', file);
				setPdfLoading(true);
				parseResume(formData);
				resumeAnalysisMutation(payload);
				// reportMutation(payload);
			}
		},
	});

	const getParseData = (data) => {
		const { education, personalInfo, section, skills, summary, workExperience } = data;

		const info = {
			githubUrl: personalInfo?.social?.github,
			linkedInUrl: personalInfo?.social?.linkedIn,
			otherUrl: personalInfo?.social?.other,
			location: personalInfo?.location || '',
			summary: summary,
		};

		dispatch(updateInfo(info));
		dispatch(addState({ name: 'userLocation', value: personalInfo?.location }));
		dispatch(
			updateAllExperienceExperience(
				workExperience?.map((item) => ({
					...item,
					_id: generateUniqueId('work-exp'),
					location: item?.location,
				}))
			)
		);
		if (education?.length > 0) {
			dispatch(
				updateAllEducation(
					education?.map((item) => ({
						...item,
						_id: generateUniqueId('edu'),
					}))
				)
			);
		} else {
			dispatch(
				updateAllEducation([
					{
						...education,
						_id: generateUniqueId('edu'),
					},
				])
			);
		}
		dispatch(addAllSkill(transformSkills(skills)));
		if (section?.certificates?.length > 0) {
			dispatch(addResumeSectionState([sectionsName[0]]));
			dispatch(
				updateAllcertificates(
					section?.certificates?.map((item) => ({
						_id: generateUniqueId('Certificate'),
						...item,
					}))
				)
			);
		}
		if (section?.languages?.length > 0) {
			dispatch(addResumeSectionState([sectionsName[1]]));
			dispatch(
				addAllLanguage(
					section?.languages?.map((item) => ({
						_id: generateUniqueId('language'),
						...item,
					}))
				)
			);
		}
		if (section?.hobbies?.length > 0) {
			dispatch(addResumeSectionState([sectionsName[2]]));
			dispatch(
				addAllHobby(
					section?.hobbies?.map((item) => ({
						_id: generateUniqueId('hobbies'),
						...item,
					}))
				)
			);
		}
		if (section?.references?.length > 0) {
			dispatch(addResumeSectionState([sectionsName[3]]));
			dispatch(
				updateAllReferences(
					section?.references?.map((item) => ({
						_id: generateUniqueId('ref'),

						...item,
					}))
				)
			);
		}
		if (section?.extraCurricularActivities?.length > 0) {
			dispatch(addResumeSectionState([sectionsName[4]]));
			dispatch(addAllActivity(section?.extraCurricularActivities));
		}
		if (section?.links?.length > 0) {
			dispatch(addResumeSectionState([sectionsName[5]]));
			dispatch(updateAllLinks(section?.links));
		}
		setPdfLoading(false);
	};

	const { mutate: parseResume } = useMutation({
		mutationFn: (val) => resumeParser(val),
		onSuccess: (data) => {
			if (data) {
				setPdfLoading(false);
				getParseData(data?.data?.resume_parser);
				if (userDetails?.profile?.resume?.file?.url !== file)
					updateUserProfile(data?.data?.resume_parser);
			}
		},
		onError: () => {
			setPdfLoading(false);
			handleAlert(dispatch, 'Failed to parse the document', 'error');
			dispatch(hideCustomModal());
		},
	});

	const handleModal = () => {
		if (
			userDetails?.subscription?.usage?.resumeAnalyzes === 0 &&
			!resumeAnalyzerAndCustomizer
		) {
			dispatch(
				showAlert({
					message:
						'Your resume analysis limit has been reached. Please upgrade your plan.',
					status: 'error',
				})
			);
			dispatch(hideCustomModal());
			return;
		}
		dispatch(
			showCustomModal({
				customModalType: PREFERENCE_MODAL,
				tempCustomModalData: {
					modalType: 'ANALYZER',
					className: 'pt-6 pb-8  px-6 flex rounded-[24px]  ',
					borderRadius: '24px',
					widthMax: '784px',
					MUiMargin: '0px',
				},
			})
		);
		if (file !== userDetails?.profile?.resume?.file?.url) {
			const formData = new FormData();
			dispatch(removeState({ name: 'previousScore' }));
			// Append form values to FormData
			formData.append('type', 'resume');
			formData.append('doc', file);
			// extractText(file);
			mutate(formData);
		} else {
			const payload = {
				resume_uri: userDetails?.profile?.resume?.file?.url,
				userId: userDetails?._user,
			};
			const parserPayload = {
				resumeText: userDetails?.profile?.userText,
			};

			parseResume(parserPayload);
			resumeAnalysisMutation(payload);
		}
		dispatch(addState({ name: 'analysisData', value: null }));
	};

	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	useEffect(() => {
		if (userDetails?.subscription?.usage?.resumeAnalyzes !== 0 || resumeAnalyzerAndCustomizer) {
			if (resumeAnalysisStatus === 'success' && !pdfLoading) {
				dispatch(
					showCustomModal({
						customModalType: SCORE_MODAL,
					})
				);
			} else if (resumeAnalysisStatus === 'error') {
				hideModal();
			}
		}
	}, [resumeAnalysisStatus, pdfLoading]);

	useEffect(() => {
		if (userDetails && userDetails?.profile?.resume?.file?.url)
			setFile(userDetails?.profile?.resume?.file?.url);
	}, [userDetails]);

	useEffect(() => {
		resetResumeDetails(dispatch);
	}, []);

	return (
		<div className="bg-[#FFFFFF] rounded-xl p-6 flex flex-col w-full gap-6">
			<div className=" flex w-full flex-col gap-9">
				<div className="flex  flex-col">
					<div className="text-center text-[20px] md:text-[24px] font-semibold">
						Resume Analyzer
					</div>
					<div className="text-center tracking-tight text-lightText text-[14px] md:text-[16px]">
						Explore the specific steps and resources needed to progress from your
						current position to your desired role.
					</div>
				</div>
				<UploadComponent file={file} setFile={setFile} />
			</div>
			<div className="flex flex-col gap-[20px]">
				{!file ? (
					<>
						<div className="line-container">
							<h2 className="flex w-full items-center">
								<span className=" text-[12px] md:text-sm flex text-lightText font-normal  bg-white text-center">
									Don&apos;t have a resume? Build one!
								</span>
							</h2>
						</div>
						<div className="flex justify-center">
							<Button
								className="normal-case bg-prim-sol rounded-lg py-[16px] px-[32px] text-black"
								onClick={() => navigate('/resume')}
							>
								Create
							</Button>
						</div>
					</>
				) : (
					<div className="flex justify-center">
						<Button
							onClick={handleModal}
							className="normal-case bg-prim-sol w-full sm:max-w-min py-[15px] px-[20px] rounded-lg md:py-[16px] md:px-[32px] text-black"
						>
							Continue
						</Button>
					</div>
				)}
			</div>
			<LoaderModal
				className={'pt-6 pb-8  px-6 flex rounded-[24px]  '}
				borderRadius="24px"
				widthMax="784px"
				MUiMargin="0px"
			/>
			<ScoreModal hideModal={hideModal} />
		</div>
	);
}

export default UploadResume;
