import React from 'react';

import styles from './login.module.css';

const SocialButton = ({ iconSrc, altText, onClick }) => (
	<div className={styles.socialButton} onClick={onClick}>
		<div className={styles.socialIconWrapper}>
			<img src={iconSrc} alt={altText} className={styles.socialIcon} />
			{altText && <div className={styles.socialText}>{altText}</div>}
		</div>
	</div>
);

export default SocialButton;
