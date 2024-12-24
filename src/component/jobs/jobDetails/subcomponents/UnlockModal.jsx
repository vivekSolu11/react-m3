import React, { useState } from 'react';
import { LINKEDIN_LOGIN } from 'assets/images';

import './index.css';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import { Button } from '@mui/material';
import { hideCustomModal, showCustomModal } from 'store/sagaActions';
import { useDispatch } from 'react-redux';
import { LINKEDIN_SUCCESS } from 'constants/modalTypeConstant';

const UnlockModal = () => {
	const [profileUrl, setProfileUrl] = useState('');
	const [isValid, setIsValid] = useState(true);
	const [isSubmit, setIsSubmit] = useState(false);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setProfileUrl(e.target.value);
		if (isSubmit) {
			const validUrl = profileUrl.includes('linkedin.com');
			setIsValid(validUrl);
		}
	};

	const handleSubmit = () => {
		setIsSubmit(true);
		const validUrl = profileUrl.includes('linkedin.com');
		setIsValid(validUrl);

		if (validUrl) {
			dispatch(
				showCustomModal({
					customModalType: LINKEDIN_SUCCESS,
				})
			);
		}
	};
	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	return (
		<div className="px-[24px] rounded-[8px] pt-[24px] pb-[28px] w-full max-w-[512px] flex flex-col gap-[28px]">
			<div className="flex flex-col gap-[20px]">
				<img src={LINKEDIN_LOGIN} className="w-[32px] h-[32px]" />
				<div className="flex flex-col">
					<div className="text-[20px] font-[500] ">Unlock Your Potential Connections</div>
					<div className=" text-[14px] font-normal text-lightText tracking-tight">
						Want to locate alumni or former coworkers at your desired company? Just
						enter your LinkedIn URL to get started.
					</div>
				</div>
				<div className="text-center underline text-[#1B57B8] text-[14px]">
					Get your LinkedIn profile URL
				</div>
			</div>
			<div className="flex w-full flex-col gap-[20px]">
				<div>
					<input
						value={profileUrl}
						onChange={handleChange}
						type="text"
						placeholder="Enter your LinkedIn profile URL here"
						className={`text-center  w-full py-[12px] rounded-[12px] outline-none borderreview ${isValid ? 'bg-[#F5F9FF] border-[#C5DBFD]' : 'bg-[#FFF5F6] text-[#CD2735] border-[#F2707B]'} `}
					/>
					{!isValid && (
						<div className="text-[12px] font-[400] text-end text-[#870E18]">
							Couldn&apos;t find your profile, try again!
						</div>
					)}
				</div>
				<div className="flex justify-between">
					<PrimaryButton
						onClick={hideModal}
						buttonText="Cancel"
						varient="primaryOutline"
						size=""
						btnClassName="!px-[20px] !py-[8px] !text-[14px]  !font-medium"
					/>
					<Button
						disabled={!profileUrl.length}
						onClick={handleSubmit}
						className={` text-[14px] normal-case ${profileUrl.length ? ' bg-prim-sol text-black' : 'bg-[#F2F2F2] text-[#B3B3B3]'} `}
					>
						Submit
					</Button>
				</div>
			</div>
		</div>
	);
};

export default UnlockModal;
