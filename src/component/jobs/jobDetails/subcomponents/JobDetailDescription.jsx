import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

const JobDetailDescription = () => {
	const { JobDetails } = useSelector((state) => state.common);
	return (
		<div className="flex flex-col gap-4">
			<div
				className="description pl-2"
				dangerouslySetInnerHTML={{ __html: JobDetails?.jobDetail?.html }}
			></div>
		</div>
	);
};

export default JobDetailDescription;
