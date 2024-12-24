import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FixBox, NumberBox } from './NumberBox';
import DeleteIcon from 'assets/SVGs/DeleteIcon';
import { CloseBoarderIcon, PlusIcon } from 'assets/index';
import CustomInputField from 'component/customComponents/inputField';
import { removeResumeSectionState } from 'store/reducer/resume/resumeSlice';
import { addHobby, removeAllHobby, removeHobby } from 'store/reducer/resume/hobbiesSlice';

import styles from './editTemplateList.module.css';
import { addState } from 'store/sagaActions';

const Hobbies = () => {
	const hobbies = useSelector((state) => state.hobbies);
	const { analysisData } = useSelector((state) => state.common);
	const dispatch = useDispatch();
	const [newHobbies, setNewHobbies] = useState('');
	const [hobbiesData, setHobbiesData] = useState([]);

	useEffect(() => {
		setHobbiesData(hobbies);
	}, [hobbies]);

	const handleAddLanguage = () => {
		if (newHobbies.trim()) {
			dispatch(
				addHobby({
					_id: Date.now(),
					name: newHobbies.trim(),
					value: newHobbies.trim().toLocaleLowerCase(),
				})
			);
			setNewHobbies(''); // Clear input after adding
			setNewHobbies(''); // Clear input after adding
		}
	};

	const handleRemoveLanguage = (key) => {
		dispatch(removeHobby(key));
	};

	const handleFixSummary = () => {
		dispatch(addState({ name: 'fixesTitle', value: 'Fixing Hobbies' }));
		dispatch(addState({ name: 'fixSummary', value: true }));
		dispatch(addState({ name: 'fixes', value: analysisData?.sections?.hobbies }));
	};
	return (
		<div className="flex flex-col gap-4 px-2">
			<div className="flex justify-between gap-2">
				<div className="flex gap-4 items-center">
					<div className="text-xl font-medium">Hobbies</div>
				</div>
				<div className="flex gap-2 items-center">
					{analysisData?.sections?.hobbies?.issuesCount?.optionalIssuesCount ? (
						<NumberBox
							number={1}
							count={
								analysisData?.sections?.hobbies?.issuesCount?.optionalIssuesCount
							}
						/>
					) : null}
					{analysisData?.sections?.hobbies?.issuesCount?.criticalIssuesCount ? (
						<NumberBox
							number={2}
							count={
								analysisData?.sections?.hobbies?.issuesCount?.criticalIssuesCount
							}
						/>
					) : null}
					{analysisData?.sections?.hobbies?.issuesCount?.urgentIssuesCount ? (
						<NumberBox
							number={3}
							count={analysisData?.sections?.hobbies?.issuesCount?.urgentIssuesCount}
						/>
					) : null}

					{(analysisData?.sections?.hobbies?.issuesCount?.optionalIssuesCount ||
						analysisData?.sections?.hobbies?.issuesCount?.criticalIssuesCount ||
						analysisData?.sections?.hobbies?.issuesCount?.urgentIssuesCount) > 0 && (
						<FixBox handleFix={handleFixSummary} />
					)}

					<div
						className="cursor-pointer"
						onClick={() => {
							dispatch(removeResumeSectionState('hobbies'));
							dispatch(removeAllHobby());
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
							placeholder="Add Hobbies"
							value={newHobbies}
							handleChange={(e) => setNewHobbies(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleAddLanguage(); // Add language on Enter key
								}
							}}
							startIcon={!newHobbies ? <PlusIcon color={'#000'} /> : null}
						/>
						<div className="flex gap-4 flex-wrap">
							{hobbiesData?.map((item, i) => (
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

export default Hobbies;
