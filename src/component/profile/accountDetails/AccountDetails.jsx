import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

import HeadingLayout from '../subcomponents/HeadingLayout';
import { BUILD_RESUME, DEFAULT_PROFILE, LINKEDIN_LOGO } from 'assets/images';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import CustomInputField from 'component/customComponents/inputField';
import UploadComponent from '../subcomponents/UploadComponent';
import { handleAlert, removeInvalidFields } from 'utils/helperFunctions/helperFunction';
import { useMutationAPI } from 'apis/mutation';
import { transformSkills } from 'utils/resumeValidator';
import { Spinner } from 'component/index';
import { BuddyCardAi } from 'assets/index';
import { showCustomModal } from 'store/sagaActions';
import AlertModal from 'component/jobs/modal/AlertModal';
import { ALERT_MODAL } from 'constants/modalTypeConstant';

import './AccountDetails.css';

const AccountDetails = () => {
	const fileInputRef = useRef(null);
	const formikRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { updateProfile, uploadFile, resumeParser } = useMutationAPI();
	const userDetails = useSelector((state) => state.common.userDetails);

	const firstName = '';
	const lastName = '';

	const [file, setFile] = useState(null);
	const [image, setImage] = useState(null);
	const [pdfLoading, setPdfLoading] = useState(false);
	const [resumeFile, setResumeFile] = useState(null);
	const [profileImage, setProfileImage] = useState(null);

	const handleFileInput = () => {
		fileInputRef.current.click();
	};

	const validate = (values) => {
		const errors = {};
		if (!values.firstName) {
			errors.firstName = 'First Name is required';
		} else if (values.firstName.length < 2) {
			errors.firstName = 'First Name must be at least 2 characters';
		}

		if (!values.lastName) {
			errors.lastName = 'Last Name is required';
		} else if (values.lastName.length < 2) {
			errors.lastName = 'Last Name must be at least 2 characters';
		}

		return errors;
	};

	const { mutate: updateProfileDetails, isPending: updateProfilePending } = useMutation({
		mutationFn: (val) => updateProfile(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries(['userDetails', 'fetchRecommendedJobs']);
				handleAlert(
					dispatch,
					'Your profile has been updated',
					'',
					'bg-[#1A1A1AE5]  rounded-lg ',
					'white',
					'16px',
					false
				);
				navigate('/profile/details');
			}
		},
	});

	const handleDiscard = () => {
		formikRef.current.resetForm();

		handleAlert(
			dispatch,
			'Changes has been discarded',
			'',
			'bg-[#1A1A1AE5]  rounded-lg ',
			'white',
			'16px',
			false
		);

		navigate('/profile/details');
	};

	const handleBuildResume = () => {
		dispatch(
			showCustomModal({
				customModalType: ALERT_MODAL,
				tempCustomModalData: {
					success: () => {
						navigate('/resume');
					},
					title: 'Discard Changes?',
					description:
						'Your unsaved changes will be discarded, and you will be redirected to the Resume Builder. Are you sure you want to continue?',
				},
			})
		);
	};

	const updateUserProfile = (parsedData = null) => {
		setPdfLoading(false);
		const firstName = formikRef.current.values?.firstName;
		const lastName = formikRef.current.values?.lastName;
		const skills = parsedData?.skills && transformSkills(parsedData?.skills);
		const mergedSkills = parsedData?.skills && Object.values(parsedData?.skills).flat();
		const payload = {
			name: {
				firstName: firstName,
				lastName: lastName,
				fullName: `${firstName} ${lastName}`,
			},
			email: userDetails?.email || userDetails?.profile?.email || null,
			phone: userDetails?.phone
				? {
						code: userDetails?.countryCode,
						number: userDetails?.phone,
					}
				: null,
			designation: parsedData?.designation || null,
			company: parsedData?.personalInfo?.company,
			experience: parsedData?.totalExperience,
			industryExperience: parsedData?.industryExperience,
			location: parsedData?.personalInfo?.location,
			image: profileImage,
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

	const { mutate: parseResume, status } = useMutation({
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
				if (data?.data.data.items.key.includes('profile-image'))
					setProfileImage(data?.data?.data?.items);
				else {
					setResumeFile(data?.data?.data?.items);
					extractText(file);
				}
			}
		},
	});

	const handleSave = () => {
		if (file) {
			const formData = new FormData();
			formData.append('type', 'resume');
			formData.append('doc', file);
			mutate(formData);
		} else {
			updateUserProfile();
		}
	};

	const handleFileChange = async (event, setFieldValue) => {
		const selectedFile = event.target.files[0];

		// File validation
		const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
		const maxSizeInMB = 5;
		const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

		if (!selectedFile) return;

		if (!allowedFileTypes.includes(selectedFile.type)) {
			handleAlert(
				dispatch,
				'Invalid file type. Only PNG, JPEG, or JPG files are allowed.',
				'error'
			);
			return;
		}

		if (selectedFile.size > maxSizeInBytes) {
			handleAlert(
				dispatch,
				`File size exceeds ${maxSizeInMB}MB. Please upload a smaller file.`,
				'error'
			);
			return;
		}

		// If validation passes
		const selectedImage = URL.createObjectURL(selectedFile);

		setImage(selectedImage);
		setFieldValue('profileImage', selectedFile);

		const formData = new FormData();
		formData.append('type', 'profile-image');
		formData.append('doc', selectedFile);

		mutate(formData);
	};

	useEffect(() => {
		if (status === 'error') setPdfLoading(false);
	}, [status]);

	return (
		<div className="bg-white rounded-lg overflow-hidden">
			{(pdfLoading || isPending || updateProfilePending) && <Spinner />}
			<Formik
				innerRef={formikRef}
				initialValues={{
					profileImage: image,
					firstName: userDetails?.profile?.name?.firstName || firstName,
					lastName: userDetails?.profile?.name?.lastName || lastName,
					// linkedinURL: '',
				}}
				validate={validate}
				onSubmit={handleSave}
			>
				{({ errors, touched, setFieldValue, values }) => (
					<>
						<HeadingLayout
							heading="Account Details"
							onSave={async () => {
								const profileErrors = await formikRef.current?.validateForm();

								// Set all fields as touched
								formikRef.current?.setTouched(
									Object.keys(formikRef.current?.initialValues || {}).reduce(
										(acc, fieldName) => ({ ...acc, [fieldName]: true }),
										{}
									)
								);

								if (!profileErrors || Object.keys(profileErrors).length === 0) {
									formikRef.current?.handleSubmit();
								} else {
									handleAlert(dispatch, `Please fill required fields.`, 'error');
								}
							}}
							// onSave={handleSave}
							handleDiscard={handleDiscard}
						/>
						<div className="h-[calc(100vh-106px)]  lg:h-[calc(100vh-183px)] flex flex-col overflow-y-auto gap-[32px] pt-6 pb-[180px]  lg:pb-8 px-4 md:px-6 ">
							<Form>
								<div className="flex flex-col gap-2">
									<div className="text-[#666666] text-[12px]">
										{' '}
										Profile Picture
									</div>
									<div className="flex flex-wrap gap-y-3 items-center justify-between">
										<div className="flex items-center gap-3 ">
											<img
												alt="profile image"
												height={64}
												width={64}
												className="rounded-full overflow-hidden object-contain"
												src={
													image ||
													userDetails?.profile?.image?.url ||
													userDetails?.image?.url ||
													DEFAULT_PROFILE
												}
											/>
											<div>
												<div className="text-[14px] font-[500]">
													Profile Picture
												</div>
												<div className="text-[14px] text-[#666666] tracking-tight">
													JPG or PNG, 2MB max
												</div>
											</div>
										</div>

										<div className="flex gap-3">
											<PrimaryButton
												handleClick={handleFileInput}
												buttonText="Upload new picture"
												btnClassName="!px-4 !py-2 !text-[#1A1A1A] font-[500] !border-[#CCCCCC] !text-[14px] !h-[36px] !rounded-lg"
												varient="primaryOutline"
											/>

											<input
												type="file"
												ref={fileInputRef}
												className="hidden"
												onChange={(e) => {
													handleFileChange(e, setFieldValue);
												}}
												accept="image/png,image/jpeg"
											/>

											{image && (
												<PrimaryButton
													buttonText="Delete"
													btnClassName="!text-[#1A1A1A] font-[500] !text-[14px] !h-[36px]"
													varient=""
													handleClick={() => {
														setImage(null);
														setProfileImage(null);
														setFieldValue('profileImage', null);
													}}
												/>
											)}
										</div>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[20px] mt-8">
									<div>
										{' '}
										<Field
											name="firstName"
											component={CustomInputField}
											inputFieldBorderColor="#E6E6E6"
											labelClass="text-[12px]"
											lable="First Name"
											value={values.firstName}
											onChange={(e) => {
												// Use Formik's handleChange to automatically update the field value
												setFieldValue('firstName', e.target.value);
											}}
										/>
										{errors.firstName && touched.firstName && (
											<div className="text-[#CD2735] text-[12px]">
												{errors.firstName}
											</div>
										)}
									</div>
									<div>
										<Field
											name="lastName"
											component={CustomInputField}
											inputFieldBorderColor="#E6E6E6"
											labelClass="text-[12px]"
											lable="Last Name"
											value={values.lastName}
											onChange={(e) => {
												// Use Formik's handleChange to automatically update the field value
												setFieldValue('lastName', e.target.value);
											}}
										/>
										{errors.lastName && touched.lastName && (
											<div className=" text-[#CD2735] text-[12px]">
												{errors.lastName}
											</div>
										)}
									</div>
								</div>
							</Form>

							<div className="h-[1px] bg-[#E6E6E6]" />

							<div className="flex flex-col gap-2">
								<div className="text-[12px] text-[#666666]  tracking-tight">
									Add Linkedin
								</div>
								<div className="linkedin-container py-[40px] px-2  ">
									<div className="flex  flex-col justify-center items-center gap-8 ">
										<img
											alt="linkedid Logo "
											height={22}
											width={88}
											src={LINKEDIN_LOGO}
										/>
										<div className="text-[#666666] font-[500] flex flex-col justify-center items-center text-[12px] gap-2">
											<div>Import your profile from LinkedIn Account</div>
											{/* <CustomInputField
                        placeholderTextSize="14px"
                        endIcon={<img alt="Link Icon" src={LINK_TO_ICON} />}
                        borderRadius="8px"
                        placeholder="Enter profile URL here"
                      /> */}
											<PrimaryButton
												varient="primaryOutline"
												btnClassName="!rounded-lg !px-4 !py-2 !text-[14px] font-[500] !border-[#CCCCCC] !text-[#1A1A1A] "
												buttonText="Import"
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="line-container">
								<h2 className="flex w-full items-center">
									<span className=" text-[14px] md:text-sm flex font-[500] text-[#121212]  text-center">
										OR
									</span>
								</h2>
							</div>

							<UploadComponent file={file} setFile={setFile} />

							<div className=" bg-[#76FF7A] flex-wrap gap-4 relative text-[16px] font-medium flex justify-between  items-center rounded-lg py-4 px-6">
								<div>Don&apos;t have a resume yet?</div>
								<PrimaryButton
									btnClassName="bg-white !py-[10px] !z-10 !text-[#0E8712] !px-[20px] !h-[40px]"
									handleClick={handleBuildResume}
									varient="utline"
									startIcon={<BuddyCardAi className="stroke-[#14A019] " />}
									buttonText="Build Resume"
								/>
								<img src={BUILD_RESUME} className="absolute right-0 " />
							</div>
						</div>
					</>
				)}
			</Formik>
			<AlertModal />
		</div>
	);
};

export default AccountDetails;
