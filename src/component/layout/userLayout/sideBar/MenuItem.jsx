import React from 'react';
import { Link } from 'react-router-dom';

import { ACTIVE_TAB } from 'assets/images';

import styles from './sidebarMenu.module.css';

const MenuItem = ({ icon, label, isActive, badge, url, commingSoon, handleClick = () => null }) => {
	return (
		<div className={styles.menuItemWrapper}>
			<Link
				to={commingSoon ? '#' : url}
				className={`${styles.menuItem} ${isActive ? styles.menuItemActive : styles.menuItemInactive} ${
					commingSoon ? styles.disabledLink : ''
				}`}
				onClick={handleClick}
			>
				<div className={`${styles.menuIcon}`}>{icon}</div>

				<div className={styles.menuItemContent}>
					<span className={styles.menuItemLabel}>{label}</span>
					{badge && <span className={styles.menuItemBadge}>{badge}</span>}
					{isActive && <img src={ACTIVE_TAB} alt="active" />}
				</div>
			</Link>
			{commingSoon && (
				<div className={styles.comingSoonTag}>
					<span>Coming Soon</span>
				</div>
			)}
		</div>
	);
};

export default MenuItem;
