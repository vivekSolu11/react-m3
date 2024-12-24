import React from 'react';

import ChatBotIcon from './BotIcon';

import './bot.css';

const ChatLoader = () => {
	return (
		<div className={`flex flex-col justify-center items-start mt-4 w-full `}>
			<div className="flex gap-2.5 items-start">
				<ChatBotIcon />
				<div
					className={` flex-1 shrink overflow-hidden gap-2.5 self-stretch text-sm font-medium tracking-tight leading-5bg-[#F5FFF5] chat-bot-message rounded-lg  text-zinc-900 `}
				>
					<div className={` p-3 bg-[#F5FFF5] `}>
						<div className="chat-loader"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatLoader;
