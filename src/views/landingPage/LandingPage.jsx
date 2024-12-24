import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { lazy, useEffect } from 'react';

const HeroSection = lazy(() => import('component/landingPage/heroSection'));
const AskBuddy = lazy(() => import('component/landingPage/askBuddy'));
const Discover = lazy(() => import('component/landingPage/discover'));
const AiDriven = lazy(() => import('component/landingPage/AiDriven'));
const Premium = lazy(() => import('component/landingPage/Premium'));
const ResumeAnalysis = lazy(() => import('component/landingPage/ResumeAnalysis'));
const CarrerAdvisor = lazy(() => import('component/landingPage/CarrerAdvisor'));
const Connections = lazy(() => import('component/landingPage/Connections'));
const BuddyBot = lazy(() => import('component/landingPage/BuddyBot'));
const LandingPageFAQ = lazy(() => import('component/landingPage/faq/LandingPageFAQ'));
const Banner = lazy(() => import('component/landingPage/banner/Banner'));
const JobListings = lazy(() => import('component/landingPage/jobListing/JobListings'));
import UnauthLayout from 'component/layout/UnauthLayout';
import { addState } from 'store/sagaActions';

import './landingPage.css';
import { useQueryAPI } from 'apis/query';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import {
	updateCommitments,
	updateCompanyData,
	updatedatePostedData,
	updateDesignation,
	updateExperienceData,
	updateIndustryData,
	updateJobFunctionData,
	updatejobTypesData,
	updateWorkModeData,
} from 'store/reducer/filters/jobFiltersDropdown';

const LandingPage = () => {
	const dispatch = useDispatch();

	const {
		experienceData,
		companiesData,
		jobTypesData,
		industriesData,
		workTypeData,
		datePostedData,
		commitmentsData,
		jobFunctionsData,
		designationsData,
	} = useSelector((state) => state.jobFiltersDropdown);

	const {
		fetchCompanies,
		fetchDatePosted,
		fetchExperienceLevels,
		fetchIndustries,
		fetchJobType,
		fetchWorkMode,
		fetchCommitments,
		fetchJobFunctions,
		fetchDesignation,
		fetchJobCount,
	} = useQueryAPI();

	const { data: experienceApiData } = useQuery({
		queryKey: ['fetchExperienceLevels'],
		queryFn: fetchExperienceLevels,
		staleTime: 300000,
	});

	const filter = '';

	const { data: jobCount } = useQuery({
		queryKey: ['jobCount', filter],
		queryFn: () => fetchJobCount(filter),
		staleTime: 300000,
	});

	const { data: companiesApiData } = useQuery({
		queryKey: ['fetchCompanies'],
		queryFn: fetchCompanies,
		staleTime: 300000,
	});

	const { data: jobTypeApiData } = useQuery({
		queryKey: ['fetchJobType'],
		queryFn: fetchJobType,
		staleTime: 300000,
	});

	const { data: industriesApiData } = useQuery({
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

	const { data: commitmentsRes } = useQuery({
		queryKey: ['fetchCommitments'],
		queryFn: fetchCommitments,
		staleTime: 300000,
	});

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

	// Helper to handle updates for dropdowns
	const updateFilterData = (apiData, currentData, action) => {
		if (apiData?.items?.length > 0 && currentData?.length < 1) {
			dispatch(action(apiData?.items));
		}
	};

	useEffect(() => {
		updateFilterData(experienceApiData, experienceData, updateExperienceData);
	}, [experienceApiData]);

	useEffect(() => {
		updateFilterData(companiesApiData, companiesData, updateCompanyData);
	}, [companiesApiData]);

	useEffect(() => {
		updateFilterData(jobTypeApiData, jobTypesData, updatejobTypesData);
	}, [jobTypeApiData]);

	useEffect(() => {
		updateFilterData(industriesApiData, industriesData, updateIndustryData);
	}, [industriesApiData]);

	useEffect(() => {
		updateFilterData(workModeApiData, workTypeData, updateWorkModeData);
	}, [workModeApiData]);

	useEffect(() => {
		updateFilterData(datePostedApiData, datePostedData, updatedatePostedData);
	}, [datePostedApiData]);

	useEffect(() => {
		updateFilterData(commitmentsRes, commitmentsData, updateCommitments);
	}, [commitmentsRes]);

	useEffect(() => {
		updateFilterData(JobFunctionsRes, jobFunctionsData, updateJobFunctionData);
	}, [JobFunctionsRes]);

	useEffect(() => {
		updateFilterData(designationRes, designationsData, updateDesignation);
	}, [designationRes]);

	useEffect(() => {
		dispatch(addState({ name: 'codeId', value: null }));
		dispatch(addState({ name: 'signUpData', value: null }));
	}, [dispatch]);

	return (
		<>
			<Box className={` hero-gradient bg-no-repeat backg lg:mt-20 mt-14`}>
				<UnauthLayout className={'!px-4 md:px-6'}>
					<HeroSection />
					<AskBuddy />
				</UnauthLayout>
			</Box>
			<UnauthLayout className={'bg-white flex flex-col gap-10'}>
				<Discover
					totalJobs={`${jobCount?.items.jobCount * 1000}+`}
					todayJobs={
						jobCount?.items.newJobCount > 0
							? `${jobCount?.items.newJobCount * 1000}+`
							: '1000+'
					}
				/>
				<AiDriven />
				<Premium />
				<ResumeAnalysis />
				<CarrerAdvisor />
				<Connections />
				<BuddyBot />
				<LandingPageFAQ />
				<Banner />
			</UnauthLayout>

			<JobListings />
		</>
	);
};

export default LandingPage;
