import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { COMPANY_DEFAULT, LEFT_DARK_ICON } from 'assets/images';
import DiscoverFaq from './DiscoverFaq';
import RecentOpening from 'component/discover/subComponents/RecentOpening';
import Trending from 'component/discover/subComponents/Trending';
import Recent from 'component/discover/subComponents/Recent';
import { DiscoverNewsSideBar } from 'component/index';
import MobileChatbot from 'component/chatbot/MobileChatbot';
import { useQueryAPI } from 'apis/query';

const DicoverCompany = () => {
	const { companyName, id } = useParams();
	const navigate = useNavigate();
	const handleNavigate = () => {
		navigate(`/discover/${companyName}`);
	};

	const { fetchNewsById } = useQueryAPI();

	const { data, isFetching, isPending } = useQuery({
		queryKey: ['fetchNews', id],
		queryFn: () => fetchNewsById(id), // Pass pageParam for pagination
		staleTime: 300000,
	});
	const newsData = data?.data?.data?.items;
	return (
		<div className="flex">
			{isPending && isFetching ? (
				// Show loader while fetching data
				<div className="flex items-center justify-center h-[212px] w-full">
					<div className={`btn-loader border-4 border-[#14A019]`} />
				</div>
			) : (
				<div className="w-full">
					<div className=" flex items-center gap-4">
						<img
							src={LEFT_DARK_ICON}
							alt="left icon"
							className="cursor-pointer "
							height={24}
							width={24}
							onClick={handleNavigate}
						/>
						<div className="flex items-center  gap-2">
							<img
								height={24}
								width={24}
								className="object-contain"
								alt="company image"
								src={newsData?.companyDetails?.logo || COMPANY_DEFAULT}
							/>
							<div className="text-[24px] font-[600]">
								{newsData?.companyDetails?.name}
							</div>
						</div>
					</div>
					<div className=" gap-[40px]  px-8 pt-10 pb-20 overflow-y-auto h-[calc(100vh-120px)] flex flex-col ">
						<div className="text-[32px] font-[500] tracking-tight ">
							{newsData?.title}
						</div>
						<div>
							<img
								alt="DiscoverNews"
								src={newsData?.image}
								className="w-full max-h-[400px] object-contain"
							/>
						</div>
						<div className="text-[14px] font-[400] tracking-tight text-[#666666]">
							{newsData.description?.html || newsData.description?.text}
						</div>
						<div className="text-[14px] font-[400] tracking-tight text-[#666666]">
							{newsData.content?.html || newsData.content?.text}
						</div>
						<div className="flex flex-col gap-2 text-[#666] text-sm">
							<div className="">Posted by {newsData?.author[0]?.name}</div>
							<div className="flex gap-1">
								<span>Category:</span>
								<span className="text-[#1A1A1A]">
									{newsData?.categoryDetails?.name}
								</span>
							</div>
							<div className="flex gap-1">
								<span>Source:</span>
								<span className="text-[#1A1A1A]">{newsData?.source?.name}</span>
							</div>
						</div>
						<div className="flex  md:hidden flex-col gap-[40px]">
							<RecentOpening />
							<Trending />
							<Recent />
						</div>
						<DiscoverFaq />
						<div className="lg:hidden  flex justify-center">
							<MobileChatbot />
						</div>
					</div>
				</div>
			)}
			<div className="max-w-[360px] hidden lg:flex w-full">
				<DiscoverNewsSideBar />
			</div>
		</div>
	);
};

export default DicoverCompany;
