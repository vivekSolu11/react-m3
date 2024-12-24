import React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts';

import { InfoIcon, StarIcon } from 'assets/index';
import AccordianBox from './components/AccordianBox';
import ResumePreview from 'component/resumeBuilder/resumePreview/ResumePreview';
import { getCustomiseLabel } from 'utils/common';

import './sidebar.css';

const TabThree = ({ data, score, updatedScore }) => {
	return (
		<div className="flex flex-col lg:flex-row   w-full gap-3 items-center justify-center overflow-y-auto overflow-hide  ">
			<div className=" w-full lg:w-3/5 h-full text-center">
				<ResumePreview
					showSectionCompletion={false}
					showLineSpacing={false}
					showHeader={false}
					sectionClass="h-full"
				/>
			</div>
			<div className=" w-full lg:w-2/5 border border-solid border-lightgray h-full rounded-lg flex flex-col gap-3  ">
				<div className="flex gap-5 p-4">
					<div className=" flex-col flex gap-2">
						<StarIcon height="24" width="24" />
						<span>
							Great your scored improved from <b>{score}</b> to <b>{updatedScore}</b>{' '}
							out of
							<b> 10</b>
						</span>
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
							value={updatedScore}
							startAngle={-90}
							endAngle={90}
						/>
						<div className="rounded-lg py-1 flex  justify-between relative items-center text-center text-xs bg-[#efefef]">
							<div className="text-center font-medium flex-grow">
								{getCustomiseLabel(updatedScore)}
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
				<div className="flex flex-col gap-3">
					<div className="px-2 py-3 text-sm font-medium border-bottom">
						See What’s Changed
					</div>
					<div>
						<AccordianBox data={data?.changes || []} />
					</div>
				</div>
				{/* <div className="flex flex-col gap-3">
          <div className="px-2 py-3 text-sm font-medium border-bottom">
            See What’s Changed
          </div>
          <div>
            <AccordianBox data={data} />
          </div>
        </div> */}
			</div>
		</div>
	);
};

export default TabThree;
