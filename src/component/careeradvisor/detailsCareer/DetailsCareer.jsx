import React from 'react';
import JobsRole from './subcomponent/JobsRole';
import TopCompanies from './subcomponent/TopCompanies';
import KeyPointCard from './subcomponent/keyPoints/KeyPointCard';
import Skill from '../careerjourney/subcomponent/skill/Skill';
import CoursesCard from '../careerjourney/subcomponent/courses/CoursesCard';
import JobOpeningCard from './subcomponent/jobOpening/JobOpeningCard';
import { useSelector } from 'react-redux';

const DetailsCareer = () => {
	const { selectedRole } = useSelector((state) => state.careerAdvisor);

	return (
		<div className="px-6 pb-[22px]">
			<JobsRole />
			<TopCompanies />
			<div className="flex flex-col gap-6">
				<KeyPointCard />
				<Skill
					techSkill={selectedRole?.essentialTechnicalSkills}
					softSkill={selectedRole?.essentialSoftSkills}
					className="!p-0 !m-0"
				/>
				<CoursesCard Courses={selectedRole?.courseSuggestions} className="!p-0 mt-6" />
				<JobOpeningCard />
			</div>
		</div>
	);
};

export default DetailsCareer;
