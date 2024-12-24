import SideDrawer from 'component/common/drawer/Drawer';
import { FIND_QUES_MOBILE } from 'constants/modalTypeConstant';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { hideCustomModal } from 'store/sagaActions';
import FindQuesForm from './FindQuesForm';

const FindQuesModal = () => {
	const dispatch = useDispatch();
	const { customModalType } = useSelector((state) => state.modal);

	return (
		<SideDrawer
			open={customModalType === FIND_QUES_MOBILE}
			onClose={() => {
				dispatch(hideCustomModal());
			}}
			openFrom="bottom"
			width={'auto'}
			title={'Find Question'}
			bodyClass={'h-[calc(100vh-650px)]  px-2 pt-3'}
			drawerRadius={'12px'}
		>
			<FindQuesForm />
		</SideDrawer>
	);
};

export default FindQuesModal;
