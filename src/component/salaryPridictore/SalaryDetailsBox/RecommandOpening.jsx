import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COMPANY_DEFAULT, LinktoIcon } from 'assets/images';
import moment from 'moment';
import { useQueryAPI } from 'apis/query';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

const OpeningsCard = ({ title, location, postedAt, companyLogo, number, className = '' }) => {
	const navigate = useNavigate();

	const handleAskBuddyClick = (id) => {
		navigate(`/jobs/${id}`);
	};
	return (
		<div
			className={`w-[285px] min-w-[285px] border border-solid border-lightgray px-4 py-3 rounded-lg cursor-pointer   flex flex-col gap-3 ${className}`}
			onClick={() => {
				handleAskBuddyClick(number?.toString().padStart(8, '0'));
			}}
		>
			<div className="flex flex-col gap-3 font-medium text-[14px]">
				<div className="flex gap-2 justify-between w-full font-medium text-[14px]">
					<div className="flex gap-2  ">
						<img
							height={42}
							width={42}
							className="object-contain"
							src={companyLogo || COMPANY_DEFAULT}
						></img>
						<div className="line-clamp-2  font-bold w-[150px]">{title}</div>
					</div>
					<div>
						<img height={36} width={36} src={LinktoIcon}></img>
					</div>
				</div>
				<div className="flex gap-2 text-light items-center Text text-xs">
					{location?.state},{location?.country}
					<span>&middot;</span>
					<span>{moment(postedAt, 'YYYYMMDD').fromNow()}</span>
				</div>
			</div>
		</div>
	);
};

const RecommandOpening = () => {
	const { fetchReccomandedOpening } = useQueryAPI();
	const { selectedJobTitle } = useSelector((state) => state.salary);

	const { data } = useQuery({
		queryKey: ['fetchRecentSearchForSalary', selectedJobTitle],
		staleTime: 300000,

		queryFn: () => fetchReccomandedOpening('Consultant'), // Pass pageParam for pagination
	});

	const resData = data?.data?.data?.items;
	return (
		<div className="flex flex-col gap-3 w-full">
			<div className="flex justify-between ">
				<span className="font-medium">Recommended Openings</span>
				{/* <div
          onClick={() => setMore(!more)}
          className=" cursor-pointer  underline text-[#4285F4]"
        >
          {more ? 'View Less' : '    View All'}
        </div> */}
			</div>
			<div className="flex gap-4 overflow-hide overflow-x-auto  w-[calc(100vw-78px)] lg:w-[calc(100vw-700px)]">
				{resData?.map((item) => (
					<OpeningsCard key={item._id} className="flex-1" {...item} />
				))}
			</div>
		</div>
	);
};

export default RecommandOpening;
