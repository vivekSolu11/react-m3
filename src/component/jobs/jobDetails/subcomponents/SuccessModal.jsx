import React from 'react';

import { LinkedinModalSuccess } from 'assets/images/index';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { hideCustomModal } from 'store/sagaActions';

const SuccessModal = () => {
	const dispatch = useDispatch();

	const handleHide = () => {
		dispatch(hideCustomModal());
	};

	return (
		<div className="max-w-[432px] w-full flex flex-col gap-[24px] px-[16px]  py-[24px]">
			<img src={LinkedinModalSuccess} className="max-w-[120px] max-h-[120px] mx-auto " />
			<div className="flex flex-col gap-2">
				<div className="text-[24px] text-center font-[500] ">LinkedIn Profile Verified</div>
				<div className=" text-[14px] font-normal text-lightText tracking-tight">
					Awesome! You can now head to the job detail page to check for any connections
					working at your desired company.
				</div>
			</div>
			<div className="flex justify-center w-full">
				<Button
					onClick={handleHide}
					className={` text-[14px] normal-case $  bg-prim-sol text-black `}
				>
					Close
				</Button>
			</div>
		</div>
	);
};

export default SuccessModal;
