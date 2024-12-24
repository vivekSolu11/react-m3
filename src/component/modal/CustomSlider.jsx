import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const CustomSlider = styled(Slider)({
	color: '#a4e69e',
	height: 8,
	'& .MuiSlider-track': {
		border: 'none',
	},
	'& .MuiSlider-rail': {
		color: '#e0e0e0',
		opacity: 1,
		height: 8,
	},
	'& .MuiSlider-thumb': {
		height: 24,
		width: 12,
		borderRadius: 2,
		backgroundColor: '#ABF0A1',
		border: '2px solid currentColor',
		'&:focus, &:hover, &.Mui-active': {
			boxShadow: 'inherit',
		},
	},
	'& .MuiSlider-mark': {
		backgroundColor: '#bfbfbf',
		height: 8,
		width: 1,
		'&.MuiSlider-markActive': {
			opacity: 1,
			backgroundColor: 'currentColor',
		},
	},
	'& .MuiSlider-valueLabel': {
		background: 'none',
		color: '#B3B3B3',
		fontWeight: 'normal',
		padding: 0,
	},
});

function valuetext(value) {
	return `${value}`;
}

const DiscreteSlider = () => {
	return (
		<Box sx={{ width: '100%' }}>
			<CustomSlider
				aria-label="Custom slider"
				defaultValue={6}
				getAriaValueText={valuetext}
				step={1}
				marks
				min={0}
				max={10}
				valueLabelDisplay="on"
			/>
		</Box>
	);
};

export default DiscreteSlider;
