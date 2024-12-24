import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addState, hideCustomModal } from 'store/sagaActions';
import { UPLOAD_RESUME_MODAL } from 'constants/modalTypeConstant';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import UploadBox from 'component/chatbot/UploadBox';
import { useMutationAPI } from 'apis/mutation';
import { handleAlert, removeInvalidFields } from 'utils/helperFunctions/helperFunction';
import { transformSkills } from 'utils/resumeValidator';

const UploadResumeModal = () => {
	const dispatch = useDispatch();
	const [file, setFile] = useState(null);

	const queryClient = useQueryClient();
	const { customModalType, tempCustomModalData } = useSelector((state) => state.modal);
	const { userDetails } = useSelector((state) => state.common);

	const { uploadFile, updateProfile, resumeParser } = useMutationAPI();

	const [pdfLoading, setPdfLoading] = useState(false);
	const [resumeFile, setResumeFile] = useState(null);

	// Added effect to clear the file when the modal closes
	useEffect(() => {
		if (customModalType !== UPLOAD_RESUME_MODAL) {
			setFile(null);
		}
	}, [customModalType]);

	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	// const handleopenCustomizeModal = () => {
	//   hideModal();
	//   dispatch(
	//     showCustomModal({
	//       customModalType: CUSTOMIZE_RESUME_SIDE_MODAL,
	//     }),
	//   );
	// };

	const { mutate: updateProfileDetails, isPending: updateProfilePending } = useMutation({
		mutationFn: (val) => updateProfile(val),
		onSuccess: (data) => {
			if (data) {
				if (!tempCustomModalData?.hideCustomizeModal) {
					dispatch(
						addState({
							name: 'openCustomizeModal',
							value: true,
						})
					);
				} else {
					dispatch(hideCustomModal());
				}
				queryClient.invalidateQueries(['userDetails']);
			}
		},
	});

	const updateUserProfile = (parsedData = null) => {
		setPdfLoading(false);

		const skills = parsedData?.skills && transformSkills(parsedData?.skills);
		const mergedSkills = Object.values(parsedData?.skills).flat();
		const payload = {
			designation: parsedData?.designation || null,
			experience: parsedData?.totalExperience,
			industryExperience: parsedData?.industryExperience,
			location: parsedData?.personalInfo?.location,
			email: userDetails?.email || null,
			phone: userDetails?.phone
				? {
						code: userDetails?.countryCode,
						number: userDetails?.phone,
					}
				: null,
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

	const { mutate: parseResume } = useMutation({
		mutationFn: (val) => resumeParser(val),
		onSuccess: (data) => {
			if (data) {
				setPdfLoading(false);
				updateUserProfile(data?.data?.resume_parser);
			}
		},
		onError: () => {
			setPdfLoading(false);
			handleAlert(dispatch, 'Failed to parse the document', 'error');
		},
	});

	function extractText(file) {
		setPdfLoading(true);
		const formData = new FormData();
		formData.append('file', file);
		parseResume(formData);
	}

	const { mutate, isPending } = useMutation({
		mutationFn: (val) => uploadFile(val),
		onSuccess: (data) => {
			if (data) {
				setResumeFile(data?.data?.data?.items);
				extractText(file);
			}
		},
	});

	const handleUpdate = () => {
		const formData = new FormData();

		// Append form values to FormData
		formData.append('type', 'resume');
		formData.append('doc', file);

		mutate(formData);
	};

	return (
		<Dialog
			open={customModalType === UPLOAD_RESUME_MODAL}
			onClose={hideModal}
			aria-labelledby="success-modal-title"
			aria-describedby="success-modal-description"
			fullWidth
			maxWidth="md"
			sx={{
				'& .MuiDialog-paper': {
					margin: '0px',
					width: '100%',
				},
			}}
			disableEscapeKeyDown={true}
		>
			<div className=" p-0 md:p-4 pb-6">
				<DialogTitle
					id="success-modal-title"
					className=" text-base md:text-2xl font-medium   "
				>
					Upload your resume to access this feature
				</DialogTitle>
				<DialogContent className="">
					<UploadBox
						file={file}
						onDelete={() => setFile(null)}
						onChange={(e) => setFile(e.target.files[0])}
					/>
				</DialogContent>
				<DialogActions className=" px-6">
					<PrimaryButton
						handleClick={hideModal}
						buttonText="Cancel"
						varient="primaryOutline"
						btnClassName="!h-[40px] !px-[20px] !py-[10px] lg:!px-[28px] lg:!py-[13px] lg:!h-[48px]"
						disabled={updateProfilePending}
					/>
					<PrimaryButton
						handleClick={handleUpdate}
						buttonText="Continue"
						varient="primary"
						disabled={!file}
						btnClassName="!h-[40px] !px-[20px] !py-[10px] lg:!px-[28px] lg:!py-[13px] lg:!h-[48px]"
						loading={isPending || updateProfilePending || pdfLoading}
					/>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default UploadResumeModal;
