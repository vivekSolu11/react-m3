import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { InputLabel, RadioGroup, Switch } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useQueryAPI } from 'apis/query';
import AccordianTab from 'component/chatbot/AccordianTab';
import CustomDropdown from 'component/common/dropdown';
import LocationInput from 'component/common/locationDropdown';
import SearchableDropdown from 'component/common/searchabledropdown';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import CustomInputField from 'component/customComponents/inputField';
import RadioButton from 'component/customComponents/RadioButton';
import { THANK_YOU_MODAL } from 'constants/modalTypeConstant';
import { hideCustomModal, showCustomModal } from 'store/sagaActions';

import styles from './salaryForm.module.css';
import { useMutationAPI } from 'apis/mutation';
import moment from 'moment';
import Loader from 'component/common/Loader';

function deleteKeys(obj) {
	// List of keys to delete
	const keysToDelete = ['updatedAt', 'createdAt', '_user'];

	// Iterate over each key in the list and delete it if it exists in the object
	keysToDelete.forEach((key) => {
		// eslint-disable-next-line no-prototype-builtins
		if (obj.hasOwnProperty(key)) {
			delete obj[key];
		}
	});

	return obj;
}

const AddSalaryForm = ({ update = false, salaryData, setSalaryData }) => {
	const dispatch = useDispatch();
	const {
		fetchSalaryFormPosition,
		fetchGender,
		fetchSalaryFormJobType,
		fetchGetSalaryDetails,
		fetchPayFrequency,
	} = useQueryAPI();
	const { addSalary, updateSalary } = useMutationAPI();
	const [expanded, setExpanded] = useState(['job_details', 'work_Exp', 'salary', 'other']);

	const {
		data: salaryDetailsData,
		isFetching,
		isLoading,
		isPending: isgetDetails,
	} = useQuery({
		queryKey: ['fetchGetSalaryDetails'],
		queryFn: fetchGetSalaryDetails,
		enabled: update,
	});
	useEffect(() => {
		if (salaryDetailsData?.items) {
			setSalaryData(deleteKeys(salaryDetailsData?.items));
		}
	}, [salaryDetailsData]);

	const { data: positionData } = useQuery({
		queryKey: ['fetchSalaryFormPosition'],
		queryFn: fetchSalaryFormPosition,
		staleTime: 300000,
	});
	const { data: JobTypeData } = useQuery({
		queryKey: ['fetchSalaryFormJobType'],
		queryFn: fetchSalaryFormJobType,
		staleTime: 300000,
	});
	const { data: payFeqData } = useQuery({
		queryKey: ['fetchPayFrequency'],
		queryFn: fetchPayFrequency,
		staleTime: 300000,
	});
	const { data: genderData } = useQuery({
		queryKey: ['fetchGender'],
		queryFn: fetchGender,
		staleTime: 300000,
	});

	const handleChange = (panel) => {
		if (!expanded.includes(panel)) {
			setExpanded([...expanded, panel]);
		} else {
			const newData = expanded.filter((item) => item !== panel);
			setExpanded(newData);
		}
	};
	useEffect(() => {
		if (expanded.length === 0) {
			setExpanded(['job_details']);
		}
	}, [expanded]);

	const handleRadioChange = (value) => {
		setSalaryData({ ...salaryData, experienceType: value }); // Update selected role
	};

	const handleSalaryChange = (value) => {
		const salary = {
			...salaryData.salary,
			...value,
		};
		setSalaryData({ ...salaryData, salary: salary }); // Update selected role
	};
	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	const { mutate: handleAddSalary, isPending } = useMutation({
		mutationFn: (val) => addSalary(val),
		onSuccess: (data) => {
			if (data) {
				dispatch(
					showCustomModal({
						customModalType: THANK_YOU_MODAL,
					})
				);
				setSalaryData;
			}
		},
	});

	const { mutate: handleUPdateSalary, isPending: updatePending } = useMutation({
		mutationFn: (val) => updateSalary(val),
		onSuccess: (data) => {
			if (data) {
				dispatch(
					showCustomModal({
						customModalType: THANK_YOU_MODAL,
					})
				);
			}
		},
	});
	if (isgetDetails || isLoading || isFetching) {
		return <Loader />;
	}
	return (
		<div className="flex flex-col gap-5 md:px-5 pb-5 ">
			<div className="flex flex-col gap-5 h-[70%] md:h-[480px] overflow-hide overflow-y-auto">
				<AccordianTab
					title={'Job Details'}
					onChange={() => handleChange('job_details')}
					expanded={expanded.includes('job_details')}
					key={'job_details'}
					borderBottom={false}
					summeryclassName={
						'[&>.MuiAccordionSummary-content]:flex-grow-0 justify-start gap-3  '
					}
				>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<SearchableDropdown
							label="Job Title"
							inputClass={``}
							value={salaryData.jobTitle}
							handleChange={(e) => {
								setSalaryData({ ...salaryData, jobTitle: e });
							}}
							url="salary-predictor/designations"
							placeholder="Job TItle"
						/>{' '}
						<SearchableDropdown
							label="Comapny"
							inputClass={``}
							value={salaryData.company}
							handleChange={(e) => {
								setSalaryData({ ...salaryData, company: e });
							}}
							url="salary-predictor/companies"
							placeholder="Job TItle"
						/>{' '}
						<LocationInput
							inputClass={``}
							value={salaryData?.location}
							handleChange={(e) => {
								if (Object.keys(e).length) {
									setSalaryData({ ...salaryData, location: e });
								}
							}}
							label={'Location'}
						/>
						<CustomDropdown
							type="primary"
							fullWidth
							options={
								positionData?.length > 0
									? [
											...positionData.map((item) => ({
												value: item,
												label: item,
											})),
										]
									: []
							}
							value={salaryData?.positionLevel}
							onChange={(e) => {
								setSalaryData({ ...salaryData, positionLevel: e.target.value });
							}}
							label="Position Level"
						/>
						<CustomDropdown
							type="primary"
							fullWidth
							options={
								JobTypeData?.length > 0
									? [
											...JobTypeData.map((item) => ({
												value: item,
												label: item,
											})),
										]
									: []
							}
							value={salaryData?.employmentType}
							onChange={(e) => {
								setSalaryData({
									...salaryData,
									employmentType: e.target.value,
								});
							}}
							label="Employee Type"
						/>
					</div>
				</AccordianTab>
				<AccordianTab
					title={'Work Experience'}
					borderBottom={false}
					onChange={() => handleChange('work_Exp')}
					expanded={expanded.includes('work_Exp')}
					key={'work_Exp'}
					summeryclassName={
						'[&>.MuiAccordionSummary-content]:flex-grow-0 justify-start gap-3  '
					}
				>
					<div className="flex flex-col gap-6">
						<div className="flex gap-3 items-start md:items-center flex-col md:flex-row ">
							<RadioGroup
								aria-labelledby="demo-controlled-radio-buttons-group"
								name="controlled-radio-buttons-group"
								value={salaryData?.experienceType}
								row
								className="gap-3 "
								onChange={(e) => {
									handleRadioChange(e.target.value);
								}} // Update state when this is selected
							>
								<RadioButton
									ClassName={'!w-fit'}
									label={'New Joiner'}
									value="New Joiner"
								/>
								<RadioButton
									ClassName={'!w-fit'}
									label={'Employee'}
									value="Employee"
								/>
							</RadioGroup>
							<span className="h-4 w-[2px] hidden md:flex border border-solid border-lightgray" />

							<div className="flex gap-2 items-center">
								<div className="w-fit">Still employed here?</div>
								<Switch
									onChange={(e) => {
										setSalaryData({
											...salaryData,
											stillEmployed: e.target.checked,
										});
									}}
									checked={salaryData?.stillEmployed}
								/>
							</div>
						</div>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<div className="flex flex-col gap-1">
								<span className="font-medium text-[#666]">Start Date</span>
								<div
									className={`${styles.fields} h-12 cursor-pointer relative rounded   border-[#0000003b]  !py-2`}
								>
									<input
										type="date"
										id="modified"
										className={styles.datePicker}
										value={salaryData?.startDate}
										onChange={(e) => {
											setSalaryData({
												...salaryData,
												startDate: e.target.value,
											});
										}}
									/>
									<span className="z-0 cursor-pointer w-full">
										{salaryData?.startDate
											? moment(salaryData.startDate).format('L')
											: 'Start Date'}
									</span>
								</div>
							</div>

							<div className="flex flex-col gap-1">
								<span className="font-medium text-[#666]">End Date</span>

								<div
									className={`${styles.fields} h-12 cursor-pointer relative rounded   border-[#0000003b]  !py-2`}
								>
									<input
										type="date"
										id="modified"
										className={styles.datePicker}
										value={salaryData?.endDate}
										onChange={(e) => {
											setSalaryData({
												...salaryData,
												endDate: e.target.value,
											});
										}}
									/>
									<span className="z-0 cursor-pointer w-full">
										{salaryData?.endDate
											? moment(salaryData.endDate).format('L')
											: 'End Date'}
									</span>
								</div>
							</div>
						</div>
					</div>
				</AccordianTab>
				<AccordianTab
					title={'Salary Details'}
					borderBottom={false}
					onChange={() => handleChange('salary')}
					expanded={expanded.includes('salary')}
					key={'salary'}
					summeryclassName={
						'[&>.MuiAccordionSummary-content]:flex-grow-0 justify-start gap-3  '
					}
				>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div className="flex flex-col gap-2">
							<InputLabel sx={{ color: '#666', fontWeight: 500 }}>Salary</InputLabel>
							<CustomInputField
								// label="Salary"
								type="number"
								onChange={(e) => {
									handleSalaryChange({ amount: Number(e.target.value) });
								}}
								name="email"
								value={salaryData?.salary?.amount}
							/>
						</div>
						<CustomDropdown
							type="primary"
							fullWidth
							options={
								payFeqData?.length > 0
									? [
											...payFeqData.map((item) => ({
												value: item,
												label: item,
											})),
										]
									: []
							}
							value={salaryData?.salary?.frequency}
							onChange={(e) => {
								handleSalaryChange({ frequency: e.target.value });
							}}
							label="Pay Frequency"
						/>
					</div>
				</AccordianTab>
				<AccordianTab
					title={'Other Details (Optional)'}
					borderBottom={false}
					onChange={() => handleChange('other')}
					expanded={expanded.includes('other')}
					key={'other'}
					summeryclassName={
						'[&>.MuiAccordionSummary-content]:flex-grow-0 justify-start gap-3  '
					}
				>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<CustomDropdown
							type="primary"
							fullWidth
							options={
								genderData?.length > 0
									? [
											...genderData.map((item) => ({
												value: item,
												label: item,
											})),
										]
									: []
							}
							value={salaryData?.gender}
							onChange={(e) => {
								setSalaryData({
									...salaryData,
									gender: e.target.value,
								});
							}}
							// dropdownClass="text-[12px] font-medium leading-[18px] tracking-[-0.02em] text-left text-[#333333]"
							label="Gender"
						/>
						<div className="flex flex-col gap-2">
							<InputLabel sx={{ color: '#666', fontWeight: 500 }}>Age</InputLabel>
							<CustomInputField
								type="number"
								onChange={(e) => {
									setSalaryData({
										...salaryData,
										age: Number(e.target.value),
									});
								}}
								value={salaryData?.age}
								name="age"
							/>
						</div>
						<SearchableDropdown
							label="Degree"
							inputClass={``}
							value={salaryData?.degree}
							handleChange={(e) => {
								setSalaryData({
									...salaryData,
									degree: e,
								});
							}}
							url="salary-predictor/degrees"
							placeholder="Degrees"
						/>
						<div className="flex flex-col gap-2">
							<InputLabel sx={{ color: '#666', fontWeight: 500 }}>Collage</InputLabel>
							<CustomInputField
								type="text"
								value={salaryData?.college?.name}
								onChange={(e) => {
									setSalaryData({
										...salaryData,
										college: { name: e.target.value },
									});
								}}
								name="Collage"
							/>
						</div>
					</div>
				</AccordianTab>
			</div>
			<div className="flex justify-end gap-4">
				<PrimaryButton
					buttonText="Cancel"
					loading={updatePending}
					varient="primaryOutline"
					handleClick={() => {
						hideModal();
					}}
				/>
				<PrimaryButton
					buttonText="Submit"
					loading={isPending}
					handleClick={() => {
						if (update) {
							handleUPdateSalary(salaryData);
						} else {
							handleAddSalary(salaryData);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default AddSalaryForm;
