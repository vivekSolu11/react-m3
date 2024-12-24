import { Box, Checkbox, InputLabel } from '@mui/material';
import React from 'react';

const CheckBox = ({ rest, size, defaultChecked, onChange, label, labelClassName, ClassName }) => {
	return (
		<Box className={`flex  w-full py-2 gap-1 items-center ${ClassName}`}>
			<Checkbox
				sx={{
					padding: 0,
				}}
				// iconStyle={{ fill: 'red' }}
				size={size}
				defaultChecked={defaultChecked}
				onChange={onChange}
				{...rest}
			/>
			{label && (
				<InputLabel
					className={`${labelClassName}`}
					sx={{
						textTransform: 'capitalize',
						fontSize: '14px',
						fontWeight: 400,
						color: '#666666',
					}}
				>
					{label}
				</InputLabel>
			)}
		</Box>
	);
};

export default CheckBox;
