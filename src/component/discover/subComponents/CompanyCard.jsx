import React from 'react';
import { Link, useParams } from 'react-router-dom';

import './index.css';
import moment from 'moment';

const CompanyCard = ({ title, description, publicationDate, image, source, _id }) => {
	const { companyName } = useParams();

	return (
		<Link
			to={`/discover/${companyName}/${_id}`}
			className="flex w-full no-underline company-card-border lg:border-none p-3 pb-5 rounded-lg text-black flex-wrap xl:flex-nowrap gap-6"
		>
			<div className=" lg:max-w-[383px] w-full ">
				<img alt="Company image" className="w-full h-[200px] object-cover" src={image} />
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col  lg:max-w-[383px] w-full gap-2">
					<div className="text-[20px] font-[500] tracking-tight line-clamp-2">
						{title || ''}
					</div>
					<div className="text-[14px] text-[#666666] tracking-tight line-clamp-4">
						{description?.text}
					</div>
				</div>
				<div className="text-[#666666] text-[12px] flex items-center">
					<div className="flex items-center gap-2">
						<img
							className="object-contain w-5 h-5"
							alt="company src"
							src={source?.logo}
						/>
						<span> {source?.name} &middot; </span>{' '}
						<span>
							{publicationDate && moment(publicationDate).format('DD MMM YYYY')}
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default CompanyCard;
