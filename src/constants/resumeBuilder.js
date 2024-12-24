export const builderTabs = [
	{ number: 0, text: 'Select Template', id: 'select_template' },
	{ number: 1, text: 'Edit Details', id: 'edit_template' },
];

export const Technicalskills = [
	{
		title: 'Technical Skills',
		key: 'technicalSkills',
		data: [
			{ name: 'Data Analysis', key: 'data_analysis' },
			{ name: 'Mobile App Development', key: 'mobile_app_development' },
			{ name: 'Digital Marketing', key: 'digital_marketing' },
			{ name: 'Graphic Design', key: 'graphic_design' },
			{ name: 'User Research', key: 'user_research' },
			{ name: 'UX Design', key: 'ux_design' },
			{ name: 'Quality Assurance', key: 'quality_assurance' },
			{ name: 'Project Management', key: 'project_management' },
			{ name: 'Front-end Development', key: 'front_end_development' },
			{ name: 'Product Management', key: 'product_management' },
			{ name: 'Content Writing', key: 'content_writing' },
			{ name: 'UI Design', key: 'ui_design' },
			{ name: 'SEO Optimization', key: 'seo_optimization' },
		],
	},
	{
		title: 'Software Skills',
		key: 'softwareSkills',
		data: [
			{ name: 'ArtFlow', key: 'artflow' },
			{ name: 'SketchMaster', key: 'sketchmaster' },
			{ name: 'CreativeSuite', key: 'creativesuite' },
			{ name: 'PixelCraft', key: 'pixelcraft' },
			{ name: 'Illustr', key: 'illustr' },
			{ name: 'VisionaryDesign', key: 'visionarydesign' },
			{ name: 'DesignPro', key: 'designpro' },
		],
	},
	{
		title: 'Research Skills',
		key: 'researchSkills',
	},
	{
		title: 'Communication Skills',
		key: 'communicationSkills',
	},
];

export const sectionsName = [
	{
		key: 'certifications',
		name: 'Certifications',
		isPremium: false,
	},
	{
		key: 'languages',
		name: 'Languages',
		isPremium: false,
	},
	{
		key: 'hobbies',
		name: 'Hobbies',
		isPremium: true,
	},
	{
		key: 'references',
		name: 'References',
		isPremium: true,
	},
	{
		key: 'ecc-activity',
		isPremium: true,
		name: 'Extra-curricular Activities',
	},
	{
		key: 'links',
		name: 'Links',
		isPremium: true,
	},
];

export const initialSkills = [
	{
		title: 'Technical Skills',
		key: 'technicalSkills',
		visible: true,
		data: [],
	},
	{
		visible: true,
		title: 'Software Skills',
		key: 'softwareSkills',
		data: [],
	},
	{
		visible: true,
		title: 'Research Skills',
		key: 'researchSkills',
		data: [],
	},
	{
		title: 'Communication Skills',
		key: 'communicationSkills',
		visible: true,
		data: [],
	},
];
