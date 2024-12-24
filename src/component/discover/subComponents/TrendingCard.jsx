import React from 'react';

import './index.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const TrendingCard = ({ title, date, img, hasBorder, id, company }) => {
	const navigate = useNavigate();
	const handleClick = () => {
		if (company && id) {
			navigate(`/discover/${company}/${id}`);
		}
	};
	return (
		<div
			className={`flex flex-row-reverse lg:flex-row gap-3 lg:gap-0  justify-between items-center pt-3 pb-5 ${hasBorder ? 'Opening-border' : ''}`}
		>
			<div className="flex flex-col cursor-pointer  w-full" onClick={handleClick}>
				<div className="text-[16px] max-w-[232px] font-medium line-clamp-2">
					{title || ''}
				</div>
				<div className="text-[14px] text-[#666666]">
					{date && moment(date).format('DD MMM YYYY')}
				</div>
			</div>
			<div className="flex items-center">
				<img src={img || ''} className="w-16 h-16 object-contain" alt="Trending image" />
			</div>
		</div>
	);
};

export default TrendingCard;
