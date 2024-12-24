import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import CategoryLayout from '../categoryLayout/CategoryLayout';
import TemplateCard from 'component/resumeBuilder/templateCard/TemplateCard';
import { SAMPLE1 } from 'assets/images';
import { useQueryAPI } from 'apis/query';

const OtherResume = ({ isRedirect = true, showPreview = true, resetInfo }) => {
	const { authToken } = useSelector((state) => state.auth);
	const { fetchAllTemplate } = useQueryAPI();

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, isPending } =
		useInfiniteQuery({
			queryKey: ['fetchAllTemplates'],
			queryFn: ({ pageParam = 1 }) => fetchAllTemplate(pageParam), // Pass pageParam for pagination
			getNextPageParam: (lastPage, pages) => {
				const totalItems = lastPage?.data?.data?.totalItems || 0;
				const currentPage = pages?.length;
				return currentPage * 10 < totalItems ? currentPage + 1 : undefined; // Assuming 10 items per page
			},
			staleTime: 300000,
			enabled: !!authToken,
		});

	const allTemplates = useMemo(() => {
		return data?.pages.flatMap((page) => page.data.data.items) || []; // Flattening all pages
	}, [data]);

	const { ref: loadMoreRef, inView } = useInView();

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage(); // Fetch next page when the element is in view
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	return (
		<CategoryLayout title="Other Templates">
			{isPending && isFetching ? (
				// Show loader while fetching data
				<div className="flex items-center justify-center h-[212px] w-full">
					<div className={`btn-loader border-4 border-[#14A019]`} />
				</div>
			) : allTemplates?.length ? (
				<>
					{allTemplates?.map((template) => (
						<TemplateCard
							key={template?._id}
							id={template?._id}
							isFree={!template?.isPaid}
							imageSrc={template?.thumbnail || SAMPLE1}
							templateId={template?._id}
							isRedirect={isRedirect}
							resetInfo={resetInfo}
							showPreview={showPreview}
						/>
					))}
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
				<div className="flex items-center justify-center h-[212px] w-full">
					<p className="text-center">No template found</p>
				</div>
			)}
		</CategoryLayout>
	);
};

export default OtherResume;