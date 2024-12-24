import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ChatBotIcon from './BotIcon';
import { useMutationAPI } from 'apis/mutation';
import { cleanObject } from 'utils/helperFunctions/helperFunction';
import { addState, showAlert } from 'store/sagaActions';

import './bot.css';

function PreferenceButton({ text, onClick }) {
	return (
		<div
			onClick={onClick}
			className="flex gap-2 cursor-pointer justify-center items-center px-3 py-2 border bg-white border-solid border-gray rounded-[31px]"
		>
			<span className="text-xs leading-4 text-black font-medium">{text}</span>
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
}

const ChatMessage = ({
	isUser,
	message = '',
	preferences = [],
	onClick,
	onPreferenceButtonClick,
	className,
	isBorder,
	redirect,
	filterPrefrence,
	sortBy,
	isTyping,
}) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const dispatch = useDispatch();

	const { jobListType, userDetails } = useSelector((state) => state.common);
	const { authToken } = useSelector((state) => state.auth);
	const { updatePreference } = useMutationAPI();

	const [displayedMessage, setDisplayedMessage] = useState('');

	const { mutate } = useMutation({
		mutationFn: (val) => updatePreference(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries([
					`fetch${jobListType?.charAt(0)?.toUpperCase() + jobListType.slice(1)}Jobs`,
					'userDetails',
				]);
				dispatch(
					showAlert({
						message: data?.data?.data?.message,
						status: 'success',
					})
				);
			}
		},
	});

	const removeFalseValues = (data) => {
		const jobTitleAccess = userDetails?.subscription?.usage?.jobFilters?.includes('Job Title');
		const locationAccess = userDetails?.subscription?.usage?.jobFilters?.includes('Location');
		const experienceAccess =
			userDetails?.subscription?.usage?.jobFilters?.includes('Experiences');
		const jobTypeAccess = userDetails?.subscription?.usage?.jobFilters?.includes('Job Type');
		const workTypeAccess = userDetails?.subscription?.usage?.jobFilters?.includes('Work Mode');

		// Safely remove 'designation' if jobTitleAccess is false
		if (!jobTitleAccess) {
			delete data?.jobSeekerInfo?.designation;
		}

		// Safely remove 'location' if locationAccess is false
		if (!locationAccess) {
			delete data?.jobSeekerInfo?.location;
		}

		// Safely remove 'experience' if experienceAccess is false
		if (!experienceAccess) {
			delete data?.jobSeekerInfo?.experience;
		}

		// Safely remove 'jobType' if jobTypeAccess is false
		if (!jobTypeAccess) {
			delete data?.jobSeekerInfo?.jobType;
		}

		// Safely remove 'workModel' if workTypeAccess is false
		if (!workTypeAccess) {
			// Ensure workModel exists before attempting to delete it

			if (data?.preferredLuxury?.workModel !== undefined) {
				delete data?.preferredLuxury?.workModel;
			}
		}

		return data;
	};

	useEffect(() => {
		const words = message.split(' '); // Split the message into words
		let index = 0;
		const typingSpeed = 300; // Speed in milliseconds (per word)

		const typeMessage = () => {
			if (index < words.length) {
				setDisplayedMessage((prev) => (prev ? prev + ' ' + words[index] : words[index]));
				index++;
				setTimeout(typeMessage, typingSpeed);
			}
		};

		setDisplayedMessage(''); // Reset message on new input
		typeMessage();

		return () => {
			// Cleanup timeout if the component unmounts
			index = words.length;
		};
	}, [message]); // Rerun effect when message changes

	return (
		<div
			className={`flex flex-col justify-center items-${isUser ? 'end' : 'start'} w-full max-md:max-w-full ${className}`}
		>
			<div className="flex gap-2.5 items-start">
				{!isUser && <ChatBotIcon />}
				<div
					onClick={onClick}
					className={` flex-1 shrink overflow-hidden gap-2.5 self-stretch text-sm font-medium tracking-tight leading-5 ${isUser ? 'bg-[#D9F9DA]' : 'bg-[#F5FFF5] '} ${isBorder ? 'chat-bot-message cursor-pointer shadow-md' : ''} rounded-lg w-full ${authToken ? 'max-w-[240px]' : 'max-w-[450px]'} text-zinc-900 `}
				>
					<div
						className={` chat-message px-3 py-2 ${isUser ? 'bg-[#D9F9DA]' : 'bg-[#F5FFF5] '}`}
						dangerouslySetInnerHTML={{
							__html: isUser
								? message
								: isTyping
									? marked(displayedMessage)
									: marked(message),
						}}
					/>
				</div>
			</div>

			{!isUser && preferences.length > 0 && (
				<div className="flex flex-wrap gap-2.5 items-start lg:pl-12 mt-3">
					<div className="flex flex-wrap flex-1 shrink gap-2.5 items-start w-full basis-0 min-w-[240px]">
						{preferences?.map((pref, index) => (
							<PreferenceButton
								key={index}
								text={pref?.title}
								onClick={() => {
									if (sortBy?.length) {
										dispatch(addState({ name: 'jobFilter', value: sortBy }));
									}
									if (filterPrefrence && authToken) {
										const clonedData = JSON.parse(
											JSON.stringify(filterPrefrence)
										);

										const removePremiumFilter = removeFalseValues(clonedData);
										// const removePremiumFilter = removeFalseValues({...filterPrefrence});
										const cleanedData = cleanObject(removePremiumFilter);
										mutate(cleanedData);
									} else onPreferenceButtonClick(pref);
								}}
							/>
						))}
					</div>
				</div>
			)}
			{!isUser &&
				[
					'/jobs',
					'/resume',
					'/resume/analyzer',
					'/pricing',
					'/sign-in',
					'/sign-up',
				].includes(redirect?.path) && (
					<div className="flex flex-wrap gap-2.5 items-start lg:pl-12 mt-3">
						<div className="flex flex-wrap flex-1 shrink gap-2.5 items-start w-full basis-0 min-w-[240px]">
							<PreferenceButton
								text={redirect?.message}
								onClick={() => {
									navigate(redirect?.path);
									dispatch(addState({ name: 'showFullBot', value: false }));
								}}
							/>
						</div>
					</div>
				)}
		</div>
	);
};

export default ChatMessage;
