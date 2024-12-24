import SideDrawer from 'component/common/drawer/Drawer';
import { CUSTOMIZE_RESUME_MOBILE } from 'constants/modalTypeConstant';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { hideCustomModal } from 'store/sagaActions';
import CustomizeResumeModalBody from './body/CustomizeResumeModalBody';

const CustomizeResumeMobile = () => {
	const dispatch = useDispatch();
	const { customModalType } = useSelector((state) => state.modal);
	return (
		<SideDrawer
			open={customModalType === CUSTOMIZE_RESUME_MOBILE}
			onClose={() => {
				dispatch(hideCustomModal());
			}}
			openFrom="bottom"
			width={'auto'}
			HeaderCss={'!p-0 border-none'}
			iconCss={'hidden'}
			drawerRadius={'12px'}
			bodyClass={'h-auto border-t-[8px] '}
		>
			<CustomizeResumeModalBody />
		</SideDrawer>
	);
};

export default CustomizeResumeMobile;
