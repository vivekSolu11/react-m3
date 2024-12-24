import React from 'react';
import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';

import SidebarMenu from './sideBar/SidebarMenu';
import { AnalyzerSideBar, Hamburger } from 'component';
import ChatbotSide from 'component/chatbot/ChatBot';
import MobileChatbot from 'component/chatbot/MobileChatbot';
import ProfileSideBar from 'component/profile/sidebar/ProfileSideBar';

// import './UserLayout.css';

const UserLayout = ({ withchatbot = false, withanalyzer = false, withprofilesidebar = false }) => {
	const location = useLocation();

	// Helper function to determine background color
	const getBgColor = () => {
		if (location.pathname.includes('/careeradvisor/careerjourney')) {
			return 'bg-[#EDFDED]'; // Black background for this path
		}
		if (location.pathname.includes('/resume') || location.pathname.includes('/discover')) {
			return 'bg-white'; // White background for resume or discover
		}
		return 'bg-[#F5F5F5]'; // Default background color
	};

	return (
		<Box className="body-container fluid-container min-h-screen">
			<Box className="m-auto main_body flex">
				<Box className="hidden lg:flex">
					<SidebarMenu />
				</Box>
				<div className="w-full h-screen">
					<Hamburger />
					<div
						className={`relative flex   ${location.pathname.includes('/jobs') || location.pathname.includes('/resume') ? 'h-[calc(100vh-135px)]' : 'h-[calc(100vh-62px)]'} sm:h-[calc(100vh-62px)] md:h-[calc(100vh-82px)]  gap-4   ${location.pathname.includes('/discover') ? 'pr-0' : 'md:pr-4'} w-full lg:w-[calc(100vw-269px)]`}
					>
						{/* <div
              className={`w-full h-full overflow-hidden pt-6 px-4 rounded-s-xl rounded-e-xl bg-[#F5F5F5] ${location.pathname.includes('/resume') || location.pathname.includes('/discover') ? '!px-0 !py-0 !bg-white' : ''}`}
            > */}
						<div
							className={`w-full h-full overflow-hidden pt-6 px-4 rounded-s-xl rounded-e-xl ${getBgColor()} ${location.pathname.includes('/resume') || location.pathname.includes('/discover') ? '!px-0 !py-0' : ''}`}
						>
							<Outlet />
						</div>
						{withchatbot && (
							<div className=" hidden xl:flex [&>main]:h-full [&>main]:w-[328px] pb-6">
								<ChatbotSide withQuickGuide />
							</div>
						)}
						{withanalyzer && (
							<div className=" hidden lg:flex [&>main]:h-full [&>main]:w-[328px] pb-6">
								<AnalyzerSideBar className="overflow-y-auto  max-h-[calc(100vh-90px)]" />
							</div>
						)}
						{withprofilesidebar && <ProfileSideBar />}
						{withchatbot && <MobileChatbot />}
					</div>
				</div>
			</Box>
		</Box>
	);
};

export default UserLayout;
