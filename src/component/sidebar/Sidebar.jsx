import * as React from 'react';

import { PrimaryButton } from 'component';
import { HEADER_LOGO, CLOSE } from 'assets/images';

import './sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar({ handleClose }) {
	const menuItems = [
		{ name: 'Home', path: '/', newTab: false },
		{ name: 'About Us', path: '/about-us', newTab: false },
		{ name: 'Blogs', path: 'https://dev.joblo.ai/blogs/', newTab: true },
	];

	return (
		<section className="sidebar">
			<header className="sidebar-header ">
				<img src={HEADER_LOGO} alt="Logo" className="header-logo" />
				<img src={CLOSE} alt="Close" className="close-icon" onClick={handleClose} />
			</header>
			<nav className="nav-items">
				{menuItems.map((item) => (
					<Link
						key={item?.name}
						className="self-stretch px-6 py-3 w-full text-[#333333] no-underline"
						to={item?.path}
						target={item?.newTab ? '_blank' : '_self'}
						rel={item?.newTab ? 'noopener noreferrer' : undefined}
						onClick={handleClose}
					>
						{item?.name}
					</Link>
				))}
			</nav>
			<footer className="sidebar-footer">
				<Link to={'/sign-in'}>
					<PrimaryButton
						btnClassName="flex-1 px-[43px] py-[10px] text-green-700 rounded border border-green-400 max-w-[131px] w-full"
						buttonText="Sign in"
						varient="primaryOutline"
					/>
				</Link>
				<Link to={'/sign-up'}>
					<PrimaryButton
						btnClassName="flex-1 px-[43px] py-[10px] bg-green-300 rounded text-zinc-900 max-w-[131px] w-full"
						buttonText="Join Now"
					/>
				</Link>
			</footer>
		</section>
	);
}

export default Sidebar;
