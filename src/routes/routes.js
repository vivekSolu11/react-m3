import { lazy } from 'react';

export const guestRoutes = [
	{
		path: '/',
		name: 'LandingPage',
		exact: true,
		layout: true,
		component: lazy(() => import('views/landingPage/LandingPage.jsx')),
	},
	{
		path: '/home',
		name: 'Home',
		exact: true,
		layout: true,
		component: lazy(() => import('views/home/Home.jsx')),
	},
	{
		path: '/about-us',
		name: 'About US',
		exact: true,
		layout: true,
		component: lazy(() => import('views/about/About.jsx')),
	},
	{
		path: '/chat-with-bot',
		name: 'ChatWithBot',
		exact: true,
		layout: false,
		component: lazy(() => import('views/chatBot/ChatBot.jsx')),
	},
	{
		path: '/sign-up',
		name: 'Join US',
		exact: true,
		layout: false,
		component: lazy(() => import('views/signup/SignUpForm.jsx')),
	},
	{
		path: '/sign-in',
		name: 'login',
		exact: true,
		layout: false,
		component: lazy(() => import('views/login/Login.jsx')),
	},
	{
		path: '/policy',
		name: 'PrivacyPolicy',
		exact: true,
		layout: true,
		component: lazy(() => import('views/cms/Cms')),
	},
	{
		path: '/terms-and-condition',
		name: 'Terms',
		exact: true,
		layout: true,
		component: lazy(() => import('views/cms/Cms')),
	},
	{
		path: '/support',
		name: 'Support',
		exact: true,
		layout: true,
		component: lazy(() => import('views/cms/Cms')),
	},
	{
		path: '/reset-password',
		name: 'resetPassword',
		exact: true,
		layout: false,
		component: lazy(() => import('views/resetPassword/ResetPassword')),
	},
];

export const userRoutes = [
	{
		path: '/',
		name: 'Jobs',
		exact: true,
		layout: true,
		isChatbot: true,
		component: lazy(() => import('views/jobs/Jobs.jsx')),
	},
	{
		path: '/jobs',
		name: 'JOB',
		exact: true,
		isChatbot: true,
		layout: true,
		component: lazy(() => import('views/jobs/Jobs.jsx')),
	},
	{
		path: '/resume',
		name: 'Resume',
		exact: true,
		isChatbot: false,
		layout: true,
		component: lazy(() => import('views/resumeList/ResumeList.jsx')),
	},
	{
		path: '/jobs/:jobId',
		name: 'JOB DETAILS',
		exact: true,
		layout: true,
		isChatbot: true,
		component: lazy(() => import('views/jobDetails/Details.jsx')),
	},
	{
		path: '/help&support',
		name: 'HELP SUPPORT',
		exact: true,
		layout: true,
		isChatbot: true,
		component: lazy(() => import('views/help&support/HelpandSupport')),
	},
	{
		path: '/resume/create',
		name: 'create resume',
		exact: true,
		layout: true,
		isChatbot: false,
		component: lazy(() => import('views/resumeBuilder/ResumeBuilder.jsx')),
	},
	{
		path: '/resume/analyzer',
		name: 'resume analyzer',
		exact: true,
		layout: true,
		isChatbot: false,
		isAnalyzer: true,
		component: lazy(() => import('views/resumeAnalyzer/ResumeAnalyzer.jsx')),
	},
	{
		path: '/resume/report',
		name: 'resume report',
		exact: true,
		layout: false,
		isChatbot: false,
		isAnalyzer: false,
		component: lazy(() => import('views/resumeAnalyzer/ResumeReport')),
	},
	{
		path: '/discover',
		name: 'discover',
		exact: true,
		layout: true,
		isChatbot: false,
		component: lazy(() => import('views/discover/Discover')),
	},
	{
		path: '/discover/:companyName',
		name: 'discover Company',
		exact: true,
		layout: true,
		isChatbot: false,
		component: lazy(() => import('views/discoverCompany/DiscoverCompany')),
	},
	{
		path: '/discover/:companyName/:id',
		name: 'discover Company News',
		exact: true,
		layout: true,
		isChatbot: false,
		component: lazy(() => import('views/discoverNews/DiscoverNews')),
	},
	{
		path: '/connect',
		name: 'CONNECT',
		exact: true,
		isChatbot: true,
		layout: true,
		component: lazy(() => import('views/connect/Connect')),
	},
	{
		path: '/profile/details',
		name: 'profile details',
		exact: true,
		layout: true,
		isProfileSideBar: false,
		isChatbot: true,
		component: lazy(() => import('views/profile/Profile')),
	},
	{
		path: '/salary-pridictore',
		name: 'CONNECT',
		exact: true,
		isChatbot: true,
		layout: true,
		component: lazy(() => import('views/salaryPredictor/salaryPridictore')),
	},
	{
		path: '/salary-pridictore/details',
		name: 'CONNECT',
		exact: true,
		isChatbot: true,
		layout: true,
		component: lazy(() => import('views/salaryPredictorDetails/salaryPridictoreDetails')),
	},

	{
		path: '/profile/edit',
		name: 'profile edit',
		exact: true,
		layout: true,
		isProfileSideBar: true,
		component: lazy(() => import('views/profile/ProfileEdit')),
	},
	{
		path: '/profile/preference',
		name: 'profile preference',
		exact: true,
		layout: true,
		isProfileSideBar: true,
		component: lazy(() => import('views/profile/ProfilePreference')),
	},
	{
		path: '/profile/settings',
		name: 'profile settings',
		exact: true,
		layout: true,
		isProfileSideBar: true,
		component: lazy(() => import('views/profile/ProfileSettings')),
	},
	{
		path: '/connect/cardlist',
		name: 'CARDLIST',
		exact: true,
		isChatbot: true,
		layout: true,
		component: lazy(() => import('views/connect/CardList')),
	},
	{
		path: '/careeradvisor',
		name: 'CAREERADVISOR',
		exact: true,
		isChatbot: true,
		layout: true,
		component: lazy(() => import('views/careeradvisor/CareerAdvsior')),
	},
	{
		path: '/careeradvisor/careerjourney',
		name: 'CAREERJOURNEY',
		exact: true,
		isChatbot: true,
		layout: true,
		component: lazy(() => import('views/careeradvisor/CareerJourneyAdv')),
	},
	{
		path: '/interview',
		name: 'INTERVIEW',
		exact: true,
		isChatbot: true,
		layout: true,
		component: lazy(() => import('views/interview/Interview')),
	},
	{
		path: '/interview/interviewquestion',
		name: 'INTERVIEWQUESTION',
		exact: true,
		isChatbot: true,
		layout: true,
		component: lazy(() => import('views/interview/InterviewQuestion')),
	},
	{
		path: '/pricing',
		name: 'pricing',
		exact: true,
		layout: true,
		isChatbot: false,
		component: lazy(() => import('views/pricing/Pricing')),
	},
];
