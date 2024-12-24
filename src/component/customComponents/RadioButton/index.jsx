import { Box, InputLabel, Radio } from '@mui/material';
import React from 'react';

const RadioButton = ({ size, onChange, label, checked, ClassName, ...rest }) => {
	return (
		<Box sx={{ width: '100%' }} className={`flex  w-full py-2 gap-1 items-center ${ClassName}`}>
			<Radio
				sx={{
					padding: 0,
				}}
				// iconStyle={{ fill: 'red' }}
				{...rest}
				size={size}
				onChange={onChange}
				checked={checked}
			/>
			{label && (
				<InputLabel
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

export default RadioButton;
