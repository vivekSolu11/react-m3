import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Drawer from '../../../common/drawer/Drawer';
import MenuItem from '../sideBar/MenuItem';
import ProfileSection from '../sideBar/profileSection/ProfileSection';

import { HEADER_LOGO } from 'assets/images';

import { INTERVIEW, JOBS, RESUME, SALARY } from 'assets/index';

import styles from '../mobilesidebar/mobileSidebar.module.css';

const MobileSidebar = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const navigate = useNavigate();

	const menuItems = [
		{
			icon: <JOBS />,
			label: 'Jobs',
			url: '/jobs',
			isActive: location.pathname.includes('/jobs'),
		},
		{
			icon: <RESUME />,
			label: 'Resume',
			url: '/resume',
			isActive: location.pathname.includes('/resume'),
		},
		// {
		//   icon: <CAREER />,
		//   label: 'Career Advisor',
		//   url: '/careeradvisor',
		//   isActive: location.pathname.includes('/careeradvisor'),
		// },
		// {
		//   icon: <CONNECT />,
		//   label: 'Connect',
		//   // commingSoon: true,
		//   url: '/connect',
		//   isActive: location.pathname.includes('/connect'),
		// },
		// {
		//   icon: <DISCOVER />,
		//   label: 'Discover',
		//   // commingSoon: true,
		//   url: '/discover',
		// },
		{
			icon: <SALARY />,
			label: 'Salary Predictor',
			// badge: 'Free',
			commingSoon: true,
			url: '/salary-pridictore',
		},
		{
			icon: <INTERVIEW />,
			label: 'Interview Questions',
			commingSoon: true,
			url: '/interview',
		},
	];

	const toggleDrawer = (newOpen) => {
		setIsDrawerOpen(newOpen);
	};

	// Close the drawer on window resize if the window is larger than 768px
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) {
				setIsDrawerOpen(false);
			}
		};

		// Add event listener
		window.addEventListener('resize', handleResize);

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleMenuClick = (url) => {
		// Navigate to the selected menu item's URL
		navigate(url);
		// Close the drawer
		toggleDrawer(false);
	};

	const Sidelog = () => {
		return (
			<div className="flex items-center">
				<img src={HEADER_LOGO} alt="Company Logo" className="w-[87px] h-auto" />
			</div>
		);
	};

	return (
		<>
			{/* Hamburger button to open the drawer */}
			<div onClick={() => toggleDrawer(true)} className="cursor-pointer lg:hidden">
				&#9776;
			</div>

			{/* Drawer component that slides in from the left */}
			{isDrawerOpen && (
				<Drawer
					open={isDrawerOpen}
					openFrom="left"
					onClose={() => toggleDrawer(false)}
					// width={322}
					title={<Sidelog />}
					drawerClass={'w-[322px]'}
					mobileCss={'justify-center '}
				>
					<div className={styles.sidebar_body}>
						<div className={styles.menuContainer}>
							{menuItems.map((item, index) => (
								<MenuItem
									key={index}
									icon={item.icon}
									label={item.label}
									isActive={item.isActive}
									badge={item.badge}
									url={item.url}
									commingSoon={item?.commingSoon}
									handleClick={() => handleMenuClick(item.url)}
								/>
							))}
						</div>
						<ProfileSection />
					</div>
				</Drawer>
			)}
		</>
	);
};

export default MobileSidebar;
