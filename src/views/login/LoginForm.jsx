import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { LINKEDIN_LOGIN, GOOGLE } from 'assets/images';
import SocialButton from './SocialButton';
import { useMutationAPI } from 'apis/mutation';
import WelcomeBack from './welcomeBack/WelcomeBack';
import OTPVerification from './otpVerification/OtpVerification';
import { PrimaryButton } from 'component';
import CustomInputField from 'component/customComponents/inputField';
import { addState, setIsLoginData, updateAuthToken } from 'store/sagaActions';
import { handleAlert } from 'utils/helperFunctions/helperFunction';

import styles from './login.module.css';
import { InputLabel } from '@mui/material';

const socialButtons = [
	{
		iconSrc: GOOGLE,
		type: 'google',
		altText: 'Continue with Google',
		url: 'get-google-code',
	},
	{
		type: 'linkedin',
		iconSrc: LINKEDIN_LOGIN,
		altText: 'Continue with linkedIn',
		url: 'get-linkind-code',
	},
];

const LoginForm = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const { socialLogin, verifyGoogleLogin, verifyLinkedinLogin, fetchUserDetailsForLogin } =
		useMutationAPI();

	const { codeId, userEmail } = useSelector((state) => state.common);

	const [userAvailable, setUserAvailable] = useState(false);
	const [username, setUsername] = useState('');
	const [touchded, setTouchded] = useState(false);
	const [isEmailField, setIsEmailField] = useState(true);
	const [phone, setPhone] = useState({
		countryCode: '',
		mobileNo: '',
	});

	// Helper function to extract query params from URL
	const getQueryParam = (param) => {
		return new URLSearchParams(location.search).get(param);
	};

	const { isPending, mutate: handleSocialLogin } = useMutation({
		mutationFn: (data) => socialLogin(data),
		onSuccess: (data) => {
			if (localStorage.getItem('socialLoginType') === 'google') {
				window.location.replace(data?.data?.data?.items?.googleAuthURL);
			} else {
				window.location.replace(data?.data?.data?.items?.linkedInAuthURL);
			}
		},
		onError: (err) => {
			handleAlert(dispatch, err?.data?.data?.message, 'error');
		},
	});

	const { isPending: isGoogleVerifyLogin, mutate: verifyGoogleLoginmutation } = useMutation({
		mutationFn: (data) => verifyGoogleLogin(data),
		onSuccess: (data) => {
			dispatch(updateAuthToken({ token: data.data.data.items.token }));
			localStorage.removeItem('socialLoginType');
		},
		onError: (err) => {
			handleAlert(dispatch, err.response.data.error.message, 'error');
		},
	});

	const { isPending: isLinkedinVerifyLogin, mutate: verifyLinkedinLoginmutation } = useMutation({
		mutationFn: (data) => verifyLinkedinLogin(data),
		onSuccess: (data) => {
			dispatch(updateAuthToken({ token: data.data.data.items.token }));

			localStorage.removeItem('socialLoginType');
		},
		onError: (err) => {
			handleAlert(dispatch, err.response.data.error.message, 'error');
		},
	});

	const { isPending: getUserDetailsLoading, mutate: getUserDetails } = useMutation({
		mutationFn: (data) => fetchUserDetailsForLogin(data),
		onSuccess: (data) => {
			dispatch(setIsLoginData(data.data.data.items));
			setUserAvailable(true);
			// navigate(`/sign-in`);
		},
		onError: (err) => {
			handleAlert(dispatch, err.response.data.error.message, 'error');
		},
	});

	const handleClick = (data) => {
		handleSocialLogin(data);
	};

	useEffect(() => {
		// Get the 'code' parameter from URL
		const code = getQueryParam('code');
		const redirect_uri = import.meta.env.VITE_SOCIAL_LOGIN_REDIRECT_URL;

		if (code) {
			// Call the API
			if (localStorage.getItem('socialLoginType') === 'google') {
				verifyGoogleLoginmutation({
					code: code,
					redirect_uri: redirect_uri,
				});
			} else if (localStorage.getItem('socialLoginType') === 'linkedin') {
				verifyLinkedinLoginmutation({
					code: code,
					redirect_uri: redirect_uri,
				});
			} else {
				return;
			}
		}
	}, [location]);

	const handleMobileChange = (value, countryCode) => {
		const mobileNo = value?.slice(countryCode.toString().length);

		setPhone({
			...phone,
			countryCode: countryCode,
			mobileNo: mobileNo,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isEmailField) {
			if (!username) {
				setTouchded(true);
			} else if (username) {
				const url = `email=${username}`;
				getUserDetails(url);
				dispatch(
					addState({
						name: 'signUpData',
						value: { email: username },
					})
				);
			}
		} else {
			const url = `countryCode=${phone?.countryCode}&phone=${phone?.mobileNo}`;
			getUserDetails(url);
			dispatch(
				addState({
					name: 'signUpData',
					value: { phone: phone?.mobileNo, countryCode: phone?.countryCode },
				})
			);
		}
	};

	useEffect(() => {
		if (userEmail) {
			setUsername(userEmail);
		}
	}, [userEmail]);

	return (
		<>
			{!userAvailable ? (
				<main className={styles.container}>
					<header className={styles.header}>
						<h1 className={styles.title}>Welcome to Joblo.ai</h1>
						<p className={styles.subtitle}>
							Transform your Job Search with the power of AI
						</p>
					</header>
					<section className={styles.content}>
						<div className={styles.socialButtons}>
							{socialButtons.map((button, index) => (
								<SocialButton
									key={index}
									onClick={() => {
										localStorage.setItem('socialLoginType', button.type);
										handleClick(button.url);
									}}
									iconSrc={button.iconSrc}
									altText={button.altText}
								/>
							))}
						</div>
						<div className={styles.divider}>
							<div className={styles.dividerLine} />
							<span className={styles.dividerText}>OR</span>
							<div className={styles.dividerLine} />
						</div>
						<form className={styles.inputGroup}>
							{!isEmailField ? (
								<div>
									<InputLabel
										sx={{
											textTransform: 'capitalize',
											fontSize: '14px',
											fontWeight: 500,
											marginTop: { xs: '0rem', sm: '1.5rem' },
											marginBottom: '0.5rem',
										}}
									>
										Mobile No
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
										// onBlur={() =>
										//   setTouched({
										//     ...touched,
										//     phone: true,
										//   })
										// }
										value={phone.countryCode + phone.mobileNo}
									/>
								</div>
							) : (
								<CustomInputField
									lable="Email"
									type="text"
									onChange={(e) => {
										setTouchded(false);
										setUsername(e.target.value);
									}}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											handleSubmit();
										}
									}}
									name="email"
									value={username}
									helperText={touchded && 'Please enter email '}
									error={touchded}
								/>
							)}
							<PrimaryButton
								varient="primary"
								buttonText="Log in"
								type="submit"
								btnClassName="!text-xl h-14"
								disabled={isPending || isGoogleVerifyLogin || isLinkedinVerifyLogin}
								loading={
									isPending ||
									isGoogleVerifyLogin ||
									isLinkedinVerifyLogin ||
									getUserDetailsLoading
								}
								fullWidth
								handleClick={handleSubmit}
							/>
						</form>
						<div className={styles.divider}>
							<div className={styles.dividerLine} />
							<span className={styles.dividerText}>OR</span>
							<div className={styles.dividerLine} />
						</div>
						<PrimaryButton
							buttonText={isEmailField ? 'Log In using mobile' : 'Log In using email'}
							fullWidth
							disabled={isPending}
							btnClassName="mt-5 h-14 !text-xl"
							handleClick={() => {
								setUsername('');
								setTouchded(false);
								setPhone({ countryCode: '', mobileNo: '' });
								setIsEmailField(!isEmailField);
							}}
						/>
						<div className={`${styles.footerTitle} text-center mt-12`}>
							Don&apos;t have an account ?
							<Link
								to={
									location?.pathname?.includes('/sign-in')
										? '/sign-up'
										: '/chat-with-bot?sign-up'
								}
								className="no-underline"
							>
								&nbsp;
								<span className="no-underline   md:underline">SignUp</span>
							</Link>
						</div>
					</section>
				</main>
			) : (
				<>
					{getQueryParam('forgetPassword') ? (
						<OTPVerification
							code={codeId}
							btnText="Verify OTP"
							resetPassword
							setUserAvailable={setUserAvailable}
						/>
					) : (
						<WelcomeBack
							username={username}
							setUserAvailable={setUserAvailable}
							isEmail={isEmailField}
							mobile={phone}
						/>
					)}
				</>
			)}
		</>
	);
};

export default LoginForm;
