import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { FixBox, NumberBox } from './NumberBox';
import DeleteIcon from 'assets/SVGs/DeleteIcon';
import { generateUniqueId } from 'utils/common';
import { DotsIcon, PlusIcon } from 'assets/index';
import CustomInputField from 'component/customComponents/inputField';

import {
	addExperience,
	removeExperience,
	updateAllExperienceExperience,
	updateExperience,
} from 'store/reducer/resume/workExperienceSlice';
import CustomDatePicker from './CustomDatePicker';

import styles from './editTemplateList.module.css';
import { addState } from 'store/sagaActions';
import { removeWorkExpError } from 'store/reducer/resume/errorSlice';

// Function to generate a unique ID for each experience or bullet point

const WorkExperience = ({ displayTitle = true }) => {
	const experienceData = useSelector((state) => state.workExperience);
	const { expError } = useSelector((state) => state.resumeError);
	const { analysisData } = useSelector((state) => state.common);
	const dispatch = useDispatch();
	// State to hold the array of work experiences
	const [experiences, setExperiences] = useState([]);

	useEffect(() => {
		if (experienceData.length < 1) {
			setExperiences([
				{
					_id: generateUniqueId('work-exp'),
					designation: '',
					company: '',
					location: '',
					duration: {},
					bulletPoint: [],
				},
			]);
		} else {
			setExperiences(experienceData);
		}
	}, [experienceData]);

	// Handle drag and drop for work experiences
	function handleOnWorkExperienceDragEnd(result) {
		if (!result.destination) return;
		const items = Array.from(experiences);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setExperiences(items);
		dispatch(updateAllExperienceExperience(items));
	}

	// Handle drag and drop for bullet points
	function handleOnBulletDragEnd(result, index) {
		if (!result.destination) return;

		// Create a copy of the experiences array
		const items = Array.from(experiences);

		// Create a copy of the bulletPoint bullets
		const bullets = Array.from(items[index].bulletPoint);

		// Move the bullet
		const [movedBullet] = bullets.splice(result.source.index, 1);
		bullets.splice(result.destination.index, 0, movedBullet);

		// Update the specific experience without mutating the original object
		items[index] = {
			...items[index], // Spread the existing experience properties
			bulletPoint: bullets, // Update  the new bullets array
		};

		// Update the state
		setExperiences(items);
		dispatch(updateAllExperienceExperience(items));
	}

	// Function to add a new work experience
	const handleAddExperience = () => {
		dispatch(
			addExperience({
				_id: generateUniqueId('work-exp'),
				designation: '',
				company: '',
				location: '',
				duration: {},
				bulletPoint: [],
			})
		);
		setExperiences([
			...experiences,
			{
				_id: generateUniqueId('work-exp'),
				designation: '',
				company: '',
				location: '',
				duration: {},
				bulletPoint: [],
			},
		]);
	};

	// Handle changes in input fields
	const handleChange = (index, field, value) => {
		// Create a new array with the updated experience
		const updatedExperiences = experiences.map((experience, i) =>
			i === index ? { ...experience, [field]: value } : experience
		);

		// Dispatch the action with the complete updated experience
		dispatch(updateExperience({ index, data: updatedExperiences[index] }));

		// Update local state
		setExperiences(updatedExperiences);
	};

	// Handle deletion of a work experience
	const handleDelete = (index) => {
		dispatch(removeExperience(index));
		const updatedExperiences = experiences.filter((_, i) => i !== index);
		setExperiences(updatedExperiences);
	};

	// Function to add a bullet point
	const handleAddBulletPoint = (index) => {
		const updatedExperiences = experiences.map((experience, i) =>
			i === index
				? { ...experience, bulletPoint: [...experience.bulletPoint, ''] }
				: experience
		);
		setExperiences(updatedExperiences);
		dispatch(updateExperience({ index, data: updatedExperiences[index] }));
	};

	// Handle changes in bullet points
	const handleBulletChange = (experienceIndex, bulletIndex, value) => {
		const updatedExperiences = experiences.map((experience, i) =>
			i === experienceIndex
				? {
						...experience,
						bulletPoint: experience.bulletPoint.map((bullet, j) =>
							j === bulletIndex ? value : bullet
						),
					}
				: experience
		);
		dispatch(
			updateExperience({
				index: experienceIndex,
				data: updatedExperiences[experienceIndex],
			})
		);
		setExperiences(updatedExperiences);
	};
	// const handleFixExperience = () => {
	//   dispatch(addState({ name: 'fixExperience', value: true }));
	// };

	const handleFixSummary = () => {
		dispatch(addState({ name: 'fixesTitle', value: 'Fixing Work Experience' }));
		dispatch(addState({ name: 'fixSummary', value: true }));
		dispatch(
			addState({
				name: 'fixes',
				value: analysisData?.sections?.workExperience,
			})
		);
	};

	return (
		<div className={`flex flex-col gap-4 px-2 workExp-section ${styles.workExp}`}>
			{/* Header Section */}
			<div className="flex justify-between flex-wrap gap-2">
				<div className="flex gap-4 items-center">
					{displayTitle && <div className="text-xl font-medium">Work Experience</div>}
				</div>
				<div className="flex gap-2  justify-end w-full md:w-fit">
					<div className="flex gap-2 flex-wrap">
						{analysisData?.sections?.workExperience?.issuesCount
							?.optionalIssuesCount ? (
							<NumberBox
								number={1}
								count={
									analysisData?.sections?.workExperience?.issuesCount
										?.optionalIssuesCount
								}
							/>
						) : null}
						{analysisData?.sections?.workExperience?.issuesCount
							?.criticalIssuesCount ? (
							<NumberBox
								number={2}
								count={
									analysisData?.sections?.workExperience?.issuesCount
										?.criticalIssuesCount
								}
							/>
						) : null}
						{analysisData?.sections?.workExperience?.issuesCount?.urgentIssuesCount ? (
							<NumberBox
								number={3}
								count={
									analysisData?.sections?.workExperience?.issuesCount
										?.urgentIssuesCount
								}
							/>
						) : null}
					</div>
					<div className="flex items-center">
						{(analysisData?.sections?.workExperience?.issuesCount
							?.optionalIssuesCount ||
							analysisData?.sections?.workExperience?.issuesCount
								?.criticalIssuesCount ||
							analysisData?.sections?.workExperience?.issuesCount
								?.urgentIssuesCount) > 0 && <FixBox handleFix={handleFixSummary} />}
					</div>
				</div>
			</div>

			<div className="sagar flex flex-col gap-6">
				{/* Drag and Drop Context for Work Experiences */}
				<DragDropContext onDragEnd={handleOnWorkExperienceDragEnd}>
					<Droppable droppableId="work-experience">
						{(provided) => (
							<div
								className="work-experience flex flex-col gap-6"
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{experiences?.map((experience, index) => (
									<React.Fragment key={experience._id}>
										<Draggable draggableId={experience._id} index={index}>
											{(provided) => (
												<div
													className="flex gap-4"
													ref={provided.innerRef}
													{...provided.draggableProps}
												>
													{/* Drag Handle for Work Experience */}
													<div
														{...provided.dragHandleProps}
														className="flex pt-1 justify-between cursor-pointer items-start"
													>
														<DotsIcon />
													</div>
													{/* Input Fields for Work Experience */}
													<div className="w-full flex flex-col gap-2">
														<div className="w-full grid-cols-1 grid gap-2 lg:grid-cols-1 xl:grid-cols-2 md:grid-cols-2 ">
															<CustomInputField
																inputClass={`${styles.inputs} ${styles.inputsplac} `}
																placeholder="Add job Title"
																value={experience.designation}
																handleChange={(e) => {
																	if (e.target.value) {
																		dispatch(
																			removeWorkExpError({
																				id: experience._id,
																				field: 'designation',
																			})
																		);
																	}
																	handleChange(
																		index,
																		'designation',
																		e.target.value
																	);
																}}
																startIcon={
																	!experience.designation ? (
																		<PlusIcon color={'#000'} />
																	) : null
																}
																error={Boolean(
																	expError[experience._id]
																		?.designation
																)}
																helperText={
																	expError[experience._id]
																		?.designation
																}
															/>
															<CustomInputField
																inputClass={`${styles.inputs} ${styles.company}`}
																placeholder="Add Company Name"
																value={experience.company}
																handleChange={(e) => {
																	if (e.target.value) {
																		dispatch(
																			removeWorkExpError({
																				id: experience._id,
																				field: 'company',
																			})
																		);
																	}
																	handleChange(
																		index,
																		'company',
																		e.target.value
																	);
																}}
																startIcon={
																	!experience.company ? (
																		<PlusIcon color={'#000'} />
																	) : null
																}
																error={Boolean(
																	expError[experience._id]
																		?.company
																)}
																helperText={
																	expError[experience._id]
																		?.company
																}
															/>
															<CustomInputField
																inputClass={`${styles.inputs}  ${styles.duration}`}
																placeholder="Add Location"
																value={experience.location}
																handleChange={(e) => {
																	if (e.target.value) {
																		dispatch(
																			removeWorkExpError({
																				id: experience._id,
																				field: 'location',
																			})
																		);
																	}
																	handleChange(
																		index,
																		'location',
																		e.target.value
																	);
																}}
																startIcon={
																	!experience.location ? (
																		<PlusIcon color={'#000'} />
																	) : null
																}
																error={Boolean(
																	expError[experience._id]
																		?.location
																)}
																helperText={
																	expError[experience._id]
																		?.location
																}
															/>

															<CustomDatePicker
																isPresent
																handleDateChange={(data) => {
																	if (data) {
																		dispatch(
																			removeWorkExpError({
																				id: experience._id,
																				field: 'duration',
																			})
																		);
																	}
																	handleChange(
																		index,
																		'duration',
																		data
																	);
																}}
																dates={experience.duration}
																error={
																	expError[experience._id]
																		?.duration
																}
															/>
														</div>
														{/* Bullet Points Section */}
														<DragDropContext
															onDragEnd={(e) =>
																handleOnBulletDragEnd(e, index)
															}
														>
															<Droppable
																droppableId={`bullets-${experience.id}`}
															>
																{(provided) => (
																	<div
																		ref={provided.innerRef}
																		{...provided.droppableProps}
																		className="flex flex-col gap-2  w-full"
																	>
																		{experience?.bulletPoint?.map(
																			(
																				bullet,
																				bulletIndex
																			) => (
																				<Draggable
																					key={
																						bulletIndex
																					}
																					draggableId={`bullet-${experience.id}-${bulletIndex}`}
																					index={
																						bulletIndex
																					}
																				>
																					{(provided) => (
																						<div
																							className="flex items-center gap-2 w-full"
																							ref={
																								provided.innerRef
																							}
																							{...provided.draggableProps}
																						>
																							<div
																								{...provided.dragHandleProps}
																								className="flex pt-1 justify-between cursor-pointer items-start"
																							>
																								<DotsIcon />
																							</div>
																							<span className="h-[4px] w-[4px] rounded-full bg-black"></span>
																							<input
																								placeholder="Texts here.."
																								value={
																									bullet
																								}
																								required
																								onChange={(
																									e
																								) => {
																									if (
																										e
																											.target
																											.value
																									) {
																										dispatch(
																											removeWorkExpError(
																												{
																													id: experience._id,
																													field: 'bulletPoint',
																												}
																											)
																										);
																									}
																									handleBulletChange(
																										index,
																										bulletIndex,
																										e
																											.target
																											.value
																									);
																								}}
																								className="w-full text-sm focus:outline-none text-[#4D4D4D] border-none border-[#ffffff00] bg-[#ffffff00] placeholder-[#B3B3B3]"
																							/>
																							<div
																								className={`cursor-pointer h-4 `}
																								onClick={() => {
																									const updatedExperiences =
																										experiences.map(
																											(
																												exp,
																												i
																											) =>
																												i ===
																												index
																													? {
																															...exp,
																															bulletPoint:
																																exp.bulletPoint.filter(
																																	(
																																		_,
																																		j
																																	) =>
																																		j !==
																																		bulletIndex
																																),
																														}
																													: exp
																										);
																									setExperiences(
																										updatedExperiences
																									);
																									dispatch(
																										updateExperience(
																											{
																												index,
																												data: updatedExperiences[
																													index
																												],
																											}
																										)
																									);
																									const hasNonEmptyString =
																										experience?.bulletPoint.some(
																											(
																												item
																											) =>
																												item.trim() !==
																												''
																										);
																									if (
																										hasNonEmptyString
																									) {
																										dispatch(
																											removeWorkExpError(
																												{
																													id: experience._id,
																													field: 'bulletPoint',
																												}
																											)
																										);
																									}
																								}}
																							>
																								<DeleteIcon />
																							</div>
																						</div>
																					)}
																				</Draggable>
																			)
																		)}
																		{provided.placeholder}
																		<div
																			className={
																				styles.fields
																			}
																			onClick={() =>
																				handleAddBulletPoint(
																					index
																				)
																			}
																		>
																			<PlusIcon
																				color={'#000'}
																			/>
																			<span>
																				Add Bullet Point
																			</span>
																		</div>
																		{Boolean(
																			expError[experience._id]
																				?.bulletPoint
																		) && (
																			<span className="text-[#CD2735] font-normal text-sm">
																				{
																					expError[
																						experience
																							._id
																					]?.bulletPoint
																				}{' '}
																			</span>
																		)}
																	</div>
																)}
															</Droppable>
														</DragDropContext>
													</div>
													{/* Delete Button for Work Experience */}
													<div
														className={`cursor-pointer ${experienceData?.length < 2 ? 'hidden' : 'flex'}`}
														onClick={() => handleDelete(index)}
													>
														<DeleteIcon />
													</div>
												</div>
											)}
										</Draggable>
										{/* Divider Line */}
										<div className={`${styles.boarder} h-[1px] w-full`}></div>
									</React.Fragment>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>

				{/* Button to Add New Work Experience */}
				<div className={styles.fields} onClick={handleAddExperience}>
					<PlusIcon color={'#000'} />
					<span>Add Work Experience</span>
				</div>
			</div>
		</div>
	);
};

export default WorkExperience;
