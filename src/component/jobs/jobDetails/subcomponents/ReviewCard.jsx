import React from 'react';
import StarIcon from '@mui/icons-material/Star';

import './index.css';

const ReviewCard = ({ rating, position, review }) => {
	return (
		<div className="p-3 borderreview rounded-[8px] ">
			<div className="flex  items-center gap-2">
				<div className=" inline-flex rounded-[4px] items-center px-1 py-0.5 gap-1 borderreview">
					<StarIcon sx={{ color: '#F2C370' }} fontSize="small" /> {rating}
				</div>
				<div className="text-[16px] font-medium">{position}</div>
			</div>
			<div className="pt-3 text-[14px] font-[400] text-[#666666]">{review}</div>
		</div>
	);
};

export default ReviewCard;
