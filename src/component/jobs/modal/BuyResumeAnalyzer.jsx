import { Dialog, DialogActions, DialogContent, IconButton } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideCustomModal } from 'store/sagaActions';
import { BUY_RESUME_ANALIZE_MODAL } from 'constants/modalTypeConstant';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import CloseIcon from 'assets/SVGs/CloseIcon';
import { DiamondImg } from 'assets/images';

const BuyResumeAnalyzer = () => {
	const dispatch = useDispatch();

	const { customModalType } = useSelector((state) => state.modal);
	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	return (
		<Dialog
			open={customModalType === BUY_RESUME_ANALIZE_MODAL}
			onClose={hideModal}
			aria-labelledby="success-modal-title"
			aria-describedby="success-modal-description"
			fullWidth
			maxWidth="sm"
		>
			<div className="px-4 flex items-center flex-col pb-6">
				<IconButton
					aria-label="close"
					onClick={hideModal}
					sx={(theme) => ({
						position: 'absolute',
						right: 8,
						top: 8,
						color: theme.palette.grey[500],
						padding: 0,
					})}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent className=" items-center flex flex-col">
					<img src={DiamondImg} />

					<div className="flex items-center flex-col gap-4">
						<div className="text-xl font-medium">
							You&apos;ve Reached Your Free Trial Limit
						</div>
						<div className="text-sm text-center text-[#666]">
							Upgrade your plan to enjoy uninterrupted access and unlock all features.
							Don&apos;t miss out on the full experience!
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<PrimaryButton buttonText="Upgrade" btnClassName="!px-5" varient="gradient" />
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default BuyResumeAnalyzer;
