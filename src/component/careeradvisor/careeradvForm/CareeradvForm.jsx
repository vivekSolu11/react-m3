import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { ARROW_ICON_BTN, CAREER_ADVISOR } from 'assets/images';
import CareerFaq from '../careerFaq/CareerFaq';
import SearchableDropdown from 'component/common/searchabledropdown';
import {
	updatedCurrentPosition,
	updatedDesiredPosition,
} from 'store/reducer/CareerAdvisor/CareerAdvisor';

import '../../careeradvisor/career.css';
import { useMediaQuery } from '@mui/material';

const CareeradvForm = () => {
	const { selectedDesiredPosition, selectedCurrentPosition } = useSelector(
		(state) => state.careerAdvisor
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleContinueClick = () => {
		navigate('/careeradvisor/careerjourney');
	};

	const isMobile = useMediaQuery('(max-width:600px)');

	return (
		<div className="flex flex-col justify-center items-center gap-6 w-full ">
			<div className="flex flex-col gap-5  bg-white rounded-2xl px-6 py-[62.5px] w-full text-center">
				<img src={CAREER_ADVISOR} alt="Networking" className="mx-auto" />

				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-4">
						<h1 className="text-2xl font-semibold text-[#1A1A1A] tracking-tight m-0">
							Career Advisor
						</h1>
						<p className="text-base font-normal tracking-tight leading-[22.4px] text-[#666666] m-0 max-w-[613px] text-center mx-auto">
							Explore the specific steps and resources needed to progress from your
							current position to your desired role.
						</p>
					</div>
					<div className="flex flex-col gap-5 md:gap-8 items-center">
						<div className="flex w-full gap-4 md:gap-5 flex-col md:flex-row items-center justify-between ">
							<SearchableDropdown
								label="Current Position"
								inputClass={``}
								value={selectedCurrentPosition}
								handleChange={(e) => {
									dispatch(updatedCurrentPosition(e));
								}}
								url="career-advisor/career-positions"
								placeholder="Job TItle"
							/>
							<div className="flex h-full items-center md:mt-8  justify-center ">
								<button className="bg-[#FFFFFF] cursor-pointer border-none">
									<img
										src={ARROW_ICON_BTN}
										alt="arrowbtn"
										className="w-[40px] h-[40px] "
										style={{
											transform: isMobile ? 'rotate(90deg)' : 'none',
										}}
									/>
								</button>
							</div>
							<SearchableDropdown
								label="Desired  Position"
								inputClass={``}
								value={selectedDesiredPosition}
								handleChange={(e) => {
									dispatch(updatedDesiredPosition(e));
								}}
								url="career-advisor/career-positions"
								placeholder="Job TItle"
							/>
						</div>
						<button
							type="button"
							disabled={
								!selectedCurrentPosition?.name || !selectedDesiredPosition?.name
							}
							onClick={handleContinueClick}
							className=" w-full md:w-[155px] h-[46px] bg-[#76FF7A] py-[15px] px-[20px] !leading-4 rounded-lg shadow-sm border-none text-[#373737] text-sm font-medium cursor-pointer"
						>
							Find Career Path
						</button>
					</div>
				</div>
			</div>
			<CareerFaq />
		</div>
	);
};

export default CareeradvForm;
