import React from 'react';
import { useNavigate } from 'react-router-dom';

import { INTERVIEW_IMG } from 'assets/images';

import InterviewFaq from '../interviewFAQ/InterviewFaq';
import SearchableDropdown from 'component/common/searchabledropdown';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
	updateCompnay,
	updatedCurrentPositionForInterview,
} from 'store/reducer/InterviewQuestion/InterviewQuestion';

const InterviewForm = () => {
	const { selectedCurrentPositionForInterview, selectedCompany } = useSelector(
		(state) => state.InterviewQuestion
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleContinueClick = () => {
		navigate('/interview/interviewquestion');
	};

	return (
		<div className="flex flex-col justify-center items-center gap-6 ">
			<div className="flex flex-col gap-5  bg-white rounded-2xl px-6 py-[62.5px] w-full text-center">
				<img src={INTERVIEW_IMG} alt="Networking" className="mx-auto" />

				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-4">
						<h1 className="text-2xl font-semibold text-[#1A1A1A] tracking-tight m-0">
							Interview Questions
						</h1>
						<p className="text-base font-normal tracking-tight leading-[22.4px] text-[#666666] m-0 max-w-[613px] text-center mx-auto">
							Explore the specific steps and resources needed to progress from your
							current position to your desired role.
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 gap-4">
							<SearchableDropdown
								label="Current Position"
								inputClass={``}
								value={selectedCurrentPositionForInterview}
								handleChange={(e) => {
									dispatch(updatedCurrentPositionForInterview(e));
								}}
								url="interview-questions/designation"
								placeholder="Job TItle"
							/>
							<SearchableDropdown
								label="Comapany"
								inputClass={``}
								value={selectedCompany}
								handleChange={(e) => {
									dispatch(updateCompnay(e));
								}}
								url="interview-questions/company"
								placeholder="Select Company"
							/>
						</div>
						<div className="flex justify-center items-center">
							<button
								type="button"
								onClick={handleContinueClick}
								className="w-full md:w-[88px] h-[46px] bg-[#76FF7A] py-[15px] px-[20px] !leading-4 rounded-lg shadow-sm border-none text-[#373737] text-sm font-medium cursor-pointer "
							>
								Search
							</button>
						</div>
					</div>
				</div>
			</div>
			<InterviewFaq />
		</div>
	);
};

export default InterviewForm;
