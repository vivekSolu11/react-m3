import React, { useRef, useState } from 'react';
import { InputLabel, useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useMutationAPI } from 'apis/mutation';
import CheckBox from 'component/customComponents/checkBox';
import CustomInputField from 'component/customComponents/inputField';
import SwitchButton from '../subcomponents/SwitchButton';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import TwoFaModal from '../modals/TwoFaModal';
import { DELETE_ACCOUNT_MODAL, TWO_FA_MODAL } from 'constants/modalTypeConstant';
import { hideCustomModal, showCustomModal } from 'store/sagaActions';
import DeleteAccountModal from '../modals/DeleteAccountModal';
import HeadingLayout from '../subcomponents/HeadingLayout';
import { cleanPayload, handleAlert } from 'utils/helperFunctions/helperFunction';
import SideDrawer from 'component/common/drawer/Drawer';
import TwoFaBody from '../subcomponents/TwoFaBody';
import DeleteAccountModalBody from '../subcomponents/DeleteAccountModalBody';

import 'react-phone-input-2/lib/style.css';
import './Settings.css';

const Settings = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const formikSettingsRef = useRef(null);
	const isMobile = useMediaQuery('(max-width:768px)');
	const { updateProfileSetting } = useMutationAPI();
	const queryClient = useQueryClient();
	const userDetails = useSelector((state) => state.common.userDetails);

	// eslint-disable-next-line no-unused-vars
	const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
	const [twoFaDrawer, setTwoFaDrawer] = useState(false);
	const [deleteDrawer, setDeleteDrawer] = useState(false);
	const [phone, setPhone] = useState({
		countryCode: userDetails.countryCode || '',
		mobileNo: userDetails.phone || '',
	});

	const email = userDetails.email;

	const toggleDrawer = (isDelete, state) => {
		if (isDelete) setDeleteDrawer(state);
		setTwoFaDrawer(state);
	};

	const handleMobileChange = (value, countryCode) => {
		const mobileNo = value?.slice(countryCode.toString().length);
		setPhone({
			...phone,
			countryCode,
			mobileNo,
		});
	};

	const validate = (values) => {
		const errors = {};
		if (values.phone.mobileNo && values.phone.mobileNo.length < 10) {
			errors.phone = 'Phone No must be 10 digits';
		}

		if (!email) {
			errors.email = 'Email is required';
		} else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
			errors.email = 'Invalid email format';
		}

		if (values.newPassword) {
			if (values.newPassword.length < 8) {
				errors.newPassword = 'Password must be at least 8 characters long';
			}
			if (!/[A-Z]/.test(values.newPassword)) {
				errors.newPassword = 'Password must contain at least one uppercase letter';
			}
			if (!/[a-z]/.test(values.newPassword)) {
				errors.newPassword = 'Password must contain at least one lowercase letter';
			}
			if (!/[0-9]/.test(values.newPassword)) {
				errors.newPassword = 'Password must contain at least one number';
			}
			if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.newPassword)) {
				errors.newPassword = 'Password must contain at least one special character';
			}
		}

		if (values.newPassword && values.newPassword !== values.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
		}

		return errors;
	};

	const { mutate } = useMutation({
		mutationFn: (val) => updateProfileSetting(val),
		onSuccess: () => {
			handleAlert(
				dispatch,
				'Your profile has been updated',
				'',
				'bg-[#1A1A1AE5]',
				'white',
				'16px',
				false
			);
			queryClient.invalidateQueries(['userDetails']);
		},
		onError: (error) => {
			handleAlert(dispatch, error, 'error');
		},
	});

	const handleSubmit = () => {
		const data = {
			email: formikSettingsRef.current.values?.email,
			phone: formikSettingsRef.current.values?.phone?.mobileNo,
			countryCode: formikSettingsRef.current.values?.phone?.countryCode,
			newPassword: formikSettingsRef.current.values?.newPassword,
			confirmNewPassword: formikSettingsRef.current.values?.confirmPassword,
			privacy: formikSettingsRef.current.values?.checkbox,
			twoFactorAuthentication: formikSettingsRef.current.values?.twoFactor,
		};

		const payload = cleanPayload(data);
		mutate(payload);
	};

	const TwoFAModal = () => {
		if (isMobile) toggleDrawer(false, true);
		else {
			dispatch(
				showCustomModal({
					customModalType: TWO_FA_MODAL,
					tempCustomModalData: {
						onSuccess: formikSettingsRef.current.setFieldValue,
					},
				})
			);
		}
	};

	return (
		<Formik
			innerRef={formikSettingsRef}
			validate={validate}
			initialValues={{
				phone: phone,
				email: email,
				currentPassword: '',
				newPassword: '',
				confirmPassword: '',
				twoFactor: userDetails?.twoFactorAuthentication?.isActivated,
				checkbox: userDetails?.isPrivacyEnabled,
			}}
			onSubmit={handleSubmit}
		>
			{({ errors, touched, setFieldValue, values }) => (
				<>
					<HeadingLayout
						heading="Account Settings"
						onSave={() => formikSettingsRef.current.submitForm()}
						handleDiscard={() => navigate('/profile/details')}
					/>

					<div className="bg-white h-[calc(100vh-183px)] rounded-lg overflow-y-auto pb-[120px]">
						<Form autoComplete="off">
							<div className="flex flex-col gap-8 p-4">
								<div className="font-[500] text-[16px] text-[#1A1A1A]">
									Credentials Management
								</div>
								<div>
									<InputLabel>Mobile No</InputLabel>
									<Field
										component={PhoneInput}
										className="w-100 phone_input"
										country="in"
										name="phone"
										onChange={(value, country) => {
											handleMobileChange(value, country?.dialCode);
											setFieldValue('phone', {
												countryCode: country?.dialCode,
												mobileNo: value.slice(country?.dialCode.length),
											});
										}}
										autoFormat
										countryCodeEditable={false}
										value={values.phone.countryCode + values.phone.mobileNo}
									/>
									{errors.phone && touched.phone && (
										<div className="text-[#CD2735] text-[12px]">
											{errors.phone}
										</div>
									)}
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<Field
										name="email"
										component={CustomInputField}
										inputFieldBorderColor="#E6E6E6"
										lable="Email"
										value={values.email}
										onChange={(e) => setFieldValue('email', e.target.value)}
									/>
									{errors.email && touched.email && (
										<div className="text-[#CD2735] text-[12px]">
											{errors.email}
										</div>
									)}
									<Field
										name="currentPassword"
										component={CustomInputField}
										inputFieldBorderColor="#E6E6E6"
										lable="Current Password"
										type="password"
										autoComplete="new-password"
										value={values.currentPassword}
										onChange={(e) =>
											setFieldValue('currentPassword', e.target.value)
										}
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<Field
										name="newPassword"
										component={CustomInputField}
										inputFieldBorderColor="#E6E6E6"
										lable="New Password"
										type="password"
										autoComplete="new-password"
										value={values.newPassword}
										onChange={(e) =>
											setFieldValue('newPassword', e.target.value)
										}
									/>
									{errors.newPassword && touched.newPassword && (
										<div className="text-[#CD2735] text-[12px]">
											{errors.newPassword}
										</div>
									)}
									<Field
										name="confirmPassword"
										component={CustomInputField}
										inputFieldBorderColor="#E6E6E6"
										lable="Confirm Password"
										type="password"
										autoComplete="new-password"
										value={values.confirmPassword}
										onChange={(e) =>
											setFieldValue('confirmPassword', e.target.value)
										}
									/>
									{errors.confirmPassword && touched.confirmPassword && (
										<div className="text-[#CD2735] text-[12px]">
											{errors.confirmPassword}
										</div>
									)}
								</div>
								<div className="font-[500] text-[16px] text-[#1A1A1A]">
									Privacy Settings
								</div>
								<Field
									component={CheckBox}
									name="checkbox"
									label="Show my profile on connect to everyone except my company"
									defaultChecked={userDetails?.isPrivacyEnabled}
									onChange={(e) => setFieldValue('checkbox', e.target.checked)}
								/>
								<div className="font-[500] text-[16px] text-[#1A1A1A]">
									Two Factor Verification
								</div>
								<div className="flex max-w-[345px] switch-button w-full p-4 justify-between">
									<div className="text-[14px] text-[#121212A8]">
										{isTwoFactorEnabled ? 'Enabled' : 'Disabled'}
									</div>
									<Field
										component={SwitchButton}
										name="twoFactor"
										value={values.twoFactor}
										checked={values.twoFactor}
										onChange={() => {
											if (values.twoFactor) {
												// Case: Switch is currently ON
												setFieldValue('twoFactor', false); // Turn it OFF directly
											} else {
												// Case: Switch is currently OFF
												TwoFAModal(); // Open modal
											}
										}}
									/>
								</div>
							</div>
							<div className="flex justify-center">
								<PrimaryButton
									buttonText="Delete my Account"
									btnClassName="!text-[#CD2735] !border-[#F2707B]"
									varient="primaryOutline"
									handleClick={
										isMobile
											? toggleDrawer(true, true)
											: () =>
													dispatch(
														showCustomModal({
															customModalType: DELETE_ACCOUNT_MODAL,
														})
													)
									}
								/>
							</div>
						</Form>
						<SideDrawer open={twoFaDrawer} onClose={toggleDrawer(false, false)}>
							<TwoFaBody />
						</SideDrawer>
						<SideDrawer open={deleteDrawer} onClose={toggleDrawer(true, false)}>
							<DeleteAccountModalBody />
						</SideDrawer>
						<TwoFaModal hideModal={() => dispatch(hideCustomModal())} />
						<DeleteAccountModal hideModal={() => dispatch(hideCustomModal())} />
					</div>
				</>
			)}
		</Formik>
	);
};

export default Settings;
