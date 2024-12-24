import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { showAlert, showCustomModal } from 'store/reducer/modal/modalSlice';
import { hideCustomModal } from 'store/sagaActions';
import { CAREER_MODAL } from 'constants/modalTypeConstant';
import { THANK_YOU_MODAL } from 'constants/modalTypeConstant';
import CustomInputField from 'component/customComponents/inputField';
import { Spinner } from 'component/index';
import { useQueryAPI } from 'apis/query';
import { useMutationAPI } from 'apis/mutation';

import './careerModal.css';

// Validation schema using Yup
const validationSchema = Yup.object({
	firstName: Yup.string()
		.trim()
		.matches(/^[a-zA-Z]+$/, 'First Name can only contain alphabets')
		.required('First Name is required'),
	lastName: Yup.string()
		.trim()
		.matches(/^[a-zA-Z]+$/, 'Last Name can only contain alphabets')
		.required('Last Name is required'),
	email: Yup.string().trim().email('Enter a valid email address').required('Email is required'),
	phoneNumber: Yup.string()
		.matches(/^\d+$/, 'Phone Number can only contain numbers')
		.max(13, 'Phone Number must be at most 13 digits')
		.required('Phone Number is required'),
	occupation: Yup.string().required('Occupation is required'),
	portfolioLink: Yup.string()
		.trim()
		.url('Enter a valid URL')
		.required('Portfolio link is required'),
});

const CareerModal = () => {
	const dispatch = useDispatch();
	const { customModalType } = useSelector((state) => state.modal);
	const { contactUs } = useMutationAPI();
	const { fetchOccupationList } = useQueryAPI();

	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	const { mutate, isPending } = useMutation({
		mutationFn: (val) => contactUs(val),
		onSuccess: (data) => {
			if (data) {
				dispatch(hideCustomModal());
				dispatch(
					showCustomModal({
						customModalType: THANK_YOU_MODAL,
					})
				);
			}
		},
		onError: (error) => {
			dispatch(
				showAlert({
					message: error?.response?.data?.error?.message,
					status: 'error',
				})
			);
		},
	});

	const handleSubmit = (values) => {
		const payload = {
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
			phoneNumber: values.phoneNumber,
			occupation: values.occupation,
			portfolioLink: values.portfolioLink,
			notes: values.purpose,
		};

		mutate(payload);
	};

	const { data } = useQuery({
		queryFn: () => fetchOccupationList(),
		staleTime: 300000,
	});

	return (
		<>
			{isPending && <Spinner />}
			<Dialog
				open={customModalType === CAREER_MODAL}
				aria-labelledby="form-dialog-title"
				fullWidth
				maxWidth="sm"
			>
				<DialogTitle id="form-dialog-title" className="text-[#1A1A1A]">
					Get in Touch with Us
					<CloseIcon className="closeButton" onClick={hideModal} />
				</DialogTitle>
				<DialogContent className="content">
					<p className="modal-description">
						Complete the form to reach our team. We&apos;re here to assist with
						questions, support, or information about our services.
					</p>
					<Formik
						initialValues={{
							firstName: '',
							lastName: '',
							email: '',
							phoneNumber: '',
							occupation: '',
							portfolioLink: '',
							purpose: '',
						}}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ handleChange, handleBlur, values, touched, errors }) => (
							<Form className="contact-form gap-2">
								<CustomInputField
									borderRadius="8px"
									lable="First Name"
									name="firstName"
									placeholder="Enter your first name"
									value={values.firstName}
									handleChange={handleChange}
									onBlur={handleBlur}
									error={touched.firstName && errors.firstName ? true : false}
									helperText={touched.firstName && errors.firstName}
									boxClassName="form-field  "
								/>
								<CustomInputField
									borderRadius="8px"
									lable="Last Name"
									name="lastName"
									placeholder="Enter your last name"
									value={values.lastName}
									handleChange={handleChange}
									onBlur={handleBlur}
									error={touched.lastName && errors.lastName ? true : false}
									helperText={touched.lastName && errors.lastName}
									boxClassName="form-field"
								/>
								<CustomInputField
									borderRadius="8px"
									lable="Email"
									name="email"
									type="email"
									placeholder="Enter your email"
									value={values.email}
									handleChange={handleChange}
									onBlur={handleBlur}
									error={touched.email && errors.email ? true : false}
									helperText={touched.email && errors.email}
									boxClassName="form-field "
								/>
								<CustomInputField
									borderRadius="8px"
									lable="Phone Number"
									name="phoneNumber"
									placeholder="Enter your mobile number"
									value={values.phoneNumber}
									handleChange={handleChange}
									onBlur={handleBlur}
									error={touched.phoneNumber && errors.phoneNumber ? true : false}
									helperText={touched.phoneNumber && errors.phoneNumber}
									boxClassName="form-field"
								/>
								<div className=" ">
									<div className="form-field">
										<label>Occupation</label>
										<div className="input-wrapper">
											<select
												name="occupation"
												value={values.occupation}
												onChange={handleChange}
												onBlur={handleBlur}
												className={`occupation-select w-full rounded-lg
                          ${touched.occupation && errors.occupation ? 'input-error' : ''}`}
												style={{
													color:
														values.occupation === ''
															? 'rgba(18, 18, 18, 0.66)'
															: 'black',
												}}
											>
												<option value="" disabled>
													Select your occupation
												</option>
												{data?.data?.data?.items?.map(
													(occupation, index) => (
														<option key={index} value={occupation._id}>
															{occupation.name}
														</option>
													)
												)}
											</select>
										</div>

										{touched.occupation && errors.occupation && (
											<div className="error-message">{errors.occupation}</div>
										)}
									</div>
								</div>
								<CustomInputField
									borderRadius="8px"
									lable="Portfolio Link"
									name="portfolioLink"
									placeholder="Link your Portfolio"
									value={values.portfolioLink}
									handleChange={handleChange}
									onBlur={handleBlur}
									error={
										touched.portfolioLink && errors.portfolioLink ? true : false
									}
									helperText={touched.portfolioLink && errors.portfolioLink}
									boxClassName="form-field "
								/>
								<CustomInputField
									borderRadius="8px"
									lable="Purpose"
									name="purpose"
									placeholder="Purpose"
									value={values.purpose}
									handleChange={handleChange}
									onBlur={handleBlur}
									boxClassName="form-field "
								/>
								<DialogActions
									style={{ borderTop: '1px solid #E6E6E6', marginTop: '24px' }}
								>
									<Button
										style={{
											textTransform: 'none',
											padding: '10px 46px',
											color: 'rgba(102, 102, 102, 1)',
										}}
										onClick={hideModal}
									>
										Cancel
									</Button>

									<Button
										type="submit"
										style={{
											textTransform: 'none',
											color: 'rgba(26, 26, 26, 1)',
											backgroundColor: 'rgba(118, 255, 122, 1)',
											padding: '10px 40px',
										}}
									>
										Submit
									</Button>
								</DialogActions>
							</Form>
						)}
					</Formik>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default CareerModal;
