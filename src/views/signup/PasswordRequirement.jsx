import React from 'react';

import { INVALID_CHECK } from 'assets/images';

import styles from './UnregisteredEmail.module.css';

const PasswordRequirement = ({ icon, text, regex, value }) => {
	// Convert regex string to a RegExp object if it's a string
	const regExp = typeof regex === 'string' ? new RegExp(regex) : regex;

	// Check if the value passes the regex test
	const isValid = regExp?.test(value);

	return (
		<div className={styles.requirementItem}>
			<img
				src={isValid ? icon : INVALID_CHECK}
				alt="check"
				className={styles.requirementIcon}
			/>
			<div className={`${styles.requirementText} ${!isValid ? styles.invalid : ''}`}>
				{text}
			</div>
		</div>
	);
};

export default PasswordRequirement;
