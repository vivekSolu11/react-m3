import React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts';

import HeaderBox from './components/HeaderBox';
import DetailsRow from './components/DetailsRow';
import DetailsRowCommon from './components/DetailsRowCommon';
import { InfoIcon } from 'assets/index';
import { SKILL_CHECK } from 'assets/images';
import { getCustomiseLabel } from 'utils/common';

const TabOne = ({ data, score }) => {
	const totalSkills = data?.skillScores?.length || ''; // Total count
	const scoredSkills =
		data?.skillScores?.length &&
		data?.skillScores?.filter((skill) => skill?.score === 1).length; // Count with score 1

	const skills = `Skills (${scoredSkills}/${totalSkills})`;
	return (
		<div className="flex flex-col w-full gap-5 overflow-y-auto overflow-hide  ">
			<div className="flex gap-10 items-center justify-between w-full">
				<div className=" text-[16px] md:text-xl text-black">
					How your Resume aligns with this Job
				</div>
				<div className="text-xl text-black">
					<Gauge
						width={122}
						sx={() => ({
							[`& .${gaugeClasses.valueText}`]: {
								fontSize: 32,
								fontWeight: 500,
								transform: 'translate(0px, -10px)',
							},
						})}
						height={70}
						valueMax={10}
						value={score}
						startAngle={-90}
						endAngle={90}
					/>
					<div className="rounded-lg py-1 flex  justify-between relative items-center text-center text-xs bg-[#efefef]">
						<div className="text-center font-medium flex-grow">
							{getCustomiseLabel(score)}
						</div>
						<InfoIcon
							className={'absolute right-1'}
							width={'16'}
							height={'16'}
							color={'#000'}
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-4 lg:gap-2">
				<HeaderBox />
				<DetailsRow
					title={'Job Title'}
					descOne={data?.jobTitle}
					descTwo={data?.userJobTitles?.join('/')}
					status={data?.jobTitleMatchSeverity}
				/>
				<DetailsRow
					title={'Years of Experience'}
					descOne={`${data?.minYearsOfExperience?.from} - ${data?.minYearsOfExperience?.to} Years`}
					descTwo={data?.userYearsOfExperience}
					status={data?.yearsOfExperienceMatchSeverity}
				/>
				<DetailsRow
					title={'Education'}
					descOne={data?.educationRequirement}
					descTwo={data?.userEducation?.join('/')}
					status={data?.educationMatchSeverity}
				/>

				<DetailsRowCommon
					title={'Industry Experience'}
					status={data?.industryMatchSeverity}
				>
					<div className="flex flex-wrap gap-2">
						{data?.industryScores.length &&
							data?.industryScores.map((item) => (
								<div
									key={item}
									className={`py-1 px-2 text-sm ${item?.score ? 'bg-[#C9FBC1]' : 'bg-white'} flex items-center gap-2`}
								>
									{item?.displayName}
									{item?.score ? <img src={SKILL_CHECK} alt="check" /> : null}
								</div>
							))}
					</div>
				</DetailsRowCommon>
				<DetailsRowCommon title={skills} status={data?.skillsMatchSeverity}>
					<div className="flex flex-wrap gap-2">
						{data?.skillScores.length &&
							data?.skillScores.map((item) => (
								<div
									key={item}
									className={`py-1 px-2 text-sm ${item?.score ? 'bg-[#C9FBC1]' : 'bg-white'} flex items-center gap-2`}
								>
									{item?.displayName}
									{item?.score ? <img src={SKILL_CHECK} alt="check" /> : null}
								</div>
							))}
					</div>
				</DetailsRowCommon>
				<DetailsRowCommon title={'Summary'} status={data?.summaryMatchSeverity}>
					{data?.userSummary}
				</DetailsRowCommon>
			</div>
		</div>
	);
};

export default TabOne;
