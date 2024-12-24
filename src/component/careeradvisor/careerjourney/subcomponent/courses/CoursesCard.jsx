import React, { useState } from 'react';

import CoursesList from './CoursesList';

import '../../../../careeradvisor/career.css';

const CoursesCard = ({ className, Courses }) => {
	const [showAll, setShowAll] = useState(false);

	const handleToggle = () => {
		setShowAll(!showAll);
	};

	const displayedCourses = showAll ? Courses : Courses?.slice(0, 2);

	return (
		<div className={`flex flex-col px-4 pt-4 md:pt-10 gap-2 relative ${className}`}>
			<h2 className="text-base font-medium tracking-tight text-[#000000]  m-0 ">
				Courses to Consider for Your Journey
			</h2>

			<div className="coscard_container gap-4 mt-2">
				{displayedCourses?.map((course, index) => (
					<CoursesList key={index} {...course} />
				))}
			</div>

			{Courses?.length > 2 && (
				<div className="flex justify-end py-4">
					<div
						onClick={handleToggle}
						className="cursor-pointer text-[#4285F4] underline text-xs font-[500]"
					>
						{showAll ? 'View Less' : 'View More'}
					</div>
				</div>
			)}
		</div>
	);
};

export default CoursesCard;
