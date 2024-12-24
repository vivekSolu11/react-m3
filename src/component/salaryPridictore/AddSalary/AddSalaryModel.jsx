import { Dialog, DialogTitle } from '@mui/material';
import { ADD_SALARY } from 'constants/modalTypeConstant';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { hideCustomModal } from 'store/sagaActions';
import AddSalaryForm from './AddSalaryForm';

const AddSalary = ({ title, update }) => {
	const dispatch = useDispatch();
	const { customModalType } = useSelector((state) => state.modal);
	const hideModal = () => {
		dispatch(hideCustomModal());
	};

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
		<Dialog
			open={customModalType === ADD_SALARY}
			onClose={hideModal}
			aria-labelledby="success-modal-title"
			aria-describedby="success-modal-description"
			fullWidth
			maxWidth="md"
		>
			<DialogTitle id="success-modal-title">
				<div className="text-2xl">{title || 'Add your Salary'}</div>
				<div className="text-sm">Your input strengthens data reliability.</div>
			</DialogTitle>

			<AddSalaryForm update={update} setSalaryData={setSalaryData} salaryData={salaryData} />
		</Dialog>
	);
};

export default AddSalary;
