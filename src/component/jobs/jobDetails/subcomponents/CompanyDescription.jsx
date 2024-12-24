import React from 'react';
import { Rating } from '@mui/material';

import LeadershipCard from './LeadershipCard';

import './index.css';
import { useSelector } from 'react-redux';
import { formatNumber } from 'utils/common';
import { COMPANY_DEFAULT } from 'assets/images';

const CompanyDescription = () => {
	// const [isExpanded, setIsExpanded] = useState(false);

	// const handleClick = () => {
	//   setIsExpanded((prev) => !prev);
	// };
	const { JobDetails } = useSelector((state) => state.common);

	return (
		<div className="w-full flex flex-col gap-8">
			<div className="flex flex-col gap-4">
				<div className="description text-[12px]">
					{JobDetails?.companyInfo?.description?.vision}
				</div>
				<div className="flex items-center gap-3">
					<img
						height={40}
						width={40}
						src={JobDetails?.companyInfo?.logo || COMPANY_DEFAULT}
						alt="company-logo"
					/>
					<div className="text-[20px] fonr-[500] ">{JobDetails?.companyInfo?.name}</div>
				</div>
				<div className="description  grid md:grid-cols-2 gap-1">
					{JobDetails?.companyInfo?.website && (
						<div className="flex gap-1">
							<a
								href={JobDetails?.companyInfo?.website}
								target="_blank"
								rel="noreferrer"
								className="text-[#1A1A1A]"
							>
								{JobDetails?.companyInfo?.website}
							</a>
						</div>
					)}
					{JobDetails?.companyInfo?.location && (
						<div className="flex gap-1">
							<span className="first-letter:capitalize">Headquarter:</span>
							<span className="text-[#1A1A1A]">
								{[
									JobDetails.companyInfo.location.area,
									JobDetails.companyInfo.location.city,
									JobDetails.companyInfo.location.state,
									JobDetails.companyInfo.location.country,
								]
									.filter(Boolean) // Remove any falsy values
									.join(', ')}{' '}
								{/* Join with a comma and space */}
							</span>
						</div>
					)}
					{JobDetails?.companyInfo?.industry && (
						<div className="flex gap-1">
							<span className="first-letter:capitalize">Industry:</span>
							<span className="text-[#1A1A1A]">
								{JobDetails?.companyInfo?.industry}
							</span>
						</div>
					)}

					{/* {CompanyData?.items?.length &&
            CompanyData?.items?.map((item) => (
              <div key={item.id}>
                {item.key.length !== 0 && (
                  <span className="first-letter:capitalize">{item.key}:</span>
                )}
                <span className="text-[#1A1A1A]">{item.value}</span>
              </div>
            ))} */}
				</div>

				<div
					className="description"
					dangerouslySetInnerHTML={{
						__html: JobDetails?.companyInfo?.description?.text,
					}}
				/>
			</div>
			{JobDetails?.companyInfo?.rating > 0 && (
				<div>
					<div className="flex items-center gap-4 flex-wrap md:flex-nowrap ">
						<h2 className="text-[16px] font-medium text-[#1A1A1A]">Rating</h2>
						<div className="flex items-center justify-between w-full flex-wrap-reverse">
							<div className="flex items-center gap-2">
								<span className="text-[#121212]">
									{JobDetails?.companyInfo?.rating?.toFixed(1) || 0}
								</span>
								<Rating
									sx={{ color: '#F2C370' }}
									size="small"
									readOnly
									value={JobDetails?.companyInfo?.rating || 0}
								/>
								<div className="BorderLeft pl-2 text-[14px] text-[#666666]">
									{formatNumber(JobDetails?.companyInfo?.reviewsCount || 0)}{' '}
									reviews
								</div>
							</div>
							{JobDetails?.companyInfo?.portal && (
								<div className="text-xs tracking-tight  text-[#666666]">
									Company data provided by{' '}
									<span className="text-[#121212]">
										{JobDetails?.companyInfo?.portal}
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
			{/* <div className="grid grid-cols-3 sm:grid-cols-6 md:gap-4 gap-[10px] ">
        {CompanyData?.rating?.length &&
          CompanyData.rating.map((item) => (
            <RatingCard key={item.for} value={item.value} text={item.for} />
          ))}
      </div>
      <div className=" ">
        <div className="w-full flex justify-between">
          <div className="text-[16px] font-[500] text-[#1A1A1A]">
            Employee Reviews
          </div>
          <div
            onClick={handleClick}
            className="cursor-pointer text-[#4285F4] underline text-xs font-[500]"
          >
            {isExpanded ? 'View Less' : 'View More'}
          </div>
        </div>
        <div className="grid md:grid-cols-2  gap-3">
          {CompanyData?.reviews?.length &&
            (isExpanded
              ? CompanyData.reviews
              : CompanyData.reviews.slice(0, 4)
            ).map((item) => (
              <ReviewCard
                key={item.id}
                rating={item.rating}
                position={item.title}
                review={item.description}
              />
            ))}
        </div>
      </div>
       */}
			{JobDetails?.companyInfo?.leadership?.length > 0 && (
				<div>
					<div className="text-[16px] font-[500] mb-3 text-[#1A1A1A]">Leadership</div>
					<div className=" grid  grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-3  ">
						{JobDetails?.companyInfo?.leadership.map((item) => (
							<LeadershipCard key={item._id} {...item} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default CompanyDescription;
