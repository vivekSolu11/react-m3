import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import DetailHeading from './DetailHeading';
import DetailItemlayout from './DetailItemlayout';
import CustomChip from 'component/jobs/jobDetails/subcomponents/CustomChip';
import { Collapse } from '@mui/material';

import Skills from 'component/resumeBuilder/editTemplateList/Skills';
import './index.css';

const ResumeSkills = () => {
	const data = useSelector((state) => state?.skills);
	const [editSkills, setEditSkills] = useState(false);

	const handleEditSkills = () => {
		setEditSkills((prev) => !prev);
	};

	return (
		<div className="flex profile-skills md:border-none md:p-0 flex-col gap-4">
			<DetailHeading heading="Skills" handleEdit={handleEditSkills} edit={editSkills} />
			<Collapse
				in={editSkills}
				timeout="auto"
				style={{
					transition: 'height 0.3s ease-in-out, opacity 0.3s ease-in-out', // Smooth transition
				}}
			>
				<Skills displayTitle={false} />
			</Collapse>
			<Collapse
				in={!editSkills}
				timeout="auto"
				style={{
					transition: 'height 0.3s ease-in-out, opacity 0.3s ease-in-out', // Smooth transition
				}}
			>
				<div>
					{data && data?.length > 0 && (
						<div className="flex flex-col gap-6">
							{data?.map((items, i) =>
								items?.data?.length > 0 && items?.data[0]?.name?.length ? (
									<DetailItemlayout key={i}>
										<div className="flex flex-col gap-3">
											<div className="text-[12px]">{items?.title}</div>
											<div className="flex gap-2 flex-wrap">
												{items?.data?.length > 0 &&
													items?.data.map((skill) => (
														<CustomChip
															key={skill?.key}
															item={skill?.name}
														/>
													))}
											</div>
										</div>
									</DetailItemlayout>
								) : null
							)}
						</div>
					)}
				</div>
			</Collapse>
		</div>
	);
};

export default ResumeSkills;
