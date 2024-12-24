import React from 'react';

import JobCategory from './JobCategory';
import styles from './jobListings.module.css';

const trendingJobs = [
	'Blockchain Developer',
	'Machine Learning Engineer',
	'Data Scientist',
	'Cybersecurity Engineer',
	'Dentist',
	'Artificial Intelligence (AI) Engineer',
	'Full Stack Developer',
	'DevOps Engineer',
	'Product Manager',
	'Financial Analyst',
	'Executive Chef',
	'Management Consultant',
	'Physician',
	'Nurse Practitioner',
	'Petroleum Engineer',
	'Pharmacist',
	'Lawyer',
	'Pilot',
	'Investment Banker',
	'Cloud Architect',
];

const highPayingJobs = [
	'Artificial Intelligence (AI) Engineer',
	'Machine Learning Engineer',
	'Data Scientist',
	'Blockchain Developer',
	'Cybersecurity Engineer',
	'Cloud Architect',
	'DevOps Engineer',
	'Full Stack Developer',
	'Investment Banker',
	'Financial Analyst',
	'Management Consultant',
	'Product Manager',
	'Physician',
	'Dentist',
	'Nurse Practitioner',
	'Pharmacist',
	'Petroleum Engineer',
	'Lawyer',
	'Pilot',
	'Executive Chef',
];

const bestLocations = [
	'Data Scientist',
	'Dentist',
	'Financial Analyst',
	'Physician',
	'Nurse Practitioner',
	'Petroleum Engineer',
	'Pharmacist',
	'Lawyer',
	'Pilot',
	'Investment Banker',
	'Cloud Architect',
];

const JobListings = () => {
	return (
		<div className="bg-[#f5f5f5] w-full">
			<main className={styles.frame}>
				<div className={styles.jobSection}>
					<JobCategory title="Trending Jobs" jobs={trendingJobs} />
				</div>
				<div className={styles.jobSection}>
					<JobCategory title="High Paying Jobs in 2024" jobs={highPayingJobs} />
				</div>
				<div className={styles.jobSection}>
					<JobCategory title="Best Locations for Job" jobs={bestLocations} />
				</div>
			</main>
		</div>
	);
};

export default JobListings;
