import React from 'react';
import { useSelector } from 'react-redux';

import ResumeDetail from '../subcomponents/ResumeDetail';
import EducationDetail from '../subcomponents/EducationDetail';
import WorkExperience from '../subcomponents/ResumeWorkExperience';
import Skills from '../subcomponents/ResumeSkills';

import './ProfileResumeDetail.css';

const ProfileResumeDetail = () => {
	const { userDetails } = useSelector((state) => state?.common);

	return (
		<div className="md:p-6 p-4 pb-[150px] md:pb-[80px] rounded-lg bg-[#FFFFFF] flex flex-col  gap-4 w-full ">
			<ResumeDetail />

			{userDetails?.profile?.resume?.detail?.education?.length ? <EducationDetail /> : null}
			{userDetails?.profile?.resume?.detail?.workExperience?.length ? (
				<WorkExperience />
			) : null}
			{userDetails?.profile?.resume?.detail?.skills?.length ? <Skills /> : null}
		</div>
	);
};

export default ProfileResumeDetail;
