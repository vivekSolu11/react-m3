import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FixBox, NumberBox } from './NumberBox';
import DeleteIcon from 'assets/SVGs/DeleteIcon';
import { CloseBoarderIcon, PlusIcon } from 'assets/index';
import CustomInputField from 'component/customComponents/inputField';
import { removeResumeSectionState } from 'store/reducer/resume/resumeSlice';
import {
	addActivity,
	removeActivity,
	resetActivity,
} from 'store/reducer/resume/extraCCActivitiesSlice';

import styles from './editTemplateList.module.css';
import { addState } from 'store/sagaActions';

const ECCactivity = () => {
	const extraCCActivitiesData = useSelector((state) => state.extraCCActivities);
	const { analysisData } = useSelector((state) => state.common);
	const dispatch = useDispatch();
	const [eccctivity, seteccctivity] = useState([]);
	const [newActivity, setNewActivity] = useState('');

	const handleAddLanguage = () => {
		if (newActivity.trim()) {
			dispatch(
				addActivity({
					_id: Date.now(),
					name: newActivity.trim(),
					value: newActivity.trim().toLocaleLowerCase(),
				})
			);
			setNewActivity(''); // Clear input after adding
		}
	};

	const handleRemoveLanguage = (key) => {
		dispatch(removeActivity(key));
	};
	useEffect(() => {
		seteccctivity(extraCCActivitiesData);
	}, [extraCCActivitiesData]);

	const handleFixSummary = () => {
		dispatch(
			addState({
				name: 'fixesTitle',
				value: 'Fixing Extra Curricular Activities',
			})
		);
		dispatch(addState({ name: 'fixSummary', value: true }));
		dispatch(
			addState({
				name: 'fixes',
				value: analysisData?.sections?.extraCurricularActivities,
			})
		);
	};
	return (
		<div className="flex flex-col gap-4 px-2">
			<div className="flex justify-between gap-2">
				<div className="flex gap-4 items-center">
					<div className="text-xl font-medium">Extra-curricular Activities</div>
				</div>
				<div className="flex gap-2 items-center">
					{analysisData?.sections?.extraCurricularActivities?.issuesCount
						?.optionalIssuesCount ? (
						<NumberBox
							number={1}
							count={
								analysisData?.sections?.extraCurricularActivities?.issuesCount
									?.optionalIssuesCount
							}
						/>
					) : null}
					{analysisData?.sections?.extraCurricularActivities?.issuesCount
						?.criticalIssuesCount ? (
						<NumberBox
							number={2}
							count={
								analysisData?.sections?.extraCurricularActivities?.issuesCount
									?.criticalIssuesCount
							}
						/>
					) : null}
					{analysisData?.sections?.extraCurricularActivities?.issuesCount
						?.urgentIssuesCount ? (
						<NumberBox
							number={3}
							count={
								analysisData?.sections?.extraCurricularActivities?.issuesCount
									?.urgentIssuesCount
							}
						/>
					) : null}

					{(analysisData?.sections?.extraCurricularActivities?.issuesCount
						?.optionalIssuesCount ||
						analysisData?.sections?.extraCurricularActivities?.issuesCount
							?.criticalIssuesCount ||
						analysisData?.sections?.extraCurricularActivities?.issuesCount
							?.urgentIssuesCount) > 0 && <FixBox handleFix={handleFixSummary} />}

					<div
						className="cursor-pointer"
						onClick={() => {
							dispatch(removeResumeSectionState('ecc-activity'));
							dispatch(resetActivity());
						}}
					>
						<DeleteIcon />
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-4 px-2">
						<CustomInputField
							inputClass={`${styles.inputs} ${styles.inputsplac} w-1/2`}
							placeholder="Add Activity"
							value={newActivity}
							handleChange={(e) => setNewActivity(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleAddLanguage(); // Add language on Enter key
								}
							}}
							startIcon={!newActivity ? <PlusIcon color={'#000'} /> : null}
						/>
						<div className="flex gap-4 flex-wrap">
							{eccctivity?.map((item, i) => (
								<div
									key={i}
									className="bg-[#F5F9FF] rounded text-[#0E3C87] text-sm py-1 px-3 flex gap-2 items-center"
								>
									{item.name}
									<div
										onClick={() => handleRemoveLanguage(i)}
										className="flex items-center"
									>
										<CloseBoarderIcon />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ECCactivity;
