import React, { useState } from 'react';
import { BACK_ARROW_LARGE, CLOSE_ICON_LIGHT } from 'assets/images';
import 'react-phone-input-2/lib/style.css';
import { InputLabel } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import OTPInput from 'views/login/otpVerification/OtpInput';
import ResendOTP from 'views/login/otpVerification/ResendOtp';
import { useDispatch } from 'react-redux';
import { hideCustomModal } from 'store/sagaActions';
import { useMutationAPI } from 'apis/mutation';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const TwoFaBody = () => {
	const dispatch = useDispatch();
	const { tempCustomModalData } = useSelector((state) => state.modal);
	const { sendVerificationCode, verifyCode } = useMutationAPI();
	const { userDetails } = useSelector((state) => state.common);

	const [otp, setOtp] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isFormSubmitted, setIsFormSubmitted] = useState(false); // to track if the form is submitted
	const [emptyError, setEmptyError] = useState('');
	const [phone, setPhone] = useState({
		countryCode: '',
		mobileNo: '',
	});

	const { mutate } = useMutation({
		mutationFn: (val) => sendVerificationCode(val),
		onSuccess: (data) => {
			if (data) {
				setEmptyError('');
				setIsFormSubmitted(true);
			}
		},
	});

	const { mutate: verify2FACode } = useMutation({
		mutationFn: (val) => verifyCode(val),
		onSuccess: (data) => {
			if (data) {
				tempCustomModalData?.success('twoFactor', true);
				dispatch(hideCustomModal());
			}
		},
	});

	const handleMobileChange = (value, countryCode) => {
		const mobileNo = value?.slice(countryCode.toString().length);
		setPhone({
			...phone,
			countryCode: countryCode,
			mobileNo: mobileNo,
		});
	};

	const handleContinueClick = () => {
		const payload = {
			purpose: 'UPDATE_2FA_SETTING_TO_PHONE',
			via: 'code',
			countryCode: phone?.countryCode,
			phone: phone?.mobileNo,
			_user: userDetails?._user,
		};
		mutate(payload);
	};

	const handleVerifyCode = () => {
		if (otp.length < 4) {
			console.log('yes2');
			return setErrorMessage('Please enter the 4 digit OTP');
		}
		const payload = {
			_codeVerification: '673dd4228b1892b73a6faaad',
			code: otp,
		};
		verify2FACode(payload);
	};
	const handleClose = () => {
		dispatch(hideCustomModal());
	};

	return (
		<div className="px-6 py-8 flex tracking-tight flex-col gap-[36px]">
			<div className="flex flex-col gap-4">
				<div className="flex">
					<div className="flex flex-col gap-4">
						{isFormSubmitted ? (
							<img
								alt="back button"
								className="hidden md:flex"
								height={32}
								width={32}
								src={BACK_ARROW_LARGE}
								onClick={() => setIsFormSubmitted(false)}
							/>
						) : (
							''
						)}
						<div className="text-[#000] font-[600] leading-9 text-[24px]">
							Be more secure with{' '}
							<span className="whitespace-nowrap">Two-factor verification</span>
						</div>
					</div>
					<div className="hidden md:flex cursor-pointer">
						<img
							alt="close icon"
							height={24}
							width={24}
							src={CLOSE_ICON_LIGHT}
							onClick={handleClose}
						/>
					</div>
				</div>
				<div className="text-[#666666] text-[14px]">
					Protect your accounts from unauthorized access with two-factor verification—just
					one more step for significantly enhanced security.
				</div>
			</div>

			{!isFormSubmitted ? (
				// Render the form if it's not submitted
				<div className="flex flex-col gap-6">
					<form className="w-full">
						<InputLabel
							sx={{
								textTransform: 'capitalize',
								fontSize: '12px',
								fontWeight: 500,
								marginTop: '1.5rem',
								marginBottom: '0.5rem',
							}}
						>
							Phone No
						</InputLabel>
						<PhoneInput
							className="w-100 phone_input"
							country="in"
							name="phone"
							enableSearch
							onChange={(value, country) => {
								handleMobileChange(value, country?.dialCode);
							}}
							autoFormat={true}
							countryCodeEditable={false}
							disableSearchIcon
							value={phone.countryCode + phone.mobileNo}
						/>
						{emptyError && (
							<div className="text-[#CD2735] text-[12px] ">{emptyError}</div>
						)}
					</form>

					<PrimaryButton
						size="full"
						buttonText="Continue"
						varient="primary"
						btnClassName="!w-full"
						onClick={handleContinueClick} // handle form submission
					/>
				</div>
			) : (
				<div className="mx-auto max-w-[393px] w-full">
					<OTPInput
						otp={otp}
						setOtp={setOtp}
						error={errorMessage}
						handleSubmit={handleVerifyCode}
					/>
					<ResendOTP className="text-[16px]" />
					<PrimaryButton
						size="full"
						buttonText="Continue"
						varient="primary"
						btnClassName="!w-full"
						handleClick={handleVerifyCode}
						// handle form submission
					/>
				</div>
			)}
		</div>
	);
};

export default TwoFaBody;
