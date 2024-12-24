import React, { useState } from 'react';
import { Box, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const CustomInputField = ({
	lable,
	inputClass,
	helperText,
	error,
	onClick,
	boxClassName,
	handleChange,
	borderRadius,
	endIcon,
	labelClass,
	value,
	type = 'text',
	startIcon,
	inputFieldBorderColor,
	placeholderTextSize,
	...rest
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleMouseUpPassword = (event) => {
		event.preventDefault();
	};
	if (type === 'password')
		return (
			<Box sx={{ width: '100%' }} className={`flex flex-col w-full gap-2 ${boxClassName}`}>
				<InputLabel
					sx={{
						textTransform: 'capitalize',
						fontSize: '16px',
						fontWeight: 500,
						color: '#666666',
					}}
					className={`${labelClass}`}
				>
					{lable}
				</InputLabel>
				<TextField
					className={` ${inputClass}`}
					sx={{
						fontSize: '14px',
						'& .MuiInputBase-input': {
							padding: '14.5px 16px',
						},
						'& .MuiFormHelperText-root.Mui-error': {
							margin: '3px 0',
							fontSize: '14px',
						},
						'& .MuiInputBase-root': {
							borderRadius: borderRadius,
						},
						'& .MuiOutlinedInput-notchedOutline': {
							borderColor: inputFieldBorderColor,
						},
						'& .MuiInputBase-input::placeholder': {
							fontSize: placeholderTextSize,
						},
					}}
					error={error}
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										onMouseUp={handleMouseUpPassword}
										edge="end"
									>
										{showPassword ? (
											<RemoveRedEyeOutlinedIcon />
										) : (
											<VisibilityOffOutlinedIcon />
										)}
									</IconButton>
								</InputAdornment>
							),
						},
					}}
					type={showPassword ? 'text' : 'password'}
					onClick={onClick}
					fullWidth
					value={value}
					helperText={helperText}
					onChange={handleChange}
					autoComplete="false"
					{...rest}
				/>
			</Box>
		);

	return (
		<Box sx={{ width: '100%' }} className={`flex flex-col w-full gap-2 ${boxClassName}`}>
			{lable && (
				<InputLabel
					className={`${labelClass}`}
					sx={{
						textTransform: 'capitalize',
						fontSize: '16px',
						fontWeight: 500,
						color: '#666666',
					}}
				>
					{lable}
				</InputLabel>
			)}
			<TextField
				className={` ${inputClass} `}
				sx={{
					fontSize: '14px',
					'& .MuiInputBase-input': {
						padding: '14.5px 16px',
					},
					'& .MuiFormHelperText-root.Mui-error': {
						margin: '3px 0',
						fontSize: '14px',
					},
					'& .MuiInputBase-root': {
						borderRadius: borderRadius,
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: inputFieldBorderColor,
					},
					'& .MuiInputBase-input::placeholder': {
						fontSize: placeholderTextSize,
					},
				}}
				value={value}
				error={error}
				type={type}
				onClick={onClick}
				fullWidth
				helperText={helperText}
				onChange={handleChange}
				autoComplete="false"
				slotProps={{
					input: {
						startAdornment: startIcon ? (
							<InputAdornment position="start">{startIcon}</InputAdornment>
						) : null,
						endAdornment: endIcon ? (
							<InputAdornment position="end">{endIcon}</InputAdornment>
						) : null,
					},
				}}
				{...rest}
			/>
		</Box>
	);
};

export default CustomInputField;
