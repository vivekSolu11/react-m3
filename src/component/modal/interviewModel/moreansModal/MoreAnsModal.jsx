import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, IconButton, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { hideCustomModal, showCustomModal } from 'store/sagaActions';
import { MOREANSMODAL, SHARE_MODAL_MOBILE, SHAREMODAL } from 'constants/modalTypeConstant';
import { ARROW_BTN, ARROWLEFT_ICON, CLOSEBTN_ICON, COMPANY_DEFAULT } from 'assets/images';

import './index.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryAPI } from 'apis/query';
import { useMutationAPI } from 'apis/mutation';

const MoreAnsModal = () => {
	const dispatch = useDispatch();
	const isSmallScreen = useMediaQuery('(max-width: 768px)');

	const [recent, setRecent] = useState(false);
	const [ans, setAns] = useState([]);
	const { customModalType, tempCustomModalData } = useSelector((state) => state.modal);
	const { fetchInterviewDetails } = useQueryAPI();

	const hideModal = () => {
		dispatch(hideCustomModal());
		setRecent(false);
	};
	const { upvoteAnswer, upvoteQuestions } = useMutationAPI();

	const getData = () => {
		if (recent) {
			let url = `_question=${tempCustomModalData?.questionId}&recent=recent`;
			return fetchInterviewDetails(url); // Pass pageParam for pagination
		} else {
			let url = `_question=${tempCustomModalData?.questionId}`;
			return fetchInterviewDetails(url); // Pass pageParam for pagination
		}
	};

	const { data, refetch } = useQuery({
		queryKey: ['fetchJobCompanies', tempCustomModalData, recent],
		staleTime: 300000,
		enabled: !!tempCustomModalData?.questionId,

		queryFn: () => getData(),
	});
	const { mutate: upvoteAnswerMutate, isPending: upvoteAnswerPending } = useMutation({
		mutationFn: (val) => upvoteAnswer(val),
		onSuccess: (res) => {
			if (res) {
				refetch();
			}
		},
	});
	const { mutate: upvoteQuestionMutate, isPending: upvoteQuestionsPending } = useMutation({
		mutationFn: (val) => upvoteQuestions(val),
		onSuccess: (res) => {
			if (res) {
				refetch();
			}
		},
	});

	useEffect(() => {
		if (data?.data?.data?.items) {
			setAns(resData);
		}
	}, [data]);

	const resData = data?.data?.data?.items;
	return (
		<Dialog
			open={customModalType === MOREANSMODAL}
			onClose={hideModal}
			maxWidth="md"
			fullWidth
			sx={{
				'& .MuiPaper-root': {
					boxShadow: 'none',
					backgroundColor: '#F5F5F5',
					borderRadius: '12px',
					margin: 0,
					maxWidth: '681px',
				},
			}}
		>
			{/* <div className="flex flex-col"> */}
			{/* First Div: Back Arrow and Close Button */}
			<DialogActions
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					padding: '24px 24px 0px 24px',
				}}
			>
				<button onClick={hideModal} className="border-none  m-0 p-0">
					<img src={ARROWLEFT_ICON} alt="arrow_left" className="h-6 w-6 cursor-pointer" />
				</button>
				<IconButton onClick={hideModal}>
					<img src={CLOSEBTN_ICON} alt="close_btn" className="h-6 w-6 cursor-pointer" />
				</IconButton>
			</DialogActions>

			<DialogContent
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					padding: '20px 24px',
				}}
			>
				<div className="flex flex-col gap-5 w-full">
					{/* Second Div: Question, Company Logo, and Upvote */}
					<div className="flex items-center bg-[#FFFFFF] p-4">
						<div className="flex flex-col gap-6 w-full">
							<p className="text-xl font-medium text-[#1A1A1A] tracking-tight m-0">
								{ans?.question}
							</p>
							<div className="flex justify-between">
								<div
									className="flex items-center gap-2
                "
								>
									<img
										src={ans?.logo || COMPANY_DEFAULT}
										alt="Company Logo"
										className="w-8 h-8 object-contain"
									/>
									<span className="text-base font-normal tracking-tight text-[#666666]">
										Asked in {ans?.askedBy}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<div
										className="cursor-pointer w-8 h-8 "
										onClick={() => {
											if (!upvoteQuestionsPending) {
												upvoteQuestionMutate({ _question: ans?._id });
											}
										}}
									>
										<img src={ARROW_BTN} alt="arrow_btn" className="w-8 h-8" />
									</div>
									<span className="text-base font-medium tracking-tight text-[#4285F4]">
										{ans?.upvoteCount}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Third Div: Total Answers and Recent Button */}
					<div className="flex justify-between items-center">
						<span className="text-xs font-medium tracking-tight text-[#666666]">
							Total {ans?.answers?.length || 0} answers
						</span>
						<button
							onClick={() => setRecent(true)}
							className="px-3 py-2 rounded bg-[#FFFFFF] cursor-pointer text-xs font-medium tracking-tight text-[#1A1A1A] button_container"
						>
							Recent
						</button>
					</div>

					{/* Fourth Div: Answer Cards */}
					<div className="flex flex-col gap-5">
						{ans?.answers?.map((answer, i) => (
							<div key={answer._id} className="p-4 bg-[#FFFFFF]">
								<h3 className="text-sm font-medium tracking-tight text-[#1A1A1A] m-0">
									Answer {i + 1}
								</h3>
								<p className="text-sm font-normal tracking-tight text-[#666666]">
									{answer.text}
								</p>
								<div className="flex gap-2 items-center justify-start space-x-1 mt-2 text-blue-600">
									<div className="flex gap-2 items-center">
										<div
											className="cursor-pointer w-8 h-8"
											onClick={() => {
												if (!upvoteAnswerPending) {
													upvoteAnswerMutate({
														_question: resData?._id,
														_answer: answer?._id,
													});
												}
											}}
										>
											<img
												src={ARROW_BTN}
												alt="arrow_btn"
												className="w-8 h-8"
											/>
										</div>{' '}
										<span className="text-base font-medium text-[#4285F4]">
											{answer.upvoteCount}
										</span>
									</div>

									<div
										className="text-sm font-medium text-[#3B3B3B] tracking-tight rounded-lg cursor-pointer border border-solid border-[#3B3B3B] px-3 py-[6px]"
										onClick={() =>
											dispatch(
												showCustomModal({
													customModalType: isSmallScreen
														? SHARE_MODAL_MOBILE
														: SHAREMODAL,
												})
											)
										}
									>
										Share
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</DialogContent>
			{/* </div> */}
		</Dialog>
	);
};

export default MoreAnsModal;
