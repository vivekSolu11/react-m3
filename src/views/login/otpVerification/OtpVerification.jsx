import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import OTPInput from './OtpInput';
import ResendOTP from './ResendOtp';
import { EDIT } from 'assets/images';
import { PrimaryButton, Spinner } from 'component/index';
import { useMutationAPI } from 'apis/mutation';
import { removeState } from 'store/sagaActions';
import { handleAlert } from 'utils/helperFunctions/helperFunction';

import styles from './otpVerification.module.css';

function OTPVerification({
	signUp,
	code,
	btnText = 'Sign Up',
	resetPassword = false,
	setUserAvailable,
}) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { resendVerificationCode, verifyCode } = useMutationAPI();

	const [otp, setOtp] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const { signUpData } = useSelector((state) => state.common);

	const { mutate, isPending } = useMutation({
		mutationFn: (val) => resendVerificationCode(val),
		onSuccess: (data) => {
			if (data) handleAlert(dispatch, data?.data?.data?.message, 'success');
		},
		onError: (error) => {
			handleAlert(dispatch, error?.data?.data?.message, 'error');
		},
	});

	const handleResendSendCode = () => {
		try {
			mutate(code);
		} catch (err) {
			console.error('Failed to send verification code:', err);
		}
	};

	const { mutate: verifyCodeMutation, isPending: verifyCodePending } = useMutation({
		mutationFn: (val) => verifyCode(val),
		onSuccess: (data) => {
			if (data) {
				handleAlert(dispatch, data?.data?.data?.message, 'success');
				if (resetPassword) navigate('/reset-password');
				else signUp();
			}
		},

		onError: (error) => {
			handleAlert(dispatch, error?.response?.data?.error?.message, 'error');
		},
	});

	const handleVerifyCode = () => {
		if (otp.length < 4) {
			return setErrorMessage('Please enter the 4 digit OTP');
		}
		setErrorMessage('');
		const payload = {
			_codeVerification: code,
			code: otp,
		};
		try {
			verifyCodeMutation(payload);
		} catch (err) {
			console.error('Failed to send verification code:', err);
		}
	};

	const handleEdit = () => {
		if (resetPassword) {
			if (location?.pathname?.includes('/chat-with-bot'))
				navigate('/chat-with-bot?forgetPassword=true&login');
			else navigate('/sign-in');
			setUserAvailable(false);
		}
		dispatch(removeState({ name: 'codeId' }));
	};

	return (
		<main className={styles.frame}>
			{(isPending || verifyCodePending) && <Spinner />}
			<header className={styles.header}>
				<h1 className={styles.title}>Enter the OTP Code</h1>
				<section className={styles.infoBox}>
					<p className={styles.infoText}>
						An OTP has been sent to your registered{' '}
						{signUpData?.email ? 'Email' : ' Phone Number'}
					</p>
					<div className={styles.phoneNumber}>
						<span className={styles.phoneNumberText}>
							{signUpData?.email
								? signUpData?.email
								: `+${signUpData?.countryCode}  ${signUpData?.phone}`}
						</span>
						<img
							loading="lazy"
							src={EDIT}
							className={styles.phoneIcon}
							alt=""
							onClick={handleEdit}
						/>
					</div>
				</section>
			</header>
			<section className={styles.otpSection}>
				<OTPInput
					otp={otp}
					setOtp={setOtp}
					error={errorMessage}
					handleSubmit={handleVerifyCode}
				/>
				<ResendOTP resendCode={handleResendSendCode} />
			</section>
			<section className={styles.actionSection}>
				<PrimaryButton buttonText={btnText} fullWidth handleClick={handleVerifyCode} />
				{!resetPassword && (
					<p className={styles.termsText}>
						By signing up you agree to our{' '}
						<strong className="underline md:no-underline">terms</strong> and{' '}
						<strong className="underline md:no-underline">policies</strong>
					</p>
				)}
			</section>
		</main>
	);
}

export default OTPVerification;
