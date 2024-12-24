import { useSelector, useDispatch } from 'react-redux';

import { hideCustomModal, showAlert } from 'store/sagaActions';
import { useApiRequest } from 'hooks/apiHandler'; // Custom hook for API requests

export const useMutationAPI = () => {
	const apiRequest = useApiRequest(); // Access to the hook for making API calls
	const dispatch = useDispatch();

	const { userDetails } = useSelector((state) => state.common);

	const signUp = async (payload) => {
		return await apiRequest('auth/signup', 'POST', payload);
	};

	const signIn = async (payload) => {
		return await apiRequest('auth/signin', 'POST', payload);
	};

	const forgetPassword = async (payload) => {
		return await apiRequest('auth/reset-password', 'POST', payload);
	};

	const sendVerificationCode = async (payload) => {
		return await apiRequest('code-verification/request', 'POST', payload);
	};

	const resendVerificationCode = async (code) => {
		return await apiRequest(`code-verification/resend-request/${code}`, 'POST');
	};

	const verifyCode = async (payload) => {
		return await apiRequest('code-verification/verify', 'POST', payload);
	};

	const socialLogin = async (payload) => {
		return await apiRequest(
			`social-auth/${payload}/?redirect_uri=${import.meta.env.VITE_SOCIAL_LOGIN_REDIRECT_URL}`,
			'GET'
		);
	};

	const verifyGoogleLogin = async (payload) => {
		return await apiRequest('social-auth/get-google-data', 'POST', payload);
	};

	const verifyLinkedinLogin = async (payload) => {
		return await apiRequest('social-auth/get-linkind-data', 'POST', payload);
	};

	const fetchUserDetailsForLogin = async (payload) => {
		return await apiRequest(`auth/user-details?${payload}`, 'GET');
	};

	const checkAvailability = async (url) => {
		return await apiRequest(`auth/signup.availability-check?${url}`, 'GET');
	};

	const resetPassword = async (payload) => {
		return await apiRequest('auth/reset-password', 'POST', payload);
	};

	const contactUs = async (payload) => {
		return await apiRequest('contact-us/create', 'POST', payload);
	};

	const createResumeBuilderData = async (payload) => {
		return await apiRequest('resume-builder/create', 'POST', payload);
	};

	const updateResumeBuilderData = async (payload) => {
		return await apiRequest('resume-builder/update', 'PUT', payload);
	};

	const saveJob = async (payload) => {
		return await apiRequest('job/save-job', 'POST', payload);
	};

	const updatePreference = async (payload) => {
		return await apiRequest('me/update-preference', 'POST', payload);
	};

	const notInterestedJob = async (payload) => {
		return await apiRequest('job/not-interested-job', 'POST', payload);
	};
	const reportJob = async (payload) => {
		return await apiRequest('job/report-job', 'POST', payload);
	};

	const unSaveJob = async (payload) => {
		return await apiRequest('job/unsave-job', 'POST', payload);
	};

	const applyJob = async (payload) => {
		return await apiRequest('job/apply-job', 'POST', payload);
	};
	const uploadFile = async (payload) => {
		return await apiRequest('me/upload-file', 'POST', payload, {
			'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
		});
	};

	const updateResume = async (payload) => {
		return await apiRequest('me/update-resume', 'POST', payload);
	};

	const resumeAnalysis = async (payload) => {
		const resumeAnalyzerAndCustomizer =
			userDetails?.topups?.find(
				(entry) => entry.topup?.name === 'resumeAnalyzerAndCustomizer'
			)?.usage || null;
		if (
			userDetails?.subscription?.usage?.resumeAnalyzes === 0 &&
			!resumeAnalyzerAndCustomizer
		) {
			dispatch(
				showAlert({
					message:
						'Your resume analysis limit has been reached. Please upgrade your plan.',
					status: 'error',
				})
			);
			dispatch(hideCustomModal());
			return;
		}
		return await apiRequest(
			'analyze',
			'POST',
			payload,
			{},
			import.meta.env.VITE_ANALYSER_END_POINT_URL
		);
	};

	const resumeReport = async (payload) => {
		return await apiRequest(
			'report',
			'POST',
			payload,
			{},
			import.meta.env.VITE_REPORT_END_POINT_URL
		);
	};

	const customiseResume = async (payload) => {
		const resumeAnalyzerAndCustomizer =
			userDetails?.topups?.find(
				(entry) => entry.topup?.name === 'resumeAnalyzerAndCustomizer'
			)?.usage || null;
		if (
			userDetails?.subscription?.usage?.resumeCustomizations === 0 &&
			!resumeAnalyzerAndCustomizer
		) {
			dispatch(
				showAlert({
					message:
						'Your resume customization limit has been reached. Please upgrade your plan.',
					status: 'error',
				})
			);
			dispatch(hideCustomModal());
			return;
		}
		return await apiRequest(
			'custom',
			'POST',
			payload,
			{},
			import.meta.env.VITE_CUSTOMIZE_RESUME_END_POINT_URL
		);
	};

	const careeradvisorData = async (payload) => {
		return await apiRequest(
			'career',
			'POST',
			payload,
			{},
			import.meta.env.VITE_CAREER_ADVISOR_END_POINT_URL
		);
	};

	const resumeParser = async (payload) => {
		return await apiRequest(
			'parser',
			'POST',
			payload,
			{
				// 'Content-Type':
				//   'multipart/form-data; boundary=<calculated when request is sent>',
			},
			import.meta.env.VITE_RESUME_PARSER_END_POINT_URL
		);
	};

	const updateWithAi = async (payload) => {
		return await apiRequest(
			'withai',
			'POST',
			payload,
			{},
			import.meta.env.VITE_UPDATE_WITH_AI_END_POINT_URL
		);
	};
	const updateProfile = async (payload) => {
		return await apiRequest('me/update-profile', 'POST', payload);
	};
	const upvoteQuestions = async (payload) => {
		return await apiRequest('interview-questions/upvote/question', 'POST', payload);
	};
	const upvoteAnswer = async (payload) => {
		return await apiRequest('interview-questions/upvote/answer', 'POST', payload);
	};

	const unApplyJob = async (payload) => {
		return await apiRequest('job/unapply-job', 'POST', payload);
	};

	//-------------Salary Pridictore-------------
	const addSalary = async (payload) => {
		return await apiRequest('salary-predictor/addSalary', 'POST', payload);
	};

	const updateSalary = async (payload) => {
		return await apiRequest('salary-predictor/updateSalary', 'PUT', payload);
	};

	const submitFeedback = async (payload) => {
		return await apiRequest('feedback/addFeedback', 'POST', payload);
	};

	const jsonTopdf = async (payload) => {
		const download =
			userDetails?.topups?.find((entry) => entry.topup?.name === 'resumeDownloads')?.usage ||
			null;
		if (userDetails?.subscription?.usage?.resumeDownloads === 0 && !download) {
			dispatch(
				showAlert({
					message:
						'Your resume download limit has been reached. Please upgrade your plan.',
					status: 'error',
				})
			);
			return;
		}
		return await apiRequest('common/download', 'POST', payload);
	};

	const convertPdfToDoc = async (payload) => {
		return await apiRequest('/convert', 'POST', payload, {}, 'https://dev-pdf2docs.joblo.ai');
	};

	const updateProfileSetting = async (payload) => {
		return await apiRequest('/me/update-details', 'PATCH', payload);
	};

	const deleteAccount = async (payload) => {
		return await apiRequest('/me/delete-account', 'DELETE', payload);
	};

	return {
		signUp,
		addSalary,
		upvoteQuestions,
		updateSalary,
		submitFeedback,
		upvoteAnswer,
		uploadFile,
		signIn,
		forgetPassword,
		sendVerificationCode,
		resendVerificationCode,
		verifyCode,
		socialLogin,
		verifyGoogleLogin,
		verifyLinkedinLogin,
		fetchUserDetailsForLogin,
		checkAvailability,
		resetPassword,
		contactUs,
		createResumeBuilderData,
		updateResumeBuilderData,
		saveJob,
		updatePreference,
		notInterestedJob,
		unSaveJob,
		applyJob,
		reportJob,
		updateResume,
		resumeAnalysis,
		resumeReport,
		customiseResume,
		careeradvisorData,
		resumeParser,
		updateWithAi,
		updateProfile,
		unApplyJob,
		jsonTopdf,
		convertPdfToDoc,
		updateProfileSetting,
		deleteAccount,
	};
};
