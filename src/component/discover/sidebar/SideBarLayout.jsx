import React, { useState } from 'react';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import ChatbotSide from 'component/chatbot/ChatBot';
import { StarIcon } from 'assets/index';
import DiscoverChatBotHeader from '../subComponents/DiscoverChatBotHeader';

const SideBarLayout = ({ children }) => {
	const [isBuddyBot, setIsBuddyBot] = useState(false);
	const handleBuddyBot = () => {
		setIsBuddyBot(!isBuddyBot);
	};

	return (
		<div
			className="max-w-[360px] hidden lg:flex w-full   flex-col gap-[40px]  px-4 pb-6"
			style={{
				height: `calc(100vh - 81px)`,
			}}
		>
			{isBuddyBot ? (
				<div className=" flex h-full w-[328px] mx-auto  pb-6">
					<ChatbotSide
						withQuickGuide
						customHeader={
							<DiscoverChatBotHeader handleCloseBuddyBot={handleBuddyBot} />
						}
					/>
				</div>
			) : (
				<>
					<div className="flex w-full justify-end">
						<PrimaryButton
							btnClassName="!px-[20px] !py-[10px] h-[40px] !text-[14px]"
							startIcon={<StarIcon black />}
							buttonText="Ask Buddy"
							handleClick={handleBuddyBot}
							aria-label="Toggle Buddy Bot"
						/>
					</div>
					<div className="h-[calc(100vh-162px)] flex flex-col gap-[40px]  overflow-y-auto">
						{children}
					</div>
				</>
			)}
		</div>
	);
};

export default SideBarLayout;
