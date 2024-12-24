import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useMediaQuery } from '@mui/material';

import { addState, hideCustomModal, showCustomModal } from 'store/sagaActions';
import { CloseArrowIcon, OpenInIcon, SendIcon, StarIcon } from 'assets';
import {
	CUSTOMIZE_RESUME_SIDE_MODAL,
	PREFERENCE_MODAL,
	UPLOAD_RESUME_MODAL,
} from 'constants/modalTypeConstant';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import ChatMessage from './bot/ChatMessage';
import LoaderModal from './LoaderModal';
import UpdatePreferenceModal from './UpdatePreferenceModal';
import ChatBotIcon from './bot/BotIcon';
import ChatLoader from './bot/chatLoader';
import QuickGuideModal from './QuickGuide';
import { BackArrow } from 'assets/index';
import { useQueryAPI } from 'apis/query';
import { handleAlert } from 'utils/helperFunctions/helperFunction';
import { useMutationAPI } from 'apis/mutation';

import './chatbot.css';

function Header({ withQuickGuide, expandBtn = false, isBack = false, onBackClick }) {
	const [open, setOpen] = useState(false);

	const { showFullBot } = useSelector((state) => state.common);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	return (
		<>
			<div className="chat-header  flex  justify-between items-center p-4 w-full text-[#008539]">
				<div className="flex gap-3">
					<div className="flex gap-3 items-center self-stretch my-auto">
						<div className="flex gap-2 items-center self-stretch my-auto">
							{isBack && !expandBtn && (
								<div onClick={onBackClick} className="cursor-pointer">
									<BackArrow />
								</div>
							)}
							<ChatBotIcon />
							<div className="flex flex-col justify-center self-stretch my-auto">
								<div className="text-base lg:text-xl font-semibold tracking-tight leading-snug text-green-700">
									Buddy
								</div>
								<div className="text-xs text-[#12121299]">Your AI Co-Pilot</div>
							</div>
						</div>
					</div>
					{withQuickGuide && (
						<PrimaryButton
							size="small"
							buttonText="Quick Guide"
							btnClassName="text-xs"
							varient="primaryOutline"
							onClick={() => setOpen(true)}
						/>
					)}
				</div>
				{expandBtn && (
					<div onClick={expandBtn}>
						{/* <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.33333 6.66667L14 2M14 2H10M14 2V6M6.66667 9.33333L2 14M2 14H6M2 14L2 10"
                stroke="black"
                strokeOpacity="0.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg> */}

						{showFullBot ? (
							<CloseArrowIcon className="cursor-pointer" />
						) : (
							<OpenInIcon className="cursor-pointer" />
						)}
					</div>
				)}
			</div>
			<QuickGuideModal open={open} onClose={toggleDrawer(false)} />
		</>
	);
}

function ChatbotSide({ withQuickGuide, expandBtn, customHeader, onBackClick }) {
	const dispatch = useDispatch();

	const placeholderData = [
		'Jobs',
		'Interview Questions',
		'Work-Life Balance Strategies',
		' Professional Development Opportunities',
		' Remote Work Best Practices',
	];

	const isSmallScreen = useMediaQuery('(max-width:1024px)');
	const savedCounter = isNaN(Cookies.get('counter')) ? 0 : Cookies.get('counter');

	const [data, setData] = useState([]);
	const { sliderQues, jobDetail, userDetails, mobileChatBotMessage, fromMobile, chatWithBot } =
		useSelector((state) => state.common);
	const { authToken } = useSelector((state) => state.auth);

	const [value, setValue] = useState(sliderQues || '');
	const [loading, setLoading] = useState(false);
	const [selectedId, setSelectedId] = useState([]);
	const [designation, setDesignation] = useState('');
	const [placeholder, setPlaceholder] = useState('');
	// eslint-disable-next-line no-unused-vars
	const [updateCount, setUpdateCount] = useState(0);

	const { customiseResume } = useMutationAPI();
	const queryClient = useQueryClient();

	const incrementCounter = () => {
		const newCounter = Number(savedCounter) + 1;
		Cookies.set('counter', newCounter, { expires: 1 }); // Expires in 1 days
	};

	const { mutate } = useMutation({
		mutationFn: (val) => customiseResume(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries(['userDetails']);
				dispatch(
					showCustomModal({
						customModalType: CUSTOMIZE_RESUME_SIDE_MODAL,
						// tempCustomModalData: {
						//   analysisData: data?.data,
						// },
					})
				);
				dispatch(addState({ name: 'customizeResume', value: data?.data }));
			}
		},
		onError: () => {
			dispatch(hideCustomModal());
			handleAlert(dispatch, 'Failed to parse the document', 'error');
		},
	});

	const handleopenResumeUploadModal = () => {
		dispatch(
			showCustomModal({
				customModalType: PREFERENCE_MODAL,
				tempCustomModalData: {
					modalType: 'ANALYZER',
					className: 'pt-6 pb-8  px-6 flex rounded-[24px]  ',
					borderRadius: '24px',
					widthMax: '784px',
					MUiMargin: '0px',
				},
			})
		);

		if (userDetails?.profile?.resume?.file) {
			const payload = {
				userId: userDetails?._user,
				jobId: jobDetail?.jobId,
			};

			mutate(payload);
		} else {
			dispatch(
				showCustomModal({
					customModalType: UPLOAD_RESUME_MODAL,
				})
			);
		}
	};

	const buddyBotMessages = [
		{
			isUser: false,
			response: `I see that you're asking about this **${jobDetail?.positionName}** role at **${jobDetail?.companyName}**. What would you like to know?`,
		},
	];

	const buddyQue = [
		{
			id: 0,
			isUser: true,
			question: 'Tell me why this job is a good fit for me.',
		},
		{
			id: 1,
			isUser: true,
			question: 'Give me some resume tips if I want to apply.',
		},
		{
			id: 2,
			isUser: true,
			question: 'Generate custom resume tailored to this job.',
			onClick: () => {
				dispatch(hideCustomModal());
				handleopenResumeUploadModal();
			},
		},
		{
			id: 3,
			isUser: true,
			question: 'Show me Connections for potential referral.',
		},
		{ id: 4, isUser: true, question: 'Write a cover letter for this job.' },
	];

	const handleModal = () => {
		dispatch(
			showCustomModal({
				customModalType: PREFERENCE_MODAL,
				tempCustomModalData: {
					modalType: 'JOB_PREFRENCE',
				},
			})
		);
	};

	const handleUpdatePreferenceModal = (data) => {
		if (data?.isMessage) {
			fetchData(data?.title);
		} else if (data?.isModal) {
			dispatch(
				showCustomModal({
					customModalType: data?.modalType,
					tempCustomModalData: {
						title: 'Hello User',
						body: 'Here is the modal',
						submitText: 'Okay',
					},
				})
			);
		}
	};

	const { fetchJobCount } = useQueryAPI();

	const { data: jobCount } = useQuery({
		queryKey: ['jobDetails', designation],
		queryFn: () => fetchJobCount(designation),
		staleTime: 300000,
	});

	const fetchData = async (val) => {
		if (!authToken && Number(savedCounter) >= 3) {
			const updatedChat = [
				...data,
				{
					isUser: true,
					question: val,
				},
				{
					isUser: false,
					response:
						'Your buddy bot message limit has been reached. To access more features click below link .',
					redirect: {
						message: 'Click here to Sign up',
						path: '/sign-up',
					},
				},
			];
			setData(updatedChat);
			dispatch(addState({ name: 'chatWithBot', value: updatedChat }));
			return;
		}

		const chatData = [
			...data,
			{
				isUser: true,
				question: val,
			},
		];
		setData((prev) => [
			...prev,
			{
				isUser: true,
				question: val,
			},
		]);
		setLoading(true);
		const payload = {
			question: val,
			userId: userDetails?._user,
		};
		if (jobDetail) {
			payload.jobId = jobDetail?.jobId;
		}
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_CHATBOT_END_POINT_URL}/chat`,
				payload
			);
			setLoading(false);
			if (res.status === 200) {
				incrementCounter();
				dispatch(addState({ name: 'fromMobile', value: false }));
				const resChat = res?.data?.response;
				dispatch(addState({ name: 'sliderQues', value: null }));
				// setData((prev) => [...prev, resChat]);
				chatData.push(resChat);
				dispatch(addState({ name: 'chatWithBot', value: chatData }));

				const designation = resChat?.preference?.jobSeekerInfo?.designation?.name;
				const location = resChat?.preference?.jobSeekerInfo?.location?.city;

				const param = `?designation=${designation}${location ? `&location=${location}` : ''}`;

				if (resChat?.preference?.jobSeekerInfo?.designation?.name) setDesignation(param);
				// setData(chatData);
				setData((prev) => [...prev, { ...resChat, isTyping: true }]);
			}
		} catch (error) {
			dispatch(addState({ name: 'sliderQues', value: null }));
			dispatch(addState({ name: 'fromMobile', value: false }));
			setValue('');
			setLoading(false);
			setData((prev) => [
				...prev,
				{
					isUser: false,
					response: 'Something went wrong. Please try again later.',
				},
			]);
		}
	};

	const chatEndRef = useRef(null);

	useEffect(() => {
		if (chatEndRef?.current?.scrollHeight) {
			chatEndRef.current.scrollTo({
				top: chatEndRef.current.scrollHeight,
				behavior: 'smooth',
			});
		}
	}, [data]);

	useEffect(() => {
		if (jobDetail?.isChatBot && jobDetail?.companyName) {
			setData((prev) => [...prev, ...buddyBotMessages]);
			setSelectedId([]);
		}
	}, [jobDetail]);

	useEffect(() => {
		if (fromMobile) {
			fetchData(mobileChatBotMessage);
			setValue('');
		}
	}, [fromMobile]);

	useEffect(() => {
		if (chatWithBot) {
			setData(chatWithBot);
		}
		if (sliderQues) {
			fetchData(sliderQues);
			setValue('');
		}
	}, [sliderQues]);

	useEffect(() => {
		dispatch(addState({ name: 'jobTags', value: jobCount?.items }));
	}, [jobCount]);

	const dynamicPlaceHolder = (placeHolders) => {
		const intervalId = setInterval(() => {
			setUpdateCount((prevCount) => {
				const newPlaceholder = placeHolders[prevCount];
				setPlaceholder(newPlaceholder);
				return (prevCount + 1) % placeHolders.length;
			});
		}, 2200);

		// Clean up interval on component unmount
		return () => clearInterval(intervalId);
	};
	useEffect(() => {
		const cleanUp = dynamicPlaceHolder(placeholderData);
		return cleanUp;
	}, []);

	return (
		<>
			<main
				className={`flex overflow-hidden  flex-col mx-auto w-full lg:rounded-xl border border-solid border-lightgray   max-md:max-w-full ${!authToken && 'landing-chatbot'}`}
			>
				{customHeader ? (
					<>{customHeader}</>
				) : (
					<Header
						withQuickGuide={withQuickGuide}
						expandBtn={expandBtn}
						isBack={isSmallScreen}
						onBackClick={onBackClick}
					/>
				)}

				<div className="flex flex-1 gap-2.5 flex-col justify-end items-end px-2 py-2 size-full overflow-y-auto max-md:max-w-full">
					<div
						ref={chatEndRef}
						className="flex  gap-2.5 flex-col  overflow-y-auto w-full h-full pb-2 overflow-hide"
					>
						{data.map((item, i) => (
							<ChatMessage
								isUser={item?.isUser}
								message={
									item?.isUser
										? item?.question
										: `${item?.response} To get a detailed response, sign up / login and use our AI powered buddy bot with ingress points`
								}
								onClick={item?.onClick}
								key={i}
								preferences={item?.bubbleOption}
								redirect={item?.redirect}
								filterPrefrence={item?.preference}
								sortBy={item?.sortBy}
								onPreferenceButtonClick={handleUpdatePreferenceModal}
								isTyping={item?.isTyping}
							/>
						))}
						{jobDetail?.isChatBot &&
							!loading &&
							buddyQue
								.filter(({ id }) => !selectedId.includes(id))
								.map(({ isUser, question, pref, id, onClick }, i) => (
									<ChatMessage
										isUser={isUser}
										message={question}
										isBorder
										onClick={() => {
											if (id === 2) {
												onClick();
											} else if (jobDetail?.companyName) {
												fetchData(question);
												// dispatch(removeState({ name: 'jobDetail' }));
												setSelectedId([...selectedId, id]);
											}
										}}
										key={i}
										preferences={pref}
										onPreferenceButtonClick={(e) => {
											if (e.includes('Update')) {
												handleUpdatePreferenceModal();
											} else {
												handleModal(e);
											}
										}}
									/>
								))}
						{loading && <ChatLoader />}
					</div>

					<form className="flex w-full h-[52px] gap-2 justify-between items-center ps-4  rounded-xl border border-solid backdrop-blur-[16.5px] bg-white  border-lightgray  ">
						<div className="flex  gap-3 items-center self-stretch  text-xl tracking-tight leading-snug text-neutral-900 w-full">
							<StarIcon
								height="24"
								width="24"
								stopColor="#FFBB00"
								stopColor2="#FFBB00"
							/>
							<div className="flex  items-center self-stretch my-auto w-full relative">
								<label
									htmlFor="inputField"
									className={`anim-label ${value ? 'activelabel' : ''} opacity-60 text-sm md:w-[calc(100%-18px)] w-[95%]`}
								>
									Search About <span>{placeholder}</span>
								</label>
								<input
									className="h-10 text-sm w-full focus:outline-none border-none bg-transparent"
									// placeholder="Search About Jobs"
									// aria-label="Search for jobs"
									value={value}
									onChange={(e) => setValue(e.target.value)}
								/>
							</div>
						</div>
						<button
							disabled={!value || loading}
							type="submit"
							className="cursor-pointer h-[52px] w-[52px] flex border-[#ffffff00] bg-[#ffffff00] justify-center items-center"
							onClick={() => {
								fetchData(value);
								setValue('');
							}}
						>
							<SendIcon />
						</button>
					</form>
				</div>
			</main>
			<LoaderModal />
			<UpdatePreferenceModal />
		</>
	);
}

export default ChatbotSide;
