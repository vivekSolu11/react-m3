import React, { useState } from 'react';

import JobOpening from './JobOpening';
import { useQueryAPI } from 'apis/query';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

function getFullLocation(location) {
	const { area, city, state, country } = location;

	// Create an array to hold the location components
	const locationParts = [];

	// Only add the non-null values
	if (area) locationParts.push(area);
	if (city) locationParts.push(city);
	if (state) locationParts.push(state);
	if (country) locationParts.push(country);

	// Join the parts with a comma and return the full location string
	return locationParts.join(', ');
}

const JobOpeningCard = () => {
	const [showMore, setShowMore] = useState(false);

	const toggleShowMore = () => {
		setShowMore((prev) => !prev);
	};

	const { fetchJobCompanies } = useQueryAPI();

	const { selectedRole } = useSelector((state) => state.careerAdvisor);

	const { data } = useQuery({
		queryKey: ['fetchJobCompanies', selectedRole],
		staleTime: 300000,

		queryFn: () => fetchJobCompanies(selectedRole?.jobRole?.title || ''), // Pass pageParam for pagination
	});
	const resData = data?.data?.data?.items;
	if (!(resData?.length > 0)) return null;

	return (
		<div className="mb-6">
			<h2 className="text-base font-medium tracking-tight text-[#000000]">
				Job Openings for {selectedRole?.jobRole?.title}
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
				{resData?.slice(0, showMore ? resData.length : 2)?.map((job, index) => (
					<JobOpening
						key={index}
						title={job.title}
						company={job.company}
						location={getFullLocation(job.location)}
						imageUrl={job.companyLogo}
						number={job?.jobNumber}
					/>
				))}
			</div>
			{resData?.length > 2 && (
				<div className="flex justify-end py-4">
					<div
						onClick={toggleShowMore}
						className="cursor-pointer text-[#4285F4] underline text-xs font-[500]"
					>
						{showMore ? 'View Less' : 'View More'}
					</div>
				</div>
			)}
		</div>
	);
};

export default JobOpeningCard;
