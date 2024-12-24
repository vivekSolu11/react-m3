import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import ConnectCard from './ConnectCard';
import LinkedinModal from 'component/modal/connectModel/LinkedinModal';
import LinkedMessage from 'component/modal/jobsDetail/LinkedinMessage';
import SearchableDropdown from 'component/common/searchabledropdown';
import LocationInput from 'component/common/locationDropdown';
import { updateconnectValue } from 'store/reducer/connect/connectSlice';
import { useQueryAPI } from 'apis/query';
import { ARROW_ICON, EDIT_ICON, NORESULT } from 'assets/images';
import { showCustomModal } from 'store/sagaActions';
import { CONNECT_FILTER_MOBILE } from 'constants/modalTypeConstant';

import '../../connect/connect.css';
import ConnectFilterModal from 'component/modal/connectModel/mobileModal/ConnectFilterModal';
import { useNavigate } from 'react-router-dom';

const CardList = () => {
	const dispatch = useDispatch();
	const { selectedJobTitle, selectedCompany, selectedLocation } = useSelector(
		(state) => state.connect
	);

	const navigate = useNavigate();
	const { fetchConnections } = useQueryAPI();
	const fetchAllConnections = async ({ pageParam = 1 }) => {
		const filter = `designation=${selectedJobTitle?.name || ''}&company=${selectedCompany?.name || ''}&location=${selectedLocation?.city || ''}`;
		return fetchConnections(pageParam, 9, filter);
	};
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, isPending } =
		useInfiniteQuery({
			queryKey: ['fetchConnections', selectedJobTitle, selectedCompany, selectedLocation],
			queryFn: fetchAllConnections,
			getNextPageParam: (lastPage, pages) => {
				const totalItems = lastPage?.data?.data?.totalItems || 0;
				const currentPage = pages.length;
				return currentPage * 9 < totalItems ? currentPage + 1 : undefined; // Assuming 10 items per page
			},
		});

	const connections = useMemo(() => {
		return data?.pages.flatMap((page) => page.data.data.items) || []; // Flattening all pages
	}, [data]);
	const { ref: loadMoreRef, inView } = useInView();

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage(); // Fetch next page when the element is in view
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	const handleFindPeople = () => {
		dispatch(
			showCustomModal({
				customModalType: CONNECT_FILTER_MOBILE,
			})
		);
	};

	return (
		<div className="w-full mx-auto flex flex-col gap-3">
			{/* Header Section */}

			<div className="flex gap-1 items-center ">
				<div
					onClick={() => navigate('/connect')}
					className="w-4 h-4 cursor-pointer flex justify-center items-center"
				>
					<img
						src={ARROW_ICON}
						alt="Back to previous page"
						className="w-[5px] h-[10px]"
					/>
				</div>
				<h1 className="text-base font-medium tracking-tight text-[#1A1A1A] m-0">
					Showing {connections?.length} Results
				</h1>
			</div>

			{/* Drop Drown */}
			<div className="grid-cols-1 md:grid-cols-3 gap-4 hidden md:grid">
				<SearchableDropdown
					label="Job Title"
					inputClass={``}
					value={selectedJobTitle}
					handleChange={(e) => {
						dispatch(updateconnectValue({ selectedJobTitle: e }));
					}}
					url="connect/job-title"
					placeholder="Job TItle"
				/>
				<SearchableDropdown
					label="Company"
					inputClass={``}
					value={selectedCompany}
					handleChange={(e) => {
						dispatch(updateconnectValue({ selectedCompany: e }));
					}}
					url="connect/companies"
					placeholder="Companies"
				/>
				<LocationInput
					inputClass={``}
					value={selectedLocation}
					handleChange={(e) => {
						if (Object.keys(e).length) {
							dispatch(updateconnectValue({ selectedLocation: e }));
						} else {
							dispatch(updateconnectValue({ selectedLocation: e }));
						}
					}}
					label={'Location'}
				/>
			</div>

			{/* Static Text for Mobile View */}
			<div className="md:hidden flex items-center justify-between w-full bg-[#FFFFFF] p-3 rounded-lg text-left">
				<div className="flex flex-col gap-1">
					<div className="text-sm font-normal leading-4 text-[#1A1A1A]">
						{selectedJobTitle?.name || 'Select Job'}
					</div>
					<div className="flex gap-3">
						<div className="text-sm font-normal leading-4 text-[#666666]">
							{selectedCompany?.name || 'Select Company'}
						</div>
						<div className="text-sm font-normal leading-4 text-[#666666] mob-location_container">
							{selectedLocation?.city || 'Select Location'}
						</div>
					</div>
				</div>
				<button
					className="p-2 bg-[#FFFFFF] border-none cursor-pointer"
					onClick={handleFindPeople}
				>
					<img src={EDIT_ICON} alt="Edit" />
				</button>
			</div>

			{/* Grid of Cards */}
			{isPending && isFetching ? (
				// Show loader while fetching data
				<div className="flex items-center justify-center h-[212px] w-full">
					<div className={`btn-loader border-4 border-[#14A019]`} />
				</div>
			) : connections?.length ? (
				<>
					<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
						{connections.map((user) => (
							<ConnectCard
								key={user._id}
								// {...users[i]}
								image={user?.profileImage?.url}
								position={user?.designation?.name}
								company={user?.company?.name}
								connections={user?.connections}
								name={user?.name}
								connectUrl={user?.connectUrl}
							/>
						))}
					</div>
					<div ref={loadMoreRef}>
						{isFetchingNextPage && (
							<div className="flex items-center justify-center h-[50px] w-full">
								<div className={`btn-loader border-4 border-[#14A019]`} />
							</div>
						)}
					</div>
				</>
			) : (
				// Show message if no templates found
				<div className="flex flex-col items-center justify-center h-[500px] w-full">
					{/* <p className="text-center">No Connections found</p>  */}
					<div className="flex justify-center text-center">
						<img
							src={NORESULT}
							alt="No Result"
							className="max-w-[268px] rounded-[12px]  md:max-w-[475px] w-full md:h-auto md:rounded-[12px]"
						/>
					</div>
					<div className="text-center flex flex-col gap-2">
						<span className="text-base font-medium md:text-2xl -tracking-[0.02em] text-[#1A1A1A]">
							No Connections found
						</span>
					</div>
				</div>
			)}
			<LinkedinModal />
			<LinkedMessage />
			<ConnectFilterModal />
		</div>
	);
};

export default CardList;
