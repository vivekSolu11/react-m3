import { useSelector } from 'react-redux';

import CustomModal from 'component/modal/CustomModal';
import { LOGOUT_MODAL } from 'constants/modalTypeConstant';
import Logout from '../logout/Logout';

const LogoutModal = () => {
	const { customModalType } = useSelector((state) => state.modal);

	const body = () => {
		return <Logout />;
	};

	return (
		<CustomModal className="" showModal={customModalType === LOGOUT_MODAL} modalBody={body()} />
	);
};

export default LogoutModal;
