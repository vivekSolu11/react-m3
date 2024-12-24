import SideDrawer from 'component/common/drawer/Drawer';
import { SHARE_MODAL_MOBILE } from 'constants/modalTypeConstant';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { hideCustomModal } from 'store/sagaActions';
import ShareModalForm from './ShareModalForm';

const ShareMobModal = () => {
	const dispatch = useDispatch();
	const { customModalType } = useSelector((state) => state.modal);

	return (
		<SideDrawer
			open={customModalType === SHARE_MODAL_MOBILE}
			onClose={() => {
				dispatch(hideCustomModal());
			}}
			openFrom="bottom"
			width={'auto'}
			title={'Share'}
			bodyClass={'h-[calc(100vh-750px)]  px-2 pt-3'}
			drawerRadius={'12px'}
		>
			<ShareModalForm />
		</SideDrawer>
	);
};

export default ShareMobModal;
