import React from 'react';
import TechnicalSkill from './TechinalSkill';
import SoftSkill from './SoftSkill';

const Skill = ({ className, techSkill, softSkill }) => {
	return (
		<div
			className={`bg-[#FFFFFF] mx-4 md:my-10 flex flex-col gap-6 md:flex-none md:gap-0  ${className}`}
		>
			<TechnicalSkill {...techSkill} />
			<SoftSkill {...softSkill} />
		</div>
	);
};

export default Skill;
