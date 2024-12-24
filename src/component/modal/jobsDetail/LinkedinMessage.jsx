import { useSelector } from 'react-redux';
import CustomModal from '../CustomModal';
import { LINKEDIN_MESSAGE } from '../../../constants/modalTypeConstant';
import MessageTemplate from 'component/jobs/jobDetails/subcomponents/MessageTemplate';

const LinkedMessage = ({ hideModal }) => {
	const { customModalType } = useSelector((state) => state.modal);

	const body = () => {
		return <MessageTemplate />;
	};

	return (
		<CustomModal
			className=""
			onClose={hideModal}
			modalBodyClass="w-[90%] mx-auto  sm:max-w-[502px]"
			showModal={customModalType === LINKEDIN_MESSAGE}
			modalBody={body()}
		/>
	);
};
export default LinkedMessage;
