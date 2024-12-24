import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export function CircularProgressWithLabel({ value, color, size = 45 }) {
	return (
		<Box sx={{ position: 'relative', display: 'inline-flex' }}>
			<CircularProgress
				variant="determinate"
				sx={{ color: color }}
				size={size}
				value={value}
			/>
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
					{`${Math.round(value)}%`}
				</Typography>
			</Box>
		</Box>
	);
}
