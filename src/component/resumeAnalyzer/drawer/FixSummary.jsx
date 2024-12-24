import React from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import NavScrollBar from './subComponents/NavScrollBar';
import { updateInfo } from 'store/reducer/resume/infoSlice';
import { updateAllEducation } from 'store/reducer/resume/educationSlice';
import { generateUniqueId } from 'utils/common';
import { updateAllcertificates } from 'store/reducer/resume/certificateSlice';
import { addAllLanguage } from 'store/reducer/resume/languageSlice';
import { addAllHobby } from 'store/reducer/resume/hobbiesSlice';
import { updateAllReferences } from 'store/reducer/resume/referenceSlice';
import { addAllActivity } from 'store/reducer/resume/extraCCActivitiesSlice';
import { updateAllLinks } from 'store/reducer/resume/linkSlice';
import { updateAllExperienceExperience } from 'store/reducer/resume/workExperienceSlice';
import { addAllSkill } from 'store/reducer/resume/skillSlice';
import { transformSkills } from 'utils/resumeValidator';
import { removeSection, updateIssueCount } from 'store/sagaActions';

import './index.css';

const FixSummary = ({ onClose, className = '' }) => {
	const { fixes, fixesTitle, issueCount } = useSelector((state) => state.common);

	const dispatch = useDispatch();

	const handleChanges = () => {
		//Summary
		if (fixesTitle === 'Fixing Summary') {
			dispatch(
				updateInfo({
					summary: fixes?.updatedVersion?.summary || fixes?.updatedVersion,
				})
			);
			dispatch(removeSection({ name: 'summary' }));
		}

		//Education
		if (fixesTitle === 'Fixing Education') {
			dispatch(
				updateAllEducation(
					fixes?.updatedVersion?.map((item) => ({
						...item,
						_id: generateUniqueId('edu'),
					}))
				)
			);

			dispatch(removeSection({ name: 'education' }));
		}

		//Certificates
		if (fixesTitle === 'Fixing Certifications') {
			dispatch(
				updateAllcertificates(
					fixes?.updatedVersion?.map((item) => ({
						_id: generateUniqueId('Certificate'),
						...item,
					}))
				)
			);
			dispatch(removeSection({ name: 'certifications' }));
		}

		//Language
		if (fixesTitle === 'Fixing Languages') {
			dispatch(
				addAllLanguage(
					fixes?.updatedVersion.map((item) => ({
						_id: generateUniqueId('language'),
						...item,
					}))
				)
			);
			dispatch(removeSection({ name: 'languages' }));
		}

		//Hobbies
		if (fixesTitle === 'Fixing Hobbies') {
			dispatch(
				addAllHobby(
					fixes?.updatedVersion.map((item) => ({
						_id: generateUniqueId('hobbies'),
						...item,
					}))
				)
			);
			dispatch(removeSection({ name: 'hobbies' }));
		}

		//Reference
		if (fixesTitle === 'Fixing References') {
			dispatch(
				updateAllReferences(
					fixes?.updatedVersion.map((item) => ({
						_id: generateUniqueId('ref'),
						...item,
					}))
				)
			);
			dispatch(removeSection({ name: 'references' }));
		}

		//ECC activity
		if (fixesTitle === 'Fixing Extra Curricular Activities') {
			dispatch(addAllActivity(fixes?.updatedVersion));
			dispatch(removeSection({ name: 'extraCurricularActivities' }));
		}

		//Links
		if (fixesTitle === 'Fixing Links') {
			dispatch(updateAllLinks(fixes?.updatedVersion));
			dispatch(removeSection({ name: 'links' }));
		}

		//Work Experience
		if (fixesTitle === 'Fixing Work Experience') {
			dispatch(
				updateAllExperienceExperience(
					fixes?.updatedVersion?.map((item) => ({
						...item,
						_id: generateUniqueId('work-exp'),
					}))
				)
			);
			dispatch(removeSection({ name: 'workExperience' }));
		}

		//Skills
		if (fixesTitle === 'Fixing Skills') {
			dispatch(addAllSkill(transformSkills(fixes?.updatedVersion)));
			dispatch(removeSection({ name: 'skills' }));
		}

		dispatch(
			updateIssueCount({
				critical: issueCount?.critical - fixes?.issuesCount?.criticalIssuesCount,
				optional: issueCount?.optional - fixes?.issuesCount?.optionalIssuesCount,
				urgent: issueCount?.urgent - fixes?.issuesCount?.urgentIssuesCount,
			})
		);

		onClose();
	};

	return (
		<div className="  flex flex-col">
			<div className={`pt-[40px] h-[calc(100vh-186px)] overflow-y-auto ${className}`}>
				<NavScrollBar />
			</div>
			<div className="flex w-full ai-container md:justify-end justify-center py-[16px] px-[40px] ">
				<Button
					variant="contained"
					className="shadow-none bg-prim-sol normal-case px-[15px] py-[20px] h-[46px]"
					onClick={handleChanges}
				>
					Submit Updated Version
				</Button>
			</div>
		</div>
	);
};

export default FixSummary;
