import { Dialog, DialogActions, DialogContent, IconButton } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideCustomModal, showCustomModal } from 'store/sagaActions';
import { LINKDINCONNECTMODAL, LINKEDIN_MESSAGE } from 'constants/modalTypeConstant';
import CloseIcon from 'assets/SVGs/CloseIcon';
import { UPARROWICON } from 'assets/images';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';

import './index.css';

const LinkedinModal = () => {
	const dispatch = useDispatch();

	const { customModalType } = useSelector((state) => state.modal);

	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	const handleOpenCareer = () => {
		dispatch(
			showCustomModal({
				customModalType: LINKEDIN_MESSAGE,
			})
		);
	};

	return (
		<Dialog
			open={customModalType === LINKDINCONNECTMODAL}
			onClose={hideModal}
			aria-labelledby="success-modal-title"
			aria-describedby="success-modal-description"
			fullWidth
			// maxWidth="sm"
			className="w-[100%] mx-auto"
			sx={{
				'& .MuiPaper-root': {
					boxShadow: 'none',
					width: '484px',
					//   height: '354px',
					background: '#FFFFFF',
					borderRadius: '12px',
				},
			}}
		>
			<div className="flex items-center flex-col">
				<IconButton
					aria-label="close"
					onClick={hideModal}
					sx={() => ({
						position: 'absolute',
						right: 8,
						top: 8,
						backgroundColor: '#FFF5F6',
						padding: 0,
					})}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent className=" items-center flex flex-col px-4 mt-[67px] mb-10 w-full ">
					<img src={UPARROWICON} />

					<div className="items-center flex-col gap-4 mt-4">
						<div className="text-2xl font-medium text-center tracking-tight text-[#000000]">
							Redirecting to LinkedIn
						</div>
						<div className="text-base font-normal text-center text-[#666666]">
							By clicking connect you will be redirected to LinkedIn.
						</div>
					</div>
				</DialogContent>

				<div
					style={{
						width: '100%',
						borderTop: '1px solid #00000033',
					}}
				>
					<DialogActions
						sx={{
							display: 'flex',
							padding: '0px',
							gap: '16px',
							margin: '16px',
						}}
					>
						{/* Cancel Button amd continue*/}
						<PrimaryButton
							handleClick={hideModal}
							fullWidth
							buttonText="Cancel"
							varient="seconderyOutline"
							btnClassName="!px-[20px] !py-[10px] !border-black !text-black !rounded-lg"
						/>
						<PrimaryButton
							fullWidth
							buttonText="Continue"
							varient="primary"
							handleClick={handleOpenCareer}
							btnClassName="!px-[20px] !py-[10px] !rounded-lg"
						/>
					</DialogActions>
				</div>
			</div>
		</Dialog>
	);
};

export default LinkedinModal;
