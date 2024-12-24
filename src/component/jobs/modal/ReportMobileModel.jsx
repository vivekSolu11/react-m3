import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SideDrawer from 'component/common/drawer/Drawer';
import { hideCustomModal } from 'store/sagaActions';
import { REPORT_MOBILE_MODAL } from 'constants/modalTypeConstant';
import ReportBox from './ReportBox';

const ReportMobileModel = () => {
	const dispatch = useDispatch();

	const { customModalType } = useSelector((state) => state.modal);
	const hideModal = () => {
		dispatch(hideCustomModal());
	};
	return (
		<SideDrawer
			open={customModalType === REPORT_MOBILE_MODAL}
			onClose={() => {
				hideModal();
			}}
			openFrom="bottom"
			width={'auto'}
			bodyClass={'h-auto px-2'}
			title={'Report job'}
			desc={'Why are you reporting this?'}
		>
			<ReportBox />
		</SideDrawer>
	);
};

export default ReportMobileModel;
