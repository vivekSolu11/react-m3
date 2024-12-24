import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { FixBox, NumberBox } from './NumberBox';
import DeleteIcon from 'assets/SVGs/DeleteIcon';
import { DotsIcon, PlusIcon } from 'assets/index';
import CustomInputField from 'component/customComponents/inputField';
import { removeResumeSectionState } from 'store/reducer/resume/resumeSlice';
import { generateUniqueId } from 'utils/common';
import {
	addLink,
	removeAllLinks,
	removeLink,
	updateAllLinks,
	updateLink,
} from 'store/reducer/resume/linkSlice';

import styles from './editTemplateList.module.css';
import { addState } from 'store/sagaActions';

const Links = () => {
	const links = useSelector((state) => state.links);
	const dispatch = useDispatch();
	const [LinksData, setLinksData] = useState([]);
	const { analysisData } = useSelector((state) => state.common);
	const handleOnWorkExperienceDragEnd = (result) => {
		if (!result.destination) return;
		const items = Array.from(LinksData);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		dispatch(updateAllLinks(items));
		setLinksData(items);
	};

	const handleAddCertificate = () => {
		const newCertificate = {
			_id: generateUniqueId('link'),
			title: '',
			url: '',
		};
		dispatch(addLink(newCertificate));
		setLinksData((prevLinks) => [...prevLinks, newCertificate]);
	};

	const handleDelete = (id) => {
		dispatch(removeLink(id));
	};

	const handleChange = (index, field, value) => {
		const updatedLinks = LinksData.map((link, i) =>
			i === index ? { ...link, [field]: value } : link
		);

		// Dispatch the action with the complete updated link
		dispatch(updateLink({ index, link: updatedLinks[index] }));
		setLinksData(updatedLinks);
	};

	useEffect(() => {
		if (links.length < 1) {
			handleAddCertificate();
		}
		setLinksData(links);
	}, [links]);

	const handleFixSummary = () => {
		dispatch(addState({ name: 'fixesTitle', value: 'Fixing Links' }));
		dispatch(addState({ name: 'fixSummary', value: true }));
		dispatch(addState({ name: 'fixes', value: analysisData?.sections?.links }));
	};

	return (
		<div className="flex flex-col gap-4 px-2">
			<div className="flex justify-between gap-2">
				<div className="flex gap-4 items-center">
					<div className="text-xl font-medium">Links</div>
				</div>
				<div className="flex items-center gap-2">
					{analysisData?.sections?.links?.issuesCount?.optionalIssuesCount ? (
						<NumberBox
							number={1}
							count={analysisData?.sections?.links?.issuesCount?.optionalIssuesCount}
						/>
					) : null}
					{analysisData?.sections?.links?.issuesCount?.criticalIssuesCount ? (
						<NumberBox
							number={2}
							count={analysisData?.sections?.links?.issuesCount?.criticalIssuesCount}
						/>
					) : null}
					{analysisData?.sections?.links?.issuesCount?.urgentIssuesCount ? (
						<NumberBox
							number={3}
							count={analysisData?.sections?.links?.issuesCount?.urgentIssuesCount}
						/>
					) : null}

					{(analysisData?.sections?.links?.issuesCount?.optionalIssuesCount ||
						analysisData?.sections?.links?.issuesCount?.criticalIssuesCount ||
						analysisData?.sections?.links?.issuesCount?.urgentIssuesCount) > 0 && (
						<FixBox handleFix={handleFixSummary} />
					)}

					<div
						className="cursor-pointer"
						onClick={() => {
							dispatch(removeResumeSectionState('links'));
							dispatch(removeAllLinks());
							setLinksData([]); // Clear local state
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
								{LinksData.map((item, index) => (
									<Draggable key={item._id} draggableId={item._id} index={index}>
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
															placeholder="Add Name"
															value={item.title}
															handleChange={(e) =>
																handleChange(
																	index,
																	'title',
																	e.target.value
																)
															}
															startIcon={
																!item.title ? (
																	<PlusIcon color={'#000'} />
																) : null
															}
														/>
														<CustomInputField
															inputClass={styles.inputs}
															placeholder="Add Link"
															value={item.url}
															handleChange={(e) =>
																handleChange(
																	index,
																	'url',
																	e.target.value
																)
															}
															startIcon={
																!item.url ? (
																	<PlusIcon color={'#000'} />
																) : null
															}
														/>
													</div>
													<div
														className="cursor-pointer"
														onClick={() => handleDelete(index)} // Pass the correct ID
													>
														<DeleteIcon />
													</div>
												</div>
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
					<span>Add Link</span>
				</div>
			</div>
		</div>
	);
};

export default Links;
