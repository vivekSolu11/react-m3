import React from 'react';

import SideDrawer from 'component/common/drawer/Drawer';
import DetailsBox from './DetailsBox';

const QuickGuideModal = ({ open, onClose }) => {
	const data = [
		{
			heading: ' Career Advisor',
			points: [
				{
					heading: '',
					botQ: 'Guide me through career journey from current position to desired position.',
				},
				{
					heading: '',
					botQ: ` What is the average expected salary when going from current position to desired position?`,
				},
				{
					heading: '',
					botQ: `How many position switches needed when moving current position to desired position?`,
				},
				{
					heading: '',
					botQ: 'What is success rate of moving current position to desired position?',
				},
				{
					heading: '',
					botQ: `Give me favorable connections who have moved current position to desired position?`,
				},
			],
		},
		{
			heading: 'Salary Predictor',
			points: [
				{
					heading: '',
					botQ: 'What is the salary for X job from X company?',
				},
				{
					heading: '',
					botQ: ` What is the salary range for X job?`,
				},
				{
					heading: '',
					botQ: `Help me Add my Salary.`,
				},
				{ heading: '', botQ: 'Guide me to Update my Salary.' },
			],
		},
		{
			heading: 'Interview Questions',
			points: [
				{
					heading: '',
					botQ: 'Give me interview questions for X job title from X company.',
				},
			],
		},
		{
			heading: 'Connect',
			points: [
				{
					heading: '',
					botQ: 'Give me potential/favorable connections for X job title.',
				},
				{
					heading: '',
					botQ: 'Give me potential/favorable connections for X job title from X company.',
				},
			],
		},
		{
			heading: 'Discover',
			points: [
				{
					heading: '',
					botQ: 'Show me news from X sector.',
				},
				{
					heading: '',
					botQ: 'Show me news from X company.',
				},
				{
					heading: '',
					botQ: 'Show me Trending news',
				},
			],
		},
		{
			heading: 'Resume Builder',
			points: [
				{
					heading: '',
					botQ: 'Can you help me create a professional resume for a software developer position?',
				},
				{
					heading: '',
					botQ: 'What should I include in my resume summary for a marketing role? ',
				},
				{
					heading: '',
					botQ: 'Can you suggest a template to format my resume neatly?',
				},
				{
					heading: '',
					botQ: '  Can you help me tailor my resume for a data analyst job?',
				},
			],
		},
		{
			heading: 'Resume Analyser',
			points: [
				{
					heading: '',
					botQ: 'Can you review my resume and point out areas for improvement?',
				},
				{
					heading: '',
					botQ: 'Can you identify any weak points in my resume?',
				},
				{
					heading: '',
					botQ: 'What keywords should I add to my resume to pass an applicant tracking system (ATS)?',
				},
				{
					heading: '',
					botQ: '  Can you help me tailor my resume for a data analyst job?',
				},
			],
		},
		{
			heading: 'Job Listings',
			points: [
				{
					heading: '',
					botQ: 'Can you show me recent job openings for entry-level data scientists?',
				},
				{
					heading: '',
					botQ: 'What are the highest-paying jobs currently available in software engineering?',
				},
				{
					heading: '',
					botQ: 'Do you have any part-time roles for administrative assistants?',
				},
			],
		},
	];
	return (
		<SideDrawer
			open={open}
			chatIcon
			boarder={false}
			onClose={onClose}
			title={'Master Buddy bot in seconds'}
			desc={''}
		>
			<div className="flex flex-col  gap-9 px-8 py-4">
				{data.map((item, i) => (
					<DetailsBox {...item} key={i} onClose={onClose} />
				))}
			</div>
		</SideDrawer>
	);
};

export default QuickGuideModal;
