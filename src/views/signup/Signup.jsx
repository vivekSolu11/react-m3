import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import { useMutationAPI } from 'apis/mutation';
import { Spinner } from 'component';
import SignupSection from './SignupSection';
import OTPVerification from 'views/login/otpVerification/OtpVerification';
import { addState, showAlert, updateAuthToken } from 'store/sagaActions';
import { handleAlert } from 'utils/helperFunctions/helperFunction';

const SignUp = () => {
	const dispatch = useDispatch();
	const { signUpData, codeId } = useSelector((state) => state.common);
	const { sendVerificationCode, signUp } = useMutationAPI();

	const { mutate, isPending } = useMutation({
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

	const handleSendCode = (value, isEmail) => {
		try {
			const payload = {
				purpose: 'PRE_SIGNUP',
				via: 'code',
				...(isEmail
					? { email: value.email }
					: { countryCode: value?.countryCode, phone: value?.phone }),
			};

			mutate(payload);
		} catch (err) {
			console.error('Failed to send verification code:', err);
		}
	};

	const { mutate: signUpMutation, isPending: signUpPending } = useMutation({
		mutationFn: (val) => signUp(val),
		onSuccess: (data) => {
			if (data) {
				handleAlert(dispatch, data?.data?.data?.message, 'success');
				dispatch(updateAuthToken({ token: data?.data?.data?.items?.token }));
			}
		},
		onError: (error) => {
			handleAlert(dispatch, error?.data?.data?.message, 'error');
		},
	});

	const handleSignup = () => {
		const payload = {
			_codeVerification: codeId,
			password: signUpData?.password,
			// firstName: signUpData?.firstName,
			// lastName: signUpData?.lastName,
			// location: {
			//   area: signUpData?.area,
			//   city: signUpData?.city,
			//   state: signUpData?.state,
			//   country: signUpData?.country,
			// },
			// _designation: signUpData?.designation,
			...(signUpData.email.length
				? { email: signUpData.email }
				: { countryCode: signUpData?.countryCode, phone: signUpData?.phone }),
		};
		signUpMutation(payload);
	};
	return (
		<>
			{/* <SignUpLayout> */}
			{(isPending || signUpPending) && <Spinner />}
			{codeId ? (
				<OTPVerification signUp={handleSignup} code={codeId} />
			) : (
				<SignupSection sendCode={handleSendCode} />
			)}
			{/* </SignUpLayout> */}
		</>
	);
};

export default SignUp;
