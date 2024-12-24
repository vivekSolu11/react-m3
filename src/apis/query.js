import { useApiRequest } from 'hooks/apiHandler'; // Import the custom hook for API requests

export const useQueryAPI = () => {
	const apiRequest = useApiRequest(); // Get the hook for making requests with token handling

	const fetchUserData = async () => {
		return await apiRequest('/user/profile', 'GET');
	};

	const fetchOccupationList = async () => {
		return await apiRequest('/contact-us/occupation-list', 'GET');
	};

	const fetchAllTemplate = async () => {
		return await apiRequest('resume-templates/get-all', 'GET');
	};

	const fetchTemplateById = async (id) => {
		return await apiRequest(`/resume-templates/get/${id}`, 'GET');
	};

	const fetchAllJobs = async (startIndex = 1, itemsPerPage = 10, filter = '') => {
		return await apiRequest(
			`/job/get-all?startIndex=${startIndex}&itemsPerPage=${itemsPerPage}&${filter}`,
			'GET'
		);
	};

	const fetchSavedJobList = async (startIndex = 1, itemsPerPage = 10, filter = '') => {
		return await apiRequest(
			`/job/saved-jobs?startIndex=${startIndex}&itemsPerPage=${itemsPerPage}&${filter}`,
			'GET'
		);
	};

	const fetchResumeData = async (id) => {
		return await apiRequest(`/resume-builder/get-info?_id=${id}`, 'GET');
	};

	const fetchPopularTemplates = async () => {
		return await apiRequest('/resume-templates/get-popular-templates', 'GET');
	};

	const fetchConnections = async (startIndex = 1, itemsPerPage = 10, filter = '') => {
		return await apiRequest(
			`/connect/getConnect?startIndex=${startIndex}&itemsPerPage=${itemsPerPage}&${filter}`,
			'GET'
		);
	};

	const fetchSavedTemplates = async () => {
		return await apiRequest('resume-templates/get-saved-templates', 'GET');
	};

	const fetchAppliedJobList = async (startIndex = 1, itemsPerPage = 10, filter = '') => {
		return await apiRequest(
			`/job/applied-jobs?startIndex=${startIndex}&itemsPerPage=${itemsPerPage}&${filter}`,
			'GET'
		);
	};

	//------------Discover News Apis------------------------

	const fetchNewsCategory = async () => {
		return await apiRequest('news/categories', 'GET');
	};

	const fetchNewsByCategory = async (startIndex = 1, itemsPerPage = 10, filter = '') => {
		return await apiRequest(
			`/news/getAllNews?startIndex=${startIndex}&itemsPerPage=${itemsPerPage}&_category=${filter}`,
			'GET'
		);
	};
	const fetchAllNewsByCompany = async (startIndex = 1, itemsPerPage = 10, filter = '') => {
		return await apiRequest(
			`/news/getAllNewsByCompany?startIndex=${startIndex}&itemsPerPage=${itemsPerPage}&_company=${filter}`,
			'GET'
		);
	};
	const fetchAllRecentNews = async () => {
		return await apiRequest(`/news/getRecentNews`, 'GET');
	};
	const fetchAllTrendingNews = async () => {
		return await apiRequest(`/news/getTrendingNews`, 'GET');
	};

	const fetchNewsById = async (filter) => {
		return await apiRequest(`/news/getNewsById?_news=${filter}`, 'GET');
	};

	const fetchRecentJobsByCompanyId = async (filter) => {
		return await apiRequest(`/news/getRecentJobs?_company=${filter}`, 'GET');
	};
	const fetchTrendingJobsByCompanyId = async (filter) => {
		return await apiRequest(`/news/getTrendingNewsByCompany?_company=${filter}`, 'GET');
	};

	//------------Dropdown Apis------------------------

	const fetchExperienceLevels = async () => {
		const res = await apiRequest(`/job/experience-levels`, 'GET');
		return res?.data?.data;
	};
	const fetchCompanies = async () => {
		const res = await apiRequest(`/job/companies`, 'GET');
		return res?.data?.data;
	};
	const fetchJobType = async () => {
		const res = await apiRequest(`/job/job-types`, 'GET');
		return res?.data?.data;
	};
	const fetchIndustries = async () => {
		const res = await apiRequest(`/job/industries`, 'GET');
		return res?.data?.data;
	};
	const fetchWorkMode = async () => {
		const res = await apiRequest(`/job/work-models`, 'GET');
		return res?.data?.data;
	};
	const fetchDatePosted = async () => {
		const res = await apiRequest(`/job/date-posted`, 'GET');
		return res?.data?.data;
	};

	const fetchJobFunctions = async (url = '') => {
		const res = await apiRequest(`/job/job-functions${url}`, 'GET');
		return res?.data?.data;
	};

	const fetchCommitments = async () => {
		const res = await apiRequest(`/job/commitments`, 'GET');
		return res?.data?.data;
	};
	const fetchGetJobsDetailsById = async (id) => {
		const res = await apiRequest(`/job/get/${id}`, 'GET');
		return res?.data?.data;
	};
	const fetchDesignation = async () => {
		const res = await apiRequest(`/job/designations`, 'GET');
		return res?.data?.data;
	};

	const fetchReportTypeList = async () => {
		const res = await apiRequest(`/job/report-types`, 'GET');
		return res?.data?.data;
	};

	//Me API
	const fetchUserDetails = async () => {
		const res = await apiRequest(`/me`, 'GET');
		return res?.data?.data;
	};

	//Job Count
	const fetchJobCounts = async () => {
		const res = await apiRequest(`/job/job-count`, 'GET');
		return res?.data?.data?.items;
	};

	//Avrage Salary
	const fetchAverageSalary = async (val) => {
		const res = await apiRequest(`career-advisor/getAvgExpSalary?designation=${val}`, 'GET');
		return res;
	};

	const fetchTopCompanies = async (val) => {
		const res = await apiRequest(`career-advisor/getTopCompanies?designation=${val}`, 'GET');
		return res;
	};

	const fetchJobCompanies = async (val) => {
		const res = await apiRequest(`career-advisor/seeJobOpenings?designation=${val}`, 'GET');
		return res;
	};
	//Avrage Salary
	const fetchFavConnections = async (startIndex = 1, itemsPerPage = 10, filter = '') => {
		return await apiRequest(
			`/connect/getFavConnections?startIndex=${startIndex}&itemsPerPage=${itemsPerPage}&designation=${filter}`,
			'GET'
		);
	};

	//------------Interview question Apis------------------------
	const fetchInterviewQuestion = async (payload) => {
		const res = await apiRequest(`interview-questions/`, 'POST', payload, {
			'Content-Type': 'application/json',
		});
		return res;
	};

	const fetchInterviewDetails = async (val) => {
		const res = await apiRequest(`interview-questions/details?${val}`, 'GET');
		return res;
	};
	//------------Salary Pridictor Apis------------------------

	const fetchRecentSearchForSalary = async () => {
		const res = await apiRequest(`salary-predictor/recentSearch/?limit=6`, 'GET');
		return res;
	};

	const fetchSalaryDetails = async ({ designation, location, company }) => {
		const res = await apiRequest(
			`salary-predictor/salaries?_designation=${designation}&_company=${company}&location=${location}`,
			'GET'
		);
		return res;
	};
	const fetchReccomandedOpening = async (designation) => {
		const res = await apiRequest(
			`salary-predictor/recommendedOpenings?designation=${designation}`,
			'GET'
		);
		return res;
	};
	const fetchSalaryFormPosition = async () => {
		const res = await apiRequest(`salary-predictor/position-levels`, 'GET');

		return res?.data?.data?.items;
	};
	const fetchSalaryFormJobType = async () => {
		const res = await apiRequest(`/salary-predictor/job-types`, 'GET');
		return res?.data?.data?.items;
	};
	const fetchPayFrequency = async () => {
		const res = await apiRequest(`/salary-predictor/payFrequency`, 'GET');
		return res?.data?.data?.items;
	};

	const fetchGender = async () => {
		const res = await apiRequest(`/salary-predictor/gender`, 'GET');
		return res?.data?.data?.items;
	};

	const fetchJobMatchReason = async (jobId) => {
		const res = await apiRequest(`job/get-match-reason/${jobId}`, 'GET');
		return res?.data.data.items;
	};

	const fetchGetSalaryDetails = async () => {
		const res = await apiRequest(`salary-predictor/getSalary`, 'GET');
		return res?.data?.data;
	};

	const fetchJobCount = async (param) => {
		const res = await apiRequest(`job/jobSearch${param}`, 'GET');
		return res?.data?.data;
	};

	const fetchLandingCompanies = async () => {
		const res = await apiRequest(`common/getFeatured`, 'GET');
		return res?.data?.data;
	};

	const fetchSubscriptionPlans = async () => {
		const res = await apiRequest(`subscription`, 'GET');
		return res?.data?.data;
	};

	const fetchTopUpPlans = async () => {
		const res = await apiRequest(`topup`, 'GET');
		return res?.data?.data;
	};

	const recentTransaction = async () => {
		const res = await apiRequest(`transaction/recent-transaction`, 'GET');
		return res?.data?.data;
	};

	return {
		fetchUserData,
		fetchGetSalaryDetails,
		fetchDesignation,
		fetchGender,
		fetchPayFrequency,
		fetchSalaryFormPosition,
		fetchOccupationList,
		fetchSalaryFormJobType,
		fetchAllTemplate,
		fetchLandingCompanies,
		fetchTemplateById,
		fetchAllJobs,
		fetchSavedJobList,
		fetchResumeData,
		fetchPopularTemplates,
		fetchSavedTemplates,
		fetchAppliedJobList,
		fetchExperienceLevels,
		fetchCompanies,
		fetchJobType,
		fetchIndustries,
		fetchWorkMode,
		fetchDatePosted,
		fetchJobFunctions,
		fetchCommitments,
		fetchGetJobsDetailsById,
		fetchUserDetails,
		fetchReportTypeList,
		fetchJobCounts,
		fetchConnections,
		fetchNewsCategory,
		fetchNewsByCategory,
		fetchAllNewsByCompany,
		fetchNewsById,
		fetchRecentJobsByCompanyId,
		fetchAllRecentNews,
		fetchAverageSalary,
		fetchFavConnections,
		fetchAllTrendingNews,
		fetchTrendingJobsByCompanyId,
		fetchTopCompanies,
		fetchJobCompanies,
		fetchInterviewQuestion,
		fetchInterviewDetails,
		fetchJobMatchReason,
		fetchRecentSearchForSalary,
		fetchSalaryDetails,
		fetchReccomandedOpening,
		fetchJobCount,
		fetchSubscriptionPlans,
		fetchTopUpPlans,
		recentTransaction,
	};
};
