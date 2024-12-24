import React from 'react';
import { CompanyImg, LinktoIcon } from 'assets/images/index';

import './index.css';

const OpeningsCard = () => {
	return (
		<div className=" md:max-w-[348px] w-full px-4 py-3 borderreview rounded-[8px] flex flex-col gap-3 ">
			<div className="flex gap-3">
				<div className="flex gap-2 font-medium text-[14px]">
					<img height={42} width={42} src={CompanyImg}></img>
					<div className="flex w-[155px] flex-wrap">Sr. Lead Analytics Consultant</div>
				</div>
				<div>
					<img height={36} width={36} src={LinktoIcon}></img>
				</div>
			</div>
			<div className="flex text-lightText text-xs">
				Hyderabad,TG
				<ul className="m-0 ">
					<li>1 month ago</li>
				</ul>
			</div>
		</div>
	);
};

export default OpeningsCard;
