import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FixBox, NumberBox } from './NumberBox';
import DeleteIcon from 'assets/SVGs/DeleteIcon';
import { CloseBoarderIcon, PlusIcon } from 'assets/index';
import CustomInputField from 'component/customComponents/inputField';
import { removeResumeSectionState } from 'store/reducer/resume/resumeSlice';
import { addLanguage, removeLanguage, resetLanguages } from 'store/reducer/resume/languageSlice';

import styles from './editTemplateList.module.css';
import { addState } from 'store/sagaActions';

const Languages = () => {
	const languages = useSelector((state) => state.languages);
	const { analysisData } = useSelector((state) => state.common);

	const dispatch = useDispatch();
	const [newLanguage, setNewLanguage] = useState('');
	const [languagesData, setLanguagesData] = useState([]);

	useEffect(() => {
		setLanguagesData(languages);
	}, [languages]);

	const handleAddLanguage = () => {
		if (newLanguage.trim()) {
			dispatch(
				addLanguage({
					_id: Date.now(),
					name: newLanguage.trim(),
					value: newLanguage.trim().toLocaleLowerCase(),
				})
			);
			setNewLanguage(''); // Clear input after adding
		}
	};

	const handleRemoveLanguage = (key) => {
		dispatch(removeLanguage(key));
	};

	const handleFixSummary = () => {
		dispatch(addState({ name: 'fixesTitle', value: 'Fixing Languages' }));
		dispatch(addState({ name: 'fixSummary', value: true }));
		dispatch(addState({ name: 'fixes', value: analysisData?.sections?.languages }));
	};
	return (
		<div className="flex flex-col gap-4 px-2">
			<div className="flex justify-between gap-2">
				<div className="flex gap-4 items-center">
					<div className="text-xl font-medium">Languages</div>
				</div>
				<div className="flex gap-2 items-center">
					{analysisData?.sections?.languages?.issuesCount?.optionalIssuesCount ? (
						<NumberBox
							number={1}
							count={
								analysisData?.sections?.languages?.issuesCount?.optionalIssuesCount
							}
						/>
					) : null}
					{analysisData?.sections?.languages?.issuesCount?.criticalIssuesCount ? (
						<NumberBox
							number={2}
							count={
								analysisData?.sections?.languages?.issuesCount?.criticalIssuesCount
							}
						/>
					) : null}
					{analysisData?.sections?.languages?.issuesCount?.urgentIssuesCount ? (
						<NumberBox
							number={3}
							count={
								analysisData?.sections?.languages?.issuesCount?.urgentIssuesCount
							}
						/>
					) : null}

					{(analysisData?.sections?.languages?.issuesCount?.optionalIssuesCount ||
						analysisData?.sections?.languages?.issuesCount?.criticalIssuesCount ||
						analysisData?.sections?.languages?.issuesCount?.urgentIssuesCount) > 0 && (
						<FixBox handleFix={handleFixSummary} />
					)}

					<div
						className="cursor-pointer"
						onClick={() => {
							dispatch(removeResumeSectionState('languages'));
							dispatch(resetLanguages());
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
							placeholder="Add Language"
							value={newLanguage}
							handleChange={(e) => setNewLanguage(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleAddLanguage(); // Add language on Enter key
								}
							}}
							startIcon={!newLanguage ? <PlusIcon color={'#000'} /> : null}
						/>
						<div className="flex gap-4 flex-wrap">
							{languagesData?.map((item, i) => (
								<div
									key={item?._id}
									className="bg-[#F5F9FF] rounded text-[#0E3C87] text-sm py-1 px-3 flex gap-2 items-center"
								>
									{item?.name}
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

export default Languages;
