import * as React from 'react';
import Chip from '@mui/material/Chip';

const color = ['#6A015E', ' #046A01', '#01266A', '#875B0E'];

export default function Chips({ name, num, className, customStyle, ...rest }) {
	return (
		<Chip
			label={name}
			sx={{
				height: '21px',
				backgroundColor: `${color[num]}1A`,
				color: color[num],
				'& .MuiChip-label': {
					padding: 0,
				},
				...customStyle,
			}}
			className={`${className}`}
			{...rest}
		/>
	);
}
