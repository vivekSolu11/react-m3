import React, { memo } from 'react';
import { Slider, SliderThumb } from '@mui/material';

function ThumbComponent(props) {
	const { children, ...other } = props;
	return (
		<SliderThumb {...other}>
			{children}
			<div className="thumb w-2 h-6 bg-prim-sol rounded-sm"></div>
		</SliderThumb>
	);
}

const RangeSlider = ({ value, handleChange, valuetext, ...rest }) => {
	return (
		<div className="h-12 flex items-end px-2 mt-[10px]">
			<Slider
				getAriaLabel={() => 'Temperature range'}
				value={value}
				onChange={handleChange}
				defaultValue={[10, 30]}
				getAriaValueText={valuetext}
				valueLabelDisplay="on"
				{...rest}
				sx={{
					height: 8,
					borderRadius: 0,
					'& .MuiSlider-track ': {
						background: 'rgba(96, 221, 100, 1)',
						borderColor: 'rgba(96, 221, 100, 1)',
					},
					'& .MuiSlider-rail ': {
						background: 'rgba(242, 242, 242, 1)',
						opacity: 1,
					},
					'& .MuiSlider-valueLabel': {
						fontSize: 14,
						fontWeight: '500',
						top: -6,
						backgroundColor: 'unset',
						'&::before': {
							display: 'none',
						},
						'& *': {
							background: 'transparent',
							color: 'var(--primary)',
						},
					},
					'& .MuiSlider-thumb': {
						backgroundColor: 'transparent',
						border: 'none',
						boxShadow: 'none',
						'&::before': {
							display: 'none',
						},
						'&:hover': {
							boxShadow: 'none',
						},
						'& .thumb:hover': {
							boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
						},
					},
				}}
				slots={{ thumb: ThumbComponent }}
			/>
		</div>
	);
};

export default memo(RangeSlider);
