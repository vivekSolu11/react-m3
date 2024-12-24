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
	addReference,
	removeAllReferences,
	removeReference,
	updateAllReferences,
	updateReference,
} from 'store/reducer/resume/referenceSlice';
import { removeResumeSectionState } from 'store/reducer/resume/resumeSlice';

import styles from './editTemplateList.module.css';
import { addState } from 'store/sagaActions';

const References = () => {
	const references = useSelector((state) => state.references);
	const { analysisData } = useSelector((state) => state.common);
	const dispatch = useDispatch();
	// State to hold the array of work educations
	const [referencesData, setReferencesData] = useState([]);

	useEffect(() => {
		if (references.length < 1) {
			handleAddReference();
		}
		setReferencesData(references);
	}, [references]);

	// Handle drag and drop for work experiences
	function handleOnWorkExperienceDragEnd(result) {
		if (!result.destination) return;
		const items = Array.from(referencesData);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setReferencesData(items);
		dispatch(updateAllReferences(items));
	}

	// Function to add a new work experience
	const handleAddReference = () => {
		dispatch(
			addReference({
				_id: generateUniqueId('ref'),
				name: '',
				email: '',
				url: '',
				phone: '',
			})
		);
		setReferencesData([
			...referencesData,
			{
				_id: generateUniqueId('ref'),
				name: '',
				email: '',
				url: '',
				phone: '',
			},
		]);
	};

	// Handle changes in input fields
	const handleChange = (index, field, value) => {
		// Create a new array with the updated experience
		const updatedRef = referencesData.map((ref, i) =>
			i === index ? { ...ref, [field]: value } : ref
		);

		// Dispatch the action with the complete updated experience
		dispatch(updateReference({ index, reference: updatedRef[index] }));

		// Update local state
		setReferencesData(updatedRef);
	};

	// Handle deletion of a work experience
	const handleDelete = (index) => {
		dispatch(removeReference(index));
		const updatedRef = referencesData.filter((_, i) => i !== index);
		setReferencesData(updatedRef);
	};

	const handleFixSummary = () => {
		dispatch(addState({ name: 'fixesTitle', value: 'Fixing References' }));
		dispatch(addState({ name: 'fixSummary', value: true }));
		dispatch(addState({ name: 'fixes', value: analysisData?.sections?.references }));
	};
	return (
		<div className="flex flex-col gap-4 px-2">
			{/* Header Section */}
			<div className="flex justify-between gap-2">
				<div className="flex gap-4 items-center">
					<div className="text-xl font-medium">References</div>
				</div>
				<div className="flex gap-2 items-center">
					{analysisData?.sections?.references?.issuesCount?.optionalIssuesCount ? (
						<NumberBox
							number={1}
							count={
								analysisData?.sections?.references?.issuesCount?.optionalIssuesCount
							}
						/>
					) : null}
					{analysisData?.sections?.references?.issuesCount?.criticalIssuesCount ? (
						<NumberBox
							number={2}
							count={
								analysisData?.sections?.references?.issuesCount?.criticalIssuesCount
							}
						/>
					) : null}
					{analysisData?.sections?.references?.issuesCount?.urgentIssuesCount ? (
						<NumberBox
							number={3}
							count={
								analysisData?.sections?.references?.issuesCount?.urgentIssuesCount
							}
						/>
					) : null}

					{(analysisData?.sections?.references?.issuesCount?.optionalIssuesCount ||
						analysisData?.sections?.references?.issuesCount?.criticalIssuesCount ||
						analysisData?.sections?.references?.issuesCount?.urgentIssuesCount) > 0 && (
						<FixBox handleFix={handleFixSummary} />
					)}

					<div
						className="cursor-pointer"
						onClick={() => {
							dispatch(removeResumeSectionState('references'));
							dispatch(removeAllReferences());
						}}
					>
						<DeleteIcon />
					</div>
				</div>
			</div>

			<div className="sagar flex flex-col gap-6">
				{/* Drag and Drop Context for Work Experiences */}
				<DragDropContext onDragEnd={handleOnWorkExperienceDragEnd}>
					<Droppable droppableId="education">
						{(provided) => (
							<div
								className="education flex flex-col gap-6"
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{referencesData?.map((ref, index) => (
									<React.Fragment key={ref._id}>
										<Draggable draggableId={ref._id} index={index}>
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
														<div className="w-full grid gap-2 grid-cols-1 md:grid-cols-2 ">
															<CustomInputField
																boxClassName={'md:col-span-2'}
																inputClass={`${styles.inputs} ${styles.inputsplac} `}
																placeholder="Add Name"
																value={ref.name}
																handleChange={(e) =>
																	handleChange(
																		index,
																		'name',
																		e.target.value
																	)
																}
																startIcon={
																	!ref.name ? (
																		<PlusIcon color={'#000'} />
																	) : null
																}
															/>
															<CustomInputField
																inputClass={styles.inputs}
																placeholder="Add Email"
																value={ref.email}
																handleChange={(e) =>
																	handleChange(
																		index,
																		'email',
																		e.target.value
																	)
																}
																startIcon={
																	!ref.email ? (
																		<PlusIcon color={'#000'} />
																	) : null
																}
															/>
															<CustomInputField
																inputClass={styles.inputs}
																placeholder="Add url"
																value={ref.url}
																handleChange={(e) =>
																	handleChange(
																		index,
																		'url',
																		e.target.value
																	)
																}
																startIcon={
																	!ref.url ? (
																		<PlusIcon color={'#000'} />
																	) : null
																}
															/>
															<CustomInputField
																inputClass={styles.inputs}
																placeholder="Add Phone"
																value={ref.phone}
																handleChange={(e) =>
																	handleChange(
																		index,
																		'phone',
																		e.target.value
																	)
																}
																startIcon={
																	!ref.phone ? (
																		<PlusIcon color={'#000'} />
																	) : null
																}
															/>
														</div>
													</div>
													{/* Delete Button for Work Experience */}
													<div
														className="cursor-pointer"
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
				<div className={styles.fields} onClick={handleAddReference}>
					<PlusIcon color={'#000'} />
					<span>Add References</span>
				</div>
			</div>
		</div>
	);
};

export default References;
