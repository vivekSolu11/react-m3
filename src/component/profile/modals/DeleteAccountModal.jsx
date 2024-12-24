import CustomModal from 'component/modal/CustomModal';
import { DELETE_ACCOUNT_MODAL } from 'constants/modalTypeConstant';
import React from 'react';
import { useSelector } from 'react-redux';
import DeleteAccountModalBody from '../subcomponents/DeleteAccountModalBody';

const DeleteAccountModal = ({ hideModal }) => {
	const { customModalType } = useSelector((state) => state.modal);
	const body = () => {
		return <DeleteAccountModalBody />;
	};
	return (
		<CustomModal
			modalBodyClass=" w-full mx-auto overflow-hidden  sm:max-w-[484px] rounded-[12px]"
			onClose={hideModal}
			modalBody={body()}
			showModal={customModalType === DELETE_ACCOUNT_MODAL}
		/>
	);
};

export default DeleteAccountModal;
