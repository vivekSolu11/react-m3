import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import CategoryLayout from '../categoryLayout/CategoryLayout';
import TemplateCard from 'component/resumeBuilder/templateCard/TemplateCard';
import { addState, removeState, updateresumeCreate } from 'store/sagaActions';
import { ADD_ICON, SAMPLE1 } from 'assets/images';
import { useQueryAPI } from 'apis/query';
import { handleAlert } from 'utils/helperFunctions/helperFunction';

import styles from './savedResume.module.css';

const SavedResume = ({ isRedirect = true, showPreview = true }) => {
	const dispatch = useDispatch();
	const { fetchSavedTemplates } = useQueryAPI();

	const { authToken } = useSelector((state) => state.auth);
	const { userDetails } = useSelector((state) => state.common);

	const handleCreate = () => {
		if (userDetails?.profile?.name?.fullName) {
			dispatch(updateresumeCreate(true));
			dispatch(addState({ name: 'builderActiveTab', value: 'select_template' }));
			dispatch(removeState({ name: 'resumePreview' }));
		} else {
			handleAlert(dispatch, 'Please update your profile', 'error');
		}
	};

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, isPending } =
		useInfiniteQuery({
			queryKey: ['fetchSavedTemplates'],
			queryFn: ({ pageParam = 1 }) => fetchSavedTemplates(pageParam), // Pass pageParam for pagination
			getNextPageParam: (lastPage, pages) => {
				const totalItems = lastPage?.data?.data?.items?.totalItems || 0;
				const currentPage = pages?.length;
				return currentPage * 10 < totalItems ? currentPage + 1 : undefined; // Assuming 10 items per page
			},
			staleTime: 300000,
			enabled: !!authToken,
		});

	const savedTemplates = useMemo(() => {
		return data?.pages.flatMap((page) => page?.data?.data?.items) || []; // Flattening all pages
	}, [data]);

	const { ref: loadMoreRef, inView } = useInView();

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage(); // Fetch next page when the element is in view
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
	return (
		<CategoryLayout title="Saved Resume">
			<Link
				className={styles.createNewOption}
				to={userDetails?.profile?.name?.fullName ? '/resume/create' : null}
				onClick={handleCreate}
			>
				<div className={styles.createNewBackground}>
					<div className={styles.createNewContent}>
						<button className={styles.createNewButton}>
							<img
								src={ADD_ICON}
								alt="create template"
								className={styles.createNewIcon}
							/>
							<span className={styles.createNewText}>Create new</span>
						</button>
						<p className={styles.createNewDescription}>
							Create a tailored resume for each job application.
						</p>
					</div>
				</div>
			</Link>

			{isPending && isFetching ? (
				// Show loader while fetching data
				<div className="flex items-center justify-center h-[212px] w-full">
					<div className={`btn-loader border-4 border-[#14A019]`} />
				</div>
			) : savedTemplates?.length ? (
				// If templates are available, show them
				<>
					{savedTemplates.map((template) => (
						<TemplateCard
							key={template?._id}
							id={template?._id}
							isFree={!template?.isPaid}
							type="saved"
							imageSrc={
								template?.previewThumbnail?.url ||
								template?.previewThumbnail ||
								template?.thumbnail ||
								SAMPLE1
							}
							templateId={template?._template}
							showPreview={showPreview}
							isRedirect={isRedirect}
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
			) : // Show message if no templates found
			null}
		</CategoryLayout>
	);
};

export default SavedResume;
