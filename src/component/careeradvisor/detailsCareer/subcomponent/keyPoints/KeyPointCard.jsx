import React from 'react';

import KeyPoints from './KeyPoints';
import { useSelector } from 'react-redux';

const KeyPointCard = () => {
	const { selectedRole } = useSelector((state) => state.careerAdvisor);

	return (
		<div className="mt-6">
			<h2 className="text-sm font-medium text-[#000000]">Key points to consider</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
				{selectedRole?.keyPointsToConsider?.map((point, index) => (
					<KeyPoints
						key={index}
						number={index + 1}
						title={point.title}
						content={point.keyPoints}
					/>
				))}
			</div>
		</div>
	);
};

export default KeyPointCard;
