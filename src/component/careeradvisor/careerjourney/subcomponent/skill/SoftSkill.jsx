import React from 'react';
import SkillSection from './SkillSection';

const SoftSkill = ({ description, skills }) => {
	return (
		<SkillSection
			title="Must Have Soft Skills"
			description={description}
			skills={skills}
			background="#FEF5FF"
			color="text-[#7D0E87]"
		/>
	);
};

export default SoftSkill;
