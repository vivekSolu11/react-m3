import React, { useState } from 'react';

import CustomChip from './CustomChip';
import { truncateString } from 'utils/helperFunctions/helperFunction';

import './index.css';
import { useSelector } from 'react-redux';

const AboutDescription = () => {
	const { JobDetails } = useSelector((state) => state.common);
	const [isExpanded, setIsExpanded] = useState(false);
	const handleClick = () => {
		setIsExpanded((prev) => !prev);
	};
	return (
		<div className="">
			<div className="description ">
				<span className="hidden md:inline-block">
					{isExpanded ? (
						<span dangerouslySetInnerHTML={{ __html: JobDetails?.about?.html }} />
					) : (
						<span
							dangerouslySetInnerHTML={{
								__html: truncateString(JobDetails?.about?.html, 417),
							}}
						/>
					)}
					{JobDetails?.about?.html?.length > 410 && (
						<span
							onClick={handleClick}
							className="description text-[#4285F4] underline cursor-pointer"
						>
							{isExpanded ? 'Show Less' : 'Read More'}
						</span>
					)}
				</span>

				<span className="md:hidden">
					{isExpanded ? (
						<span dangerouslySetInnerHTML={{ __html: JobDetails?.about?.html }} />
					) : (
						<span
							dangerouslySetInnerHTML={{
								__html: truncateString(JobDetails?.about?.html, 417),
							}}
						/>
					)}
					{JobDetails?.about?.html?.length > 410 && (
						<span
							onClick={handleClick}
							className="description text-[#4285F4] underline cursor-pointer"
						>
							{isExpanded ? 'Show Less' : 'Read More'}
						</span>
					)}
				</span>
			</div>
			<div className="flex gap-2 flex-wrap mt-[16px]">
				{JobDetails?.skills?.names?.length > 0 &&
					JobDetails?.skills?.names.map((item) => (
						<div key={item}>
							<CustomChip item={item} />
						</div>
					))}
			</div>
			{/* <div>
        <div className="text-[16px] font-[500] mt-[24px]">
          Connections @ {JobDetails?.company?.name}
        </div>
        <div className="md:description text-[12px] text-lightText mt-1">
          {Aboutdata.connections.about}
        </div>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mt-[12px] ">
        {Aboutdata?.connections?.people?.length > 0 &&
          Aboutdata?.connections?.people?.map((item) => (
            <LinkedInCard key={item?.id} isBlur={true} data={item} />
          ))}
      </div> */}
		</div>
	);
};

export default AboutDescription;
