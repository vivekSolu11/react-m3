import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { InputLabel } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import PhoneInput from 'react-phone-input-2';

import PasswordRequirement from './PasswordRequirement';
import CustomInputField from 'component/customComponents/inputField/index';
import { ARROW_LEFT, CHECK, EYE } from 'assets/images';
import { PrimaryButton } from 'component/index';
import { signupSchema } from 'validators/signupValidator';
import { signUpInitialValues } from 'constants/formikInitialValues';
import { addState } from 'store/sagaActions';
import { useMutationAPI } from 'apis/mutation';

import styles from './UnregisteredEmail.module.css';
import 'react-phone-input-2/lib/style.css';

const SignupSection = ({ sendCode }) => {
	const dispatch = useDispatch();
	const { signUpData } = useSelector((state) => state.common);
	const { checkAvailability } = useMutationAPI();

	const [isAvailable, setIsAvailable] = useState(true);
	const [isEmail, setIsEmail] = useState(true);

	const navigate = useNavigate();
	let debounceTimer;

	const passwordRequirements = [
		{
			icon: CHECK,
			text: 'Minimum 8 characters',
			regex: '^.{8,}$', // Regex as string
		},
		{
			icon: CHECK,
			text: 'Include number',
			regex: '^(?=.*\\d)', // Regex as string with escaped digit
		},
		{
			icon: CHECK,
			text: 'Include a special character',
			regex: '^(?=.*[!@#$%^&*(),.?":{}|<>])', // Regex as string
		},
	];

	const { mutate, isPending } = useMutation({
		mutationFn: (val) => checkAvailability(val),
		onSuccess: (data) => {
			setIsAvailable(data?.data?.data.items.available);
		},
	});

	const handleEmailChange = (e, setFieldValue) => {
		const email = e.target.value;
		setFieldValue('email', email);

		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
		if (emailRegex.test(email)) {
			try {
				mutate(`email=${email}`); // Send verification code when email is valid
			} catch (err) {
				console.error('Failed to send verification code:', err);
			}
		}
	};

	const handleMobileChange = (value, countryCode, setFieldValue) => {
		const mobileNo = value?.slice(countryCode.toString().length);

		setFieldValue('phone', mobileNo);
		setFieldValue('countryCode', countryCode);
		clearTimeout(debounceTimer);

		// Set a new timeout
		debounceTimer = setTimeout(() => {
			if (mobileNo.length > 8) {
				mutate(`countryCode=${countryCode}&phone=${mobileNo}`);
			}
		}, 2000);
	};

	const handleLogin = (email) => {
		dispatch(addState({ name: 'userEmail', value: email }));
		navigate('/sign-in');
	};

	const handleSwitch = (setFieldValue) => {
		if (isEmail) {
			setFieldValue('email', '');
		} else {
			setFieldValue('phone', '');
			setFieldValue('countryCode', '');
		}
		setIsEmail(!isEmail);
	};

	useEffect(() => {
		if (signUpData) {
			const checkUser = signUpData.email?.length;
			setIsEmail(checkUser);
		}
	}, [signUpData]);

	return (
		<section className={styles.formWrapper}>
			<h1 className={styles.formTitle}>Create an Account</h1>
			<p className={styles.subtitle}>Transform your Job Search with the power of AI</p>
			{/* Formik form handling */}
			<Formik
				initialValues={signUpData || signUpInitialValues}
				validationSchema={signupSchema(isEmail)}
				onSubmit={(values) => {
					// Handle form submission here
					dispatch(addState({ name: 'signUpData', value: values }));
					sendCode(values, isEmail);
				}}
			>
				{({
					errors,
					handleChange,
					setFieldValue,
					values,
					touched,
					handleBlur,
					setTouched,
				}) => (
					<Form className={styles.formContent} autoComplete="false">
						{/* Email Field */}
						{!isEmail ? (
							<>
								<InputLabel
									sx={{
										textTransform: 'capitalize',
										fontSize: '16px',
										fontWeight: 500,
										marginTop: '1.5rem',
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
										handleMobileChange(value, country?.dialCode, setFieldValue);
									}}
									autoFormat={true}
									countryCodeEditable={false}
									disableSearchIcon
									onBlur={() =>
										setTouched({
											...touched,
											phone: true,
										})
									}
									value={values.countryCode + values.phone}
								/>
								{!isAvailable ? (
									<div className="error-message">Mobile no already exist</div>
								) : (
									touched.phone && (
										<div className="error-message">{errors?.phone}</div>
									)
								)}
							</>
						) : (
							<CustomInputField
								type="text"
								lable="Email"
								boxClassName="mt-6"
								helperText={
									touched.email &&
									(!isAvailable ? (
										<span>
											Email already exist. Try{' '}
											<span
												className="underline cursor-pointer"
												onClick={() => handleLogin(values.email)}
											>
												login.
											</span>
										</span>
									) : (
										errors.email
									))
								}
								name="email"
								handleChange={(e) => handleEmailChange(e, setFieldValue)}
								error={touched.email && (!!errors.email || !isAvailable)}
								onBlur={handleBlur}
								value={values.email}
							/>
						)}

						{/* Password Field */}

						<CustomInputField
							lable="Password"
							type="password"
							boxClassName="mt-6"
							helperText={touched.password && errors.password}
							name="password"
							handleChange={handleChange}
							error={touched.password && errors.password ? true : false}
							icon={EYE}
							onBlur={handleBlur}
							value={values.password}
						/>

						{/* Password Requirements */}
						<div className={styles.passwordRequirements}>
							{passwordRequirements.map((req, index) => (
								<PasswordRequirement
									key={index}
									icon={req.icon}
									text={req.text}
									regex={req.regex}
									value={values.password}
								/>
							))}
						</div>

						{/* Submit Button */}
						<div className={styles.submitSection}>
							<PrimaryButton
								buttonText="Sign Up"
								type="submit"
								fullWidth
								disabled={isPending || !isAvailable}
								btnClassName="!text-[20px] h-14"
							/>

							<p className={styles.termsText}>
								By signing up you agree to our{' '}
								<Link
									to={'/terms-and-condition'}
									className="text-[#121212A8]/65 font-[500]"
								>
									Terms
								</Link>{' '}
								and{' '}
								<Link to={'/policy'} className="text-[#121212A8]/65 font-[500]">
									Policies
								</Link>
							</p>
						</div>
						<div className={styles.divider}>
							<div className={styles.dividerLine} />
							<span className={styles.dividerText}>OR</span>
							<div className={styles.dividerLine} />
						</div>
						<PrimaryButton
							buttonText={isEmail ? 'Sign up using mobile' : 'Sign up using email'}
							type="button"
							fullWidth
							disabled={isPending || !isAvailable}
							btnClassName="mt-5 !text-[20px] h-14"
							handleClick={() => handleSwitch(setFieldValue)}
						/>
					</Form>
				)}
			</Formik>
			<Link
				className={styles.backToLogin}
				to={
					location.pathname.includes('/chat-with-bot')
						? '/chat-with-bot?login'
						: '/sign-in'
				}
			>
				<img src={ARROW_LEFT} alt="back" className={styles.backIcon} />
				<span className={styles.backText}>Back To Login</span>
			</Link>
		</section>
	);
};

export default SignupSection;
