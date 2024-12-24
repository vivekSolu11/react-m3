import React from 'react';
import Handlebars from 'handlebars';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';

const DownloadResume = ({ htmlTemplate = '', selectedLineSpacing = '1.43' }) => {
	const info = useSelector((state) => state.info);
	const workExperience = useSelector((state) => state.workExperience);
	const education = useSelector((state) => state.education);
	const skills = useSelector((state) => state.skills);
	const certificates = useSelector((state) => state.certificates);
	const languages = useSelector((state) => state.languages);
	const hobbies = useSelector((state) => state.hobbies);
	const references = useSelector((state) => state.references);
	const extraCCActivities = useSelector((state) => state.extraCCActivities);
	const links = useSelector((state) => state.links);
	const { userDetails } = useSelector((state) => state.common);

	const imageUrl = userDetails?.profile?.image?.url || userDetails?.image?.url || '';

	const mappedData = {
		basics: {
			...info,
			jobProfile: info?.jobProfile || userDetails?.profile?.designation?.name,
			name: userDetails?.profile?.name?.fullName || '',
			location: info?.location
				? Object.values(info.location)
						.filter((value) => value) // Filters out falsy values like undefined, null, or empty strings
						.join(', ')
				: '',
			image: imageUrl || '',
		},
		workExperience: workExperience,
		skills: skills,
		education: education,
		certificates: certificates,
		hobbies: hobbies,
		references: references,
		extraCCActivities: extraCCActivities,
		links: links,
		languages: languages,
		lineHeight: selectedLineSpacing,
	};

	Handlebars.registerHelper('formatDate', function (isoDate) {
		if (isoDate === 'Present') return 'Present';
		if (!isoDate) return ''; // Check if isoDate is undefined or null
		const date = new Date(isoDate);
		if (isNaN(date.getTime())) {
			return '';
		}
		const options = { year: 'numeric', month: 'long' };
		return date.toLocaleDateString('en-US', options);
	});

	const template = Handlebars.compile(htmlTemplate);
	const finalHTML = template(mappedData);

	const options = {
		replace(domNode) {
			if (domNode.attribs && domNode.attribs.class === 'remove') {
				return <></>;
			}
		},
	};

	return (
		<div
			id="jsxContent"
			style={{
				position: 'absolute',
				top: '-9999px',
				left: '-9999px',
			}}
		>
			{parse(finalHTML, options)}
		</div>
	);
};

export default DownloadResume;
