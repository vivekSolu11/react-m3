import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import { CloseBoarderIcon, DotsIcon, PlusIcon } from 'assets/index';
import { FixBox, NumberBox } from './NumberBox';
import CustomInputField from 'component/customComponents/inputField';
import {
	addSkill,
	removeSkill,
	toggleSkillVisibility,
	updateAllSkill,
} from 'store/reducer/resume/skillSlice';

import styles from './editTemplateList.module.css';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import { addState } from 'store/sagaActions';

const placeholders = {
	'Technical Skills': 'Add Skill',
	'Software Skills': 'Add Skill',
	'Research Skills': 'Add Skill',
	'Communication Skills': 'Profieciency, Effective listener, Collaborative team communicator....',
};

const Skills = ({ displayTitle = true }) => {
	const skills = useSelector((state) => state.skills);
	const [Technicalskillsdata, setTechnicalskillsData] = useState([]);
	const [inputValues, setInputValues] = useState({});
	const dispatch = useDispatch();

	const { analysisData } = useSelector((state) => state.common);
	useEffect(() => {
		setTechnicalskillsData(skills);
	}, [skills]);

	function handleOnWorkExperienceDragEnd(result) {
		if (!result.destination) return;
		const items = Array.from(Technicalskillsdata);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setTechnicalskillsData(items);
		dispatch(updateAllSkill(items));
	}

	const handleInputChange = (index, value) => {
		setInputValues((prev) => ({
			...prev,
			[index]: value,
		}));
	};

	const handleKeyDown = (index, event, categoryKey) => {
		if ((event.key === 'Enter' || event.type === 'click') && inputValues[index]) {
			const newSkill = { key: Date.now(), name: inputValues[index] };
			// Dispatch the action to add the skill
			dispatch(
				addSkill({
					category: categoryKey,
					skill: newSkill,
				})
			);

			// Update local state
			const updatedSkills = Technicalskillsdata.map((item) => {
				if (item.key === categoryKey) {
					// Return a new object with updated data
					return {
						...item,
						data: [...(item.data || []), newSkill], // Spread existing skills and add the new one
					};
				}
				return item; // Return the original item for others
			});
			setTechnicalskillsData(updatedSkills);
			setInputValues((prev) => ({ ...prev, [index]: '' })); // Clear the input field
		}
	};
	const handleRemoveSkill = (categoryKey, skillKey) => {
		dispatch(removeSkill({ category: categoryKey, skillKey }));

		const updatedSkills = Technicalskillsdata.map((item) => {
			if (item.key === categoryKey) {
				return {
					...item,
					data: item.data.filter((skill) => skill.key !== skillKey),
				};
			}
			return item;
		});

		setTechnicalskillsData(updatedSkills);
	};

	const toggleVisibility = (categoryKey) => {
		dispatch(toggleSkillVisibility(categoryKey));
		const updatedSkills = Technicalskillsdata.map((item) => {
			if (item.key === categoryKey) {
				return {
					...item,
					visible: !item.visible, // Toggle the visibility
				};
			}
			return item;
		});

		setTechnicalskillsData(updatedSkills);
	};

	const handleFixSummary = () => {
		dispatch(addState({ name: 'fixesTitle', value: 'Fixing Skills' }));
		dispatch(addState({ name: 'fixSummary', value: true }));
		dispatch(addState({ name: 'fixes', value: analysisData?.sections?.skills }));
	};
	return (
		<div className="flex flex-col gap-4 px-2 skills-section">
			<div className="flex justify-between flex-wrap md:flex-nowrap gap-2">
				<div className="flex gap-4 items-center">
					{displayTitle ? <div className="text-xl font-medium">Skills</div> : null}
				</div>
				<div className="flex gap-2">
					{analysisData?.sections?.skills?.issuesCount?.optionalIssuesCount ? (
						<NumberBox
							number={1}
							count={analysisData?.sections?.skills?.issuesCount?.optionalIssuesCount}
						/>
					) : null}
					{analysisData?.sections?.skills?.issuesCount?.criticalIssuesCount ? (
						<NumberBox
							number={2}
							count={analysisData?.sections?.skills?.issuesCount?.criticalIssuesCount}
						/>
					) : null}
					{analysisData?.sections?.skills?.issuesCount?.urgentIssuesCount ? (
						<NumberBox
							number={3}
							count={analysisData?.sections?.skills?.issuesCount?.urgentIssuesCount}
						/>
					) : null}

					{(analysisData?.sections?.skills?.issuesCount?.optionalIssuesCount ||
						analysisData?.sections?.skills?.issuesCount?.criticalIssuesCount ||
						analysisData?.sections?.skills?.issuesCount?.urgentIssuesCount) > 0 && (
						<FixBox handleFix={handleFixSummary} />
					)}
				</div>
			</div>
			<div className="flex flex-col gap-6">
				<DragDropContext onDragEnd={handleOnWorkExperienceDragEnd}>
					<Droppable droppableId="skill-drag">
						{(provided) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className="skill-drag flex flex-col gap-6"
							>
								{Technicalskillsdata?.length > 0 &&
									Technicalskillsdata?.map((item, index) => (
										<React.Fragment key={item.key}>
											<Draggable draggableId={item.key} index={index}>
												{(provided) => (
													<div
														className="flex flex-col gap-4"
														ref={provided.innerRef}
														{...provided.draggableProps}
													>
														<div className="flex gap-4">
															<div
																{...provided.dragHandleProps}
																className="flex pt-1 justify-between cursor-pointer items-start"
															>
																<DotsIcon />
															</div>
															<div className="text-base font-medium flex gap-2 items-center">
																{item.title}
																{item?.visible ? (
																	<RemoveRedEyeOutlinedIcon
																		onClick={() =>
																			toggleVisibility(
																				item.key
																			)
																		}
																		sx={{
																			fill: '#CCCCCC',
																			cursor: 'pointer',
																		}}
																	/>
																) : (
																	<VisibilityOffOutlinedIcon
																		onClick={() =>
																			toggleVisibility(
																				item.key
																			)
																		}
																		sx={{
																			fill: '#CCCCCC',
																			cursor: 'pointer',
																		}}
																	/>
																)}
															</div>
														</div>
														<div className="flex flex-col gap-4 px-7">
															<div className="flex w-full gap-2">
																<CustomInputField
																	inputClass={`${styles.inputs} ${styles.inputsplac}`}
																	placeholder={
																		placeholders[item.title]
																	}
																	value={inputValues[index] || ''}
																	handleChange={(e) =>
																		handleInputChange(
																			index,
																			e.target.value
																		)
																	}
																	onKeyDown={(e) =>
																		handleKeyDown(
																			index,
																			e,
																			item.key
																		)
																	}
																	startIcon={
																		!inputValues[index] ? (
																			<PlusIcon
																				color={'#000'}
																			/>
																		) : null
																	}
																/>
																<PrimaryButton
																	buttonText="Add"
																	handleClick={(e) =>
																		handleKeyDown(
																			index,
																			e,
																			item.key
																		)
																	}
																	size="small"
																	btnClassName="!px-4 inline-flex lg:hidden "
																	startIcon={
																		<PlusIcon color={'#000'} />
																	}
																/>
															</div>{' '}
															<div className="flex gap-4 flex-wrap ">
																{item?.data?.map((skill) => (
																	<div
																		key={skill.key}
																		className="bg-[#F5F9FF] rounded text-[#0E3C87] text-sm py-1 px-3 flex gap-2 items-center"
																	>
																		{skill.name}{' '}
																		<div
																			onClick={() =>
																				handleRemoveSkill(
																					item.key,
																					skill.key
																				)
																			}
																			className="flex items-center"
																		>
																			<CloseBoarderIcon />
																		</div>
																	</div>
																))}
															</div>
														</div>
													</div>
												)}
											</Draggable>
											<div
												className={`${styles.boarder} h-[1px] w-full`}
											></div>
										</React.Fragment>
									))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		</div>
	);
};

export default Skills;
