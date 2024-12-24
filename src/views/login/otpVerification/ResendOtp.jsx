import React from 'react';
import styles from './otpVerification.module.css';

function ResendOTP({ resendCode, className = '' }) {
	return (
		<p className={`${styles.resendText} ${className}`}>
			Didn&apos;t receive OTP?
			<button className={styles.resendCode} onClick={() => resendCode()}>
				Resend
			</button>
		</p>
	);
}

export default ResendOTP;
