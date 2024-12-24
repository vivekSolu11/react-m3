import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { FixBox, NumberBox } from './NumberBox';
import DeleteIcon from 'assets/SVGs/DeleteIcon';
import { generateUniqueId } from 'utils/common';
import { DotsIcon, PlusIcon } from 'assets/index';
import CustomInputField from 'component/customComponents/inputField';
import {
	addEducation,
	removeEducation,
	updateAllEducation,
	updateEducation,
} from 'store/reducer/resume/educationSlice';
import CustomDatePicker from './CustomDatePicker';

import styles from './editTemplateList.module.css';
import { removeEduError } from 'store/reducer/resume/errorSlice';
import { addState } from 'store/sagaActions';

const Education = ({ displayTitle = true }) => {
	const educationData = useSelector((state) => state.education);
	const { eduError } = useSelector((state) => state.resumeError);
	const { analysisData } = useSelector((state) => state.common);
	const dispatch = useDispatch();
	// State to hold the array of work educations
	const [education, setEducation] = useState([]);

	useEffect(() => {
		if (educationData.length < 1) {
			setEducation([
				{
					_id: generateUniqueId('edu'),
					instituteName: '',
					degree: '',
					fieldOfStudy: '',
					duration: {},
				},
			]);
		} else {
			setEducation(educationData);
		}
	}, [educationData]);

	// Handle drag and drop for work experiences
	function handleOnWorkExperienceDragEnd(result) {
		if (!result.destination) return;
		const items = Array.from(education);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setEducation(items);
		dispatch(updateAllEducation(items));
	}

	// Function to add a new work experience
	const handleAddExperience = () => {
		dispatch(
			addEducation({
				_id: generateUniqueId('edu'),
				instituteName: '',
				degree: '',
				fieldOfStudy: '',
				duration: {},
			})
		);
		setEducation([
			...education,
			{
				_id: generateUniqueId('edu'),
				instituteName: '',
				degree: '',
				fieldOfStudy: '',
				duration: {},
			},
		]);
	};

	// Handle changes in input fields
	const handleChange = (index, field, value, eduId) => {
		if (value) {
			dispatch(
				removeEduError({
					id: eduId,
					field: field,
				})
			);
		}
		// Create a new array with the updated experience
		const updatedExperiences = education.map((experience, i) =>
			i === index ? { ...experience, [field]: value } : experience
		);

		// Dispatch the action with the complete updated experience
		dispatch(updateEducation({ index, data: updatedExperiences[index] }));

		// Update local state
		setEducation(updatedExperiences);
	};

	// Handle deletion of a work experience
	const handleDelete = (index) => {
		dispatch(removeEducation(index));
		const updatedExperiences = education.filter((_, i) => i !== index);
		setEducation(updatedExperiences);
	};

	const handleFixSummary = () => {
		dispatch(addState({ name: 'fixesTitle', value: 'Fixing Education' }));
		dispatch(addState({ name: 'fixSummary', value: true }));
		dispatch(addState({ name: 'fixes', value: analysisData?.sections?.education }));
	};

	return (
		<div className="flex flex-col gap-4 px-2 education-section">
			{/* Header Section */}
			<div className="flex justify-between gap-2">
				<div className="flex gap-4 items-center">
					{displayTitle && <div className="text-xl font-medium">Education</div>}
				</div>
				<div className="flex gap-2">
					{analysisData?.sections?.education?.issuesCount?.optionalIssuesCount ? (
						<NumberBox
							number={1}
							count={
								analysisData?.sections?.education?.issuesCount?.optionalIssuesCount
							}
						/>
					) : null}
					{analysisData?.sections?.education?.issuesCount?.criticalIssuesCount ? (
						<NumberBox
							number={2}
							count={
								analysisData?.sections?.education?.issuesCount?.criticalIssuesCount
							}
						/>
					) : null}
					{analysisData?.sections?.education?.issuesCount?.urgentIssuesCount ? (
						<NumberBox
							number={3}
							count={
								analysisData?.sections?.education?.issuesCount?.urgentIssuesCount
							}
						/>
					) : null}

					{(analysisData?.sections?.education?.issuesCount?.optionalIssuesCount ||
						analysisData?.sections?.education?.issuesCount?.criticalIssuesCount ||
						analysisData?.sections?.education?.issuesCount?.urgentIssuesCount) > 0 && (
						<FixBox handleFix={handleFixSummary} />
					)}
				</div>
			</div>

			<div className=" flex flex-col gap-6">
				{/* Drag and Drop Context for Work Experiences */}
				<DragDropContext onDragEnd={handleOnWorkExperienceDragEnd}>
					<Droppable droppableId="education">
						{(provided) => (
							<div
								className="education flex flex-col gap-6"
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{education?.map((edu, index) => (
									<React.Fragment key={edu._id}>
										<Draggable draggableId={edu._id} index={index}>
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
														<div className="w-full  grid gap-2 grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 md:grid-cols-2 ">
															<CustomInputField
																// boxClassName={'md:col-span-2'}
																inputClass={`${styles.inputs} ${styles.inputsplac}`}
																placeholder="Add institute Name"
																value={edu.instituteName}
																name="instituteName"
																handleChange={(e) =>
																	handleChange(
																		index,
																		'instituteName',
																		e.target.value,
																		edu._id
																	)
																}
																startIcon={
																	!edu.instituteName ? (
																		<PlusIcon color={'#000'} />
																	) : null
																}
																error={Boolean(
																	eduError[edu._id]?.instituteName
																)}
																helperText={
																	eduError[edu._id]?.instituteName
																}
															/>
															<CustomInputField
																inputClass={`${styles.inputs} ${styles.inputsplac} `}
																placeholder="Add Degree"
																name="degree"
																value={edu.degree}
																handleChange={(e) =>
																	handleChange(
																		index,
																		'degree',
																		e.target.value,
																		edu._id
																	)
																}
																startIcon={
																	!edu.degree ? (
																		<PlusIcon color={'#000'} />
																	) : null
																}
																error={Boolean(
																	eduError[edu._id]?.degree
																)}
																helperText={
																	eduError[edu._id]?.degree
																}
															/>
															<CustomInputField
																inputClass={`${styles.inputs} ${styles.inputsplac} `}
																placeholder="Add Field Of Study"
																name="fieldOfStudy"
																value={edu.fieldOfStudy}
																handleChange={(e) =>
																	handleChange(
																		index,
																		'fieldOfStudy',
																		e.target.value,
																		edu._id
																	)
																}
																startIcon={
																	!edu.fieldOfStudy ? (
																		<PlusIcon color={'#000'} />
																	) : null
																}
																error={Boolean(
																	eduError[edu._id]?.fieldOfStudy
																)}
																helperText={
																	eduError[edu._id]?.fieldOfStudy
																}
															/>

															<CustomDatePicker
																handleDateChange={(data) => {
																	handleChange(
																		index,
																		'duration',
																		data,
																		edu._id
																	);
																}}
																isPresent
																dates={edu.duration}
																error={eduError[edu._id]?.duration}
															/>
														</div>
													</div>
													{/* Delete Button for Work Experience */}
													<div
														className={`cursor-pointer ${educationData?.length < 2 ? 'hidden' : 'flex'}`}
														onClick={() => handleDelete(index)}
													>
														<DeleteIcon />
													</div>
												</div>
											)}
										</Draggable>
										{/* Divider Line */}
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
					<span>Add Education</span>
				</div>
			</div>
		</div>
	);
};

export default Education;
