import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { hideCustomModal } from 'store/sagaActions';
import { PAYMENT_SUCCESS } from 'assets/images';
import { PAYMENT_SUCCESS_MODAL } from 'constants/modalTypeConstant';

const PaymentSuccessModal = () => {
	const dispatch = useDispatch();
	const { customModalType } = useSelector((state) => state.modal);

	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	return (
		<Dialog
			open={customModalType === PAYMENT_SUCCESS_MODAL}
			onClose={hideModal}
			aria-labelledby="success-modal-title"
			aria-describedby="success-modal-description"
			fullWidth
			sx={{
				'& .MuiPaper-root': {
					position: 'relative',
					boxShadow: 'none',
					width: '484px',
					background: 'transparent', // Make the outer background transparent for gradient
					borderRadius: '12px', // Ensures rounded corners
					padding: '1px', // Adds space for the border
					overflow: 'hidden', // Ensures content respects border radius
					'&:before': {
						content: '""',
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						zIndex: -1,
						background: 'linear-gradient(180deg, #BEF99C 0%, #89D4FD 100%)',
						borderRadius: 'inherit', // Match parent border-radius
					},
				},
			}}
		>
			<div
				style={{
					borderRadius: '12px', // Ensures inner content respects the same radius
					backgroundColor: '#FFFFFF', // White background for the content area
				}}
				className="flex items-center flex-col"
			>
				<DialogContent className="items-center flex flex-col px-4 mt-[67px] mb-10 w-full">
					<img src={PAYMENT_SUCCESS} alt="success" height={106} width={106} />
				</DialogContent>
			</div>
		</Dialog>
	);
};

export default PaymentSuccessModal;
