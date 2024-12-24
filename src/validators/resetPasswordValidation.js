import * as Yup from 'yup';

const resetPasswordSchema = Yup.object().shape({
	password: Yup.string()
		.min(8, 'Password must be at least 8 characters')
		.matches(/[0-9]/, 'Password must include a number')
		.matches(/[!@#$%^&*]/, 'Password must include a special character')
		.required('Password is required'),

	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match')
		.required('Confirm password is required'),
});

export default resetPasswordSchema;
