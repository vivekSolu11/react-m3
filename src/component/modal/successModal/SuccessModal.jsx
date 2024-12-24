import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { hideCustomModal } from 'store/sagaActions';
import { SUCCESS_MODAL } from 'constants/modalTypeConstant';

const SuccessModal = () => {
	const dispatch = useDispatch();
	const { customModalType, tempCustomModalData } = useSelector((state) => state.modal);

	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	const handleConfirm = () => {
		if (tempCustomModalData?.success) tempCustomModalData?.success();
		dispatch(hideCustomModal());
	};

	return (
		<Dialog
			open={customModalType === SUCCESS_MODAL}
			onClose={hideModal}
			aria-labelledby="success-modal-title"
			aria-describedby="success-modal-description"
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle id="success-modal-title">{tempCustomModalData?.title}</DialogTitle>
			<DialogContent>
				<div className="modal_body">
					<div className="content">{tempCustomModalData?.body}</div>
				</div>
			</DialogContent>
			<DialogActions>
				{tempCustomModalData?.showCancel && (
					<Button onClick={hideModal} color="secondary">
						Cancel
					</Button>
				)}
				<Button onClick={handleConfirm} variant="contained" color="primary">
					{tempCustomModalData?.submitText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default SuccessModal;
