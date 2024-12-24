import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { DialogActions, DialogTitle, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import AccordianTab from './AccordianTab';
import { addState, hideCustomModal, showAlert } from 'store/sagaActions';
import { UPDATE_PREFERENCE_MODAL } from 'constants/modalTypeConstant';
import CloseIcon from 'assets/SVGs/CloseIcon';
import CheckBox from 'component/customComponents/checkBox';
import { PrimaryButton, Spinner } from 'component';
import RadioButton from 'component/customComponents/RadioButton';
import UploadBox from './UploadBox';
import LocationInput from 'component/common/locationDropdown';
import RangeSlider from 'component/rangeSlider/RangeSlider';
import {
	updateIndustries,
	updateJobFilter,
	updateJobTitle,
	updateJobType,
	updateWorkType,
} from 'store/reducer/filters/jobListFilters';
import {
	updateCommitments,
	updateCompanyData,
	updateIndustryData,
	updateJobFunctionData,
} from 'store/reducer/filters/jobFiltersDropdown';
import SuggestionInput from 'component/common/suggetionDropdown';
import { getMatchedObjects } from 'utils/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMutationAPI } from 'apis/mutation';
import SearchableDropdown from 'component/common/searchabledropdown';
import { handleAlert, removeInvalidFields } from 'utils/helperFunctions/helperFunction';

import './chatbot.css';
import { transformSkills } from 'utils/resumeValidator';

const UpdatePreferenceModal = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [file, setFile] = useState();
	const [expanded, setExpanded] = useState(false);
	const [date, setDate] = useState();
	const [designation, setDesignation] = useState(null);
	const [location, setLocation] = useState(null);
	const [commitment, setCommitment] = useState([]);
	const [resumeFile, setResumeFile] = useState(null);
	const [pdfLoading, setPdfLoading] = useState(false);

	const {
		experienceData,
		companiesData,
		jobTypesData,
		industriesData,
		workTypeData,
		datePostedData,
		jobFunctionsData,
		commitmentsData,
	} = useSelector((state) => state.jobFiltersDropdown);

	const { companies, industries, workType, jobTypes, experience, jobTitle } = useSelector(
		(state) => state.jobFilters
	);

	const { authToken } = useSelector((state) => state.auth);

	const { jobListType, userDetails } = useSelector((state) => state.common);

	const { updatePreference, resumeParser, uploadFile } = useMutationAPI();
	const queryClient = useQueryClient();

	const [value, setValue] = useState([0, 0]);
	const [jobFun, setJobFun] = useState([]);

	const handleSliderChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	const handleDateChange = (event) => {
		setDate(event.target.value);
	};

	const { customModalType } = useSelector((state) => state.modal);
	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	const { mutate, isPending } = useMutation({
		mutationFn: (val) => updatePreference(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries([
					`fetch${jobListType?.charAt(0).toUpperCase() + jobListType?.slice(1)}Jobs`,
					'userDetails',
				]);
				dispatch(
					showAlert({
						message: data?.data?.data?.message,
						status: 'success',
					})
				);
				hideModal();
			}
		},
	});

	const handleConfirm = () => {
		const data = {
			jobSeekerInfo: {
				designation: designation ?? null,
				location: location ?? null,
				experience: {
					range: {
						from: value?.[1] !== 0 ? value?.[0] : null,
						to: value?.[1] !== 0 ? value?.[1] : null,
					},
					level: experience !== 'exp' ? experience : null,
				},
				jobType: jobTypes !== 'jobType' ? jobTypes : null,
				datePosted: date ?? null,
			},
			jobDetails: {
				industry: {
					_id:
						industries.length > 0 ? industries.map((industry) => industry.value) : null,
					name:
						industries.length > 0 ? industries.map((industry) => industry.label) : null,
				},
				jobFunction: {
					_id: jobFun.length > 0 ? jobFun.map((jobFunction) => jobFunction.value) : null,
					name: jobFun.length > 0 ? jobFun.map((jobFunction) => jobFunction.label) : null,
				},
			},
			companyInfo: {
				company: {
					_id: companies.length > 0 ? companies.map((company) => company.value) : null,
					name: companies.length > 0 ? companies.map((company) => company.label) : null,
				},
			},
			preferredLuxury: {
				workModel: workType !== 'workType' ? workType : null,
				commitment: {
					_id:
						commitment.length > 0
							? commitment.map((commitment) => commitment.value)
							: null,
					name:
						commitment.length > 0
							? commitment.map((commitment) => commitment.label)
							: null,
				},
			},
		};

		const cleanedData = removeInvalidFields(data);
		if (authToken) {
			mutate(cleanedData);
		} else {
			dispatch(addState({ name: 'preLoginPreference', value: cleanedData }));
			if (file) {
				handleUpdate();
			} else {
				hideModal();
				navigate('/chat-with-bot?login');
			}
		}
	};

	const updateUserProfile = (parsedData = null) => {
		setPdfLoading(false);

		const skills = parsedData?.skills && transformSkills(parsedData?.skills);
		const mergedSkills = parsedData?.skills && Object.values(parsedData?.skills).flat();
		const payload = {
			designation: parsedData?.designation || null,
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
							from: item?.duration?.from || '',
							tillNow: item?.duration?.tillNow,
							...(item?.duration?.to ? { to: item?.duration?.to } : {}),
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
		dispatch(addState({ name: 'userResume', value: cleanedData }));
		hideModal();
		navigate('/chat-with-bot?login');
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

	const { mutate: uploadResume, isPending: uploadPending } = useMutation({
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

		uploadResume(formData);
	};

	useEffect(() => {
		if (userDetails) {
			dispatch(updateJobTitle(userDetails?.jobSeekerInfo?._designation));
			setLocation(userDetails?.jobSeekerInfo?.location);
			const userCommitment = getMatchedObjects(
				commitmentsData,
				userDetails?.preferredLuxury?.commitment?._id
			);
			setCommitment(userCommitment);
			const userJobFunction = getMatchedObjects(
				jobFunctionsData,
				userDetails?.jobDetails?.jobFunction?._id
			);
			setJobFun(userJobFunction);
			setDesignation(userDetails?.jobSeekerInfo?._designation);

			setDate(userDetails?.jobSeekerInfo?.datePosted);
			if (userDetails?.jobSeekerInfo?.experience?.range)
				setValue([
					userDetails?.jobSeekerInfo?.experience?.range?.from,
					userDetails?.jobSeekerInfo?.experience?.range?.to,
				]);
		}
	}, [userDetails]);

	return (
		<Dialog
			open={customModalType === UPDATE_PREFERENCE_MODAL}
			onClose={hideModal}
			aria-labelledby="success-modal-title"
			aria-describedby="success-modal-description"
			fullWidth
			maxWidth="md"
		>
			{isPending && <Spinner />}
			<DialogTitle id="success-modal-title">Update Preferences</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={hideModal}
				sx={(theme) => ({
					position: 'absolute',
					right: 8,
					top: 8,
					color: theme.palette.grey[500],
					border: '1px solid gray',
					padding: 0,
				})}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent>
				<UploadBox
					file={file}
					onDelete={() => setFile(null)}
					onChange={(e) => setFile(e.target.files[0])}
					withHowToUpload
					lable={'Upload Resume'}
				/>
				<div className="line-box">
					<div className="line"></div>OR
					<div className="line"></div>
				</div>
				<div className="flex flex-col gap-1">
					<div className="fields flex-col lg:flex-row">
						<SearchableDropdown
							label="Job Title"
							inputClass={``}
							value={{ _id: jobTitle }}
							handleChange={(e) => {
								dispatch(updateJobTitle(e?._id));
								setDesignation({
									_id: e?._id,
									name: e?.name,
								});
							}}
							url="job/designations"
							placeholder="Job TItle"
						/>{' '}
						<LocationInput
							inputClass={``}
							value={location}
							handleChange={(e) => {
								if (Object.keys(e).length) {
									setLocation(e);
								} else {
									setLocation(null);
								}
							}}
							label={'Location'}
						/>
					</div>

					<div className="flex gap-2 flex-col">
						<div className="matchDescription text-black">Experience (years)</div>
						<RangeSlider value={value} handleChange={handleSliderChange} max={50} />
						<div className="matchDescription text-black">Experience </div>
						<div className="labels flex-wrap">
							{experienceData.map((option, index) => (
								<button
									onClick={() =>
										dispatch(updateJobFilter({ experience: option }))
									}
									className={`labelSelection  ${experience === option ? 'active' : 'text-[#4d4d4d]'}`}
									key={index}
								>
									{option}
								</button>
							))}
						</div>
					</div>

					<div className="matchDescription text-black">Job Type </div>
					<div className="labels flex-wrap">
						{jobTypesData.map((option, index) => (
							<button
								onClick={() => dispatch(updateJobType(option))}
								className={`labelSelection  ${jobTypes === option ? 'active' : 'text-[#4d4d4d]'}`}
								key={index}
							>
								{option}
							</button>
						))}
					</div>
					<div className="matchDescription text-black">Date Posted </div>
					<div className="grid grid-cols-2">
						{datePostedData?.map((option) => (
							<RadioButton
								inputProps={{ 'aria-label': option }}
								onChange={handleDateChange}
								name="radio-buttons"
								checked={date === option}
								value={option}
								key={option}
								label={option}
							/>
						))}
					</div>

					<AccordianTab
						title={'Job Details'}
						onChange={handleChange('job_details')}
						expanded={expanded === 'job_details'}
						key={'job_details'}
					>
						<div className="flex flex-col gap-3">
							<div className=" text-sm">Industry</div>
							<div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
								{industriesData.map(({ _id, name }) => (
									<CheckBox
										key={_id}
										label={name}
										defaultChecked={industries?.some(
											(obj) => obj.value === _id
										)}
										onChange={(e) => {
											if (e.target.checked) {
												dispatch(
													updateIndustries([
														...industries,
														{ value: _id, label: name },
													])
												);
											} else {
												dispatch(
													updateIndustries([
														...industries.filter(
															(item) => item.value !== _id
														),
													])
												);
											}
										}}
									/>
								))}

								<SuggestionInput
									options={industriesData}
									type="industries"
									btnLabel={'Add Job Industry'}
									onOptionClick={(e) => dispatch(updateIndustryData([e]))}
								/>
							</div>
						</div>
						<div className="flex flex-col gap-3">
							<div className="text-sm text-[#666666] font-medium">Job Function</div>
							<div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
								{jobFunctionsData?.length &&
									jobFunctionsData?.map(({ _id, name }) => (
										<CheckBox
											key={_id}
											label={name}
											defaultChecked={jobFun?.some(
												(obj) => obj.value === _id
											)}
											onChange={(e) => {
												if (e.target.checked) {
													setJobFun((prev) => [
														...prev,
														{ value: _id, label: name },
													]);
												} else {
													setJobFun((prev) => [
														...prev.filter(
															(item) => item.value !== _id
														),
													]);
												}
											}}
										/>
									))}

								<SuggestionInput
									options={jobFunctionsData}
									type="job-functions"
									btnLabel={'Add Job Function'}
									onOptionClick={(e) => dispatch(updateJobFunctionData([e]))}
								/>
							</div>
						</div>
					</AccordianTab>
					<AccordianTab
						title={' Company information'}
						onChange={handleChange('comp_info')}
						expanded={expanded === 'comp_info'}
						key={'comp_info'}
					>
						<div className="flex flex-col gap-3">
							<div className="flex ">Company</div>
							<div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
								{companiesData?.length &&
									companiesData?.map(({ _id, name }) => (
										<CheckBox
											key={_id}
											label={name}
											defaultChecked={companies?.some(
												(obj) => obj.value === _id
											)}
											onChange={(e) => {
												if (e.target.checked) {
													dispatch(
														updateJobFilter({
															companies: [
																...companies,
																{ value: _id, label: name },
															],
														})
													);
												} else {
													dispatch(
														updateJobFilter({
															companies: [
																...companies.filter(
																	(item) => item.value !== _id
																),
															],
														})
													);
												}
											}}
										/>
									))}

								<SuggestionInput
									options={companiesData}
									type="companies"
									btnLabel={'Add Companies'}
									onOptionClick={(e) => dispatch(updateCompanyData([e]))}
								/>
							</div>
						</div>
					</AccordianTab>
					<AccordianTab
						title={' Preferred Luxury'}
						onChange={handleChange('preferred_luxury')}
						expanded={expanded === 'preferred_luxury'}
						key={'preferred_luxury'}
					>
						<div className="flex flex-col gap-3">
							<div className="text-sm font-medium text-[#666]">Work Mode</div>

							<div className="labels flex-wrap">
								{workTypeData.map((option, index) => (
									<button
										onClick={() => dispatch(updateWorkType(option))}
										className={`labelSelection  ${workType === option ? 'active' : 'text-[#4d4d4d]'}`}
										key={index}
									>
										{option}
									</button>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-3">
							<div className="flex ">Commitments</div>
							<div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
								{commitmentsData?.length > 0 &&
									commitmentsData?.map(({ _id, name }) => (
										<CheckBox
											key={_id}
											label={name}
											defaultChecked={commitment?.some(
												(obj) => obj.value === _id
											)}
											onChange={(e) => {
												if (e.target.checked) {
													setCommitment((prev) => [
														...prev,
														{ value: _id, label: name },
													]);
												} else {
													setCommitment((prev) => [
														...prev.filter(
															(item) => item.value !== _id
														),
													]);
												}
											}}
										/>
									))}

								<SuggestionInput
									options={commitmentsData}
									type="commitments"
									btnLabel={'Add Commitments'}
									onOptionClick={(e) => dispatch(updateCommitments([e]))}
								/>
							</div>
						</div>
					</AccordianTab>
				</div>
			</DialogContent>
			<DialogActions>
				<PrimaryButton
					handleClick={hideModal}
					buttonText="Cancel"
					varient="primaryOutline"
				/>
				<PrimaryButton
					handleClick={handleConfirm}
					buttonText="Continue"
					varient="primary"
					loading={pdfLoading || uploadPending}
				/>
			</DialogActions>
		</Dialog>
	);
};

export default UpdatePreferenceModal;
