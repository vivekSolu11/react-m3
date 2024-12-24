import { useDispatch, useSelector } from 'react-redux';
import React, { memo, useRef, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import SideDrawer from 'component/common/drawer/Drawer';
import RadioButton from 'component/customComponents/RadioButton';
import CheckBox from 'component/customComponents/checkBox';
import { useQueryAPI } from 'apis/query';
import {
	updateCommitments,
	updateCompanyData,
	updateDesignation,
	updateIndustryData,
	updateJobFunctionData,
} from 'store/reducer/filters/jobFiltersDropdown';
import RangeSlider from 'component/rangeSlider/RangeSlider';
import SuggestionInput from 'component/common/suggetionDropdown';
import {
	updateIndustries,
	updateJobFilter,
	updateJobTitle,
	updateJobType,
	updateWorkType,
} from 'store/reducer/filters/jobListFilters';
import { getMatchedObjects } from 'utils/common';
import { useMediaQuery } from '@mui/material';
import LocationInput from 'component/common/locationDropdown';
import SearchableDropdown from 'component/common/searchabledropdown';
import { removeInvalidFields } from 'utils/helperFunctions/helperFunction';

const SidebarData = [
	{
		title: 'Job seeker information',
		key: 'job_info',
		desc: 'Job Title / Location / Experience / Job Type / Date Posted',
	},
	{
		key: 'job_details',
		title: 'Job details',
		desc: 'Industry / Job Function',
	},
	{
		key: 'company',
		title: 'Company information',
		desc: 'Company',
	},
	{
		key: 'pref_lux',
		title: 'Preferred luxury',
		desc: 'Remote / Commitments',
	},
];

const FilterDrawer = ({ open = false, onClose = () => null, onSave = () => null }) => {
	const dispatch = useDispatch();
	const { fetchCommitments, fetchJobFunctions, fetchDesignation } = useQueryAPI();

	const {
		experienceData,
		companiesData,
		jobTypesData,
		industriesData,
		workTypeData,
		datePostedData,
		jobFunctionsData,
		commitmentsData,
		designationsData,
	} = useSelector((state) => state.jobFiltersDropdown);

	const { userDetails } = useSelector((state) => state.common);
	const { companies, industries, workType, jobTypes, experience, jobTitle } = useSelector(
		(state) => state.jobFilters
	);

	const [active, setActiveTab] = useState('job_info');
	const [date, setDate] = useState();
	const [location, setLocation] = useState(null);
	// const [designation, setDesignation] = useState(null);
	const [jobFun, setJobFun] = useState([]);
	const [commitment, setCommitment] = useState([]);
	const [value, setValue] = useState([0, 0]);

	const isSmallScreen = useMediaQuery('(max-width: 768px)');

	const handleSliderChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChange = (event) => {
		setDate(event.target.value);
	};

	const sectionRefs = {
		job_info: useRef(null),
		job_details: useRef(null),
		company: useRef(null),
		pref_lux: useRef(null),
	};

	const { data: JobFunctionsRes } = useQuery({
		queryKey: ['fetchJobFunctions'],
		queryFn: () => fetchJobFunctions(),
		staleTime: 300000,
	});
	const { data: designationRes } = useQuery({
		queryKey: ['fetchDesignation'],
		queryFn: () => fetchDesignation(),
		staleTime: 300000,
	});

	const { data: commitmentsRes } = useQuery({
		queryKey: ['fetchCommitments'],
		queryFn: () => fetchCommitments(),
		staleTime: 300000,
	});

	// Function to handle tab click and scroll to corresponding section
	const handleTabClick = (section) => {
		sectionRefs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const handleSave = () => {
		const data = {
			jobSeekerInfo: {
				designation: {
					_id: jobTitle?._id ?? null,
					name: jobTitle?.name ?? null,
				},
				location: location ? location : null,
				experience: {
					range: {
						from: value?.[1] !== 0 ? value?.[0] : null,
						to: value?.[1] !== 0 ? value?.[1] : null,
					},
					level: experience !== 'exp' ? experience : null,
				},
				jobType: jobTypes !== 'jobType' ? jobTypes : null,
				datePosted: date?.length > 0 ? date : null,
			},
			jobDetails: {
				industry: {
					_id:
						industries?.length > 0
							? industries?.map((industry) => industry?.value)
							: null,
					name:
						industries?.length > 0
							? industries?.map((industry) => industry?.label)
							: null,
				},
				jobFunction: {
					_id:
						jobFun?.length > 0
							? jobFun?.map((jobFunction) => jobFunction?.value)
							: null,
					name:
						jobFun?.length > 0
							? jobFun?.map((jobFunction) => jobFunction?.label)
							: null,
				},
			},
			companyInfo: {
				company: {
					_id: companies?.length > 0 ? companies?.map((company) => company?.value) : null,
					name:
						companies?.length > 0 ? companies?.map((company) => company?.label) : null,
				},
			},
			preferredLuxury: {
				workModel: workType !== 'workType' ? workType : null,
				commitment: {
					_id:
						commitment?.length > 0
							? commitment?.map((commitment) => commitment?.value)
							: null,
					name:
						commitment?.length > 0
							? commitment?.map((commitment) => commitment?.label)
							: null,
				},
			},
		};

		const cleanedData = removeInvalidFields(data);
		onSave(cleanedData);
	};

	useEffect(() => {
		// Update job functions and commitments data
		const jobFunData = JobFunctionsRes?.items || [];
		if (jobFunData?.length > 0 && jobFunctionsData?.length < 1) {
			dispatch(updateJobFunctionData(jobFunData));
		}
		const commitments = commitmentsRes?.items || [];
		if (commitments?.length > 0 && commitmentsData?.length < 1) {
			dispatch(updateCommitments(commitments));
		}
		const designations = designationRes?.items || [];
		if (designations?.length > 0 && designationsData?.length < 1) {
			dispatch(updateDesignation(designations));
		}
	}, [JobFunctionsRes, commitmentsRes, designationRes]);

	useEffect(() => {
		if (open) {
			// Set focus to the first focusable element when the drawer is open
			const focusableElement = document.querySelector(
				'[tabindex]:not([tabindex="-1"]), input, select, textarea, button, a[href]'
			);
			if (focusableElement) {
				focusableElement?.focus();
			}
		}
		dispatch(updateJobTitle(userDetails?.jobSeekerInfo?.designation));

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
		setDate(userDetails?.jobSeekerInfo?.datePosted || '');

		if (userDetails?.jobSeekerInfo?.experience?.range)
			setValue([
				userDetails?.jobSeekerInfo?.experience?.range?.from,
				userDetails?.jobSeekerInfo?.experience?.range?.to,
			]);
		else {
			setValue([0, 0]);
		}
	}, [open, userDetails, commitmentsData, jobFunctionsData]);

	useEffect(() => {
		if (userDetails && userDetails?.jobSeekerInfo?.location) {
			setLocation(userDetails?.jobSeekerInfo?.location);
		} else {
			setLocation(null);
		}
	}, [userDetails]);

	return (
		<SideDrawer
			open={open}
			onClose={() => {
				setActiveTab('job_info');
				onClose();
			}}
			withBtnHeader
			closebtnLable={'Discard'}
			savebtnLable={'Save'}
			width={1000}
			title={'Preferences'}
			onSave={handleSave}
			openFrom={isSmallScreen ? 'bottom' : 'right'}
		>
			<div className="flex flex-row   w-full  h-full">
				<div className="hidden md:flex flex-col   border-r  wrapper border-lightgray">
					{SidebarData?.length &&
						SidebarData?.map(({ desc, title, key }) => (
							<div
								key={key}
								onClick={() => {
									setActiveTab(key);
									handleTabClick(key);
								}}
								className={`flex flex-col max-w-[220px] cursor-pointer gap-1 w-full tab px-4 py-3 ${active === key ? 'bg-tab active-tabs-style  ' : ''} `}
							>
								<div className="text-base font-medium">{title} </div>
								<div className="text-sm font-normal truncate text-[#666]">
									{desc}
								</div>
							</div>
						))}
				</div>
				<div className="flex w-full flex-col gap-10 pt-6 px-6 overflow-y-auto overflow-hide   ">
					<div ref={sectionRefs.job_info} className="flex flex-col gap-5 pb-5 tab ">
						<div className="text-base font-medium text-black">
							Job seeker information
						</div>
						<div className="flex flex-col gap-6 ">
							<div className="flex flex-col md:flex-row gap-4 ">
								{userDetails?.subscription?.usage?.jobFilters?.includes(
									'Job Title'
								) && (
									<SearchableDropdown
										label="Job Title"
										inputClass={``}
										value={jobTitle}
										handleChange={(e) => {
											dispatch(
												updateJobTitle({
													_id: e?._id,
													name: e?.name,
												})
											);
										}}
										url="job/designations"
										placeholder="Job TItle"
									/>
								)}
								{userDetails?.subscription?.usage?.jobFilters?.includes(
									'Location'
								) && (
									<LocationInput
										inputClass={``}
										value={location || userDetails?.jobSeekerInfo?.location}
										handleChange={(e) => {
											if (Object.keys(e).length) {
												setLocation(e);
											}
										}}
										label={'Location'}
										setLocation={setLocation}
									/>
								)}
							</div>
							{userDetails?.subscription?.usage?.jobFilters?.includes(
								'Experiences'
							) && (
								<div className="flex gap-2 flex-col">
									<div className=" text-sm text-black">Experience(years) </div>
									<RangeSlider
										value={value}
										handleChange={handleSliderChange}
										max={50}
									/>
									<div className=" text-sm text-black">Experience </div>
									<div className="labels flex-wrap">
										{experienceData?.length &&
											experienceData?.map((option, index) => (
												<button
													onClick={() =>
														dispatch(
															updateJobFilter({ experience: option })
														)
													}
													className={`labelSelection  ${experience === option ? 'active' : 'text-[#4d4d4d]'}`}
													key={index}
												>
													{option}
												</button>
											))}
									</div>
								</div>
							)}
							{userDetails?.subscription?.usage?.jobFilters?.includes('Job Type') && (
								<div className="flex gap-2 flex-col">
									<div className=" text-sm text-black">Job Type </div>
									<div className="labels flex-wrap">
										{jobTypesData?.length &&
											jobTypesData?.map((option, index) => (
												<button
													onClick={() => dispatch(updateJobType(option))}
													className={`labelSelection  ${jobTypes === option ? 'active' : 'text-[#4d4d4d]'}`}
													key={index}
												>
													{typeof option === 'string' ? option : null}
												</button>
											))}
									</div>
								</div>
							)}
							<div className="flex gap-2 flex-col">
								<div className="matchDescription text-black">Date Posted </div>
								<div className="grid grid-cols-2">
									{datePostedData?.length &&
										datePostedData?.map((option) => (
											<RadioButton
												inputProps={{ 'aria-label': option }}
												onChange={handleChange}
												name="radio-buttons"
												checked={date === option}
												value={option}
												key={option}
												label={option}
											/>
										))}
								</div>
							</div>
						</div>
					</div>
					<div ref={sectionRefs.job_details} className="flex flex-col gap-5 pb-5 tab ">
						<div className="text-base font-medium text-black">Job details </div>
						{userDetails?.subscription?.usage?.jobFilters?.includes('Industry') && (
							<div className="flex flex-col gap-2 ">
								<div className="text-sm font-medium text-[#666]">Industry </div>
								<div className="grid gap-y-3 grid-cols-1 md:grid-cols-2">
									{industriesData?.length &&
										industriesData?.map(({ _id, name }) => (
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
																	(item) => item?.value !== _id
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
						)}
						<div className="flex flex-col gap-2 ">
							<div className="text-sm font-medium text-[#666]">Job function</div>
							<div className="grid gap-y-3 grid-cols-1 md:grid-cols-2">
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
					</div>
					<div ref={sectionRefs.company} className="flex flex-col gap-5 pb-5 tab ">
						<div className="text-base font-medium text-black">Company information</div>
						<div className="flex flex-col gap-2 ">
							<div className="text-sm font-medium text-[#666]">Company </div>
							<div className="grid gap-y-3 grid-cols-1 md:grid-cols-2">
								{companiesData?.length &&
									companiesData?.map(({ _id, name }) => (
										<CheckBox
											key={_id}
											label={name}
											defaultChecked={companies?.some(
												(obj) => obj?.value === _id
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
																	(item) => item?.value !== _id
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
					</div>
					<div ref={sectionRefs.pref_lux} className="flex flex-col gap-5 pb-5 tab ">
						<div className="text-base font-medium text-black">Preferred luxury</div>
						<div className="flex flex-col gap-6 ">
							{userDetails?.subscription?.usage?.jobFilters?.includes(
								'Work Mode'
							) && (
								<div className="flex flex-col gap-3">
									<div className="text-sm font-medium text-[#666]">Work Mode</div>

									<div className="labels flex-wrap">
										{workTypeData?.length &&
											workTypeData?.map((option, index) => (
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
							)}
							<div className="flex flex-col gap-3">
								<div className="text-sm font-medium text-[#666]">Commitments</div>

								<div className="grid  grid-cols-1 md:grid-cols-2 ">
									{commitmentsData?.length > 0 &&
										commitmentsData?.map(({ _id, name }) => (
											<CheckBox
												key={_id}
												label={name}
												defaultChecked={commitment?.some(
													(obj) => obj?.value === _id
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
																(item) => item?.value !== _id
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
						</div>
					</div>
				</div>
			</div>
		</SideDrawer>
	);
};

export default memo(FilterDrawer);