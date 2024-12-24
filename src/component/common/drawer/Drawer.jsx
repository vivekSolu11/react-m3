import React from 'react';
import { Drawer } from '@mui/material';

import CloseIcon from 'assets/SVGs/CloseIcon';
import ChatBotIcon from 'component/chatbot/bot/BotIcon';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';

import './drawer.css';

const SideDrawer = ({
	openFrom = 'right',
	HeaderCss,
	drawerHeight,
	drawerRadius,
	bodyClass,
	drawerClass,
	open,
	children,
	onClose,
	title,
	desc,
	width,
	withBtnHeader,
	onSave,
	closebtnLable,
	savebtnLable,
	boarder = true,
	chatIcon,
	Svgclass,
	iconCss,
	className,
	mobileCss,
	noHeader,
}) => {
	return (
		<Drawer
			sx={{
				'& .MuiDrawer-paper': {
					borderRadius: drawerRadius,
					height: drawerHeight,
				},
			}}
			anchor={openFrom}
			open={open}
			onClose={onClose}
		>
			<div style={{ maxWidth: width || 800 }} className={`flex flex-col ${drawerClass}`}>
				{noHeader ? null : withBtnHeader ? (
					<>
						<div
							className={`flex px-8 py-5 ${boarder && 'drawerBox'} w-full justify-between ${className} `}
						>
							<div className={`flex flex-col gap-2 `}>
								<div className="text-xl font-semibold">{title}</div>
								<div className="flex flex-col gap-2">{desc}</div>
							</div>
							<div className=" flex gap-2" onClick={onClose}>
								<PrimaryButton
									size="small"
									buttonText={closebtnLable}
									varient="primaryOutline"
									onClick={onClose}
								/>
								<PrimaryButton
									size="small"
									buttonText={savebtnLable}
									varient="primary"
									onClick={onSave}
								/>
							</div>
						</div>
					</>
				) : (
					<div
						className={`flex px-4 lg:px-8 py-4 ${boarder && 'drawerBox'}  w-full justify-between ${HeaderCss} `}
					>
						<div className={`flex flex-col gap-1 lg:gap-2 justify-center ${mobileCss}`}>
							<div className="flex gap-1 lg:gap-2 items-center">
								{chatIcon && <ChatBotIcon />}
								{title && (
									<div className="text-xl lg:text-xl font-medium tracking-tight text-[#000000]">
										{title}
									</div>
								)}
							</div>
							{desc && <div className="text-sm w-full truncate">{desc}</div>}
						</div>
						<div className={`cursor-pointer ${iconCss}`} onClick={onClose}>
							<CloseIcon Svgclass={Svgclass} />
						</div>
					</div>
				)}
				<div
					className={`w-full ${withBtnHeader ? 'h-[calc(100vh-77px)]' : ' h-[calc(100vh-101px)]'} overflow-hide overflow-y-auto ${bodyClass} `}
				>
					{children}
				</div>
			</div>
		</Drawer>
	);
};

export default SideDrawer;
