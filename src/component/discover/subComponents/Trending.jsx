import React, { useState } from 'react';
import TrendingCard from './TrendingCard';
import { TRENDING_ICON } from 'assets/images';

import './index.css';
import { useQueryAPI } from 'apis/query';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const Trending = ({ showViewMore }) => {
	const [isExpandedCards, setIsExpandedCards] = useState(false);
	const { companyName } = useParams();

	const handleClickCards = () => {
		setIsExpandedCards((prev) => !prev);
	};

	const { fetchAllTrendingNews, fetchTrendingJobsByCompanyId } = useQueryAPI();

	const fetchData = () => {
		if (companyName) {
			return fetchTrendingJobsByCompanyId(companyName);
		} else {
			return fetchAllTrendingNews();
		}
	};

	const { data, isFetching, isPending, isLoading } = useQuery({
		queryKey: ['fetchTrendingNews', companyName],
		staleTime: 300000,
		queryFn: fetchData, // Pass pageParam for pagination
	});

	const newsData = data?.data?.data?.items;

	// Determine which data to display based on the `showViewMore` prop and expanded state
	const displayedData = showViewMore
		? isExpandedCards
			? newsData // Show all if expanded
			: newsData?.slice(0, 4) // Show only first 3 if not expanded
		: newsData; // Show all if `showViewMore` is false

	return (
		<>
			{displayedData?.length ? (
				<>
					<div className=" lg:max-w-[382px]  w-full">
						<div className="text-[16px] font-[500] flex items-center gap-2">
							<span>Trending </span>
							<img alt="trending Icon" src={TRENDING_ICON} height={18} width={18} />
						</div>
						{isFetching || isPending || isLoading ? (
							<div className="flex items-center justify-center h-[150px] w-full">
								<div className={`btn-loader border-4 border-[#14A019]`} />
							</div>
						) : (
							<div
								className={`${displayedData?.length > 4 ? 'min-h-[400px]' : 'h-[150px]'}  `}
							>
								{displayedData?.length < 1 ? (
									<div className="text-center w-full">No Trending News</div>
								) : (
									displayedData?.map((item, index) => (
										<TrendingCard
											title={item?.title}
											img={item?.image}
											date={item?.publicationDate}
											key={item?._id}
											id={item?._id}
											company={item?._company}
											hasBorder={
												!(
													index === displayedData?.length - 1 &&
													!isExpandedCards
												)
											} // Pass whether to show the border or not
										/>
									))
								)}
							</div>
						)}

						{/* Only show "View More" if the `showViewMore` prop is true */}
						{showViewMore && displayedData?.length > 4 && (
							<div
								onClick={handleClickCards}
								className={`${
									isExpandedCards ? '' : 'view-More-Border'
								} cursor-pointer text-[#0E8712] pb-[6px] pt-[26px] underline text-center text-xs font-[500]`}
							>
								{isExpandedCards ? 'View Less' : 'View More'}
							</div>
						)}
					</div>
				</>
			) : null}
		</>
	);
};

export default Trending;
