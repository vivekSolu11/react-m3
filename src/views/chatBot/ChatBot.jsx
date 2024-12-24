import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import UnauthLayout from 'component/layout/UnauthLayout';
import Layout from 'component/chatbot/Layout';
import ChatbotSide from 'component/chatbot/ChatBot';
import LoginForm from 'views/login/LoginForm';
import SignUp from 'views/signup/Signup';

const ChatBot = () => {
	const location = useLocation();
	const navigate = useNavigate();
	return (
		<UnauthLayout className="h-screen flex gap-6 flex-col !px-0 lg:!px-6 ">
			<Layout>
				{location.search.includes('login') ? (
					<div className="w-full flex items-center justify-center">
						<LoginForm />
					</div>
				) : location.search.includes('sign-up') ? (
					<div className="w-full flex items-center justify-center">
						<SignUp />
					</div>
				) : (
					<ChatbotSide onBackClick={() => navigate('/')} />
				)}
			</Layout>
		</UnauthLayout>
	);
};

export default ChatBot;
