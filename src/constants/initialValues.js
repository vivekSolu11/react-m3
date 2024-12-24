export const landiingTabs = [
	{ name: 'Job Search', key: 'jobSearch' },
	{ name: 'Interview', key: 'interview' },
	{ name: 'Career', key: 'career' },
	{ name: 'Resume', key: 'resume' },
];

export const botdata = [
	{
		isUser: true,
		que: 'Can you help me find job openings for Data Scientist in NCR, India?',
	},
	{
		isUser: false,
		pref: ['Update Preferences'],
		que: "Sure, I can help you with that. Let's get started! Can you please provide me with your preferences for job openings as a Data Scientist in NCR, India?",
	},
	{
		isUser: false,
		pref: ['Beginner', 'Intermediate', 'Expert'],

		que: "Sure, I can help you with that. Let's get started! Can you please provide me with your preferences for job openings as a Data Scientist in NCR, India?",
	},
];
