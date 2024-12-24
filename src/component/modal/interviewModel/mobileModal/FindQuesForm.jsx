import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { hideCustomModal } from 'store/sagaActions';

import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import SearchableDropdown from 'component/common/searchabledropdown';
import {
	updateCompnay,
	updatedCurrentPositionForInterview,
} from 'store/reducer/InterviewQuestion/InterviewQuestion';
import { useSelector } from 'react-redux';

const FindQuesForm = () => {
	const dispatch = useDispatch();
	const [data, setdata] = useState({ compnay: null, job: null });
	const hideModal = () => {
		dispatch(hideCustomModal());
	};
	const { selectedCurrentPositionForInterview, selectedCompany } = useSelector(
		(state) => state.InterviewQuestion
	);
	return (
		<div className={`mx-auto p-4 flex flex-col gap-5`}>
			{/* Job Title Dropdown */}
			<div className="flex flex-col gap-4">
				<SearchableDropdown
					inputClass={``}
					value={selectedCurrentPositionForInterview}
					handleChange={(e) => {
						setdata({ ...data, job: e });
						// dispatch(updatedCurrentPositionForInterview(e));
					}}
					url="interview-questions/designation"
					placeholder="Job TItle"
					boxClassName="w-[200px] bg-white"
				/>
				<SearchableDropdown
					inputClass={``}
					value={selectedCompany}
					handleChange={(e) => {
						setdata({ ...data, compnay: e });
						// dispatch(updateCompnay(e));
					}}
					url="interview-questions/company"
					placeholder="Company"
					boxClassName="w-[200px] bg-white"
				/>
			</div>

			{/* Cancel and Continue Buttons */}
			<div className="flex justify-between gap-2">
				{/* Cancel Button amd continue*/}
				<PrimaryButton
					handleClick={hideModal}
					fullWidth
					buttonText="Cancel"
					varient="seconderyOutline"
					btnClassName="!px-[10px] !py-[20px] !border-none !text-[#0E8712] !rounded-lg"
				/>
				<PrimaryButton
					handleClick={() => {
						dispatch(updateCompnay(data?.compnay || selectedCompany));
						dispatch(
							updatedCurrentPositionForInterview(
								data?.job || selectedCurrentPositionForInterview
							)
						);
						hideModal();
					}}
					fullWidth
					buttonText="Continue"
					varient="primary"
					btnClassName="!px-[10px] !py-[20px] !rounded-lg !text-[#1A1A1A]"
				/>
			</div>
		</div>
	);
};

export default FindQuesForm;
