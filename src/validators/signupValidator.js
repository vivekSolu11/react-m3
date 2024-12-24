import * as Yup from 'yup';

export const signupSchema = (isEmail) =>
	Yup.object().shape({
		email:
			isEmail &&
			Yup.string()
				.matches(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/, 'Invalid email address')
				.required('Email is Required'),
		password: Yup.string()
			.min(8, 'Password must be at least 8 characters')
			.matches(/[0-9]/, 'Password must include a number')
			.matches(/[!@#$%^&*]/, 'Password must include a special character')
			.required('Password is required'),
		phone: !isEmail && Yup.string().required('Phone number is required'),
		countryCode: !isEmail && Yup.string().required('Country code is required'),
	});

export const signInSchema = Yup.object().shape({
	password: Yup.string()
		.min(8, 'Password must be at least 8 characters')
		.matches(/[0-9]/, 'Password must include a number')
		.matches(/[!@#$%^&*]/, 'Password must include a special character')
		.required('Password is required'),
});
