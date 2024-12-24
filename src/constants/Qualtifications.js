import {
	Anaytics,
	Degree,
	Excellent,
	message,
	Msexcel,
	MsPoint,
	Msword,
	sql,
	users,
	yoe,
} from 'assets/images';

export const Qualifications = {
	skills: [
		{
			id: 'q1',
			img: Degree,
			item: 'BS/BA Degree or higher',
		},
		{
			id: 'q2',
			img: yoe,
			item: '1+ Years of Work Experience',
		},

		{
			id: 'q4',
			img: sql,
			item: '1+ Years of SQL',
		},
		{
			id: 'q5',
			img: MsPoint,
			item: 'A+ in PowerPoint',
		},
		{
			id: 'q6',
			img: Msexcel,
			item: 'A+in MS Excel',
		},
		{
			id: 'q7',
			img: Msword,
			item: 'A+ in MS Word',
		},
		{
			id: 'q8',
			img: Anaytics,
			item: 'Excellent Analyical Skills',
		},
		{
			id: 'q9',
			img: Excellent,
			item: 'Excellent Problem Solving Skills',
		},
		{
			id: 'q10',
			img: message,
			item: 'Effective Communication',
		},
		{
			id: 'q11',
			img: users,
			item: 'Seamlessly Collaborative',
		},
	],

	requirements: [
		{
			id: 'r1',
			item: '2+ years of campaign execution, reporting and analytics experience, or a combination of both; or a BS/BA degree or higher in a quantitative field such as applied math, statistics, engineering, physics, accounting, finance, economics, econometrics, computer sciences, or business/social and behavioral sciences with a quantitative emphasis from tier 1 universities.',
		},
		{
			id: 'r2',
			item: '1+ years of Experience with campaign management software, preferably used HCL Unica Campaign (formerly Unica Affinium/IBM Unica Campaign) from top tier banks.',
		},
		{
			id: 'r3',
			item: 'Ability to identify inefficiencies and opportunities to improve the process.',
		},
	],

	additional: [
		{
			id: 'a1',
			item: 'Experience in gathering, analyzing and interpreting large datasets.',
		},
		{
			id: 'a2',
			item: 'Strong analytical skills with high attention to detail and accuracy.',
		},
		{
			id: 'a3',
			item: 'End-to-end marketing campaign management experience.',
		},
	],
};
