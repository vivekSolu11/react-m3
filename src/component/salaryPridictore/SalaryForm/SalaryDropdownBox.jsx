import LocationInput from 'component/common/locationDropdown';
import SearchableDropdown from 'component/common/searchabledropdown';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateSalary } from 'store/reducer/salary/salarySlice';

const SalaryDropdownBox = ({ refetch, fromDetails, model = false, hide }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { selectedJobTitle, selectedCompany, selectedLocation } = useSelector(
		(state) => state.salary
	);
	const handleContinueClick = () => {
		if (fromDetails) {
			refetch();
			hide();
		} else {
			if (selectedCompany?._id && selectedJobTitle?._id && selectedLocation?.city) {
				navigate('/salary-pridictore/details');
			}
		}
	};

	return (
		<div
			className={`${model ? 'flex' : !fromDetails ? 'flex' : 'hidden'} w-full md:flex flex-col items-center gap-3`}
		>
			<div
				className={`${model ? 'flex flex-col' : !fromDetails ? 'flex flex-col' : 'hidden'}  w-full md:grid grid-cols-1 md:grid-cols-3 gap-4 `}
			>
				<SearchableDropdown
					label="Job Title"
					inputClass={``}
					value={selectedJobTitle}
					handleChange={(e) => {
						dispatch(updateSalary({ selectedJobTitle: e }));
					}}
					url="salary-predictor/designations"
					placeholder="Job TItle"
				/>
				<SearchableDropdown
					label="Company"
					inputClass={``}
					value={selectedCompany}
					handleChange={(e) => {
						dispatch(updateSalary({ selectedCompany: e }));
					}}
					url="salary-predictor/companies"
					placeholder="Companies"
				/>
				<LocationInput
					inputClass={``}
					value={selectedLocation}
					handleChange={(e) => {
						if (Object.keys(e).length) {
							dispatch(updateSalary({ selectedLocation: e }));
						} else {
							dispatch(updateSalary({ selectedLocation: e }));
						}
					}}
					label={'Location'}
				/>
			</div>
			<div className="flex w-full gap-2 items-center justify-center">
				<PrimaryButton
					fullWidth
					handleClick={hide}
					varient="seconderyOutline"
					buttonText="Close"
					btnClassName={`${model ? 'flex' : 'hidden'} `}
				/>
				<PrimaryButton
					fullWidth={model}
					handleClick={handleContinueClick}
					buttonText="Search"
				/>
			</div>
		</div>
	);
};

export default SalaryDropdownBox;
