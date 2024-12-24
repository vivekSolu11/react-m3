import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { useMutation } from '@tanstack/react-query';

import { SignUpLayout } from 'component';
import PasswordRequirement from '../signup/PasswordRequirement';
import CustomInputField from 'component/customComponents/inputField/index';
import { EYE, CHECK } from 'assets/images';
import { PrimaryButton } from 'component';
import resetPasswordSchema from 'validators/resetPasswordValidation';
import { resetPasswordInitialValues } from 'constants/formikInitialValues';
import { useMutationAPI } from 'apis/mutation';
import { removeState, showAlert } from 'store/sagaActions';

import styles from './resetPassword.module.css';

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

const ResetPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { codeId } = useSelector((state) => state.common);
	const { resetPassword } = useMutationAPI();

	const { mutate, isPending } = useMutation({
		mutationFn: (val) => resetPassword(val),
		onSuccess: (data) => {
			if (data) {
				dispatch(
					showAlert({
						message: data?.data?.data?.message,
						status: 'success',
					})
				);
				navigate('/sign-in');
				dispatch(removeState({ name: 'codeId' }));
				dispatch(removeState({ name: 'signUpData' }));
				dispatch(removeState({ name: 'loginData' }));
			}
		},
		onError: (error) => {
			dispatch(
				showAlert({
					message: error?.data?.data?.message,
					status: 'error',
				})
			);
		},
	});

	return (
		<SignUpLayout>
			<section className={styles.formWrapper}>
				<h1 className={styles.formTitle}>Reset Password</h1>

				{/* Formik form handling */}
				<Formik
					initialValues={resetPasswordInitialValues}
					validationSchema={resetPasswordSchema}
					onSubmit={(values) => {
						const payload = {
							_codeVerification: codeId,
							password: values.password,
						};
						mutate(payload);
					}}
				>
					{({ errors, handleChange, values, touched, handleBlur }) => (
						<Form className={styles.formContent} autoComplete="false">
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
							/>

							<CustomInputField
								lable="Confirm Password"
								type="password"
								boxClassName="mt-6"
								helperText={touched.confirmPassword && errors.confirmPassword}
								name="confirmPassword"
								handleChange={handleChange}
								error={
									touched.confirmPassword && errors.confirmPassword ? true : false
								}
								icon={EYE}
								onBlur={handleBlur}
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
									buttonText="Reset Password"
									type="submit"
									fullWidth
									disabled={isPending}
								/>
							</div>
						</Form>
					)}
				</Formik>
			</section>
		</SignUpLayout>
	);
};

export default ResetPassword;
