import React from 'react';
import { useSelector } from 'react-redux';

import JobJourneyCard from './JobJourneyCard';
import { BRIFECASE1, EXPERIENCE, MONEY } from 'assets/images';
import GaugeChart from 'component/common/gauge/GaugeChart';

import '../../../../careeradvisor/career.css';

const Journey = () => {
	const { reportData } = useSelector((state) => state.careerAdvisor);
	const successRate = reportData?.successRatePercentage || 0;

	return (
		<div className="p-4 md:py-8 md:px-4  bg-white">
			<h2 className="text-base font-medium tracking-tight text-[#000000] m-0">
				Journey to Desired Job
			</h2>

			<div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap">
				{/* Gauge Meter */}
				<JobJourneyCard title="Success Meter">
					<div className="text-xl text-black flex items-center justify-center pt-2 -ml-[10px] md:ml-0">
						<GaugeChart value={successRate} height={200} width={162} />
					</div>
				</JobJourneyCard>

				{/* Avg Expected Salary */}
				<JobJourneyCard title="Avg Expected Salary">
					<div className="flex gap-[2px] items-center flex-col pl-3 pb-2">
						<div className="text-[30px] font-semibold tracking-tight text-[#333333]">
							{reportData?.averageExpectedSalary}
							<span className="text-xl font-normal tracking-tight text-[#676767] ">
								LPA
							</span>
							<div className="text-xs font-medium tracking-tight text-[#22B827] m-0">
								High Success
							</div>
						</div>
					</div>
					<img
						src={MONEY} // Replace with your image path
						alt="Salary"
						className="absolute bottom-0 md:right-2 w-[53px] h-[98px]" // Adjust size as needed
					/>
				</JobJourneyCard>

				{/* Total Experience Needed */}
				<JobJourneyCard title="Total Experience Needed">
					<div className="flex gap-1 items-center">
						<div className="text-[32px] font-semibold tracking-tight text-[#333333] p-3">
							{reportData?.totalYearsOfExperience || 0}
							<span className="text-xl font-normal tracking-tight text-[#676767]">
								YRS
							</span>
						</div>
					</div>
					<img
						src={EXPERIENCE} // Replace with your image path
						alt="Experience"
						className="absolute bottom-0 right-0 w-[75px] h-[75px]" // Adjust size as needed
					/>
				</JobJourneyCard>

				<JobJourneyCard title="Position Switches">
					<div className="text-[32px] font-semibold tracking-tight text-[#333333] flex-grow p-3 self-end">
						{reportData?.totalNumberOfPositionSwitches || 0}
					</div>
					<img src={BRIFECASE1} alt="Top Briefcase" className="w-[92px] h-[100px]" />
				</JobJourneyCard>
			</div>
		</div>
	);
};

export default Journey;
