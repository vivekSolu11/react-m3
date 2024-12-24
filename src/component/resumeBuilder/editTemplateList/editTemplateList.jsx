import React, { memo, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';

import CloseIcon from 'assets/SVGs/CloseIcon';
import UploadBox from 'component/chatbot/UploadBox';
import WorkExperience from './WorkExperience';
import Skills from './Skills';
import ProfileDetails from './ProfileDetails';
import Summery from './Summery';
import AddSection from './AddSection';
import Certifications from './Certification';
import Languages from './Languages';
import Hobbies from './Hobbies';
import Education from './Education';
import ECCactivity from './ECCactivity';
import Links from './Links';
import References from './References';

import styles from './editTemplateList.module.css';
import { useQueryAPI } from 'apis/query';
import { resetInfo, updateInfo } from 'store/reducer/resume/infoSlice';
import {
	resetExperience,
	updateAllExperienceExperience,
} from 'store/reducer/resume/workExperienceSlice';
import { resetEducation, updateAllEducation } from 'store/reducer/resume/educationSlice';
import { removeAllCertificate, updateAllcertificates } from 'store/reducer/resume/certificateSlice';
import {
	addResumeSectionState,
	addResumeState,
	updateresumeCreate,
	updateResumeState,
} from 'store/reducer/resume/resumeSlice';
import { initialSkills, sectionsName } from 'constants/resumeBuilder';
import { addAllActivity, resetActivity } from 'store/reducer/resume/extraCCActivitiesSlice';
import { addAllHobby, removeAllHobby } from 'store/reducer/resume/hobbiesSlice';
import { removeAllReferences, updateAllReferences } from 'store/reducer/resume/referenceSlice';
import { addAllLanguage, resetLanguages } from 'store/reducer/resume/languageSlice';
import { removeAllLinks, updateAllLinks } from 'store/reducer/resume/linkSlice';
import { addAllSkill, resetSkill } from 'store/reducer/resume/skillSlice';
import { handleAlert, removeInvalidFields } from 'utils/helperFunctions/helperFunction';
import { resetError } from 'store/reducer/resume/errorSlice';
import { transformSkills } from 'utils/resumeValidator';
import { generateUniqueId } from 'utils/common';
import SideDrawer from 'component/common/drawer/Drawer';
import {
	ExperienceHeader,
	SummaryHeader,
} from 'component/resumeAnalyzer/report/analysisReport/AnalysisReport';
import FixSummary from 'component/resumeAnalyzer/drawer/FixSummary';
import { useMediaQuery } from '@mui/material';
import FixExperience from 'component/resumeAnalyzer/drawer/FixExperience';
import { addState } from 'store/sagaActions';
import { useMutationAPI } from 'apis/mutation';

const EditTemplateList = ({ className = '', profilestyle = '', isAnalysis = false }) => {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const { fetchResumeData } = useQueryAPI();
	const isSmallScreen = useMediaQuery('(max-width: 640px)');

	const { fixSummary } = useSelector((state) => state.common);
	const { fixExperience } = useSelector((state) => state.common);
	const { resumeId, resumeCreate } = useSelector((state) => state.resume);
	const { userDetails } = useSelector((state) => state.common);

	const { updateProfile, resumeParser, uploadFile } = useMutationAPI();

	const { data, status, isFetching, isLoading, error } = useQuery({
		queryKey: ['fetchResume', resumeId],
		queryFn: () => fetchResumeData(resumeId),
		enabled: resumeId !== null && resumeId !== undefined && !isAnalysis,
		staleTime: 300000,
	});

	const handleCloseFixModel = () => {
		dispatch(addState({ name: 'fixSummary', value: false }));
	};

	const handleCloseExpModel = () => {
		dispatch(addState({ name: 'fixExperience', value: false }));
	};

	const cleareAllFields = () => {
		dispatch(resetLanguages());
		dispatch(removeAllCertificate());
		dispatch(removeAllHobby());
		dispatch(resetActivity());
		dispatch(removeAllLinks());
		dispatch(updateResumeState({ name: 'addedSections', value: [] }));
		dispatch(removeAllReferences());
		dispatch(resetError());
	};

	useEffect(() => {
		if (status === 'error') {
			dispatch(addState({ name: 'analysisData', value: null }));
			handleAlert(dispatch, error?.message, 'error');
		} else if (status === 'success' && Object.keys(data?.data?.data?.items).length > 0) {
			const {
				personalInfo,
				summary,
				workExperience,
				section,
				skills,
				education,
				_id,
				_user,
				_template,
			} = data.data.data.items;

			const info = {
				name: personalInfo?.name || '',
				email: personalInfo?.email,
				phone: personalInfo?.phone || '',
				githubUrl: personalInfo?.social?.github?.url,
				linkedInUrl: personalInfo?.social?.linkedIn?.url,
				otherUrl: personalInfo?.social?.other?.url,
				location: personalInfo?.location || '',
				summary: summary,
				jobProfile: userDetails?.profile?.designation?.name,
			};

			dispatch(addResumeState('previousResumeId', _id));
			dispatch(addResumeState('resumeId', _id));
			dispatch(addResumeState('_user', _user));
			dispatch(addResumeState('templateId', _template));
			dispatch(updateresumeCreate(false));
			dispatch(updateInfo(info));
			dispatch(updateAllExperienceExperience(workExperience));

			dispatch(updateAllEducation(education));
			if (skills.length > 0 && Object.keys(skills[0]).length > 0) {
				dispatch(addAllSkill(skills));
			} else {
				dispatch(addAllSkill(initialSkills));
			}
			if (section?.certificates.length > 0) {
				dispatch(addResumeSectionState([sectionsName[0]]));
				dispatch(updateAllcertificates(section?.certificates));
			}
			if (section?.languages.length > 0) {
				dispatch(addResumeSectionState([sectionsName[1]]));
				dispatch(addAllLanguage(section?.languages));
			}
			if (section?.hobbies.length > 0) {
				dispatch(addResumeSectionState([sectionsName[2]]));
				dispatch(addAllHobby(section?.hobbies));
			}
			if (section?.references.length > 0) {
				dispatch(addResumeSectionState([sectionsName[3]]));
				dispatch(updateAllReferences(section?.references));
			}
			if (section?.extraCurricularActivities.length > 0) {
				dispatch(addResumeSectionState([sectionsName[4]]));
				dispatch(addAllActivity(section?.extraCurricularActivities));
			}
			if (section?.links.length > 0) {
				dispatch(addResumeSectionState([sectionsName[5]]));
				dispatch(updateAllLinks(section?.links));
			}
			dispatch(resetError());
		} else {
			if (resumeCreate && !isAnalysis) {
				// cleareAllFields();
				const workExp = userDetails?.profile?.resume?.detail?.workExperience;
				const edu = userDetails?.profile?.resume?.detail?.education;
				const skills = userDetails?.profile?.resume?.detail?.skills;

				if (workExp?.length > 0) {
					dispatch(updateAllExperienceExperience(workExp));
				}
				if (edu?.length > 0) {
					dispatch(updateAllEducation(edu));
				}
				if (skills?.[0]?.title) {
					dispatch(addAllSkill(skills));
				} else {
					dispatch(addAllSkill(initialSkills));
				}

				dispatch(
					updateInfo({
						location: userDetails?.profile?.location,
					})
				);

				dispatch(addState({ name: 'analysisData', value: null }));
			}
		}
	}, [status]);

	const [file, setFile] = useState(null);
	const [pdfLoading, setPdfLoading] = useState(false);
	const [showDesc, setShowDesc] = useState(true);
	const { addedSections } = useSelector((state) => state.resume);
	const [resumeFile, setResumeFile] = useState(null);

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
		const firstName = userDetails?.profile?.name?.firstName;
		const lastName = userDetails?.profile?.name?.lastName;
		const skills = parsedData?.skills && transformSkills(parsedData?.skills);
		const mergedSkills = Object.values(parsedData?.skills).flat();
		const payload = {
			name: {
				firstName: firstName,
				lastName: lastName,
				fullName: `${firstName} ${lastName}`,
			},
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
						degree: item.degree,
						duration: item.duration,
						fieldOfStudy: item.fieldOfStudy ?? '',
						instituteName: item.instituteName,
					})),
					workExperience: parsedData?.workExperience?.map((item) => ({
						designation: item.designation,
						company: item.company,
						duration: {
							from: item.duration.from || '',
							tillNow: item.duration.tillNow,
							...(item.duration.to ? { to: item.duration.to } : {}),
						},
						location: item.location,
						bulletPoint: item.bulletPoint,
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

	const getParseData = (data) => {
		const { education, personalInfo, section, skills, summary, workExperience, designation } =
			data;

		const info = {
			name: userDetails?.profile?.name?.fullName,
			email: userDetails?.email,
			githubUrl: personalInfo?.social?.github,
			linkedInUrl: personalInfo?.social?.linkedIn,
			otherUrl: personalInfo?.social?.other,
			location: personalInfo?.location || '',
			summary: summary,
			jobProfile: designation,
		};
		dispatch(addState({ name: 'userLocation', value: personalInfo?.location }));
		dispatch(updateInfo(info));
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
					section?.certificates.map((item) => ({
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
					section?.languages.map((item) => ({
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
					section?.hobbies.map((item) => ({
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
					section?.references.map((item) => ({
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

	const { mutate } = useMutation({
		mutationFn: (val) => resumeParser(val),
		onSuccess: (data) => {
			if (data) {
				setPdfLoading(false);
				getParseData(data?.data?.resume_parser);
				updateUserProfile(data?.data?.resume_parser);
			} else {
				setPdfLoading(false);
			}
		},
		onError: () => {
			handleAlert(dispatch, 'Failed to parse the document', 'error');
			setPdfLoading(false);
		},
	});

	function extractText() {
		setPdfLoading(true);
		const formData = new FormData();
		formData.append('file', file);
		mutate(formData);
	}

	const { mutate: uploadResume, isPending: uploadResumePending } = useMutation({
		mutationFn: (val) => uploadFile(val),
		onSuccess: (data) => {
			if (data) {
				setResumeFile(data?.data?.data?.items);
				extractText();
			}
		},
	});

	const handleUpload = (file) => {
		if (file) {
			setFile(file);
			const formData = new FormData();
			formData.append('type', 'resume');
			formData.append('doc', file);
			uploadResume(formData);
		}
	};

	const Sections = {
		certifications: <Certifications />,
		languages: <Languages />,
		'ecc-activity': <ECCactivity />,
		hobbies: <Hobbies />,
		links: <Links />,
		references: <References />,
	};

	return (
		<>
			{isFetching || isLoading ? (
				<div className="flex items-center justify-center h-[500px] w-full">
					<div className={`btn-loader border-4 border-[#14A019]`} />
				</div>
			) : (
				<section
					className={`${styles.templateGallery} px-3 h-full lg:h-[calc(100vh-365px)] ${className} overflow-hide `}
				>
					{!isAnalysis && <div className={`${styles.galleryTitle} px-4`}>Details</div>}
					{!isAnalysis && (
						<div className={`flex gap-6 flex-col px-4`}>
							{showDesc && (
								<div className="w-full rounded-md items-center text-base   flex gap-3 justify-between bg-[#F1F1F1] py-4 px-3">
									Choose to either create resume from scratch or Upload one to
									edit it.
									<div
										className="cursor-pointer"
										onClick={() => setShowDesc(false)}
									>
										<CloseIcon />
									</div>
								</div>
							)}
							<UploadBox
								desc={false}
								onChange={(e) => {
									handleUpload(e.target.files[0]);
								}}
								onDelete={() => {
									cleareAllFields();
									dispatch(resetExperience());
									dispatch(resetSkill());
									dispatch(resetInfo());
									dispatch(resetEducation());
									setFile(null);
								}}
								ClassName={'!justify-center'}
								file={file}
								lable={'Upload Resume'}
								loading={pdfLoading || uploadResumePending}
							/>
						</div>
					)}
					<ProfileDetails className={profilestyle} isAnalysis={isAnalysis} />
					<div className={`${styles.boarder}  h-[1px] w-full`} />
					<Summery />
					<div className={`${styles.boarder}  h-[1px] w-full`} />
					<WorkExperience />
					<div className={`${styles.boarder}  h-[1px] w-full`} />
					<Skills />
					<div className={`${styles.boarder}  h-[1px] w-full`} />
					<Education />
					<div className={`${styles.boarder}  h-[1px] w-full`} />

					{addedSections?.map((item) => (
						<>
							{item ? (
								<>
									{Sections[item?.key]}
									<div className={`${styles.boarder}  h-[1px] w-full`} />
								</>
							) : (
								''
							)}
						</>
					))}

					<AddSection />
				</section>
			)}

			{!isAnalysis && (
				<>
					<SideDrawer
						width={672}
						bodyClass="!h-[calc(100vh-108px)]"
						openFrom={isSmallScreen ? 'bottom' : 'right'}
						open={fixSummary}
						onClose={() => handleCloseFixModel()}
						title={<SummaryHeader />}
						iconCss="flex items-center"
					>
						<FixSummary onClose={() => handleCloseFixModel()} />
					</SideDrawer>

					<SideDrawer
						width={672}
						drawerClass="max-w-[672px] w-full"
						bodyClass="!h-[calc(100vh-108px)]"
						open={fixExperience}
						openFrom={isSmallScreen ? 'bottom' : 'right'}
						onClose={() => handleCloseExpModel()}
						title={<ExperienceHeader />}
						iconCss="flex items-center"
					>
						<FixExperience onClose={() => handleCloseExpModel()} />
					</SideDrawer>
				</>
			)}
		</>
	);
};

export default memo(EditTemplateList);
