import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import DiscoverOpeningCard from '../subComponents/DiscoverOpeningCard';
import { CLOCK_ICON } from 'assets/images';
import { useParams } from 'react-router-dom';
import { useQueryAPI } from 'apis/query';

const RecentOpening = ({ showViewMore }) => {
	const [isExpandedCards, setIsExpandedCards] = useState(false);
	const { companyName } = useParams();

	const handleClickCards = () => {
		setIsExpandedCards((prev) => !prev);
	};

	const { fetchRecentJobsByCompanyId } = useQueryAPI();
	const { data, isFetching, isPending, isLoading } = useQuery({
		queryKey: ['fetchRecentOpening', companyName],
		staleTime: 300000,

		queryFn: () => fetchRecentJobsByCompanyId(companyName), // Pass pageParam for pagination
	});
	const jobData = data?.data?.data?.items;
	// Determine which data to display based on the `showViewMore` prop and expanded state
	const displayedData = showViewMore
		? isExpandedCards
			? jobData // Show all if expanded
			: jobData?.slice(0, 5) // Show only the first 4 if not expanded
		: jobData; // Show all if `showViewMore` is false
	return (
		<div>
			<div className="text-[16px] flex items-center gap-2 font-[500]">
				<span>Recent Openings </span>
				<img alt="Clock Icon" src={CLOCK_ICON} height={16} width={16} />
			</div>
			{isFetching || isPending || isLoading ? (
				<div className="flex items-center justify-center h-[150] w-full">
					<div className={`btn-loader border-4 border-[#14A019]`} />
				</div>
			) : (
				<div
					className={`${displayedData?.length > 4 ? 'min-h-[400px]' : 'h-[150px] content-center'}   ${isExpandedCards ? 'expanded' : ''}`}
				>
					{displayedData?.length < 1 ? (
						<div className="text-center w-full">No Recent Openings</div>
					) : (
						displayedData?.map((item, i) => (
							<DiscoverOpeningCard key={item._id} {...item} item={displayedData[i]} />
						))
					)}
				</div>
			)}

			{/* Only show "View More" if the `showViewMore` prop is true */}
			{showViewMore && displayedData?.length > 4 && (
				<div
					onClick={handleClickCards}
					className={`cursor-pointer text-[#0E8712]  underline text-center text-xs font-[500]`}
				>
					{isExpandedCards ? 'View Less' : 'View More'}
				</div>
			)}
		</div>
	);
};

export default RecentOpening;
