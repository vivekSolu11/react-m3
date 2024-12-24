import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { useMutationAPI } from 'apis/mutation';
import { useNavigate } from 'react-router-dom';

import { BIN, CLOSE_ICON_BG } from 'assets/images';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import { hideCustomModal } from 'store/sagaActions';
import { handleReset } from 'utils/helperFunctions/helperFunction';

const DeleteAccountModalBody = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { deleteAccount } = useMutationAPI();

	const handleClose = () => {
		dispatch(hideCustomModal());
	};

	const { mutate } = useMutation({
		mutationFn: (val) => deleteAccount(val),
		onSuccess: (data) => {
			if (data) {
				handleReset(dispatch);
				navigate('/');
				dispatch(hideCustomModal());
			}
		},
	});

	const handleDelete = () => {
		mutate();
	};

	return (
		<div className="flex flex-col overflow-hidden">
			<div className="pt-4 hidden md:flex px-4  justify-end items-end cursor-pointer">
				<img
					alt="close icon"
					className=""
					height={32}
					src={CLOSE_ICON_BG}
					width={32}
					onClick={handleClose}
				/>
			</div>
			<div className="p-4 pb-[40px] flex flex-col gap-4 items-center justify-center">
				<img alt="bin image" height={100} width={100} src={BIN} />
				<div className="flex flex-col items-center w-full max-w-[424px] gap-1">
					<div className="text-[24px] font-[500]">Delete Account</div>
					<div className="text-[#666666] text-[16px] text-center">
						You will no longer be able to enjoy services of joblo.ai Sure, you want to
						exit ?
					</div>
				</div>
			</div>
			<div className="p-4 sm:grid flex flex-col-reverse sm:grid-cols-2 gap-4 bg-[#F5F5F5]">
				<PrimaryButton
					buttonText="Cancel"
					btnClassName="!px-4 !w-full !py-2 !border-[#1A1A1A] !text-[#1A1A1A] !font-[500] !text-[14px] !h-[40px] !rounded-[4px]"
					varient="primaryOutline"
					handleClick={handleClose}
				/>{' '}
				<PrimaryButton
					btnClassName="!px-4 !w-full !py-2 !font-[500] !bg-[#CD2735] !text-[#FFFFFF] !text-[14px] !h-[40px] !rounded-[4px]"
					buttonText="Delete"
					handleClick={handleDelete}
					varient="primary"
				/>
			</div>
		</div>
	);
};

export default DeleteAccountModalBody;
