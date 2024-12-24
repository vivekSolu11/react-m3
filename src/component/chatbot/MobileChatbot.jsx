import React, { useEffect, useRef, useState } from 'react';

import { SendIcon, StarIcon } from 'assets';
import ChatbotSide from './ChatBot';

import './chatbot.css';
import { useDispatch } from 'react-redux';
import { addState } from 'store/sagaActions';
import { useSelector } from 'react-redux';

const SuggestButton = ({ text, onClick }) => {
	return (
		<div
			onClick={onClick}
			className="flex gap-2 cursor-pointer justify-center items-center px-2 py-1  bg-[#F5F5F5] rounded-md "
		>
			<span className="text-sm leading-4 text-black font-medium">{text}</span>
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				style={{ rotate: '-45deg' }}
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M14.43 18.82C14.24 18.82 14.05 18.75 13.9 18.6C13.61 18.31 13.61 17.83 13.9 17.54L19.44 12L13.9 6.46C13.61 6.17 13.61 5.69 13.9 5.4C14.19 5.11 14.67 5.11 14.96 5.4L21.03 11.47C21.32 11.76 21.32 12.24 21.03 12.53L14.96 18.6C14.81 18.75 14.62 18.82 14.43 18.82Z"
					fill="#292D32"
				/>
				<path
					d="M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z"
					fill="#292D32"
				/>
			</svg>
		</div>
	);
};
const MobileChatbot = () => {
	const [clicked, setclicked] = useState(false);
	const [message, setMessage] = useState('');
	const dispatch = useDispatch();
	const { showFullBot } = useSelector((state) => state.common);
	const divRef = useRef(null); // Reference for the div

	const handleClickOutside = (event) => {
		if (divRef.current && !divRef.current.contains(event.target)) {
			setclicked(false);
		}
	};

	const handleSubmit = () => {
		dispatch(addState({ name: 'showFullBot', value: true }));
		dispatch(addState({ name: 'mobileChatBotMessage', value: message }));
		dispatch(addState({ name: 'fromMobile', value: true }));
		setMessage('');
	};

	useEffect(() => {
		// Add event listener to detect clicks outside
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			// Cleanup the event listener on component unmount
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	return (
		<div
			ref={divRef}
			className={` ${showFullBot ? 'h-full  bg-[#00000080]' : 'h-auto'} flex xl:hidden absolute w-full rounded-md justify-center bottom-0 z-50 py-2 px-4`}
		>
			{!showFullBot ? (
				<div
					onClick={() => setclicked(true)}
					className={`mobileChatbotborder transition-all ease-in-out delay-75  shadow-lg flex flex-col w-full ${clicked ? 'h-auto items-start p-4' : 'h-[52px] ps-4 items-center'}  gap-2     backdrop-blur-[16.5px] bg-white   `}
				>
					<div className="flex gap-1 w-full items-center">
						<div className="flex  gap-3 items-center   text-xl tracking-tight leading-snug text-neutral-900 w-full pr">
							<div className="bg-prim-grad-fir w-6 h-6 rounded-md flex items-center justify-center">
								<StarIcon height="14" black width="14" />
							</div>
							<div
								className={`flex   h-7 text-sm items-center ${clicked ? 'font-semibold text-primary' : ''}`}
							>
								{clicked ? 'Buddy' : '   Ask Buddy...'}
							</div>
						</div>
						<button
							className={`cursor-pointer ${clicked ? 'h-5 w-h-5' : 'h-[52px] w-[52px]'} flex border-[#ffffff00] bg-[#ffffff00] justify-center items-center`}
						>
							{clicked ? (
								<div
									onClick={(e) => {
										e.stopPropagation();
										dispatch(addState({ name: 'showFullBot', value: true }));
									}}
								>
									<svg
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
									</svg>
								</div>
							) : (
								<SendIcon />
							)}
						</button>
					</div>
					{clicked && (
						<>
							<div className="flex  w-full items-end ">
								<textarea
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									className="w-full text-sm focus:outline-none border-none border-[#ffffff00] bg-[#ffffff00]"
									placeholder="Ask Buddy..."
									rows={4}
								></textarea>
								<button
									className="cursor-pointer h-5 w-13  flex border-[#ffffff00] bg-[#ffffff00] justify-center items-end"
									onClick={handleSubmit}
								>
									<SendIcon />
								</button>
							</div>
							<div className="Areaborder h-1 w-full hidden"></div>
							<div className=" flex-col gap-2 hidden">
								<div className="text-sm text-[#666]">You can ask me about:</div>
								<div className="flex overflow-x-auto w-auto gap-2">
									<div className="flex shrink-0 gap-2">
										{/* Add this wrapper for the buttons */}
										{[
											'Resume Analysis',
											'Career Advisor',
											'Interview Questions',
										].map((item) => (
											<SuggestButton key={item} text={item} />
										))}
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			) : (
				<div className=" h-full [&>main]:h-full [&>main]:rounded-md [&>main]:bg-white w-full ">
					<ChatbotSide
						withQuickGuide
						expandBtn={() => dispatch(addState({ name: 'showFullBot', value: false }))}
					/>
				</div>
			)}
		</div>
	);
};

export default MobileChatbot;
