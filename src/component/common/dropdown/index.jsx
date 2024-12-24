import React from 'react';
import { Box, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

import styles from './dropdown.module.css';

const dropdowntypes = {
	primary: 'primary_drop',
	white: 'white',
	whiterounded: 'whiterounded',
};
const CustomExpandMore = ({ className, ...rest }) => {
	return (
		<div
			{...rest}
			className={`mt-[-5px] flex cursor-pointer   items-center justify-center ${className}`}
		>
			<svg
				width="25"
				height="25"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M5 7.5L10 12.5L15 7.5"
					stroke="#1A1A1A"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
};
const CustomDropdown = ({
	label,
	labelClass,
	dropdownClass,
	helperText = '',
	error,
	options,
	onChange,
	value = '',
	fullWidth,
	borderColor = '#E6E6E6',
	type = 'white',
	autoWidth,
	...rest
}) => {
	const typeclass = dropdowntypes[type];

	return (
		<Box className={styles.wrapper}>
			{label && <InputLabel className={`${styles.label} ${labelClass}`}>{label}</InputLabel>}
			<div>
				<Select
					className={`${styles[typeclass]} ${dropdownClass}`}
					sx={{
						fontSize: '14px',
						width: autoWidth ? 'auto' : fullWidth ? '100%' : '150px',
						borderRadius: type === 'whiterounded' ? '30px' : '',
						'& .MuiSelect-select': {
							padding: type !== 'primary' ? '6.5px 14px' : '14.5px 16px',
							paddingRight: '0 !important',
						},
						'& .MuiInputBase-root': {
							padding: '14.5px 8px',
						},
						'&.MuiInputBase-root fieldset': {
							borderColor: type !== 'primary' ? 'none' : borderColor,
						},

						'& .Mui-focused fieldset': {
							border: 'none',
							borderColor: 'none',
						},
					}}
					error={error}
					onChange={onChange}
					fullWidth={fullWidth}
					IconComponent={CustomExpandMore}
					value={value}
					defaultValue={value}
					{...rest}
				>
					{options?.length > 0 &&
						options?.map(({ value, label }) => (
							<MenuItem key={value} value={value} className="text-wrap">
								{label}
							</MenuItem>
						))}
				</Select>
				{helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
			</div>
		</Box>
	);
};

export default CustomDropdown;
