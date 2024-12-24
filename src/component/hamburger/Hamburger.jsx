import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addState } from 'store/sagaActions';

import MobileSidebar from 'component/layout/userLayout/mobilesidebar/MobileSideBar';
import { HAM_ARROW, HELP } from 'assets/images';
import SubMenu from './SubMenu';
import { useQueryAPI } from 'apis/query';
import { useQuery } from '@tanstack/react-query';

import styles from './hamburger.module.css';

function Hamburger() {
	const location = useLocation();

	const dispatch = useDispatch();
	const { jobListType } = useSelector((state) => state.common);
	const currentPath = location.pathname;

	const { fetchJobCounts } = useQueryAPI();

	const { data } = useQuery({
		queryKey: ['jobCounts'],
		queryFn: fetchJobCounts,
		staleTime: 60000,
	});

	// Define menu items with paths and submenus
	const menuItem = [
		{
			path: '/jobs',
			menuLabel: 'Jobs ',
			subMenuItems: [
				{
					url: location.pathname === '/jobs' ? undefined : '/jobs',
					text: 'Recommended',
					active: jobListType === 'recommended',
					onclick: () => {
						dispatch(addState({ name: 'jobListType', value: 'recommended' }));
					},
				},
				{
					onclick: () => {
						dispatch(addState({ name: 'jobListType', value: 'saved' }));
					},
					url: location.pathname === '/jobs' ? undefined : '/jobs',
					text: 'Saved',
					count: data?.savedJobs,
					active: jobListType === 'saved',
				},
				{
					url: location.pathname === '/jobs' ? undefined : '/jobs',
					onclick: () => {
						dispatch(addState({ name: 'jobListType', value: 'applied' }));
					},
					text: 'Applied',
					count: data?.appliedJobs,
					active: jobListType === 'applied',
				},
			],
		},
		{
			path: '/resume',
			menuLabel: 'Resume',
			subMenuItems: [
				{
					text: 'Resume Builder',
					url: '/resume',
					active: currentPath === '/resume' || currentPath === '/resume/create',
				},
				{
					text: 'Resume Analyzer',
					active:
						currentPath.includes('/resume/analyzer') ||
						currentPath.includes('/resume/report'),
					url: '/resume/analyzer',
				},
			],
		},
		{
			path: '/discover',
			menuLabel: 'Discover',
		},
		{
			path: '/profile',
			menuLabel: 'Profile',
			subMenuItems: [
				{
					text: 'Details',
					url: '/profile/details',
					active:
						currentPath.includes('/profile/details') ||
						currentPath.includes('/profile/edit'),
				},
				{
					text: 'Preference',
					active: currentPath.includes('/profile/preference'),
					url: '/profile/preference',
				},
				{
					text: 'Settings',
					active: currentPath.includes('/profile/settings'),
					url: '/profile/settings',
				},
			],
		},
		{
			path: '/connect',
			menuLabel: 'Connect',
		},
		{
			path: '/careeradvisor',
			menuLabel: 'Career Advisor',
		},
		{
			path: '/interview',
			menuLabel: 'Interview Questions',
		},
	];

	// Find the menu item that matches the current path
	const currentMenu = menuItem.find((menu) => location.pathname.includes(menu.path)) || null;

	return (
		<header className={styles.headerTab}>
			<div className={styles.menuTitle}>
				<MobileSidebar />
				<div className={styles.menuText}>{currentMenu?.menuLabel || 'Menu'}</div>
				<img loading="lazy" src={HELP} className={styles.menuIcon} alt="help" />
			</div>
			{(currentPath.includes('/resume') || currentPath.includes('/jobs')) && (
				<img
					loading="lazy"
					src={HAM_ARROW}
					className={styles.notificationIcon}
					alt="back arrow"
				/>
			)}
			{currentMenu?.subMenuItems && (
				<nav className={styles.subMenuContainer}>
					{currentMenu.subMenuItems
						? currentMenu.subMenuItems.map((item, index) => (
								<SubMenu key={index} {...item} />
							))
						: null}
				</nav>
			)}
		</header>
	);
}

export default memo(Hamburger);
