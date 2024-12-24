import SideDrawer from 'component/common/drawer/Drawer';
import { ADD_SALARY_MOBILE } from 'constants/modalTypeConstant';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { hideCustomModal } from 'store/sagaActions';
import AddSalaryForm from './AddSalaryForm';

const AddSalaryModel = ({ title, update }) => {
	const dispatch = useDispatch();
	const { customModalType } = useSelector((state) => state.modal);

	const [salaryData, setSalaryData] = useState({
		jobTitle: null,
		company: null,
		location: null,
		positionLevel: ' ',
		employmentType: ' ',
		experienceType: '',
		startDate: '',
		endDate: '',
		stillEmployed: false,
		salary: {
			amount: 0,
			currency: 'INR',
			frequency: '',
		},
		gender: '',
		age: 0,
		degree: null,
		college: {
			name: '',
		},
	});

	return (
		<SideDrawer
			open={customModalType === ADD_SALARY_MOBILE}
			onClose={() => {
				dispatch(hideCustomModal());
			}}
			openFrom="bottom"
			width={'auto'}
			title={title || 'Add your Salary'}
			bodyClass={'h-[calc(100vh-100px)]  px-2 pt-3'}
		>
			<AddSalaryForm update={update} setSalaryData={setSalaryData} salaryData={salaryData} />
		</SideDrawer>
	);
};

export default AddSalaryModel;
