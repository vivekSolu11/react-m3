import * as Yup from 'yup';

const loginValidation = Yup.object({
	email: Yup.string().email('InvalidEmail').required('EmailRequired'),
	password: Yup.string().required('PasswordRequried'),
});

export default loginValidation;
