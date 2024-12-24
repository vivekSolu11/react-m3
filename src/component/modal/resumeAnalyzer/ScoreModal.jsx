import React from 'react';
import CustomModal from '../CustomModal';
import { SCORE_MODAL } from 'constants/modalTypeConstant';
import { useSelector } from 'react-redux';
import ScoreModalBody from 'component/resumeAnalyzer/modalBody/ScoreModalBody';

const ScoreModal = ({ hideModal, Comparision = false }) => {
	const { customModalType } = useSelector((state) => state.modal);

	const body = () => {
		return <ScoreModalBody Comparision={Comparision} closeModal={hideModal} />;
	};
	return (
		<CustomModal
			className=""
			onClose={hideModal}
			modalBodyClass=" w-full mx-auto  sm:max-w-[748px] rounded-[24px]"
			showModal={customModalType === SCORE_MODAL}
			modalBody={body()}
		/>
	);
};

export default ScoreModal;
