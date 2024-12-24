import { LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import { RIGHT_ARROW } from 'assets/images';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addState } from 'store/sagaActions';
import { useEffect, useState } from 'react';
import {
	checkEducationComplete,
	checkSkillsComplete,
	checkWorkExperienceComplete,
} from 'utils/common';

import './index.css';

const ProfileSideBar = () => {
	const education = useSelector((state) => state.education);
	const workExperience = useSelector((state) => state.workExperience);
	const skills = useSelector((state) => state.skills);
	const { userDetails } = useSelector((state) => state?.common);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const options = [
		{ option: 'Link LinkedIn Profile', link: '/profile/edit' },
		{ option: 'Upload Resume', link: '/profile/edit' },
		{
			option: 'Choose remote preferences in luxury',
			onClick: () => {
				dispatch(addState({ name: 'toRemotePreference', value: true }));
				navigate('/profile/preference');
			},
		},
	];
	const [profileScore, setProfileScore] = useState(0);
	const isSkillsComplete = checkSkillsComplete(skills);

	// Work Experience Validation
	const isWorkExperienceComplete = () => checkWorkExperienceComplete(workExperience);

	// Education Validation
	const isEducationComplete = () => checkEducationComplete(education);

	useEffect(() => {
		let score = 0;
		if (isWorkExperienceComplete()?.status) score += 20;
		if (isEducationComplete()?.status) score += 20;
		if (isSkillsComplete) score += 20;
		if (userDetails?.profile?.resume?.file) score += 20;
		setProfileScore(score);
	}, []);

	return (
		<div className=" w-full max-w-[328px] p-4 profilesidebar-container h-min hidden  xl:flex flex-col gap-6  pb-8">
			<div className=" flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<div className="text-[#1A1A1A]  text-[20px] font-[600]">
						{' '}
						Complete your profile!
					</div>
					<div className="text-[14px] text-[#666666]">
						The more information you add, the stronger your profile becomes.
					</div>
					<div className=" flex items-center justify-between py-[10px] ">
						<LinearProgress
							variant="determinate"
							value={profileScore}
							sx={{
								height: '8px',
								borderRadius: '8px',
								maxWidth: '240px',
								width: '100%',
								backgroundColor: '#E6E6E6',

								'& .MuiLinearProgress-bar': {
									borderRadius: '8px',
									backgroundColor: '#3877DD',
								},
							}}
						/>
						<span className=" text-[20px] font-[600]">{profileScore}%</span>
					</div>
				</div>
			</div>
			<div className="flex h-[1px]  bg-[#000000]/10" />
			<div className="flex flex-col gap-4">
				{options.length &&
					options.map((item) => (
						<div
							key={item.option}
							onClick={item?.onClick || (() => navigate(item?.link))}
							className="profilesidebar-container no-underline flex item cursor-pointer justify-between px-3 text-[#666666] tracking-tight text-xs py-2"
						>
							<span>{item.option}</span> <img alt="right arrow" src={RIGHT_ARROW} />{' '}
						</div>
					))}
			</div>
		</div>
	);
};

export default ProfileSideBar;
