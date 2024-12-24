import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-scroll';

import './index.css';

const CustomLink = ({ to, className = '', title }) => {
	return (
		<Link
			to={to}
			spy={true}
			smooth={true}
			duration={600}
			containerId="scrollContainer"
			offset={-70}
			className={`${className}  no-underline px-[16px] pb-[11.5px] pt-[12px] text-[14px] cursor-pointer -tracking-[0.02rem] Job-nav  relative`}
		>
			{title}
			<span className={`h-[2px] inline-block  absolute left-0 -bottom-[2px]   `}>&nbsp;</span>
		</Link>
	);
};

const Navbar = () => {
	return (
		<Box
			id="myheader"
			className="z-20  w-full block whitespace-nowrap md:overflow-x-auto  overflow-y-hidden py-[9.5px] px-[12px]  rounded-t-lg bg-white hide-scrollbar"
		>
			<CustomLink to="overview" title="Overview" className=" " />
			<CustomLink to="CompanyDetail" title="Company Detail" className="" z />
			<CustomLink to="CompanyInsights" title="Company Insights" className="" />
		</Box>
	);
};

export default Navbar;
