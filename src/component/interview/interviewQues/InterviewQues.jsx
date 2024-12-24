import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useQueryAPI } from 'apis/query';
import Loader from 'component/common/Loader';
import { ARROW_ICON, EDIT_ICON } from 'assets/images';
import InterviewQuesCard from './InterviewQuesCard';
import ShareModal from 'component/modal/interviewModel/shareModal/ShareModal';
import MoreAnsModal from 'component/modal/interviewModel/moreansModal/MoreAnsModal';
import { showCustomModal } from 'store/sagaActions';
import { FIND_QUES_MOBILE } from 'constants/modalTypeConstant';
import FindQuesModal from 'component/modal/interviewModel/mobileModal/FindQuesModal';
import ShareMobModal from 'component/modal/interviewModel/mobileModal/shareui/ShareMobModal';
import SearchableDropdown from 'component/common/searchabledropdown';
import { InterviewQuestionFilter } from 'constants/updatePreference';
import {
	updateCompnay,
	updatedCurrentPositionForInterview,
} from 'store/reducer/InterviewQuestion/InterviewQuestion';
import { useMutationAPI } from 'apis/mutation';
import NoResultFound from 'component/jobs/NoResultFound';

import '../../interview/interview.css';

const InterviewQues = () => {
	const { ref: loadMoreRef, inView } = useInView();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [filter, setFilter] = useState('Date');
	const { selectedCurrentPositionForInterview, selectedCompany } = useSelector(
		(state) => state.InterviewQuestion
	);

	const handleFindQues = () => {
		dispatch(
			showCustomModal({
				customModalType: FIND_QUES_MOBILE,
			})
		);
	};
	const { fetchInterviewQuestion } = useQueryAPI();

	const fetchInterviews = async ({ pageParam = 1 }) => {
		const props = {
			_designation: selectedCurrentPositionForInterview?._id,
			_company: selectedCompany?._id,
			// _designation: '66fe47dcdd1f3205faace831',
			// _company: '67160d850977271d73dd9999',
			startIndex: pageParam,
			itemsPerPage: 10,
			sortOption: filter, //['Popular', 'Date', 'Relevance']
		};

		return fetchInterviewQuestion(props);
	};

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, refetch } =
		useInfiniteQuery({
			queryKey: [
				`fetchInterviewQue`,
				selectedCompany,
				selectedCurrentPositionForInterview,
				filter,
			],
			queryFn: fetchInterviews,
			getNextPageParam: (lastPage, pages) => {
				const totalItems = lastPage?.data?.data?.totalItems || 0;
				const currentPage = pages.length;
				return currentPage * 10 < totalItems ? currentPage + 1 : undefined;
			},
		});
	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage && !isPending) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	const { upvoteQuestions } = useMutationAPI();

	const { mutate: upvoteQuestionMutate } = useMutation({
		mutationFn: (val) => upvoteQuestions(val),
		onSuccess: (res) => {
			if (res) {
				refetch();
			}
		},
	});

	const responseData = useMemo(() => {
		if (data?.pages[0]) {
			return data?.pages.flatMap((page) => page?.data?.data?.items) || []; // Flattening all pages
		} else return [];
	}, [data]);

	return (
		<div className="w-full mx-auto  flex flex-col gap-4">
			{/* Header Section */}
			<div className="flex gap-1 items-center">
				<div
					className="w-4 h-4 flex justify-center cursor-pointer items-center"
					onClick={() => navigate('/interview')}
				>
					<img
						src={ARROW_ICON}
						alt="Back to previous page"
						className="w-[5px] h-[10px]"
					/>
				</div>
				<h1 className="text-base font-medium tracking-tight text-[#1A1A1A] m-0">
					Showing {responseData?.length || 0} Results
				</h1>
			</div>

			{/* Conditional Display for Dropdown or Static Text */}
			<div className="flex md:flex-row flex-col items-center md:justify-between gap-4">
				{/* Show Dropdowns only on medium and larger screens */}
				<div className="hidden md:flex gap-2">
					<SearchableDropdown
						inputClass={``}
						value={selectedCurrentPositionForInterview}
						handleChange={(e) => {
							dispatch(updatedCurrentPositionForInterview(e));
						}}
						url="interview-questions/designation"
						placeholder="Job TItle"
						boxClassName="w-[200px] bg-white"
					/>
					<SearchableDropdown
						inputClass={``}
						value={selectedCompany}
						handleChange={(e) => {
							dispatch(updateCompnay(e));
						}}
						url="interview-questions/company"
						placeholder="Company"
						boxClassName="w-[200px] bg-white"
					/>
				</div>

				{/* Show Static Text on smaller screens */}
				<div className="md:hidden flex items-center justify-between  w-full bg-[#FFFFFF] p-3 rounded-lg text-left">
					<div className="flex flex-col gap-1">
						<div className="text-sm font-normal leading-4 text-[#1A1A1A]">
							{selectedCurrentPositionForInterview?.name || 'Select Job'}
						</div>
						<div className="text-sm font-normal leading-4 text-[#666666]">
							{selectedCompany?.name || 'Select Company'}
						</div>
					</div>
					<button
						className="p-2 bg-[#FFFFFF] border-none cursor-pointer"
						onClick={handleFindQues}
					>
						<img src={EDIT_ICON} alt="Edit" />
					</button>
				</div>

				{/* Relevant Button */}
				<div className="flex relative justify-end self-end  ">
					<button
						onClick={() => setOpen(true)}
						className="px-4 py-3 w-28 bg-[#FFFFFF] text-sm font-medium tracking-tight text-[#1A1A1A] relevant_btn cursor-pointer"
					>
						{filter}
					</button>
					{open && (
						<div className="top-14 absolute flex flex-col  z-10 w-28  right-0 bg-white shadow-lg">
							{InterviewQuestionFilter.map((item) => (
								<div
									key={item.id}
									onClick={() => {
										setFilter(item.value);
										setOpen(false);
									}}
									className="px-3 cursor-pointer py-2"
								>
									{item?.label}
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Grid of Cards */}

			{isPending ? (
				<Loader />
			) : responseData?.length ? (
				<div className="grid grid-cols-1 gap-4 relative">
					{responseData?.map((question) => (
						<InterviewQuesCard
							key={question._id}
							{...question}
							upvoteMutate={upvoteQuestionMutate}
						/>
					))}
					<div ref={loadMoreRef}>
						{(isFetchingNextPage || hasNextPage) && (
							<div className="flex items-center justify-center h-[50px] w-full">
								<div className={`btn-loader border-4 border-[#14A019]`} />
							</div>
						)}
					</div>
					{/* <div className="absolute w-full bottom-0 pt-[120px] pb-16  mx-auto z-10 md:flex hidden justify-center items-center banner_container">
          <UpgradeBanner />
        </div> */}
				</div>
			) : (
				<div className="flex justify-center">
					<NoResultFound showResult={false} />
				</div>
			)}
			<ShareModal />
			<MoreAnsModal />
			<FindQuesModal />
			<ShareMobModal />
		</div>
	);
};

export default InterviewQues;
