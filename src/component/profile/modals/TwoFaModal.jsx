import React from 'react';
import CustomModal from 'component/modal/CustomModal';
import { TWO_FA_MODAL } from 'constants/modalTypeConstant';
import { useSelector } from 'react-redux';
import TwoFaBody from '../subcomponents/TwoFaBody';

const TwoFaModal = ({ hideModal }) => {
	const { customModalType } = useSelector((state) => state.modal);

	const body = () => {
		return <TwoFaBody />;
	};
	return (
		<CustomModal
			modalBodyClass=" w-full mx-auto  sm:max-w-[514px] rounded-[12px]"
			onClose={hideModal}
			modalBody={body()}
			showModal={customModalType === TWO_FA_MODAL}
		/>
	);
};

export default TwoFaModal;
