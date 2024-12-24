import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import CryptoJS from 'crypto-js';

import SideDrawer from 'component/common/drawer/Drawer';
import {
	addResumeSectionState,
	addState,
	hideCustomModal,
	removeState,
	updateResumeState,
} from 'store/sagaActions';
import {
	// BUY_RESUME_ANALIZE_MODAL,
	CUSTOMIZE_RESUME_SIDE_MODAL,
} from 'constants/modalTypeConstant';
import { Step, StepLabel, Stepper, useMediaQuery } from '@mui/material';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import { BackArrow, EyeIcon } from 'assets/index';
import { QontoStepIcon } from './sidebarTabs/IconBox';
import TabOne from './sidebarTabs/TabOne';
import TabTwo from './sidebarTabs/TabTwo';
import TabThree from './sidebarTabs/TabThree';
import TabFour from './sidebarTabs/TabFour';
import { resetInfo, updateInfo } from 'store/reducer/resume/infoSlice';
import {
	resetExperience,
	updateAllExperienceExperience,
} from 'store/reducer/resume/workExperienceSlice';
import { generateUniqueId } from 'utils/common';
import { resetEducation, updateAllEducation } from 'store/reducer/resume/educationSlice';
import { addAllSkill, resetSkill } from 'store/reducer/resume/skillSlice';
import { transformSkills } from 'utils/resumeValidator';
import { sectionsName } from 'constants/resumeBuilder';
import PewviewModel from 'component/resumeBuilder/header/Model/PreViewModel';
import { removeAllCertificate, updateAllcertificates } from 'store/reducer/resume/certificateSlice';
import { addAllLanguage, resetLanguages } from 'store/reducer/resume/languageSlice';
import { addAllHobby, removeAllHobby } from 'store/reducer/resume/hobbiesSlice';
import { removeAllReferences, updateAllReferences } from 'store/reducer/resume/referenceSlice';
import { addAllActivity, resetActivity } from 'store/reducer/resume/extraCCActivitiesSlice';
import { removeAllLinks, updateAllLinks } from 'store/reducer/resume/linkSlice';
import { resetError } from 'store/reducer/resume/errorSlice';
import { handleAlert, handleDownload } from 'utils/helperFunctions/helperFunction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMutationAPI } from 'apis/mutation';

import './index.css';

const steps = [
	{ title: 'Step 1', des: 'See Your Difference' },
	{ title: 'Step 2', des: 'Align Your Resume' },
	{ title: 'Step 3', des: 'Review Resume' },
	{ title: 'Step 4', des: 'Format Resume' },
];

const nextBtn = [
	'Begin Improvement',
	'Generate Curated Resume',
	'Beautify Resume',
	'Download Resume',
];

const key = import.meta.env.VITE_CRYPTO_KEY;
const keyutf = CryptoJS.enc.Utf8.parse(key);
const iv = CryptoJS.enc.Base64.parse(key);

const CustomizeResumeSidebar = () => {
	const dispatch = useDispatch();
	const isSmallScreen = useMediaQuery('(max-width: 1024px)');
	const [activeStep, setActiveStep] = React.useState(0);
	const [openPreviewModel, setOpenPreviewModel] = useState(false);

	const { customModalType } = useSelector((state) => state.modal);

	const { userDetails, resumeName, customizeResume } = useSelector((state) => state.common);

	const queryClient = useQueryClient();
	const { jsonTopdf } = useMutationAPI();

	const [parserLoader, setParserLoader] = useState(false);
	const [isClicked, setIsClicked] = useState(false);

	const { mutate: jsonTopMutation } = useMutation({
		mutationFn: (val) => jsonTopdf(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries(['userDetails']);
				const file = {
					url: data?.data?.data?.items?.fileUrl,
					name: resumeName
						? `${resumeName}.pdf`
						: `Resume_${userDetails?.profile?.name?.firstName}_Joblo.pdf`,
				};

				handleDownload(file, dispatch, 'Your file has been downloded');
			}
		},
		onError: () => {
			handleAlert(dispatch, 'Failed to download resume', 'error');
		},
	});

	const handleDownloadPDF = (isAnalyze = false) => {
		const plainText = document?.getElementById('jsxContent');
		const stringContent = plainText?.innerHTML;
		const cyperText = CryptoJS.AES.encrypt(stringContent, keyutf, {
			iv: iv,
		}).toString();

		const payload = {
			encryptedHtmlData: cyperText,
			fileName: Date.now(),
			isAnalyze: isAnalyze,
		};

		jsonTopMutation(payload);
	};

	const hideModal = () => {
		dispatch(hideCustomModal());
		setActiveStep(0);
		setIsClicked(false);
	};

	const handelprev = () => {
		if (activeStep !== 0) {
			setActiveStep(activeStep - 1);
		}
	};
	const handelNext = () => {
		if (activeStep === 0 && parserLoader) {
			setIsClicked((prev) => !prev);
		} else if (activeStep !== 3) {
			setActiveStep(activeStep + 1);
		} else if (activeStep === 3) {
			handleDownloadPDF();
			hideModal();
			// dispatch(
			//   showCustomModal({
			//     customModalType: BUY_RESUME_ANALIZE_MODAL,
			//   }),
			// );
		}
	};

	const tabs = {
		0: <TabOne data={customizeResume?.Analysis} score={customizeResume?.Analysis?.score} />,
		1: <TabTwo data={customizeResume?.Analysis} />,
		2: (
			<TabThree
				data={customizeResume?.Analysis}
				score={customizeResume?.Analysis?.score}
				updatedScore={customizeResume?.Analysis?.updatedScore}
			/>
		),
		3: <TabFour />,
	};

	const getParseData = async (a) => {
		setParserLoader(true);
		dispatch(resetInfo());
		dispatch(resetExperience());
		dispatch(resetSkill());
		dispatch(resetEducation());
		dispatch(resetLanguages());
		dispatch(removeAllCertificate());
		dispatch(removeAllHobby());
		dispatch(resetActivity());
		dispatch(removeAllLinks());
		dispatch(updateResumeState({ name: 'addedSections', value: [] }));
		dispatch(removeAllReferences());
		dispatch(resetError());

		dispatch(
			addState({
				name: 'resumePreview',
				value: {
					state: true,
					value: 'https://joblodev.s3.ap-south-1.amazonaws.com/user/f0a1e7245bc8c5e90916cf26b8fefe77459e67baf95d6aa11600316eb0a23f9b/resume-builder-thumbnail/66e18f1611aef66a31a0bcda-1729847990451',
					id: userDetails?.profile?.resumeId,
				},
			})
		);
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_RESUME_PARSER_END_POINT_URL}parser`,
				{
					resumeText: a,
				}
			);

			const {
				education,
				personalInfo,
				section,
				skills,
				summary,
				workExperience,
				// eslint-disable-next-line no-unsafe-optional-chaining
			} = res?.data?.resume_parser;

			const info = {
				name: userDetails?.name,
				email: userDetails?.email,
				githubUrl: personalInfo?.social?.github,
				linkedInUrl: personalInfo?.social?.linkedIn,
				otherUrl: personalInfo?.social?.other,
				location: personalInfo?.location || '',
				summary: summary,
			};

			dispatch(updateInfo(info));
			dispatch(
				updateAllExperienceExperience(
					workExperience?.map((item) => ({
						...item,
						_id: generateUniqueId('work-exp'),
						location: item.location.city,
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
		} catch (error) {
			console.error(error);
		} finally {
			setParserLoader(false);
		}
	};

	useEffect(() => {
		if (!parserLoader) {
			if (isClicked && activeStep === 0) {
				setActiveStep((prev) => prev + 1);
				setIsClicked(false);
			}
			if (customizeResume?.Analysis?.jobTitle) {
				dispatch(
					updateInfo({
						jobProfile: customizeResume?.Analysis?.jobTitle,
					})
				);
			}

			if (customizeResume?.Analysis?.userSummary) {
				dispatch(
					updateInfo({
						summary: customizeResume?.Analysis?.userSummary,
					})
				);
			}
		}
	}, [parserLoader]);

	useEffect(() => {
		if (userDetails?.profile?.userText && customModalType === CUSTOMIZE_RESUME_SIDE_MODAL)
			getParseData(userDetails?.profile?.userText);
		dispatch(removeState({ name: 'openCustomizeModal' }));
	}, [customModalType]);
	return (
		<SideDrawer
			openFrom={isSmallScreen ? 'bottom' : 'right'}
			open={customModalType === CUSTOMIZE_RESUME_SIDE_MODAL}
			onClose={() => {
				hideModal();
			}}
			width={1000}
			title={'Customize your resume for this job'}
			bodyClass={'h-[calc(100vh-72px)]'}
			drawerRadius={isSmallScreen ? '12px' : '0px'}
			drawerClass={`${isSmallScreen ? 'max-w-[1000px] w-full' : 'w-[1000px]'}`}
		>
			<div className="flex flex-col relative justify-start gap-4 lg:gap-5  pt-5 h-full">
				<div className="flex flex-col  gap-8 justify-center items-center">
					<Stepper activeStep={activeStep} className=" px-4 w-full  lg:px-0 lg:w-4/5">
						{steps.map((label) => (
							<Step key={label.des}>
								<StepLabel
									StepIconComponent={QontoStepIcon}
									className="flex flex-col items-center gap-1"
								>
									<div className="text-xs text-center text-[#666]">
										{!isSmallScreen && label.title}
									</div>
									<div
										className={`text-sm ${activeStep <= steps?.length ? 'text-black' : 'text-[#666]'}`}
									>
										{!isSmallScreen && (
											<div className="text-sm text-black">{label?.des}</div>
										)}
									</div>
								</StepLabel>
							</Step>
						))}
					</Stepper>
				</div>
				{isSmallScreen && (
					<div className="flex px-5 items-center">
						{' '}
						<span className="text-xs text-[#666666]">
							{steps[activeStep]?.title} :{' '}
						</span>{' '}
						&nbsp;{' '}
						<span className="text-sm text-[#1A1A1A]"> {steps[activeStep]?.des}</span>
					</div>
				)}
				<div className="flex h-[calc(100vh-245px)] px-4 py-1   ">{tabs[activeStep]}</div>
				<div
					className={`flex p-3 w-full bg-white  items-center absolute bottom-0 ${activeStep === 0 ? 'justify-center md:justify-end' : 'justify-between'}  `}
				>
					<PrimaryButton
						handleClick={handelprev}
						buttonText="Back"
						startIcon={<BackArrow />}
						btnClassName={`${activeStep === 0 && 'hidden md:invisible'} !px-0 !py-[10px] lg:!px-[20px]`}
						varient={isSmallScreen ? 'Outline' : 'primaryOutline'}
					/>
					{isSmallScreen && activeStep === 3 && (
						<div
							className="resume-preview-eye-btn py-[10px] px-[20px]"
							onClick={() => {
								setOpenPreviewModel(true);
							}}
						>
							<EyeIcon />
						</div>
					)}

					<PrimaryButton
						handleClick={handelNext}
						buttonText={nextBtn[activeStep]}
						btnClassName="!px-[20px] !py-[10px] !h-[40px] !rounded-[8px] !text-[14px] "
						varient="primary"
						loading={activeStep === 0 && parserLoader && isClicked}
						disabled={activeStep === 0 && parserLoader && isClicked}
					/>
				</div>
			</div>
			<PewviewModel onClose={() => setOpenPreviewModel(false)} open={openPreviewModel} />
		</SideDrawer>
	);
};

export default CustomizeResumeSidebar;
