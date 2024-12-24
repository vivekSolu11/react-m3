import { useSelector } from 'react-redux';

import CustomModal from '../CustomModal';
import SuccessModal from 'component/jobs/jobDetails/subcomponents/SuccessModal';

import { LINKEDIN_SUCCESS } from '../../../constants/modalTypeConstant';

const LinkedinSuccess = ({ hideModal }) => {
	const { customModalType } = useSelector((state) => state.modal);

	const body = () => {
		return <SuccessModal />;
	};

	return (
		<CustomModal
			className=""
			modalSize=""
			onClose={hideModal}
			showModal={customModalType === LINKEDIN_SUCCESS}
			modalBody={body()}
		/>
	);
};

export default LinkedinSuccess;
