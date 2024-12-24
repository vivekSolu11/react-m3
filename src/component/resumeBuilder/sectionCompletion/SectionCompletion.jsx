import React from 'react';
import SectionItem from './SectionItem';
import styles from './sectionCompletion.module.css';
import { PLUS_CIRCLE, RIGHT_CIRCLE } from 'assets/images';

const doneImage = RIGHT_CIRCLE;
const addImage = PLUS_CIRCLE;

const SectionCompletion = ({
	isPersonalInfoComplete,
	isSummaryComplete,
	isSkillsComplete,
	isWorkExperienceComplete,
	isEducationComplete,
	sectionCompleted,
}) => {
	const sectionData = [
		{
			name: 'Personal Info',
			status: isPersonalInfoComplete ? 'Done' : 'Add',
			icon: isPersonalInfoComplete ? doneImage : addImage,
			isButton: !isPersonalInfoComplete,
			onClick: () =>
				document
					.getElementsByClassName('profile-section')[0]
					.scrollIntoView({ behavior: 'smooth', block: 'start' }),
		},
		{
			name: 'Summary',
			status: isSummaryComplete ? 'Done' : 'Add',
			icon: isSummaryComplete ? doneImage : addImage,
			isButton: !isSummaryComplete,
			onClick: () =>
				document
					.getElementsByClassName('summary-section')[0]
					.scrollIntoView({ behavior: 'smooth', block: 'start' }),
		},
		{
			name: 'Work Experience',
			status: isWorkExperienceComplete()?.label,
			icon: isWorkExperienceComplete()?.label === 'Done' ? doneImage : addImage,
			isButton: !(isWorkExperienceComplete()?.label === 'Done'),
			onClick: () =>
				document
					.getElementsByClassName('workExp-section')[0]
					.scrollIntoView({ behavior: 'smooth', block: 'start' }),
		},

		{
			name: 'Education',
			status: isEducationComplete()?.label,
			icon: isEducationComplete()?.label === 'Done' ? doneImage : addImage,
			isButton: !(isEducationComplete()?.label === 'Done'),
			onClick: () =>
				document
					.getElementsByClassName('education-section')[0]
					.scrollIntoView({ behavior: 'smooth', block: 'start' }),
		},
		{
			name: 'Skills',
			status: isSkillsComplete ? 'Done' : 'Add',
			icon: isSkillsComplete ? doneImage : addImage,
			isButton: !isSkillsComplete,
			onClick: () =>
				document
					.getElementsByClassName('skills-section')[0]
					.scrollIntoView({ behavior: 'smooth', block: 'start' }),
		},
	];

	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<h2 className={styles.title}>Section Completion</h2>
				<div className={styles.percentage}>{sectionCompleted}%</div>
			</header>
			<div className={styles.sectionList}>
				{sectionData.map((section, index) => (
					<SectionItem
						key={index}
						name={section.name}
						status={section.status}
						icon={section.icon}
						isButton={section.isButton}
						handleClick={section.onClick}
					/>
				))}
			</div>
		</section>
	);
};

export default SectionCompletion;
