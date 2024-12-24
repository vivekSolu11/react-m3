import React from 'react';
import SkillSection from './SkillSection';

const TechnicalSkill = ({ description, skills }) => {
	return (
		<SkillSection
			title={'Must Have Technical Skills'}
			description={description}
			skills={skills}
		/>
	);
};

export default TechnicalSkill;
