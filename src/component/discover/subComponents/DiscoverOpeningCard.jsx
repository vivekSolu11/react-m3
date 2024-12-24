import React from 'react';
import { COMPANY_DEFAULT, LinktoIcon } from 'assets/images/index';

import './index.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const OpeningsCard = ({ designation, location, postedAt, company, number, className = '' }) => {
	const navigate = useNavigate();

	const handleAskBuddyClick = (id) => {
		navigate(`/jobs/${id}`);
	};
	return (
		<div
			className={`lg:max-w-[312px] cursor-pointer w-full pt-3 pb-5 Opening-border flex flex-col gap-3 ${className}`}
			onClick={() => {
				handleAskBuddyClick(number?.toString().padStart(8, '0'));
			}}
		>
			<div className="flex gap-3 justify-between">
				<div className="flex gap-2 font-medium text-[14px]">
					<img height={42} width={42} src={company?.logo || COMPANY_DEFAULT}></img>
					<div className="flex flex-col ">
						<div className="truncate font-bold max-w-[206px]">{designation?.name}</div>
						<div className="flex gap-2 text-light items-center Text text-xs">
							{location && Object.values(location).slice(0, 1).join(',')}

							<span>&middot;</span>
							<span>{postedAt && moment(postedAt, 'YYYYMMDD').fromNow()}</span>
						</div>
					</div>
				</div>
				<div>
					<img height={36} width={36} src={LinktoIcon}></img>
				</div>
			</div>
		</div>
	);
};

export default OpeningsCard;
