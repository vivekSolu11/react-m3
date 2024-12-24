import React from 'react';

import styles from './sectionCompletion.module.css';

const SectionItem = ({ name, status, icon, isButton, handleClick }) => {
	return (
		<div className={styles.sectionItem}>
			<div className={styles.sectionName}>{name}</div>
			{isButton ? (
				<button className={styles.addButton} onClick={handleClick}>
					<span className={styles.statusText}>{status}</span>
					<img src={icon} alt="" className={styles.statusIcon} />
				</button>
			) : (
				<div className={styles.sectionStatus}>
					<span className={styles.statusText}>{status}</span>
					<img src={icon} alt="" className={styles.statusIcon} />
				</div>
			)}
		</div>
	);
};

export default SectionItem;
