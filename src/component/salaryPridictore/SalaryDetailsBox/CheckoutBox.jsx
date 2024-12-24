import { Box, Typography } from '@mui/material';
import { bot } from 'assets/images';
import { BuddyCardAi } from 'assets/index';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import React from 'react';

const CheckoutBox = ({
	title = '              Having trouble with your career?',
	desc = '                Get best advice from our Career Advisor',
}) => {
	return (
		<Box className="bg-jobDetail-card w-full rounded-[8px]  ">
			<Box className="px-[24px] pt-[15px] pb-[13px] flex justify-center items-center gap-[24px]">
				<img src={bot} className=" hidden sm:flex" alt="job-buddy" />
				<Box className="flex w-full flex-col sm:flex-row  sm:items-center gap-[12px] justify-between">
					<Box className="flex flex-col  text-white  -tracking-[0.02em]">
						<Typography className="text-xs  ">{title}</Typography>
						<Typography className=" text-sm  font-medium">{desc}</Typography>
					</Box>
					<PrimaryButton
						variant="primaryOutline"
						onClick={() => {}}
						buttonText="Customize"
						startIcon={<BuddyCardAi />}
						btnClassName="border  border-solid !bg-white !border-Ai-Card-btn  !text-Ai-Card-btn"
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default CheckoutBox;
