import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { closeAlert } from 'store/sagaActions';

const CustomSnackbar = () => {
	const dispatch = useDispatch();
	const {
		openAlert,
		alertMessage,
		alertStatus,
		className,
		textColor,
		textSize,
		isIcon = true,
	} = useSelector((state) => state.modal);

	const handleClose = () => {
		dispatch(closeAlert());
	};

	return (
		<Snackbar
			open={openAlert}
			className={`${className}`}
			autoHideDuration={3000}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
		>
			<Alert
				onClose={isIcon ? handleClose : ''}
				severity={alertStatus}
				icon={false}
				sx={{ width: '100%', color: textColor, fontSize: textSize }}
			>
				{alertMessage}
			</Alert>
		</Snackbar>
	);
};

export default CustomSnackbar;
