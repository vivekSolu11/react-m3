import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { FixBox, NumberBox } from './NumberBox';
import DeleteIcon from 'assets/SVGs/DeleteIcon';
import { DotsIcon, PlusIcon } from 'assets/index';
import CustomInputField from 'component/customComponents/inputField';
import { removeResumeSectionState } from 'store/reducer/resume/resumeSlice';
import { formatDate, generateUniqueId } from 'utils/common';
import {
	addCertificate,
	removeAllCertificate,
	removeCertificate,
	updateAllcertificates,
	updateCertificate,
} from 'store/reducer/resume/certificateSlice';

import styles from './editTemplateList.module.css';
import { addState } from 'store/sagaActions';

const Certifications = () => {
	const dispatch = useDispatch();
	const certificates = useSelector((state) => state.certificates);
	const { analysisData } = useSelector((state) => state.common);

	const [certificatesData, setcertificatesData] = useState([]);

	const handleOnWorkExperienceDragEnd = (result) => {
		if (!result.destination) return;
		const items = Array.from(certificatesData);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		dispatch(updateAllcertificates(items)); // Update the certificates in the Redux store
		setcertificatesData(items);
	};

	const handleAddCertificate = () => {
		const newCertificate = {
			_id: generateUniqueId('Certificate'),
			name: '',
			date: '',
		};
		dispatch(addCertificate(newCertificate));
		setcertificatesData([...certificatesData, newCertificate]);
	};

	const handleDelete = (id) => {
		dispatch(removeCertificate(id));
	};
	const handleChange = (index, field, value) => {
		// Create a new array with the updated experience
		const updatedCertificate = certificatesData.map((experience, i) =>
			i === index ? { ...experience, [field]: value } : experience
		);

		// Dispatch the action with the complete updated experience
		dispatch(updateCertificate({ index, certificate: updatedCertificate[index] }));

		// Update local state
		setcertificatesData(updatedCertificate);
	};

	useEffect(() => {
		if (certificates.length < 1) {
			handleAddCertificate();
		}
		setcertificatesData(certificates);
	}, [certificates]);

	const handleFixSummary = () => {
		dispatch(addState({ name: 'fixesTitle', value: 'Fixing Certifications' }));
		dispatch(addState({ name: 'fixSummary', value: true }));
		dispatch(
			addState({
				name: 'fixes',
				value: analysisData?.sections?.certifications,
			})
		);
	};

	return (
		<div className="flex flex-col gap-4 px-2">
			<div className="flex justify-between gap-2">
				<div className="flex gap-4 items-center">
					<div className="text-xl font-medium">Certifications</div>
				</div>
				<div className="flex items-center gap-2">
					{analysisData?.sections?.certifications?.issuesCount?.optionalIssuesCount ? (
						<NumberBox
							number={1}
							count={
								analysisData?.sections?.certifications?.issuesCount
									?.optionalIssuesCount
							}
						/>
					) : null}
					{analysisData?.sections?.certifications?.issuesCount?.criticalIssuesCount ? (
						<NumberBox
							number={2}
							count={
								analysisData?.sections?.certifications?.issuesCount
									?.criticalIssuesCount
							}
						/>
					) : null}
					{analysisData?.sections?.certifications?.issuesCount?.urgentIssuesCount ? (
						<NumberBox
							number={3}
							count={
								analysisData?.sections?.certifications?.issuesCount
									?.urgentIssuesCount
							}
						/>
					) : null}

					{(analysisData?.sections?.certifications?.issuesCount?.optionalIssuesCount ||
						analysisData?.sections?.certifications?.issuesCount?.criticalIssuesCount ||
						analysisData?.sections?.certifications?.issuesCount?.urgentIssuesCount) >
						0 && <FixBox handleFix={handleFixSummary} />}
					<div
						className="cursor-pointer"
						onClick={() => {
							dispatch(removeResumeSectionState('certifications'));
							dispatch(removeAllCertificate());
						}}
					>
						<DeleteIcon />
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-6">
				<DragDropContext onDragEnd={handleOnWorkExperienceDragEnd}>
					<Droppable droppableId="certificates-drag">
						{(provided) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className="certificates-drag flex flex-col gap-6"
							>
								{certificatesData?.map((item, index) => (
									<Draggable
										key={item?._id}
										draggableId={item?._id}
										index={index}
									>
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
													<div className="w-full grid gap-2 grid-cols-1 md:grid-cols-2">
														<CustomInputField
															inputClass={`${styles.inputs} ${styles.inputsplac}`}
															placeholder="Add Certificate"
															value={item.name}
															handleChange={(e) =>
																handleChange(
																	index,
																	'name',
																	e.target.value
																)
															}
															startIcon={
																!item.name ? (
																	<PlusIcon color={'#000'} />
																) : null
															}
														/>
														{/* <CustomInputField
                              inputClass={styles.inputs}
                              placeholder="Add date"
                              value={item.date}
                              handleChange={(e) =>
                                handleChange(index, 'date', e.target.value)
                              }
                              startIcon={
                                !item.date ? (
                                  <PlusIcon color={'#000'} />
                                ) : null
                              }
                            /> */}
														<div
															className={`${styles.fields} cursor-pointer w-fit relative rounded border-[#0000003b] !py-2`}
														>
															<span>
																{item.date
																	? formatDate(item.date)
																	: 'Issue Date'}
															</span>
															<input
																type="date"
																className={styles.datePicker}
																value={item.date}
																onChange={(e) => {
																	handleChange(
																		index,
																		'date',
																		e.target.value
																	);
																}}
																max={
																	new Date()
																		.toISOString()
																		.split('T')[0]
																}
															/>
														</div>
													</div>
													<div
														className="cursor-pointer"
														onClick={() => handleDelete(index)}
													>
														<DeleteIcon />
													</div>
												</div>
												<div
													className={`${styles.boarder} h-[1px] w-full`}
												></div>
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
			<div className="col-span-2 flex mt-2 flex-col gap-2 ">
				<div className={styles.fields} onClick={handleAddCertificate}>
					<PlusIcon color={'#000'} />
					<span>Add Certification</span>
				</div>
			</div>
		</div>
	);
};

export default Certifications;
