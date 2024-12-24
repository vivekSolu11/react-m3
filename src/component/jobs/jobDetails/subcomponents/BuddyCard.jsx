import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';

import { jobsbuddy } from 'assets/images';
import { BuddyCardAi } from 'assets/index';
import { CUSTOMIZE_RESUME_MODAL } from 'constants/modalTypeConstant';
import { addState, showCustomModal } from 'store/sagaActions';

const BuddyCard = ({ jobId, job }) => {
	const dispatch = useDispatch();
	const handleopenCustomizeModal = () => {
		dispatch(
			addState({
				name: 'jobDetail',
				value: {
					companyName: job.company?.name,
					positionName: job.designation?.name,
					companyLogo: job?.companyInfo?.logo,
					jobId: job._id,
				},
			})
		);
		dispatch(
			showCustomModal({
				customModalType: CUSTOMIZE_RESUME_MODAL,
				tempCustomModalData: {
					jobId: jobId,
				},
			})
		);
	};

	return (
		<Box className="bg-jobDetail-card w-full rounded-[8px]  ">
			<Box className="px-[24px] pt-[15px] pb-[13px] flex justify-center items-center gap-[24px]">
				<img src={jobsbuddy} className=" hidden sm:flex" alt="job-buddy" />
				<Box className="flex w-full flex-col sm:flex-row  sm:items-center gap-[12px] justify-between">
					<Box className="flex flex-col  text-white  -tracking-[0.02em]">
						<Typography className="md:text-[20px] text-[16px] tracking-tighter  font-[600]">
							Maximize Your Interview Chances
						</Typography>
						<Typography className=" text-[14px] md:text-base font-[600]">
							Try our AI Feature Now!
						</Typography>
					</Box>
					<Button
						variant="contained"
						className="bg-white w-min shadow-none normal-case px-[12px] py-[6px] rounded-[4px] gap-[8px] font-[500] text-[14px] text-Ai-Card-btn"
						onClick={handleopenCustomizeModal}
					>
						<BuddyCardAi />
						Customize
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default BuddyCard;
