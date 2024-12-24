import React, { useEffect } from 'react';
import MobileChatbot from 'component/chatbot/MobileChatbot';
import { DiscoverMainSection, DiscoverNavbar, DiscoverSideBar } from 'component/index';
import { useQuery } from '@tanstack/react-query';
import { useQueryAPI } from 'apis/query';
import { addDiscoveryTabData, updateCategory } from 'store/reducer/discover/discoverSlice';
import { useDispatch } from 'react-redux';
const tabsData = [
	{ label: 'Deep Dive' },
	{ label: 'Banking' },
	{ label: 'IT' },
	{ label: 'Auto' },
	{ label: 'Energy' },
	{ label: 'Commodities Pharma' },
	{ label: 'Real Estate' },
	{ label: 'Telecom' },
];
const Discover = () => {
	const { fetchNewsCategory } = useQueryAPI();
	const dispatch = useDispatch();

	const { data, isFetching, isPending } = useQuery({
		queryKey: ['fetchSavedTemplates'],
		queryFn: () => fetchNewsCategory(), // Pass pageParam for pagination
		staleTime: 300000,
	});
	useEffect(() => {
		if (data?.data?.data?.items?.length) {
			dispatch(addDiscoveryTabData(data?.data?.data?.items));
			dispatch(updateCategory(data?.data?.data?.items[0]));
		} else {
			dispatch(addDiscoveryTabData(tabsData));
		}
	}, [data]);

	return (
		<div className="flex">
			{isFetching || isPending ? (
				<div className="flex items-center justify-center h-[212px] w-full">
					<div className={`btn-loader border-4 border-[#14A019]`} />
				</div>
			) : (
				<div className="w-full  overflow-x-hidden ">
					<DiscoverNavbar />
					<div className="mx-4 h-[calc(100vh-130px)] overflow-y-scroll  overflow-x-hidden">
						<DiscoverMainSection />
						<div className="lg:hidden flex justify-center">
							<MobileChatbot />
						</div>
					</div>
				</div>
			)}
			<DiscoverSideBar />
		</div>
	);
};

export default Discover;
