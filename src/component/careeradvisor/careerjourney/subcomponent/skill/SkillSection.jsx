import React from 'react';
import Chips from 'component/customComponents/chips/Chips';

const SkillSection = ({
	title,
	description,
	skills,
	background = '#F5F9FF',
	color = 'text-[#0E3C87]',
}) => {
	return (
		<div className={`w-full mx-auto  md:mt-10 mt-0 `}>
			<div className="flex flex-col gap-1">
				<h3 className="text-base font-medium tracking-tight text-[#000000] m-0">{title}</h3>
				<p className="text-sm font-normal text-[#666666] m-0">{description}</p>
			</div>

			{/* Tags (Chips) */}
			<div className="flex space-x-2 mt-4 flex-wrap gap-2 m-0">
				{skills?.length &&
					skills?.map((chip) => (
						<Chips
							key={chip}
							name={chip}
							customStyle={{
								borderRadius: '4px',
								background: background,
							}}
							className={`text-xs font-medium tracking-wide ${color} py-1 px-3 !m-0`}
						/>
					))}
			</div>
		</div>
	);
};

export default SkillSection;
