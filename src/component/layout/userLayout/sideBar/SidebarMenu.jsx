import React from 'react';
import { useLocation } from 'react-router-dom';

import MenuItem from './MenuItem';
import ProfileSection from './profileSection/ProfileSection';
import { HEADER_LOGO } from 'assets/images';

import { CAREER, CONNECT, DISCOVER, INTERVIEW, JOBS, RESUME, SALARY } from 'assets/index';

import styles from './sidebarMenu.module.css';

const SidebarMenu = () => {
	const location = useLocation();

	const menuItems = [
		{
			icon: <JOBS />,
			label: 'Jobs',
			isActive: location.pathname.includes('/jobs'),
			url: '/jobs',
		},
		{
			icon: <RESUME />,
			label: 'Resume',
			url: '/resume',
			isActive: location.pathname.includes('/resume'),
		},
		{
			icon: <CAREER />,
			label: 'Career Advisor',
			url: '/careeradvisor',
			// commingSoon: true,
			isActive: location.pathname.includes('/careeradvisor'),
		},
		{
			icon: <CONNECT />,
			label: 'Connect',
			url: '/connect',
			// commingSoon: true,
			isActive: location.pathname.includes('/connect'),
		},
		{
			icon: <DISCOVER />,
			label: 'Discover',
			url: '/discover',
			// commingSoon: true,
			isActive: location.pathname.includes('/discover'),
		},
		{
			icon: <SALARY />,
			label: 'Salary Predictor',
			// badge: 'Free',
			commingSoon: true,
			url: '/salary-pridictore',
			isActive: location.pathname.includes('/salary-pridictore'),
		},
		{
			icon: <INTERVIEW />,
			label: 'Interview Questions',
			url: '/interview',
			commingSoon: true,
			isActive: location.pathname.includes('/interview'),
		},
	];

	return (
		<nav className={styles.sidebar}>
			<img src={HEADER_LOGO} alt="Company Logo" className={styles.logo} />
			<div className={styles.sidebar_body}>
				<div className={`${styles.menuContainer} overflow-hide`}>
					{menuItems.map((item, index) => (
						<MenuItem
							key={index}
							icon={item.icon}
							label={item.label}
							isActive={item.isActive}
							badge={item.badge}
							url={item.url}
							commingSoon={item?.commingSoon}
							handleClick={item.handleClick}
						/>
					))}
				</div>
				<ProfileSection />
			</div>
		</nav>
	);
};

export default SidebarMenu;
