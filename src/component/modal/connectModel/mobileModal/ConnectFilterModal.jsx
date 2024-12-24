import SideDrawer from 'component/common/drawer/Drawer';
import { CONNECT_FILTER_MOBILE } from 'constants/modalTypeConstant';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { hideCustomModal } from 'store/sagaActions';
import ConnectFilterForm from './ConnectFilterForm';

const ConnectFilterModal = () => {
	const dispatch = useDispatch();
	const { customModalType } = useSelector((state) => state.modal);

	return (
		<SideDrawer
			open={customModalType === CONNECT_FILTER_MOBILE}
			onClose={() => {
				dispatch(hideCustomModal());
			}}
			openFrom="bottom"
			width={'auto'}
			title={'Find People'}
			bodyClass={'h-auto px-2 pt-3'}
			drawerRadius={'12px'}
			drawerClass={'mt-4'}
		>
			<ConnectFilterForm />
		</SideDrawer>
	);
};

export default ConnectFilterModal;
