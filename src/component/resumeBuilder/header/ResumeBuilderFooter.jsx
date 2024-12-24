/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CryptoJS from 'crypto-js';

import { EXPORT_RESUME, SAVE_RESUME } from 'assets/images';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import { addState, showAlert } from 'store/sagaActions';
import CustomMenu from 'component/customComponents/menu/CustomMenu';
import { useMutationAPI } from 'apis/mutation';
import { handleAlert } from 'utils/helperFunctions/helperFunction';
import { addResumeState, updateresumeCreate } from 'store/reducer/resume/resumeSlice';
import {
	validateEducation,
	validateRequiredFields,
	validateWorkExperiences,
} from 'utils/resumeValidator';
import { addEduError, addInfoError, addWorkExpError } from 'store/reducer/resume/errorSlice';
import styles from './resumeBuilderHeader.module.css';
import { EyeIcon, ThreeDot } from 'assets/index';
import OptionModel from './Model/OptionModel';
import ExportModel from './Model/ExportModel';
import PewviewModel from './Model/PreViewModel';
import { captureAndConvertToFile } from 'utils/common';

const key = import.meta.env.VITE_CRYPTO_KEY;
const keyutf = CryptoJS.enc.Utf8.parse(key);
const iv = CryptoJS.enc.Base64.parse(key);
const ResumeBuilderFooter = () => {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [openOptions, setOpenOptions] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [openExportOptions, setOpenExportOptions] = useState(false);
	const [openPreviewModel, setOpenPreviewModel] = useState(false);

	const {
		createResumeBuilderData,
		updateResumeBuilderData,
		jsonTopdf,
		uploadFile,
		resumeAnalysis,
	} = useMutationAPI();

	const queryClient = useQueryClient();
	const { resumeCreate } = useSelector((state) => state.resume);
	const { builderActiveTab, resumePreview, userLocation } = useSelector((state) => state.common);

	const info = useSelector((state) => state.info);
	const experienceData = useSelector((state) => state.workExperience);
	const skills = useSelector((state) => state.skills);
	const educationData = useSelector((state) => state.education);
	const certificatesData = useSelector((state) => state.certificates);
	const languagesData = useSelector((state) => state.languages);
	const hobbiesData = useSelector((state) => state.hobbies);
	const referencesData = useSelector((state) => state.references);
	const extraCCActivitiesData = useSelector((state) => state.extraCCActivities);
	const linksData = useSelector((state) => state.links);
	const { resumeId, templateId } = useSelector((state) => state.resume);
	const { userDetails } = useSelector((state) => state.common);

	const handleButtonClick = (data) => {
		dispatch(addState({ name: 'builderActiveTab', value: data }));
	};

	const { mutate: CreateResumeBuilderMutation } = useMutation({
		mutationFn: (val) => createResumeBuilderData(val),
		onSuccess: (data) => {
			if (data) {
				handleAlert(dispatch, data?.data?.data?.message, 'success');
				dispatch(updateresumeCreate(false));
				dispatch(
					addResumeState({
						name: 'resumeId',
						value: data?.data?.data?.items?._id,
					})
				);
				queryClient.invalidateQueries(['fetchSavedTemplates']);
			}
			setLoading(false);
		},
	});

	const { mutate: updateResumeBuilderMutation } = useMutation({
		mutationFn: (val) => updateResumeBuilderData(val),
		onSuccess: (data) => {
			if (data) {
				handleAlert(dispatch, data?.data?.data?.message, 'success');
				dispatch(updateresumeCreate(false));
			}
			setLoading(false);
		},
	});

	const { mutate: updatePreviewImage } = useMutation({
		mutationFn: (val) => uploadFile(val),
		onSuccess: (data) => {
			if (data) {
				setPreviewImage(data.data.data.items);
				handleAfterImageUpload(data.data.data.items);
			}
		},
	});

	const handleSaveButtonClick = async () => {
		setLoading(true);
		const infoErr = validateRequiredFields(info);
		const ExpErr = validateWorkExperiences(experienceData);
		const eduErr = validateEducation(educationData);
		if (infoErr) {
			dispatch(addInfoError(infoErr));
			setLoading(false);
		}
		if (ExpErr) {
			dispatch(addWorkExpError(ExpErr));
			setLoading(false);
		}
		if (eduErr) {
			dispatch(addEduError(eduErr));
			setLoading(false);
		}

		if (infoErr || ExpErr || eduErr) {
			handleAlert(dispatch, 'Please enter required fileds', 'error');
			setLoading(false);
		}

		if (
			!(infoErr && Object.keys(infoErr).length > 0) &&
			!(ExpErr && Object.keys(ExpErr).length > 0) &&
			!(eduErr && Object.keys(eduErr).length > 0)
		) {
			const name = 'template-image.png';
			const fileData = await captureAndConvertToFile(name);
			const formData = new FormData();

			// Append form values to FormData
			formData.append('type', 'resume-builder-thumbnail');
			formData.append('doc', fileData);

			await updatePreviewImage(formData);
		}
	};

	const handleAfterImageUpload = async (img) => {
		try {
			const data = {
				personalInfo: {
					name: info.name || userDetails?.profile?.name?.fullName,
					email: info.email || userDetails?.email,
					phone: info.phone,
					location: Object.keys(info?.location).length ? info.location : userLocation,
					social: {
						linkedIn: {
							url: info.linkedInUrl || '',
						},
						github: {
							url: info.githubUrl || '',
						},
						other: {
							url: info.otherUrl || '',
						},
					},
				},

				previewThumbnail: img,
				summary: info.summary,
				workExperience: experienceData.map(({ _id, jobTitle, ...rest }) => rest),
				skills: skills,
				education: educationData.map(({ _id, id, location, ...rest }) => rest),
				section: {
					certificates: certificatesData.map(({ _id, ...rest }) => rest),
					languages: languagesData.map(({ _id, ...rest }) => rest),
					hobbies: hobbiesData.map(({ _id, key, ...rest }) => rest),
					references: referencesData.map(({ _id, ...rest }) => rest),
					extraCurricularActivities: extraCCActivitiesData.map(
						({ _id, key, ...rest }) => rest
					),
					links: linksData.map(({ _id, ...rest }) => rest),
				},
			};
			if (resumeCreate) {
				CreateResumeBuilderMutation({
					_template: templateId,
					...data,
				});
			} else {
				updateResumeBuilderMutation({
					_id: resumeId,
					...data,
				});
			}
		} catch {
			setLoading(false);
		}
	};

	const { mutate: resumeAnalysisMutation, isPending: analysePending } = useMutation({
		mutationFn: (val) => resumeAnalysis(val),
		onSuccess: (data) => {
			if (data) {
				dispatch(addState({ name: 'analysisData', value: data?.data?.Analysis }));
				queryClient.invalidateQueries(['userDetails']);
			}
		},
		onError: () => {
			handleAlert(dispatch, 'Failed to analyse resume', 'error');
		},
	});

	const handleAnalyze = (data) => {
		const payload = {
			resume_uri: data,
			userId: userDetails?._user,
		};
		resumeAnalysisMutation(payload);
	};

	const { mutate: jsonTopMutation, isPending } = useMutation({
		mutationFn: (val) => jsonTopdf(val),
		onSuccess: (data) => {
			if (data) {
				handleAnalyze(data?.data?.data?.items?.fileUrl);
			}
		},
		onError: () => {
			handleAlert(dispatch, 'Failed to analyse resume', 'error');
		},
	});

	const handleReAnalyze = () => {
		const plainText = document.getElementById('jsxContent');
		const stringContent = plainText.innerHTML;
		const cyperText = CryptoJS.AES.encrypt(stringContent, keyutf, {
			iv: iv,
		}).toString();

		const payload = {
			encryptedHtmlData: cyperText,
			fileName: 'pdf_resume',
			isAnalyze: true,
		};

		jsonTopMutation(payload);
	};

	return (
		<section className="px-4 lg:px-10 py-4 flex justify-between bg-white">
			<div>
				{builderActiveTab !== 'select_template' && resumeCreate && (
					<PrimaryButton
						btnClassName="!text-sm !py-[10px] lg:!text-base lg:!py-[13px]"
						buttonText="Choose Template"
						handleClick={() => handleButtonClick('select_template')}
					/>
				)}
			</div>
			{builderActiveTab !== 'edit_template' ? (
				<PrimaryButton
					buttonText="Continue to Editor"
					handleClick={() => handleButtonClick('edit_template')}
					disabled={!resumePreview?.state}
				/>
			) : (
				<>
					<div className="hidden lg:flex gap-2">
						<PrimaryButton
							buttonText="Analyze Resume"
							handleClick={handleReAnalyze}
							loading={isPending || analysePending}
							disabled={isPending || analysePending}
							varient="primaryOutline"
							btnClassName="!px-[32px] !py-[16px] w-[193px]  "
						/>
						<PrimaryButton
							buttonText="Save"
							handleClick={() => handleSaveButtonClick()}
							loading={loading}
							disabled={!resumePreview?.state || loading}
							varient="primaryOutline"
							endIcon={<img src={SAVE_RESUME} alt="save" height={18} />}
							btnClassName="!px-[32px] !py-[16px] w-[124px] "
						/>

						<CustomMenu
							MenuButtonComponent={
								<PrimaryButton
									buttonText="Export"
									disabled={!resumePreview?.state}
									endIcon={<img src={EXPORT_RESUME} alt="export" height={18} />}
									btnClassName="!px-[32px] !py-[16px] flex gap-1"
									as="div"
								/>
							}
						/>
					</div>

					<div className="flex lg:hidden gap-2">
						<div
							className={styles.preview_btn}
							onClick={() => {
								setOpenPreviewModel(true);
							}}
						>
							<EyeIcon />
						</div>
						<div className={styles.preview_btn} onClick={() => setOpenOptions(true)}>
							<ThreeDot />
						</div>
					</div>
				</>
			)}
			<OptionModel
				onSave={() => {
					setOpenOptions(false);
					handleSaveButtonClick();
				}}
				onClose={() => setOpenOptions(false)}
				onExport={() => {
					setOpenOptions(false);
					setOpenExportOptions(true);
				}}
				open={openOptions}
			/>
			<ExportModel onClose={() => setOpenExportOptions(false)} open={openExportOptions} />
			<PewviewModel onClose={() => setOpenPreviewModel(false)} open={openPreviewModel} />
		</section>
	);
};

export default ResumeBuilderFooter;
