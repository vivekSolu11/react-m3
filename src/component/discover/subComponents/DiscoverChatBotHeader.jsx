import React, { useState } from 'react';
import QuickGuideModal from 'component/chatbot/QuickGuide';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import { CLOSE_ICON, DISCOVER_CHATBOT_ICON } from 'assets/images';
import './index.css';

const DiscoverChatBotHeader = ({ handleCloseBuddyBot }) => {
	const [open, setOpen] = useState(false);
	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};
	return (
		<div className="flex justify-between Opening-border items-center  p-4 ">
			<div className="flex items-center gap-3 ">
				<div className="flex cursor-pointer items-center gap-2">
					<img
						className=""
						height={32}
						width={32}
						src={DISCOVER_CHATBOT_ICON}
						alt="Chatbot Icon"
					/>
					<div className="flex flex-col justify-center self-stretch my-auto">
						<div className="text-base lg:text-xl  text-[#008539] font-semibold tracking-tight leading-snug text-green-700">
							Buddy
						</div>
						<div className="text-[10px] text-[#12121299]">Your AI Co-Pilot</div>
					</div>
				</div>
				<PrimaryButton
					size="small"
					buttonText="Quick Guide"
					btnClassName="!text-[12px] h-6"
					varient="primaryOutline"
					onClick={() => setOpen(true)}
				/>
			</div>
			<div className="cursor-pointer">
				<img
					alt="close icon"
					width={18}
					height={18}
					src={CLOSE_ICON}
					onClick={handleCloseBuddyBot}
				/>
			</div>
			<QuickGuideModal open={open} onClose={toggleDrawer(false)} />
		</div>
	);
};

export default DiscoverChatBotHeader;
