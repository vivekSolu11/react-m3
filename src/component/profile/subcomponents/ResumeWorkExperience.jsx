import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Collapse } from '@mui/material';
import moment from 'moment';

import DetailHeading from './DetailHeading';
import DetailItemlayout from './DetailItemlayout';
import { PROFILE_WORKEXPERIENCE } from 'assets/images';
import WorkExperience from 'component/resumeBuilder/editTemplateList/WorkExperience';

const ResumeWorkExperience = () => {
	const data = useSelector((state) => state?.workExperience);
	const [edit, setEdit] = useState(false);

	const handleEdit = () => {
		setEdit((prev) => !prev);
	};

	return (
		<div className={`edit-container flex flex-col gap-3  `}>
			<DetailHeading heading="WorkExperience" edit={edit} handleEdit={handleEdit} />
			<Collapse
				in={edit}
				timeout="auto"
				style={{
					transition: 'height 0.3s ease-in-out, opacity 0.3s ease-in-out', // Smooth transition
				}}
			>
				<WorkExperience displayTitle={false} />
			</Collapse>
			<Collapse
				in={!edit}
				timeout="auto"
				style={{
					transition: 'height 0.3s ease-in-out, opacity 0.3s ease-in-out', // Smooth transition
				}}
			>
				<DetailItemlayout>
					<div className="flex flex-col gap-4">
						{data?.length
							? data?.map((item) => (
									<div className="flex gap-3" key={item._id}>
										<img
											height={20}
											width={20}
											src={PROFILE_WORKEXPERIENCE}
											alt="section icon"
										/>
										<div className="flex flex-col gap-4">
											<div className="gap-1 text-[12px] text-[#1A1A1A] flex flex-col">
												<div>{item?.company}</div>
												<div className="text-[#666666]">
													{item?.designation} |{' '}
													{moment(item?.duration?.from)
														.format('MMM YYYY')
														.toUpperCase()}{' '}
													{' - '}
													{item?.duration?.tillNow
														? 'Present'
														: moment(item?.duration?.to)
																.format('MMM YYYY')
																.toUpperCase()}
												</div>
											</div>
											<ul className="flex flex-col p-0 m-0 ml-7 gap-2">
												{item?.bulletPoint?.map((point) => (
													<li
														key={item}
														className="text-[14px] -tracking-[0.02em] text-[#666666]"
													>
														{point}
													</li>
												))}
											</ul>
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

export default ResumeWorkExperience;
