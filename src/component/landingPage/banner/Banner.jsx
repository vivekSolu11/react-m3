import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { advbanner } from 'assets/images';

import './banner.css';

const Banner = ({ isHome }) => {
	const navigate = useNavigate();
	return (
		<Box className="flex bg-prim-grad-lr rounded-[8px] md:rounded-[24px] md:mt-[40px]">
			<Box className="flex flex-wrap  lg:flex-nowrap px-[16px] pt-[16px] pb-[24px] md:px-[60px] md:py-[40px] lg:py-[80px] lg:px-[96px] md:gap-[80px] gap-[24px] justify-center">
				<Box className=" w-full max-w-[440px] flex items-center ">
					<img
						className="bg-cover max-w-[440px] w-full banner_img"
						height="auto"
						width={440}
						alt="Banner"
						src={advbanner}
					></img>
				</Box>
				<Box className="flex flex-col max-w-[488px] w-full justify-center md:justify-start">
					<Box className=" lg:text-[40px]  md:text-[30px] text-[20px] font-[600] md:font-[400] text-center md:text-left -tracking-[0.04em] leading-[28px] md:leading-[46.92px] text-[#121212]">
						{isHome ? 'Discover Your Next Role with ' : ' Find your next career with'}
						<span className="md:underline decoration-2 md:underline-offset-[5px]">
							{' '}
							Joblo.ai
						</span>
					</Box>
					<Box className=" md:text-[20px]  text-center md:text-left text-[14px] font-[400] text-[@121212] mt-[12px] leading-[21px]">
						Experience a job search like no other. Joblo.ai provides intelligent
						recommendations and tools to help you succeed.
					</Box>
					<Box className="flex justify-center lg:justify-start items-end mt-[24px]">
						<Button
							variant="contained"
							className="py-[13px] px-[28px] text-green-btn bg-white  text-[16px] font-[500] -tracking-[0.02em] shadow-none normal-case banner-btn"
							onClick={() => navigate('/chat-with-bot')}
						>
							Try Joblo.ai For Free
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Banner;
