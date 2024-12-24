import React, { memo, useEffect } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import CustomInputField from 'component/customComponents/inputField';
import { updateInfo } from 'store/reducer/resume/infoSlice';
import { GitHubIcon, LinkedinIcon, MobileIcon } from 'assets/index';
import LinkIcon from 'assets/SVGs/LinkIcon';
import { removeInfoError } from 'store/reducer/resume/errorSlice';

import styles from './editTemplateList.module.css';
import LocationInput from 'component/common/locationDropdown';
import { addState } from 'store/sagaActions';

const ProfileDetails = ({ className = '', isAnalysis = false }) => {
	const { userDetails, userLocation, userPhone } = useSelector((state) => state.common);
	const { resumeCreate } = useSelector((state) => state.resume);
	const info = useSelector((state) => state.info);
	const { infoError } = useSelector((state) => state.resumeError);
	const dispatch = useDispatch();
	const initialValues = {
		email: '',
		phone: '',
		location: '',
		linkedInUrl: '',
		githubUrl: '',
		otherUrl: '',
	};

	// Form validation schema
	const validationSchema = Yup.object({
		email: Yup.string()
			.matches(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/, 'Invalid email address')
			.required('Email is required'),
		phone: Yup.string()
			.required('Phone is required')
			.matches(/^(?:\+91|91)?[789]\d{9}$/, 'Invalid mobile number'),
		location: Yup.object()
			.required('Location is required')
			.test('not-empty', 'Location is required', (value) => {
				return value && Object.keys(value).length > 0; // Ensure it has properties
			}),
		linkedInUrl: Yup.string().matches(
			/^(https?:\/\/)?(www\.)?(linkedin\.com\/(in|pub|company)\/[A-Za-z0-9-]+)\/?$/,
			'Invalid LinkedIn URL'
		),
		githubUrl: Yup.string().matches(
			/^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,38}[a-zA-Z0-9])?$/,
			'Invalid Github URL'
		),
	});

	const { handleBlur, errors, setFieldValue, values, touched, setValues } = useFormik({
		initialValues: {
			...initialValues,
			...info,
			location: userLocation || info?.location,
			phone: userDetails?.phone || userPhone || info?.phone,
		}, // Use Redux state values
		validationSchema,
		validateOnChange: true,
		validateOnBlur: true,
		onSubmit: (values) => {
			// Dispatch update to Redux store
			dispatch(updateInfo(values));
		},
	});

	const handleInputChange = (field, value) => {
		if (value) {
			dispatch(removeInfoError(field));
		}
		if (field === 'linkedInUrl' || ('githubUrl' && !value)) {
			dispatch(removeInfoError(field));
		}
		setFieldValue(field, value); // Update Formik state

		dispatch(updateInfo({ [field]: value })); // Dispatch update to Redux store
	};

	useEffect(() => {
		setValues(info);
		if (info?.phone) dispatch(addState({ name: 'userPhone', value: info?.phone }));
		if (info?.location && Object.keys(info?.location)?.length)
			dispatch(addState({ name: 'userLocation', value: info?.location }));
		if (userLocation) setFieldValue('location', userLocation);
	}, [info, setValues, userLocation]);

	useEffect(() => {
		if (resumeCreate || isAnalysis)
			dispatch(
				updateInfo({
					email: userDetails?.email || '',
					name: userDetails?.profile?.name?.fullName || '',
					phone: userDetails?.phone || userPhone || '',
				})
			);
	}, [userDetails]);

	return (
		<div className="flex flex-col gap-2 px-2 profile-section">
			<div className="text-xl font-semibold">
				{userDetails?.profile?.name?.fullName || ''}
			</div>
			<div
				className={`grid-cols-1 grid gap-2 lg:grid-cols-1 xl:grid-cols-2 md:grid-cols-2 ${className}`}
			>
				<CustomInputField
					inputClass={`${styles.inputs} ${values?.email ? '' : styles.inputsfieldset} `}
					placeholder="Email"
					name="email"
					value={info?.email || values?.email}
					onBlur={handleBlur}
					error={
						(infoError?.email && Boolean(infoError?.email)) ||
						(touched.email && Boolean(errors.email))
					}
					helperText={infoError?.email ? infoError?.email : touched.email && errors.email}
					handleChange={(e) => {
						if (!info?.email?.length) handleInputChange('email', e.target.value);
					}}
					startIcon={!values?.email ? <MobileIcon /> : null}
				/>
				<CustomInputField
					inputClass={`${styles.inputs} ${values?.phone ? '' : styles.inputsfieldset} `}
					error={
						(infoError?.phone && Boolean(infoError?.phone)) ||
						(touched.phone && Boolean(errors.phone))
					}
					helperText={infoError?.phone ? infoError?.phone : touched.phone && errors.phone}
					name="phone"
					placeholder="Phone Number"
					value={values?.phone}
					onBlur={handleBlur}
					handleChange={(e) => {
						handleInputChange('phone', e.target.value);
						dispatch(addState({ name: 'userPhone', value: e.target.value }));
					}}
					startIcon={!values?.phone ? <MobileIcon /> : null}
				/>

				<LocationInput
					inputClass={`${styles.inputs} ${values?.location?.city ? '' : styles.inputsfieldset} `}
					error={
						Boolean(infoError?.location) ||
						(touched.location && Boolean(errors.location))
					}
					helperText={
						infoError?.location
							? infoError?.location
							: touched.location && errors?.location
					}
					value={values?.location || ''}
					handleChange={(e) => {
						handleInputChange('location', e);
					}}
					startIcon={
						!values?.location?.city ? (
							<LocationOnOutlinedIcon className="h-4 w-4" />
						) : null
					}
					onBlur={handleBlur}
				/>
				<CustomInputField
					inputClass={`${styles.inputs} ${values?.linkedInUrl ? '' : styles.inputsfieldset} `}
					name="linkedInUrl"
					placeholder="LinkedIn url"
					value={values?.linkedInUrl}
					onBlur={handleBlur}
					handleChange={(e) => handleInputChange('linkedInUrl', e.target.value)}
					startIcon={!values?.linkedInUrl ? <LinkedinIcon /> : null}
					error={
						(infoError?.linkedInUrl && Boolean(infoError?.linkedInUrl)) ||
						(touched.linkedInUrl && Boolean(errors.linkedInUrl))
					}
					helperText={
						infoError?.linkedInUrl
							? infoError?.linkedInUrl
							: touched.linkedInUrl && errors?.linkedInUrl
					}
				/>
				<CustomInputField
					inputClass={`${styles.inputs} ${values?.githubUrl ? '' : styles.inputsfieldset} `}
					placeholder="Github url"
					value={values?.githubUrl}
					name="githubUrl"
					onBlur={handleBlur}
					handleChange={(e) => handleInputChange('githubUrl', e.target.value)}
					startIcon={!values?.githubUrl ? <GitHubIcon /> : null}
					error={
						(infoError?.githubUrl && Boolean(infoError?.githubUrl)) ||
						(touched.githubUrl && Boolean(errors.githubUrl))
					}
					helperText={
						infoError?.githubUrl
							? infoError?.githubUrl
							: touched.githubUrl && errors?.githubUrl
					}
				/>
				<CustomInputField
					inputClass={`${styles.inputs} ${values?.otherUrl ? '' : styles.inputsfieldset} `}
					name="otherUrl"
					placeholder="Other url"
					value={values?.otherUrl}
					onBlur={handleBlur}
					handleChange={(e) => handleInputChange('otherUrl', e.target.value)}
					startIcon={!values?.otherUrl ? <LinkIcon /> : null}
				/>
			</div>
		</div>
	);
};

export default memo(ProfileDetails);
