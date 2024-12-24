import React from 'react';
import styles from './resumeBuilderHeader.module.css';

const Step = ({ number, text, isActive }) => {
	return (
		<div className={styles.stepWrapper}>
			<div
				className={`${styles.stepNumber} ${isActive ? styles.stepNumberActive : styles.stepNumberInactive}`}
			>
				{number}
			</div>
			<div
				className={`${styles.stepText} ${isActive ? styles.stepTextActive : styles.stepTextInactive}`}
			>
				{text}
			</div>
		</div>
	);
};

export default Step;
