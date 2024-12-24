import { Dialog, DialogTitle } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideCustomModal } from 'store/sagaActions';
import { REPORT_MODAL } from 'constants/modalTypeConstant';
import ReportBox from './ReportBox';

const ReportModel = () => {
	const dispatch = useDispatch();

	const { customModalType } = useSelector((state) => state.modal);
	const hideModal = () => {
		dispatch(hideCustomModal());
	};
	return (
		<Dialog
			open={customModalType === REPORT_MODAL}
			onClose={hideModal}
			aria-labelledby="success-modal-title"
			aria-describedby="success-modal-description"
			fullWidth
			maxWidth="sm"
		>
			<div className="py-7 px-8">
				<DialogTitle id="success-modal-title" className="text-2xl font-medium p-0  ">
					Report job
					<div className="text-sm text-[#666]    ">Why are you reporting this?</div>
				</DialogTitle>
				<ReportBox withCancel />
			</div>
		</Dialog>
	);
};

export default ReportModel;
