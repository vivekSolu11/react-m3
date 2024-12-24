import React from 'react';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { ARROW_LEFT, EYE } from 'assets/images';
import CustomInputField from 'component/customComponents/inputField';
import { PrimaryButton, Spinner } from 'component/index';
import { addState, removeState, showAlert, updateAuthToken } from 'store/sagaActions';
import { handleAlert } from 'utils/helperFunctions/helperFunction';
import { signInitialValues } from 'constants/formikInitialValues';
import { useMutationAPI } from 'apis/mutation';

import styles from './welcomeBack.module.css';

function WelcomeBack({ username, mobile, isEmail, setUserAvailable }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { sendVerificationCode, signIn } = useMutationAPI();

	const { loginData } = useSelector((state) => state.auth);

	const { isPending, mutate: handleSignin } = useMutation({
		mutationFn: (data) => signIn(data),
		onSuccess: (data) => {
			if (data) {
				dispatch(updateAuthToken({ token: data.data.data.items.token }));
				handleAlert(dispatch, data?.data?.data?.message, 'success');
				localStorage.removeItem('socialLoginType');
				dispatch(removeState({ name: 'signUpData' }));
				dispatch(removeState({ name: 'loginData' }));
			}
		},
		onError: (err) => {
			handleAlert(dispatch, err.response.data.error.message, 'error');
		},
	});

	const { mutate, isPending: forgetPasswordLoader } = useMutation({
		mutationFn: (val) => sendVerificationCode(val),
		onSuccess: (data) => {
			if (data) {
				dispatch(addState({ name: 'codeId', value: data?.data.data.items._id }));
				dispatch(
					showAlert({
						message: data?.data?.data?.message,
						status: 'success',
					})
				);
				if (location?.pathname?.includes('/chat-with-bot'))
					navigate('/chat-with-bot?forgetPassword=true&login');
				else navigate(`/sign-in?forgetPassword=true`);
			}
		},
		onError: (error) => {
			dispatch(
				showAlert({
					message: error?.response.data.error.message,
					status: 'error',
				})
			);
		},
	});

	const handleSendCode = () => {
		try {
			const payload = {
				purpose: 'FORGOT_PASSWORD',
				via: 'code',
				...(loginData?.email?.length
					? { email: loginData.email }
					: { countryCode: loginData?.countryCode, phone: loginData?.phone }),
			};
			mutate(payload);
		} catch (err) {
			console.error('Failed to send verification code:', err);
		}
	};
	return (
		<main className={styles.container}>
			{forgetPasswordLoader && <Spinner />}
			<section className={styles.frame}>
				<header className={styles.header}>
					<h1 className={`${styles.title} capitalize`}>
						Welcome Back, {loginData?.parsedFullName}
					</h1>
					<p className={styles.subtitle}>
						{loginData?.email ||
							'+' + loginData?.countryCode + '-' + loginData?.phone ||
							'example123@email.com'}
					</p>
				</header>
				<Formik
					initialValues={signInitialValues}
					// validationSchema={signInSchema}
					onSubmit={async (values) => {
						if (isEmail) {
							const data = {
								email: username,
								password: values.password,
							};
							await handleSignin(data);
						} else {
							const data = {
								countryCode: mobile.countryCode,
								phone: mobile.mobileNo,
								password: values.password,
							};

							await handleSignin(data);
						}
					}}
				>
					{({ errors, handleChange }) => (
						<Form className={styles.formContainer}>
							<CustomInputField
								lable="Password"
								type="password"
								name="password"
								error={errors.password ? true : false}
								helperText={errors.password}
								onChange={handleChange}
								icon={EYE}
							/>
							<div className={styles.optionsContainer}>
								<div className={styles.checkboxWrapper}>
									<label htmlFor="rememberMe" className={styles.checkboxLabel}>
										<input
											type="checkbox"
											id="rememberMe"
											// className={styles.visually_hidden}
										/>
										Remember me
									</label>
								</div>
								<div className={styles.forgotPassword} onClick={handleSendCode}>
									Forgot password?
								</div>
							</div>

							<PrimaryButton
								buttonText="Continue"
								loading={isPending}
								disabled={isPending}
								type="submit"
								fullWidth
								btnClassName="mt-6"
								varient="primary"
							/>
						</Form>
					)}
				</Formik>
			</section>
			<div
				className={styles.backButton}
				onClick={() => {
					setUserAvailable(false);
					if (location?.pathname?.includes('/chat-with-bot'))
						navigate('/chat-with-bot?login');
					else navigate('/sign-in');
				}}
			>
				<img loading="lazy" src={ARROW_LEFT} className={styles.backIcon} alt="" />
				Back To Login
			</div>
		</main>
	);
}

export default WelcomeBack;
