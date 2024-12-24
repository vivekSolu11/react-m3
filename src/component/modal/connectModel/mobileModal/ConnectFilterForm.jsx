import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideCustomModal } from 'store/sagaActions';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import SearchableDropdown from 'component/common/searchabledropdown';
import LocationInput from 'component/common/locationDropdown';
import { updateconnectValue } from 'store/reducer/connect/connectSlice';

const ConnectFilterForm = () => {
	const dispatch = useDispatch();
	const { selectedJobTitle, selectedCompany, selectedLocation } = useSelector(
		(state) => state.connect
	);

	// Local state to store user input temporarily
	const [localJobTitle, setLocalJobTitle] = useState(selectedJobTitle);
	const [localCompany, setLocalCompany] = useState(selectedCompany);
	const [localLocation, setLocalLocation] = useState(selectedLocation);

	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	const handleContinue = () => {
		dispatch(updateconnectValue({ selectedJobTitle: localJobTitle }));
		dispatch(updateconnectValue({ selectedCompany: localCompany }));
		dispatch(updateconnectValue({ selectedLocation: localLocation }));

		// Close the modal after updating values
		hideModal();
	};

	return (
		<div className="mx-auto p-4 flex flex-col gap-5">
			{/* Job Title Dropdown */}
			<div className="flex flex-col gap-4">
				<SearchableDropdown
					label="Job Title"
					inputClass=""
					value={localJobTitle}
					// handleChange={(e) => {
					//   dispatch(updateconnectValue({ selectedJobTitle: e }));
					// }}
					handleChange={(e) => setLocalJobTitle(e)}
					url="connect/job-title"
					placeholder="Job Title"
				/>
				<SearchableDropdown
					label="Company"
					inputClass=""
					value={localCompany}
					// handleChange={(e) => {
					//   dispatch(updateconnectValue({ selectedCompany: e }));
					// }}
					handleChange={(e) => setLocalCompany(e)}
					url="connect/companies"
					placeholder="Companies"
				/>
				<LocationInput
					inputClass=""
					value={localLocation}
					// handleChange={(e) => {
					//   if (Object.keys(e).length) {
					//     dispatch(updateconnectValue({ selectedLocation: e }));
					//   } else {
					//     dispatch(updateconnectValue({ selectedLocation: e }));
					//   }
					// }}
					handleChange={(e) => {
						setLocalLocation(e);
						dispatch(updateconnectValue({ selectedLocation: e }));
					}}
					label="Location"
				/>
			</div>

			{/* Cancel and Continue Buttons */}
			<div className="flex justify-between gap-2">
				<PrimaryButton
					handleClick={hideModal}
					fullWidth
					buttonText="Cancel"
					varient="seconderyOutline"
					btnClassName="!px-[10px] !py-[20px] !border-none !text-[#0E8712] !rounded-lg"
				/>
				<PrimaryButton
					handleClick={handleContinue} // Trigger the updates and close modal
					fullWidth
					buttonText="Continue"
					varient="primary"
					btnClassName="!px-[10px] !py-[20px] !rounded-lg !text-[#1A1A1A]"
				/>
			</div>
		</div>
	);
};

export default ConnectFilterForm;
