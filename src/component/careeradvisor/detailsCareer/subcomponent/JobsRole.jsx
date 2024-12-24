import { TIE_ICON } from 'assets/images';
import React from 'react';
import { useSelector } from 'react-redux';

const JobsRole = () => {
	const { selectedRole } = useSelector((state) => state.careerAdvisor);

	return (
		<div className="flex gap-2 flex-col">
			<div className="flex gap-2 items-center">
				<img src={TIE_ICON} alt="tieicon" className="w-6 h-5" />
				<div className="text-base font-medium text-[#000000]">Job Role</div>
			</div>

			<div className="flex flex-col ">
				<div className="text-sm font-normal text-[#000000] leading-8 m-0">
					{selectedRole?.jobRole?.description}
				</div>
				Key responsibilities include:
				<ul className="text-sm font-normal text-[#000000] text-left pl-5 m-0">
					{selectedRole?.keyResponsibilities?.map((data, i) => (
						<li key={i}>{data}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default JobsRole;
