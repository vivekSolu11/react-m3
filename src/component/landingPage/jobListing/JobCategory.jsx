import React from 'react';

import styles from './jobListings.module.css';

const JobCategory = ({ title, jobs }) => {
	return (
		<section className={styles.jobCategory}>
			<h2 className={styles.categoryTitle}>{title}</h2>
			<ul className={styles.jobList}>
				{jobs.map((job, index) => (
					<li key={index} className={styles.jobItem}>
						{job}
					</li>
				))}
			</ul>
		</section>
	);
};

export default JobCategory;
