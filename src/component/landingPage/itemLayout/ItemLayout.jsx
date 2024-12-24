import React from 'react';
import { Box, Button } from '@mui/material';

import './itemLayout.css';
import { useNavigate } from 'react-router-dom';

const ItemLayout = ({
	isleft,
	className,
	// clickHandler = () => null,
	title,
	description,
	buttonText,
	src,
	width,
	height,
	extradesc,
	isBgGradient = true,
}) => {
	const navigate = useNavigate();

	return (
		<Box
			className={`w-full flex xl:justify-between items-center gap-[40px] justify-center flex-col 
 ${isleft ? 'xl:flex-row' : 'xl:flex-row-reverse'}`}
		>
			<Box className="max-w-[372px] w-full flex flex-col items-start z-10">
				<Box className="gap-10 w-full flex flex-col md:items-start items-center text-center md:text-start">
					<Box className="gap-4 w-full flex flex-col md:items-start items-center text-center md:text-start">
						<Box className="md:text-[40px] md:leading-[46.92px] md:-tracking-[0.04em] ">
							{title}
						</Box>
						<Box className="text-[#666666] text-[14px] leading-[21px]">
							{description}
						</Box>
						{extradesc}
					</Box>

					<Box className={`${className} relative md:hidden`}>
						<img
							className="bg-cover banner_imageMob  "
							alt="Feature Images"
							height={height}
							src={src}
							loading="lazy"
							width={width}
						/>
						{isBgGradient && <Box className="gradient-bg absolute"></Box>}
					</Box>

					<Box className="flex w-[94px]">
						<Button
							variant="contained "
							// onClick={clickHandler}
							onClick={() => navigate('/sign-up')}
							className="bg-prim-sol font-[500] text-[14px] fw500 text-[#1A1A1A] normal-case shadow-none h-[48px] "
						>
							{buttonText}
						</Button>
					</Box>
				</Box>
			</Box>
			<hr className="w-full text-[#E6E6E6]  block md:hidden" />
			<Box className={`${className} relative hidden md:block`}>
				<img
					className="bg-cover banner_image"
					alt="Feature Images"
					height={height}
					src={src}
					loading="lazy"
					width={width}
				/>
				{isBgGradient && <Box className="gradient-bg absolute"></Box>}
			</Box>
		</Box>
	);
};

export default ItemLayout;
