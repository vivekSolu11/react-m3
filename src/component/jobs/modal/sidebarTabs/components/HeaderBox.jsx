import React from 'react';
import { useSelector } from 'react-redux';

import { COMPANY_DEFAULT } from 'assets/images';
import { FileIcon } from 'assets/index';

const HeaderBox = () => {
	const { jobDetail, userDetails } = useSelector((state) => state?.common);
	return (
		<div className="flex flex-col  lg:grid   grid-cols-3 gap-[2px] lg:gap-2">
			<div className="bg-[#F5F5F5] p-4 text-sm flex items-center font-medium rounded ">
				Overview
			</div>
			<div className="bg-[#F5F5F5] p-4 flex rounded gap-2 items-center">
				<img height={40} width={40} src={jobDetail?.companyLogo || COMPANY_DEFAULT} />
				<div className="flex gap-1 flex-col items-center">
					<div className="text-sm">{jobDetail?.companyName}</div>
					<div className="text-base font-medium">{jobDetail?.positionName}</div>
				</div>
			</div>
			<div className="bg-[#F5F5F5] p-4 rounded flex gap-2 items-center ">
				<FileIcon />

				<div className="flex gap-1 flex-col">
					<div className="text-sm">Your Resume</div>
					<div className="text-base font-medium">
						{userDetails?.profile?.resume?.file?.name}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderBox;
