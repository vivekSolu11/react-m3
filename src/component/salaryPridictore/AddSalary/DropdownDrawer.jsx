import SideDrawer from 'component/common/drawer/Drawer';
import { SALARY_FILTER_MOBILE } from 'constants/modalTypeConstant';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { hideCustomModal } from 'store/sagaActions';
import SalaryDropdownBox from '../SalaryForm/SalaryDropdownBox';

const DropdownDrawer = ({ refetch }) => {
	const dispatch = useDispatch();
	const { customModalType } = useSelector((state) => state.modal);
	const hide = () => {
		dispatch(hideCustomModal());
	};
	return (
		<SideDrawer
			open={customModalType === SALARY_FILTER_MOBILE}
			onClose={() => {
				hide();
			}}
			openFrom="bottom"
			width={'auto'}
			title={'Find salary'}
			bodyClass={'!h-[370px]  px-2 pt-3'}
		>
			<SalaryDropdownBox fromDetails refetch={refetch} model hide={hide} />
		</SideDrawer>
	);
};

export default DropdownDrawer;
