import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CONNECT_IMG } from 'assets/images';
import ConnectFaq from '../connectFaq/ConnectFaq';
import SearchableDropdown from 'component/common/searchabledropdown';
import LocationInput from 'component/common/locationDropdown';

import '../../connect/connect.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateconnectValue } from 'store/reducer/connect/connectSlice';

const ConnectForm = () => {
	const dispatch = useDispatch();
	const { selectedJobTitle, selectedCompany, selectedLocation } = useSelector(
		(state) => state.connect
	);
	const navigate = useNavigate();

	const handleContinueClick = () => {
		navigate('/connect/cardlist');
	};

	return (
		<div className="flex flex-col justify-center items-center gap-6 w-full ">
			<div className="flex flex-col gap-9  bg-white rounded-2xl  w-full text-center md:p-6 pt-5 px-4 pb-4">
				<img src={CONNECT_IMG} alt="Networking" className="mx-auto" />

				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-4">
						<h1 className="text-2xl font-semibold text-[#1A1A1A] tracking-tight m-0">
							Connect
						</h1>

						{/* Hide these two <p> tags on small screens */}
						<p className="text-base font-normal tracking-tight leading-[22.4px] text-[#666666] m-0 hidden md:block">
							You know, networking and getting a referral from professionals working
							in your dream jobs increases your chances of conversion by 72%.
						</p>
						<p className="text-base font-normal tracking-tight leading-[22.4px] text-[#666666] m-0 hidden md:block">
							Hunt and connect with like-minded professionals and begin your journey
							of Networking.
						</p>

						{/* Show this line only on small screens */}
						<p className="text-base font-normal tracking-tight leading-[22.4px] text-[#666666] m-0 block md:hidden">
							Hunt and connect with like-minded professionals and begin your journey
							of Networking.
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<SearchableDropdown
								label="Job Title"
								inputClass={``}
								value={selectedJobTitle}
								handleChange={(e) => {
									dispatch(updateconnectValue({ selectedJobTitle: e }));
								}}
								url="connect/job-title"
								placeholder="Job TItle"
							/>
							<SearchableDropdown
								label="Company"
								inputClass={``}
								value={selectedCompany}
								handleChange={(e) => {
									dispatch(updateconnectValue({ selectedCompany: e }));
								}}
								url="connect/companies"
								placeholder="Companies"
							/>
							<LocationInput
								inputClass={``}
								value={selectedLocation}
								handleChange={(e) => {
									if (Object.keys(e).length) {
										dispatch(updateconnectValue({ selectedLocation: e }));
									} else {
										dispatch(updateconnectValue({ selectedLocation: e }));
									}
								}}
								label={'Location'}
							/>
						</div>
						<div className="flex justify-center items-center">
							<button
								type="button"
								onClick={handleContinueClick}
								className="w-full md:w-[102px] h-[46px] bg-[#76FF7A] py-[15px] px-[20px] !leading-4 rounded-lg shadow-sm border-none text-[#373737] text-sm font-medium cursor-pointer"
							>
								Continue
							</button>
						</div>
					</div>
				</div>
			</div>
			<ConnectFaq />
		</div>
	);
};

export default ConnectForm;
