import { useSelector } from 'react-redux';

import CustomModal from '../CustomModal';

import UnlockModal from '../../jobs/jobDetails/subcomponents/UnlockModal';
import { LINKEDIN_UNLOCK } from 'constants/modalTypeConstant';

const LinkedinUnlock = ({ hideModal }) => {
	const { customModalType } = useSelector((state) => state.modal);

	const body = () => {
		return <UnlockModal />;
	};

	return (
		<CustomModal
			className=""
			onClose={hideModal}
			showModal={customModalType === LINKEDIN_UNLOCK}
			modalBody={body()}
		/>
	);
};

export default LinkedinUnlock;
