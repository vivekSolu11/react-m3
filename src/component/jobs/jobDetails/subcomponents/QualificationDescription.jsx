import React from 'react';
import { useSelector } from 'react-redux';

const QualificationDescription = () => {
	const { JobDetails } = useSelector((state) => state.common);

	return (
		<div className="w-full flex flex-col gap-4 ">
			<div
				className="description pl-2"
				dangerouslySetInnerHTML={{ __html: JobDetails?.qualification?.html }}
			></div>
		</div>
	);
};

export default QualificationDescription;
