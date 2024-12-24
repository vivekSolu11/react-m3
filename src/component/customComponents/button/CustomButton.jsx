import { Button } from '@mui/material';

import './customButton.css';

const btnclass = {
	primary: 'primary_btn',
	primaryOutline: 'outline_btn',
	seconderyOutline: 'secondery_outline_btn',
	gradient: 'gradient_btn',
	simple: 'simple',
};
const btnLoaderColor = {
	primary: 'border-[#fff]',
	primaryOutline: 'border-[#14A019]',
	seconderyOutline: 'border-[#14A019]',
	gradient: 'border-[#fff]',
	simple: 'border-[#fff]',
};
const btnSizeclass = {
	small: 'small',
	full: 'full',
	medium: 'medium',
};

const PrimaryButton = ({
	buttonText = 'Text',
	btnClassName = '',
	varient = 'primary', //primary,primaryOutline,seconderyOutline,gradient
	startIcon,
	endIcon,
	size = 'full', //small, medium, full
	handleClick = () => null,
	fullWidth,
	disabled,
	loading,
	...rest
}) => {
	return (
		<Button
			className={` ${btnclass[varient]} ${btnSizeclass[size]}  btn_style ${btnClassName}`}
			onClick={handleClick}
			{...rest}
			fullWidth={fullWidth}
			endIcon={endIcon}
			disabled={disabled}
			startIcon={startIcon}
		>
			{loading ? (
				<div className={`btn-loader border-4 ${btnLoaderColor[varient]}`}></div>
			) : (
				buttonText
			)}
		</Button>
	);
};

export { PrimaryButton };
