import React from 'react';

import { FACEBOOK, INSTA, LINKEDIN, X, YOUTUBE } from 'assets/images';

const SocialIcons = ({ className }) => {
	const icons = [
		{
			src: LINKEDIN,
			alt: 'LinkedIn icon',
			rounded: true,
			width: 32,
			height: 32,
			to: ' https://www.linkedin.com/company/joblo-ai/?viewAsMember=true',
		},
		{
			src: INSTA,
			to: 'https://www.instagram.com/joblo.ai/',
			alt: 'Instagram icon',
			width: 31.23,
			height: 31.23,
		},
		{
			src: FACEBOOK,
			alt: 'Facebook icon',
			to: 'https://www.facebook.com/people/Jobloai/61565956153758/',
			width: 31.25,
			height: 31.25,
		},
		{
			src: X,
			alt: 'Twitter icon',
			width: 30.71,
			to: 'https://x.com/Joblo_ai',
			height: 30.71,
		},

		{
			src: YOUTUBE,
			to: 'https://www.youtube.com/@Joblo_ai/featured',
			alt: 'YouTube icon',
			width: 40,
			height: 28.42,
		},
	];

	return (
		<div className={`flex gap-4 items-start pr-2 ${className}`}>
			{icons.map((icon, index) => (
				<a key={index} href={icon?.to} target="_blank" rel="noreferrer">
					<img
						loading="lazy"
						src={icon.src}
						alt={icon.alt}
						width={icon.width}
						height={icon.height}
						className={`social-icon ${icon.rounded ? 'rounded-sm' : ''}`}
					/>
				</a>
			))}
		</div>
	);
};

export default SocialIcons;
