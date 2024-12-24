import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Trending from '../subComponents/Trending';
import Recent from '../subComponents/Recent';
import SliderCard from '../subComponents/SliderCard';
import { COMPANY_DEFAULT, LEFT_ICON, RIGHT_ICON } from 'assets/images';

import './DiscoverMainSection.css';
import { useQueryAPI } from 'apis/query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

const DiscoverMainSection = () => {
	const navigate = useNavigate();
	const { activeCategory } = useSelector((state) => state.discover);

	const handleClick = (companyName) => {
		navigate(`/discover/${companyName}`);
	};
	const handleNavigate = (company, id) => {
		navigate(`/discover/${company}/${id}`);
	};

	const swiperRefs = useRef([]);

	const isSmallScreen = useMediaQuery('(max-width:1024px)');
	const [isExpanded, setIsExpanded] = useState(false);

	const handleExpanded = () => {
		setIsExpanded(true);
	};

	const { fetchNewsByCategory } = useQueryAPI();

	const fetchAllNews = async ({ pageParam = 1 }) => {
		const filter = activeCategory?._id;
		if (filter) return fetchNewsByCategory(pageParam, 10, filter);
		else return null;
	};

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, isPending } =
		useInfiniteQuery({
			queryKey: ['fetchNews', activeCategory],
			queryFn: fetchAllNews,
			staleTime: 300000,
			enabled: !!activeCategory,
			getNextPageParam: (lastPage, pages) => {
				const totalItems = lastPage?.data?.data?.totalItems || 0;
				const currentPage = pages.length;
				return currentPage * 10 < totalItems ? currentPage + 1 : undefined; // Assuming 10 items per page
			},
		});

	const AllNews = useMemo(() => {
		return data?.pages.flatMap((page) => page?.data?.data?.items) || []; // Flattening all pages
	}, [data]);

	const { ref: loadMoreRef, inView } = useInView();

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage(); // Fetch next page when the element is in view
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
	const companiesNews = isSmallScreen ? (isExpanded ? AllNews : AllNews.slice(0, 1)) : AllNews;
	return (
		<div className="flex flex-col mb-[40px]  ">
			{isPending && isFetching ? (
				// Show loader while fetching data
				<div className="flex items-center justify-center h-[212px] w-full">
					<div className={`btn-loader border-4 border-[#14A019]`} />
				</div>
			) : (
				companiesNews.length &&
				companiesNews.map((item, index) => (
					<React.Fragment key={item?._id}>
						<div key={item?._id} className="flex flex-col mt-[40px] relative gap-6">
							<div className="flex items-center justify-between">
								<div
									className="flex gap-2 cursor-pointer"
									onClick={() => handleClick(item?._id)}
								>
									<img
										alt="news images"
										height={24}
										width={24}
										src={item?.companyLogo || COMPANY_DEFAULT}
									/>
									<span className="capitalize">{item?.companyName}</span>
								</div>
								{!isSmallScreen && item?.news?.length > 3 && (
									<div className="flex items-center ">
										<div
											className={` swiper-button-prev-${index} flex items-center justify-center cursor-pointer`}
										>
											<img
												alt="left Icon"
												src={LEFT_ICON}
												width={24}
												height={24}
											/>
										</div>
										<div
											className={`text-[14px] text-center text-[#1A1A1A] pagination-${index}`}
										/>

										<div
											className={` swiper-button-next-${index} flex items-center justify-center cursor-pointer`}
										>
											<img
												alt="right icon"
												src={RIGHT_ICON}
												width={24}
												height={24}
											/>
										</div>
									</div>
								)}
							</div>

							{/* Custom Pagination Container for each Swiper */}
							<div className="flex">
								<Swiper
									ref={swiperRefs}
									slidesPerView={'auto'}
									spaceBetween={24}
									modules={[Pagination, Navigation]}
									pagination={{
										el: `.pagination-${index || 1}`, // Use unique class name for each Swiper pagination
										type: 'fraction',
										clickable: true,
									}}
									navigation={{
										prevEl: `.swiper-button-prev-${index}`, // Dynamic prev button for each swiper instance
										nextEl: `.swiper-button-next-${index}`, // Dynamic next button for each swiper instance
									}}
									className="Discover_Slider"
								>
									{item?.news?.length > 0 &&
										item?.news?.map((dataItem) => (
											<SwiperSlide
												key={dataItem.title}
												onClick={() =>
													handleNavigate(item?._id, dataItem?._id)
												}
												className="w-[317px] cursor-pointer"
											>
												<SliderCard {...dataItem} />
											</SwiperSlide>
										))}
								</Swiper>
							</div>
						</div>
					</React.Fragment>
				))
			)}
			<div ref={loadMoreRef}>
				{isFetchingNextPage && (
					<div className="flex items-center justify-center h-[50px] w-full">
						<div className={`btn-loader border-4 border-[#14A019]`} />
					</div>
				)}
			</div>
			{isSmallScreen && (
				<div
					onClick={handleExpanded}
					className={` cursor-pointer text-[#0E8712] pb-[6px] pt-[26px] underline text-center text-xs font-[500]`}
				>
					View More
				</div>
			)}

			<div className="flex flex-col gap-[40px] lg:hidden">
				<Trending />
				<Recent />
			</div>
		</div>
	);
};

export default DiscoverMainSection;
