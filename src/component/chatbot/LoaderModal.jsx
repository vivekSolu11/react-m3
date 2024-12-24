import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Typography } from '@mui/material';

import { PREFERENCE_MODAL } from 'constants/modalTypeConstant';
import { PREFERENCE } from 'assets/images';
import AnalyzerLoader from 'component/modal/resumeAnalyzer/AnalyzerLoader';

const LoaderModal = ({ widthMax = 'sm', className, MUiMargin, borderRadius }) => {
	// const dispatch = useDispatch();
	const { customModalType, tempCustomModalData } = useSelector((state) => state.modal);

	// const hideModal = () => {
	//   dispatch(hideCustomModal());
	// };

	// Loader content based on `body` prop
	// const LoaderContent = () => {
	//   return <div>{body}</div>;
	// };

	// const handleConfirm = () => {
	//   if (tempCustomModalData?.success) tempCustomModalData?.success();
	//   dispatch(hideCustomModal());
	// };

	return (
		<Dialog
			open={customModalType === PREFERENCE_MODAL}
			// onClose={hideModal}
			aria-labelledby="success-modal-title"
			aria-describedby="success-modal-description"
			fullWidth
			// maxWidth="sm"
			sx={{
				'& .MuiDialog-paper': {
					maxWidth: tempCustomModalData?.widthMax || widthMax, // Set the max width to 768px
					width: '100%', // Ensure it doesn't exceed the screen width
					borderRadius: borderRadius || tempCustomModalData?.borderRadius,
				},
				'& .MuiDialogContent-root': {
					padding: 0,
				},
				'& .MuiPaper-root': {
					margin: MUiMargin || tempCustomModalData?.MUiMargin,
					opacity: !tempCustomModalData?.modalType ? 0 : 1,
				},
			}}
		>
			<DialogContent
				sx={{
					alignItems: 'center',
					display: 'flex',
					gap: 2,
					flexDirection: 'column',
				}}
				className={`pt-12 px-5  ${className} ${tempCustomModalData?.className}`}
			>
				{tempCustomModalData?.modalType === 'ANALYZER' ? (
					<div>{<AnalyzerLoader />}</div>
				) : tempCustomModalData?.modalType === 'JOB_PREFRENCE' ? (
					<>
						<img
							src={PREFERENCE}
							className="w-[200px] lg:w-auto h-auto"
							alt="preference"
						/>
						<Typography className="text-center font-semibold text-base lg:text-2xl">
							Getting your personalized Jobs...
						</Typography>
					</>
				) : null}
			</DialogContent>
		</Dialog>
	);
};

export default LoaderModal;
