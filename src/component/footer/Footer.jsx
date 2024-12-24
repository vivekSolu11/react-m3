import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SocialIcons from './SocialIcons';
import FooterColumn from './FooterColumn';
import { FOOTER_LOGO, MOBILE_FOOTER_LOGO } from 'assets/images';

import './footer.css';

const Footer = () => {
	const navigate = useNavigate();
	const location = useLocation();

	function getOffset(el) {
		const rect = el.getBoundingClientRect();
		const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		return {
			top: rect.top + scrollTop,
			left: rect.left + scrollLeft,
		};
	}

	const scrollToFaq = useCallback(() => {
		const element = document.getElementById('faq');
		const offset = getOffset(element);

		window.scrollTo({ top: offset.top - 100 });
	}, []);

	useEffect(() => {
		if (location.hash === '#faq') {
			scrollToFaq();
		}
	}, [location.hash, scrollToFaq]);

	const handleFaqClick = (e) => {
		if (location.pathname === '/') {
			e.preventDefault();

			scrollToFaq();
		}
	};

	const mainLinks = [
		{ text: 'Home', href: '/', newTab: false },
		{ text: 'FAQs', href: '/#faq', newTab: false, handleClick: handleFaqClick },
		{ text: 'About us', href: '/about-us', newTab: false },
		{ text: 'Blogs', href: 'https://dev.joblo.ai/blogs/', newTab: true },
	];

	const serviceLinks = [
		{ text: 'Jobs', href: '/jobs' },
		{ text: 'Resume Builder', href: '/resume' },
		{ text: 'Resume Analyzer', href: '/resume-analyser' },
		{ text: 'Career Advisor', href: '/career-advisor' },
		{ text: 'Salary Predictor', href: '/salary' },
		{ text: 'Interview Questions', href: '/interview' },
		{ text: 'Connect', href: '/connect' },
		{ text: 'Discover', href: '/discover' },
	];

	const supportLinks = [
		{ text: 'Help & Support', href: '/support' },
		{ text: 'Terms & Conditions', href: '/terms-and-condition' },
		{ text: 'Privacy Policy', href: '/policy' },
		{ text: 'Cookie Policy', href: '/cookie-policy' },
	];

	return (
		<footer className="flex flex-col pb-6 pt-16 bg-neutral-900 max-md:px-5 bg-black">
			<div className="md:flex md:flex-wrap md:gap-10 justify-between items-start w-full max-md:max-w-full md:max-w-[1240px] mx-auto">
				<img
					loading="lazy"
					src={FOOTER_LOGO}
					alt="Company logo"
					className="object-contain shrink-0 aspect-[1.07] w-[151px] hidden lg:block cursor-pointer"
					onClick={() => navigate('/')}
				/>
				<img
					loading="lazy"
					src={MOBILE_FOOTER_LOGO}
					alt="Company logo"
					className="object-contain shrink-0 block lg:hidden h-[28px] cursor-pointer"
					onClick={() => navigate('/')}
				/>
				<div className="hidden flex-col self-start max-md:flex max-sm:flex mt-10">
					<h2 className="text-base font-medium tracking-tight text-white">FOLLOW US</h2>
					<SocialIcons className="mt-3" />
				</div>

				<nav className="grid grid-cols-2 gap-[31px] md:flex md:flex-wrap md:gap-10 items-start justify-between md:min-w-[825px] max-md:max-w-full mt-10 md:mt-0 ">
					<div className="hidden md:flex md:gap-[120px]">
						<FooterColumn title="MAIN" links={mainLinks} />
						<FooterColumn title="SERVICES" links={serviceLinks} />
						<FooterColumn title="SUPPORT" links={supportLinks} />
					</div>
					<div className="col-span-1 md:hidden">
						<FooterColumn title="MAIN" links={mainLinks} />
						<FooterColumn title="SUPPORT" links={supportLinks} />
					</div>
					<div className="col-span-1 md:hidden">
						<FooterColumn title="SERVICES" links={serviceLinks} />
					</div>

					<div className="flex flex-col w-[134px] max-md:hidden max-sm:hidden cursor-pointer">
						<h2 className="gap-2 px-2 w-full text-xl font-medium text-white cursor-text">
							FOLLOW US
						</h2>
						<SocialIcons className="mt-6 flex-col" />
					</div>
				</nav>
			</div>

			<p className="self-start mt-20 text-xs font-normal md:text-xl  text-center opacity-60 max-md:mt-10 w-full md:text-[#999999] text-[#666666]">
				©2024 Joblo.ai All Rights Reserved.
			</p>
		</footer>
	);
};

export default Footer;
