import { Dialog } from '@mui/material';
import CustomizeResumeModalBody from './body/CustomizeResumeModalBody';
import { useSelector } from 'react-redux';
import { CUSTOMIZE_RESUME_MODAL } from 'constants/modalTypeConstant';
import { hideCustomModal } from 'store/sagaActions';
import { useDispatch } from 'react-redux';

const CustomizeResumeModal = () => {
	const dispatch = useDispatch();
	const { customModalType } = useSelector((state) => state.modal);
	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	return (
		<Dialog
			open={customModalType === CUSTOMIZE_RESUME_MODAL}
			onClose={hideModal}
			aria-labelledby="success-modal-title"
			aria-describedby="success-modal-description"
			fullWidth
			className="w-full !max-w-full !mx-auto !md:max-w-[680px] "
			sx={{
				'& .MuiDialog-paper': {
					margin: '0px',
					width: '100%',
				},
			}}
		>
			<CustomizeResumeModalBody />
		</Dialog>
	);
};

export default CustomizeResumeModal;
