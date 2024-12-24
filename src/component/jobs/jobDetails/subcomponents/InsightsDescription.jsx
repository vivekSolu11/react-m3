import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './index.css';
import { InsightsData } from 'constants/InsightsData';
import { formatNumber } from 'utils/common';
import { areAllValuesNullOrUndefined } from 'utils/helperFunctions/helperFunction';

const InsightsDescription = () => {
	const { JobDetails } = useSelector((state) => state.common);

	// const [isExpandedCards, setIsExpandedCards] = useState(false);
	const [isExpandedImages, setIsExpandedImages] = useState(false);

	const handleClickImages = () => {
		setIsExpandedImages((prev) => !prev);
	};

	// const handleClickCards = () => {
	//   setIsExpandedCards((prev) => !prev);
	// };
	// const swiperRef = useRef(null);
	// const slideNext = () => {
	//   console.log(swiperRef.current.swiper);
	//   if (swiperRef.current) {
	//     swiperRef.current.swiper.slideNext();
	//   }
	// };

	// const slidePrev = () => {
	//   if (swiperRef.current) {
	//     swiperRef.current.swiper.slidePrev();
	//   }
	// };

	const gallery = JobDetails?.companyInfo?.companyInsight?.gallery;
	const benifitsData = JobDetails?.companyInfo?.companyInsight?.benefits;
	const CompanyInsideData = JobDetails?.companyInfo?.companyInsight?.financialInsight;

	return (
		<div className="flex flex-col gap-8">
			{JobDetails?.company?.description?.mission && (
				<div className="text-[#666666]  font-[500] text-[12px]">
					{JobDetails?.company?.description?.mission}
				</div>
			)}
			{CompanyInsideData && !areAllValuesNullOrUndefined(CompanyInsideData) ? (
				<div className="desc-Container">
					<div className="Insight-heading">Financial Insights</div>

					<div className="grid md:grid-cols-2">
						{InsightsData?.Data?.length > 0
							? InsightsData?.Data?.map(
									(item) =>
										CompanyInsideData?.[item?.key]?.value > 0 && (
											<div
												className="flex  tracking-tighter "
												key={item?.Label}
											>
												<div className="text-[14px] flex font-[400] tracking-tighter text-lightText">
													{item.Label}:
												</div>
												<span className=" text-[14px] text-DarkText pl-1">
													{item.key === 'currentStage' ? (
														CompanyInsideData?.[item?.key]
													) : (
														<>
															{
																CompanyInsideData?.[item?.key]
																	?.currency
															}{' '}
															{formatNumber(
																CompanyInsideData?.[item?.key]
																	?.value || 0
															) || 'N/A'}
														</>
													)}
												</span>
											</div>
										)
								)
							: 'No data'}
					</div>
				</div>
			) : null}
			{/*
       <div className="desc-Container">
        <div className="Insight-heading flex w-full justify-between ">
          Current Openings
          <div
            onClick={handleClickCards}
            className="cursor-pointer text-[#4285F4] underline text-xs font-[500]"
          >
            {isExpandedCards ? 'View Less' : 'View More'}
          </div>
        </div>
        <div className="grid sm:grid-cols-2  gap-3">
          {InsightsData?.openings?.length &&
            (isExpandedCards
              ? InsightsData.openings
              : InsightsData.openings.slice(0, 2)
            ).map((item) => <OpeningsCard key={item} />)}
        </div>
      </div> */}
			{gallery && gallery.length > 0 && (
				<div className=" desc-Container">
					<div className="Insight-heading flex justify-between ">
						Company Images
						{gallery.length > 4 && (
							<div
								onClick={handleClickImages}
								className="cursor-pointer text-[#4285F4] underline text-xs font-[500]"
							>
								{isExpandedImages ? 'View Less' : 'View More'}
							</div>
						)}
					</div>
					<div
						className={
							isExpandedImages
								? '  columns-2 sm:columns-3 md:columns-4    gap-3'
								: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4   gap-3'
						}
					>
						{(isExpandedImages ? gallery : gallery.slice(0, 4)).map((item, i) => (
							<img
								className="rounded-[8px]  w-full md:max-w-[168px]"
								src={item}
								key={i}
								alt="insight-img"
							/>
						))}
					</div>
				</div>
			)}
			{benifitsData?.length > 0 ? (
				<div className="desc-Container">
					<div className="Insight-heading ">Company Benifits</div>
					<div className="grid  sm:grid-cols-2 gap-3 ">
						{benifitsData?.length > 0 &&
							benifitsData.map((item) => (
								<li className="text-sm" key={item?._id}>
									{item?.title}
								</li>
							))}
					</div>
				</div>
			) : null}
			{/*
      <div className="desc-Container">
        <div className="Insight-heading ">Company Benifits</div>
        <div className="grid  sm:grid-cols-2 md:grid-cols-3 gap-3 ">
          {InsightsData?.Benifits?.length &&
            InsightsData?.Benifits.map((item) => (
              <BenifitsCard
                key={item.id}
                title={item.title}
                img={item.img}
                desc={item.description}
              />
            ))}
        </div>
      </div>
       <div className="borderreview rounded-lg md:border-none ">
        <Swiper
          slidesPerView={1}
          loop="true"
          ref={swiperRef}
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          className="Company_Insights_Slider"
        >
          {InsightsData?.news.length &&
            InsightsData.news.map((item) => (
              <SwiperSlide key={item.id} className="w-full relative   ">
                <NewsCard />
              </SwiperSlide>
            ))}
          <div className="absolute hidden md:flex w-[390px] z-10  text-[16px] font-[500] text-lightText justify-between bottom-0 right-5">
            <div
              onClick={slidePrev}
              className="flex items-center cursor-pointer "
            >
              <ArrowBackIos className="w-[20px] ml-[5px] h-[15px]" /> Prev
            </div>
            <div
              onClick={slideNext}
              className="flex items-center cursor-pointer"
            >
              Next
              <ArrowForwardIos className="w-[20px] h-[15px]" />
            </div>
          </div>

          <div className=" md:hidden flex  m-4 pt-4  border_top z-10  text-[16px] font-[500] text-lightText justify-between bottom-0 right-5">
            <div
              onClick={slidePrev}
              className="flex items-center cursor-pointer "
            >
              <ArrowBackIos className="w-[20px] ml-[5px] h-[15px]" /> Prev
            </div>
            <div
              onClick={slideNext}
              className="flex items-center cursor-pointer"
            >
              Next
              <ArrowForwardIos className="w-[20px] h-[15px]" />
            </div>
          </div>
        </Swiper>
      </div> */}
		</div>
	);
};

export default InsightsDescription;
