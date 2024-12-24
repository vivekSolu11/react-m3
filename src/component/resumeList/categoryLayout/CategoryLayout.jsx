import React from 'react';

import styles from './categoryLayout.module.css';

const CategoryLayout = ({ children, title }) => {
	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<div className={styles.title}>{title}</div>
				<div className={styles.resumeImage}> </div>
			</header>
			<div className={`${styles.optionsContainer} overflow-hide`}>{children}</div>
		</section>
	);
};

export default CategoryLayout;
