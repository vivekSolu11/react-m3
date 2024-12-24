import React from 'react';
import OtpInput from 'react-otp-input';

import styles from './otpVerification.module.css';

function OTPInput({ otp, setOtp, error, handleSubmit }) {
	const handleOtpChange = (value) => {
		// Only update the OTP if the value consists of digits
		if (/^\d*$/.test(value)) {
			setOtp(value);
		}
	};

	return (
		<div className={styles.otpInput}>
			<label htmlFor="otp-input" className={styles.otpLabel}>
				Enter OTP here
			</label>
			<div className={styles.otpFields}>
				<OtpInput
					value={otp}
					onChange={handleOtpChange}
					numInputs={4}
					renderSeparator={<span> </span>}
					renderInput={(props) => (
						<input
							type="number"
							inputMode="numeric"
							pattern="[0-9]*"
							{...props}
							className={`${styles.otpField} ${error.length && styles.otp_error}`}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleSubmit();
								}
							}}
						/>
					)}
					containerStyle={{ width: '100%', gap: '8px' }}
				/>
			</div>
			{error.length ? <div className="error-message mt-2"> {error} </div> : null}
		</div>
	);
}

export default OTPInput;
