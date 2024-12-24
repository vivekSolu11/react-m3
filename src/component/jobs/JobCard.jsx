import React, { useEffect, useMemo } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import Jobs from './Jobs';
import NoResultFound from './NoResultFound';
import CustomizeResumeModal from './modal/customizeResumeModal';
import AlreadyApplyModal from './modal/AlreadyApplyModal';
import UploadResumeModal from './modal/UploadResumeModal';
import BuyResumeAnalyzer from './modal/BuyResumeAnalyzer';
import { useQueryAPI } from 'apis/query';
import { addState } from 'store/sagaActions';
import ReportModel from './modal/ReportModel';
import ReportMobileModel from './modal/ReportMobileModel';

import './jobs.css';
import CustomizeResumeMobile from './modal/CustomizeResumeMobile';

const JobCard = () => {
	const dispatch = useDispatch();
	const { jobListType, preferenceLoader } = useSelector((state) => state.common);
	const { jobFilter } = useSelector((state) => state.common);
	const queryClient = useQueryClient();

	const { fetchAllJobs, fetchAppliedJobList, fetchSavedJobList } = useQueryAPI();

	const fetchJobList = async ({ pageParam = 1 }) => {
		// const filter = jobFilter;
		switch (jobListType) {
			case 'recommended':
				return fetchAllJobs(pageParam, 10, jobFilter);
			case 'saved':
				return fetchSavedJobList(pageParam, 10, jobFilter);
			case 'applied':
				return fetchAppliedJobList(pageParam, 10, jobFilter);
			default:
				throw new Error('Invalid job list type');
		}
	};

	const { data, fetchNextPage, isFetching, hasNextPage, isFetchingNextPage, isPending } =
		useInfiniteQuery({
			queryKey: [`fetch${jobListType?.charAt(0)?.toUpperCase() + jobListType.slice(1)}Jobs`],
			queryFn: fetchJobList,
			getNextPageParam: (lastPage, pages) => {
				const totalItems = lastPage?.data?.data?.totalItems || 0;
				const currentPage = pages.length;
				return currentPage * 10 < totalItems ? currentPage + 1 : undefined;
			},
		});

	// Memoize allJobs to avoid recalculating on every render
	const allJobs = useMemo(() => {
		dispatch(addState({ name: 'preferenceLoader', value: false }));
		if (data?.pages[0]) {
			return data?.pages.flatMap((page) => page?.data?.data?.items) || []; // Flattening all pages
		} else return [];
	}, [data]);

	const { ref: loadMoreRef, inView } = useInView();

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage && !isPending) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	useEffect(() => {
		if (data) {
			const totalItems = allJobs.length || 0; // Get total items from allJobs
			if (jobListType === 'saved') {
				dispatch(addState({ name: 'savedJobsCount', value: totalItems }));
			} else if (jobListType === 'applied') {
				dispatch(addState({ name: 'appliedJobsCount', value: totalItems }));
			}
		}
	}, [allJobs, data, dispatch, jobListType]);

	useEffect(() => {
		queryClient.invalidateQueries({
			queryKey: [`fetch${jobListType?.charAt(0)?.toUpperCase() + jobListType.slice(1)}Jobs`],
		});
	}, [jobFilter]);

	return (
		<div className="space-y-6 flex flex-col items-center h-[calc(100vh-155px)] overflow-y-auto overflow-hide">
			{isPending || (isFetching && preferenceLoader) ? (
				<div className="flex items-center justify-center h-[500px] w-full">
					<div className={`btn-loader border-4 border-[#14A019]`} />
				</div>
			) : allJobs?.length ? (
				<>
					{allJobs?.map((job) => (
						<Jobs
							job={job}
							isSaved={job?.isSaved}
							key={job?._id}
							jobListType={jobListType}
							appliedAt={jobListType === 'applied' ? job?.appliedJob?.appliedAt : ''}
							matchScore={job?.matchScore}
						/>
					))}

					<div ref={loadMoreRef}>
						{(isFetchingNextPage || hasNextPage) && (
							<div className="flex items-center justify-center h-[50px] w-full">
								<div className={`btn-loader border-4 border-[#14A019]`} />
							</div>
						)}
					</div>
				</>
			) : (
				<>
					{isPending && isFetching ? (
						<div className="flex items-center justify-center h-[500px] w-full">
							<div className={`btn-loader border-4 border-[#14A019]`} />
						</div>
					) : (
						<NoResultFound className="no_jobs" />
					)}
				</>
			)}
			<CustomizeResumeModal />
			<CustomizeResumeMobile />
			<AlreadyApplyModal />
			<UploadResumeModal />
			<ReportModel />
			<ReportMobileModel />
			<BuyResumeAnalyzer />
			<ReportModel />
			<ReportMobileModel />
		</div>
	);
};

export default JobCard;
