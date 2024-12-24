import { useQuery } from '@tanstack/react-query';
import { useQueryAPI } from 'apis/query';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateSalary } from 'store/reducer/salary/salarySlice';

const SalarytRecentSearch = () => {
	const navigate = useNavigate();

	const { fetchRecentSearchForSalary } = useQueryAPI();
	const dispatch = useDispatch();
	const { data } = useQuery({
		queryKey: ['fetchRecentSearchForSalary'],
		staleTime: 300000,

		queryFn: () => fetchRecentSearchForSalary(), // Pass pageParam for pagination
	});
	const resData = data?.data?.data?.items;
	return (
		<div className="w-full md:px-4 flex flex-col gap-4">
			<div className="flex gap-2 text-[#666] items-center">
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
						stroke="#666666"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				Recent Search
			</div>
			<div className="flex flex-col gap-2">
				{resData?.map((item) => (
					<div
						onClick={() => {
							dispatch(updateSalary({ selectedLocation: { city: item?.location } }));
							dispatch(updateSalary({ selectedCompany: item?.company }));
							dispatch(updateSalary({ selectedJobTitle: item?.jobTitle }));

							navigate('/salary-pridictore/details');
						}}
						key={item?._id}
						className="flex cursor-pointer gap-3 py-4 px-2 rounded text-[#1A1A1A] text-sm md:text-base items-center border border-solid border-lightgray"
					>
						{item?.jobTitle?.name}
						<span className="h-4 w-[2px] border border-solid border-lightgray" />
						<span className="text-[#666] text-xs md:text-sm">
							{item?.company?.name}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default SalarytRecentSearch;
