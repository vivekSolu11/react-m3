import React, { useState } from 'react';
import DetailHeading from './DetailHeading';
import DetailItemlayout from './DetailItemlayout';
import { PROFILE_EDUCATION_ICON } from 'assets/images';
import Education from 'component/resumeBuilder/editTemplateList/Education';
import { useSelector } from 'react-redux';
import moment from 'moment';

import Collapse from '@mui/material/Collapse';

import './index.css';

const EducationDetail = () => {
	const data = useSelector((state) => state?.education);
	const [editExperience, setEditExperience] = useState(false);

	const handleEdit = () => {
		setEditExperience((prev) => !prev);
	};

	return (
		<div className="edit-container flex flex-col gap-3">
			{/* Header with Edit and Save buttons */}
			<DetailHeading
				heading="Education Details"
				handleEdit={handleEdit}
				edit={editExperience}
			/>

			{/* Collapse section for either display or edit */}
			<Collapse
				in={editExperience}
				timeout="auto"
				style={{
					transition: 'height 0.3s ease-in-out, opacity 0.3s ease-in-out', // Smooth transition
				}}
			>
				{/* Editable Content */}
				<Education displayTitle={false} />
			</Collapse>

			<Collapse
				in={!editExperience}
				timeout="auto"
				style={{
					transition: 'height 0.3s ease-in-out, opacity 0.3s ease-in-out', // Smooth transition
				}}
			>
				{/* Display Content */}
				<DetailItemlayout>
					<div className="flex flex-col gap-4">
						{data?.length
							? data?.map((item) => (
									<div className="flex gap-3" key={item?._id}>
										<img
											height={20}
											width={20}
											src={PROFILE_EDUCATION_ICON}
											alt="section icon"
										/>
										<div key={item?._id} className="text-[12px]">
											<div className="flex gap-1 ">
												{item?.degree && (
													<div className="text-[#1A1A1A] text-[12px]">
														{item?.degree},
													</div>
												)}
												{item?.fieldOfStudy && (
													<div className="text-[#1A1A1A] text-[12px]">
														{item?.fieldOfStudy}
													</div>
												)}
											</div>
											{item?.instituteName && (
												<div className="text-[#666666]">
													{' '}
													{item?.instituteName}{' '}
												</div>
											)}
											{item?.duration && (
												<div className="text-[#666666]">
													{moment(item?.duration?.from)
														.format('MMM YYYY')
														.toUpperCase()}{' '}
													{' - '}
													{moment(item?.duration?.to)
														.format('MMM YYYY')
														.toUpperCase()}
												</div>
											)}
										</div>
									</div>
								))
							: null}
					</div>
				</DetailItemlayout>
			</Collapse>
		</div>
	);
};

export default EducationDetail;
