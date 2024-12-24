import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { COMPANY_DEFAULT, LEFT_DARK_ICON } from 'assets/images';
import MobileChatbot from 'component/chatbot/MobileChatbot';
import CompanyCard from 'component/discover/subComponents/CompanyCard';
import RecentOpening from 'component/discover/subComponents/RecentOpening';
import Trending from 'component/discover/subComponents/Trending';
import { DiscoverCompanySideBar } from 'component/index';
import { useQueryAPI } from 'apis/query';

const DiscoverCompany = () => {
	const { companyName } = useParams();
	const navigate = useNavigate();
	const handleNavigate = () => {
		navigate('/discover');
	};

	const { fetchAllNewsByCompany } = useQueryAPI();

	const fetchAllNewsByComp = async ({ pageParam = 1 }) => {
		return fetchAllNewsByCompany(pageParam, 10, companyName);
	};
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, isPending } =
		useInfiniteQuery({
			queryKey: ['fetchNews', companyName],
			staleTime: 300000,
			queryFn: fetchAllNewsByComp,
			getNextPageParam: (lastPage, pages) => {
				const totalItems = lastPage?.data?.data?.totalItems || 0;
				const currentPage = pages.length;
				return currentPage * 10 < totalItems ? currentPage + 1 : undefined; // Assuming 10 items per page
			},
		});

	const AllNews = useMemo(() => {
		return data?.pages.flatMap((page) => page.data.data.items) || []; // Flattening all pages
	}, [data]);

	const { ref: loadMoreRef, inView } = useInView();
	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage(); // Fetch next page when the element is in view
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
	return (
		<div className="flex">
			{isPending && isFetching ? (
				// Show loader while fetching data
				<div className="flex items-center justify-center h-[212px] w-full">
					<div className={`btn-loader border-4 border-[#14A019]`} />
				</div>
			) : (
				<div className=" w-full mx-auto lg:mx-0">
					<div className=" flex items-center gap-4">
						<img
							src={LEFT_DARK_ICON}
							alt="left icon"
							className="cursor-pointer"
							height={24}
							width={24}
							onClick={handleNavigate}
						/>
						<div className="flex items-center  gap-2">
							<img
								height={24}
								width={24}
								alt="company image"
								src={AllNews?.[0].companyDetails?.logo || COMPANY_DEFAULT}
								className="w-[44px] h-[44px] object-contain lg:w-[24px] lg:h-[24px]"
							/>
							<div className="text-[24px] font-[600]">
								{AllNews?.[0].companyDetails?.name}
							</div>
						</div>
					</div>
					<div className="mt-[40px] lg:ml-[40px] mx-4   pb-20 overflow-y-auto h-[calc(100vh-120px)] flex flex-col gap-4 ">
						{isPending && isFetching ? (
							// Show loader while fetching data
							<div className="flex items-center justify-center h-[212px] w-full">
								<div className={`btn-loader border-4 border-[#14A019]`} />
							</div>
						) : (
							AllNews?.length &&
							AllNews?.map((item) => (
								<React.Fragment key={item._id}>
									<CompanyCard {...item} />
									<div ref={loadMoreRef}>
										{isFetchingNextPage && (
											<div className="flex items-center justify-center h-[50px] w-full">
												<div
													className={`btn-loader border-4 border-[#14A019]`}
												/>
											</div>
										)}
									</div>
								</React.Fragment>
							))
						)}
						<div className=" mt-[32px] flex md:hidden flex-col gap-[40px]">
							<RecentOpening />
							<Trending />
						</div>
						<div className="lg:hidden flex justify-center">
							<MobileChatbot />
						</div>
					</div>
				</div>
			)}
			<div className="max-w-[360px] hidden lg:flex  w-full">
				<DiscoverCompanySideBar />
			</div>
		</div>
	);
};

export default DiscoverCompany;
