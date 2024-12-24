import React, { memo, useEffect, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';

import CustomDropdown from 'component/common/dropdown';
import { FilterIcon } from 'assets/index';
import FilterDrawer from './FilterDrawer';
import { Jobcattypes } from 'constants/updatePreference';
import CustomMultiSelect from 'component/common/autoComplate';
import { useMutationAPI } from 'apis/mutation';
import { addState, showAlert } from 'store/sagaActions';
import { useQueryAPI } from 'apis/query';
import {
	resetInfo,
	updateIndustries,
	updateJobFilter,
	updateJobType,
	updateWorkType,
} from 'store/reducer/filters/jobListFilters';

import './filterbar.css';
import {
	updateCompanyData,
	updatedatePostedData,
	updateExperienceData,
	updateIndustryData,
	updatejobTypesData,
	updateWorkModeData,
} from 'store/reducer/filters/jobFiltersDropdown';
// import { updatePreference } from 'apis/mutation';
import UpdatePreferenceMobile from 'component/chatbot/UpdatePreferenceMobile';
import { getMatchedObjects } from 'utils/common';
import { removeInvalidFields } from 'utils/helperFunctions/helperFunction';
import { FILTER_LINES } from 'assets/images';
import { useMediaQuery } from '@mui/material';

const Filterbar = () => {
	const dispatch = useDispatch();
	const { updatePreference } = useMutationAPI();
	const queryClient = useQueryClient();

	const isMobileScreen = useMediaQuery('(max-width:541px)');

	const { jobListType, userDetails, jobFilter } = useSelector((state) => state.common);
	const { experience, companies, industries, jobTypes, workType } = useSelector(
		(state) => state.jobFilters
	);
	const {
		experienceData,
		companiesData,
		jobTypesData,
		industriesData,
		workTypeData,
		datePostedData,
	} = useSelector((state) => state.jobFiltersDropdown);

	const [open, setOpen] = useState(false);
	const [value1, setValue1] = useState('');

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};
	const [mobileDrawer, setMobileDrawer] = useState(false);
	const toggleMobileClose = (newOpen) => () => {
		setMobileDrawer(newOpen);
	};

	const {
		fetchCompanies,
		fetchDatePosted,
		fetchExperienceLevels,
		fetchIndustries,
		fetchJobType,
		fetchWorkMode,
	} = useQueryAPI();

	const { data: experienceApiData } = useQuery({
		queryKey: ['fetchExperienceLevels'],
		queryFn: fetchExperienceLevels,
		staleTime: 300000,
	});

	const { data: companiesApiData, isLoading } = useQuery({
		queryKey: ['fetchCompanies'],
		queryFn: fetchCompanies,
		staleTime: 300000,
	});

	const { data: jobTypeApiData } = useQuery({
		queryKey: ['fetchJobType'],
		queryFn: fetchJobType,
		staleTime: 300000,
	});

	const { data: industriesApiData, isLoading: industryLoading } = useQuery({
		queryKey: ['fetchIndustries'],
		queryFn: fetchIndustries,
		staleTime: 300000,
	});

	const { data: workModeApiData } = useQuery({
		queryKey: ['fetchWorkMode'],
		queryFn: fetchWorkMode,
		staleTime: 300000,
	});

	const { data: datePostedApiData } = useQuery({
		queryKey: ['fetchDatePosted'],
		queryFn: fetchDatePosted,
		staleTime: 300000,
	});

	// Helper to handle updates for dropdowns
	const updateFilterData = (apiData, currentData, action) => {
		if (apiData?.items?.length > 0) {
			dispatch(action(apiData.items));
		}
	};

	const { mutate } = useMutation({
		mutationFn: (val) => updatePreference(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries([
					`fetch${jobListType?.charAt(0)?.toUpperCase() + jobListType.slice(1)}Jobs`,
					'userDetails',
					'fetchCompanies',
				]);
				dispatch(
					showAlert({
						message: data?.data?.data?.message,
						status: 'success',
					})
				);
			}
		},
	});

	const handleUpdatePreference = (exp, company, jobtype, worktype, indus) => {
		const payload = {
			jobSeekerInfo: {
				designation: userDetails?.jobSeekerInfo?.designation ?? null,
				location: {
					city: userDetails?.jobSeekerInfo?.location?.city ?? null,
				},
				experience: {
					range: {
						from: userDetails?.jobSeekerInfo?.experience?.range?.from ?? null,
						to: userDetails?.jobSeekerInfo?.experience?.range?.to ?? null,
					},
					level: exp === 'exp' ? null : exp,
				},
				jobType: jobtype === 'jobType' ? null : jobtype,
				datePosted: userDetails?.jobSeekerInfo?.datePosted ?? null,
			},
			jobDetails: {
				industry: {
					_id: indus?.length ? indus.map((industry) => industry.value) : null,
					name: indus?.length ? indus.map((industry) => industry.label) : null,
				},
				jobFunction: userDetails?.jobDetails?.jobFunction ?? null,
			},
			companyInfo: {
				company: {
					_id: company?.length ? company.map((company) => company.value) : null,
					name: company?.length ? company.map((company) => company.label) : null,
				},
			},
			preferredLuxury: {
				workModel: worktype === 'workType' ? null : worktype,
				commitment: userDetails?.preferredLuxury?.commitment ?? null,
			},
		};

		const cleanedData = removeInvalidFields(payload);
		dispatch(addState({ name: 'preferenceLoader', value: true }));
		mutate(cleanedData);
	};

	const handleJobTypeChange = (value) => {
		dispatch(updateJobType(value));
	};

	const handleWorkTypeChange = (value) => {
		dispatch(updateWorkType(value));
	};

	const handleIndustriesChange = (event, newValue) => {
		dispatch(updateIndustries(newValue));
		handleUpdatePreference(experience, companies, jobTypes, workType, newValue);
	};

	const handleJobFilter = (value) => {
		setValue1(value);
		dispatch(addState({ name: 'jobFilter', value: value }));
		dispatch(addState({ name: 'preferenceLoader', value: true }));
	};

	useEffect(() => {
		if (userDetails?.companyInfo?.company) {
			const matchedCompanies = getMatchedObjects(
				companiesApiData?.items,
				userDetails?.companyInfo?.company?._id
			);
			dispatch(updateJobFilter({ companies: matchedCompanies }));
		}

		if (userDetails?.jobDetails?.industry) {
			const matchedIndustries = getMatchedObjects(
				industriesApiData?.items,
				userDetails?.jobDetails?.industry?._id
			);
			dispatch(updateIndustries(matchedIndustries));
		}

		if (userDetails?.jobSeekerInfo?.experience?.level?.length > 0) {
			dispatch(
				updateJobFilter({
					experience: userDetails.jobSeekerInfo.experience.level,
				})
			);
		}

		if (userDetails?.jobSeekerInfo?.jobType?.length > 0) {
			dispatch(updateJobType(userDetails.jobSeekerInfo.jobType));
		}

		if (userDetails?.preferredLuxury?.workModel?.length > 0) {
			dispatch(updateWorkType(userDetails.preferredLuxury.workModel));
		}
	}, [userDetails, open, companiesApiData, industriesApiData]);

	useEffect(() => {
		updateFilterData(experienceApiData, experienceData, updateExperienceData);
	}, [experienceApiData]);

	useEffect(() => {
		if (!isLoading) updateFilterData(companiesApiData, companiesData, updateCompanyData);
	}, [companiesApiData, isLoading]);

	useEffect(() => {
		updateFilterData(jobTypeApiData, jobTypesData, updatejobTypesData);
	}, [jobTypeApiData]);

	useEffect(() => {
		if (!industryLoading)
			updateFilterData(industriesApiData, industriesData, updateIndustryData);
	}, [industriesApiData, industryLoading]);

	useEffect(() => {
		updateFilterData(workModeApiData, workTypeData, updateWorkModeData);
	}, [workModeApiData]);

	useEffect(() => {
		updateFilterData(datePostedApiData, datePostedData, updatedatePostedData);
	}, [datePostedApiData]);

	useEffect(() => {
		setValue1(jobFilter);
	}, [jobFilter]);

	useEffect(() => {
		if (userDetails && !userDetails?.profile?.location) {
			dispatch(addState({ name: 'jobFilter', value: 'sortBy=postedAt&sortValue=-1' }));
		}
	}, [userDetails]);

	return (
		<>
			<div className="flex w-full">
				<div className="filter-wrap recommendation-filter">
					{isMobileScreen && ( // Render the image only on mobile screens
						<img
							src={FILTER_LINES}
							alt="filter-lines"
							style={{ height: '16px', width: '16px' }} // Apply styles as needed
						/>
					)}
					<CustomDropdown
						options={Jobcattypes}
						value={value1}
						onChange={(e) => handleJobFilter(e.target.value)}
						// dropdownClass="text-[12px] font-medium leading-[18px] tracking-[-0.02em] text-left text-[#333333]"
						dropdownClass={`text-[12px] font-medium leading-[18px] tracking-[-0.02em] text-left text-[#333333] hide-default-arrow ${
							isMobileScreen ? 'max-w-[98px] w-full appearance-none' : ''
						}`}
						MenuProps={{
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'left', // Aligns dropdown to the left
							},
							transformOrigin: {
								vertical: 'top',
								horizontal: 'left',
							},
						}}
					/>
				</div>
				<div className="flex gap-2 px-2 overflow-x-auto overflow-hide  items-center">
					<div className="flex gap-2  overflow-x-auto overflow-hide items-center ">
						{userDetails?.subscription?.usage?.jobFilters?.includes('Experiences') && (
							<CustomDropdown
								type="whiterounded"
								options={
									experienceData?.length > 0
										? [
												{ value: 'exp', label: 'Experiences' },
												...experienceData.map((item) => ({
													value: item,
													label: item,
												})),
											]
										: [{ value: 'exp', label: 'Experiences' }]
								}
								value={experience}
								onChange={(e) => {
									dispatch(updateJobFilter({ experience: e.target.value }));
									handleUpdatePreference(e.target.value);
								}}
								dropdownClass="text-[12px] font-medium leading-[18px] tracking-[-0.02em] text-left text-[#333333]"
							/>
						)}
						<CustomMultiSelect
							options={
								companiesData?.length &&
								companiesData?.map(({ _id, name }) => ({
									value: _id,
									label: name,
								}))
							}
							placeholder={'Company'}
							handleChange={(e, newVal) => {
								dispatch(updateJobFilter({ companies: newVal }));
								handleUpdatePreference(experience, newVal);
							}}
							selectedValues={companies}
							dropdownClass="text-[12px] font-medium leading-[18px] tracking-[-0.02em] text-left text-[#333333]"
							url="job/companies"
						/>
						{userDetails?.subscription?.usage?.jobFilters?.includes('Job Type') && (
							<CustomDropdown
								type="whiterounded"
								options={
									jobTypesData?.length > 0
										? [
												{ value: 'jobType', label: 'Job Type' },
												...jobTypesData.map((item) => ({
													value: item,
													label: item,
												})),
											]
										: [{ value: 'jobType', label: 'Job Type' }]
								}
								value={jobTypes}
								onChange={(e) => {
									handleJobTypeChange(e.target.value);
									handleUpdatePreference(experience, companies, e.target.value);
								}}
								dropdownClass="text-[12px] font-medium leading-[18px] tracking-[-0.02em] text-left text-[#333333]"
							/>
						)}
						{userDetails?.subscription?.usage?.jobFilters?.includes('Work Mode') && (
							<CustomDropdown
								type="whiterounded"
								options={
									workTypeData?.length > 0
										? [
												{ value: 'workType', label: 'Work Type' },
												...workTypeData.map((item) => ({
													value: item,
													label: item,
												})),
											]
										: [{ value: 'workType', label: 'Work Type' }]
								}
								value={workType}
								onChange={(e) => {
									handleWorkTypeChange(e.target.value);
									handleUpdatePreference(
										experience,
										companies,
										jobTypes,
										e.target.value
									);
								}}
								dropdownClass="text-[12px] font-medium leading-[18px] tracking-[-0.02em] text-left text-[#333333]"
							/>
						)}
						{userDetails?.subscription?.usage?.jobFilters?.includes('Industry') && (
							<CustomMultiSelect
								handleChange={handleIndustriesChange}
								selectedValues={industries}
								options={industriesData.map((item) => ({
									value: item._id,
									label: item.name,
								}))}
								placeholder={'Industry'}
								dropdownClass="text-[12px] font-medium leading-[18px] tracking-[-0.02em] text-left text-[#333333]"
								url="/job/industries"
							/>
						)}
					</div>
					<div
						className=" cursor-pointer flex items-center justify-center"
						onClick={() => setOpen(true)}
					>
						<FilterIcon />
					</div>
					<div
						onClick={() => {
							mutate({});
							dispatch(resetInfo());
							dispatch(addState({ name: 'preferenceLoader', value: true }));
						}}
						className="cursor-pointer text-[#333333]"
					>
						Clear
					</div>
				</div>
			</div>
			<UpdatePreferenceMobile isOpen={mobileDrawer} onClose={toggleMobileClose(false)} />

			<FilterDrawer open={open} onClose={toggleDrawer(false)} onSave={mutate} />
		</>
	);
};

export default memo(Filterbar);
