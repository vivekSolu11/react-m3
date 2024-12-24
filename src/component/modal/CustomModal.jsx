import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import './index.css';

const CustomModal = (props) => {
	const { className = '', showModal = false, modalBody, onClose, modalBodyClass = '' } = props;

	// Define styles for the modal
	const style = {
		position: 'absolute',
		borderRadius: '8px',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		// width: '100%',
		// maxWidth:modalSize ,
		bgcolor: 'background.paper',
		outline: 'none',
		'&:focus-visible': {
			outline: 'none',
		},
	};

	return (
		<Modal
			open={showModal}
			onClose={onClose}
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
			className={className}
		>
			<Box sx={style} className={modalBodyClass}>
				{modalBody}
			</Box>
		</Modal>
	);
};

export default CustomModal;
