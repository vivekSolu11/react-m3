import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { hideCustomModal } from 'store/sagaActions';
import { ALERT_MODAL } from 'constants/modalTypeConstant';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';

const AlertModal = () => {
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
		<>
			<Dialog
				open={customModalType === ALERT_MODAL}
				onClose={hideModal}
				aria-labelledby="success-modal-title"
				aria-describedby="success-modal-description"
				fullWidth
				sx={{
					'& .MuiPaper-root': {
						maxWidth: '400px',
						width: '100%',
					},
				}}
			>
				<div className="p-4 pb-6">
					<DialogTitle
						id="success-modal-title"
						className="text-2xl font-medium leading-6 text-center text-[#121212]"
					>
						{tempCustomModalData?.title}
					</DialogTitle>
					<DialogContent className="flex items-center justify-center text-center font-normal text-[14px]">
						{tempCustomModalData?.description}
					</DialogContent>
					<DialogActions className="justify-center gap-4">
						<PrimaryButton
							handleClick={hideModal}
							buttonText="Cancel"
							varient="primaryOutline"
							sx={{
								fontSize: '14px',
							}}
						/>
						<PrimaryButton
							handleClick={handleConfirm}
							buttonText="Confirm"
							varient="primary"
							sx={{
								fontSize: '14px',
							}}
						/>
					</DialogActions>
				</div>
			</Dialog>
		</>
	);
};

export default AlertModal;
