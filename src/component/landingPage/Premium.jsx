import React from 'react';

import ItemLayout from './itemLayout/ItemLayout';
import { PREMIUM } from 'assets/images';

function StatCard({ stat, label }) {
	return (
		<div className="flex flex-col self-stretch ">
			<div className="gap-3  text-2xl font-semibold whitespace-nowrap">{stat}</div>
			<div className="mt-1 text-sm leading-tight ">{label}</div>
		</div>
	);
}
function StatisticsSection() {
	const statsData = [
		{ stat: '1000+', label: 'Jobs' },
		{ stat: '1000+', label: 'Premium Jobs' },
		{ stat: '1000+', label: 'Recommendations' },
	];
	return (
		<div className="flex md:gap-10 gap-8  py-4 justify-between items-center rounded-3xl max-w-[372px] text-neutral-900 ">
			{statsData.map((data, index) => (
				<StatCard key={index} stat={data.stat} label={data.label} />
			))}
		</div>
	);
}

const Premium = () => {
	const handleClick = () => {};
	return (
		<ItemLayout
			title={
				<div className="text-[20px] text-[#1A1A1A] font-normal md:tracking-tight md:text-[40px] ">
					<span>Get access to</span> <span className="font-[600]">premium jobs</span>
				</div>
			}
			description="Gain entry to top-tier job listings curated just for you, ensuring you get noticed by leading employers in your industry."
			buttonText="Try Now"
			src={PREMIUM}
			clickHandler={handleClick}
			// height="h-[760px]"
			extradesc={<StatisticsSection />}
		></ItemLayout>
	);
};

export default Premium;
