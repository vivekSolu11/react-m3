import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
	AiDriven,
	Discover,
	Premium,
	Banner,
	JobListings,
	ResumeAnalysis,
	CarrerAdvisor,
	Connections,
	BuddyBot,
	HomeHeroSection,
	YoutubeEmbed,
} from 'component';
import { LandingPageFAQ } from 'component/index';
import UnauthLayout from 'component/layout/UnauthLayout';
import { addState } from 'store/sagaActions';

import './home.css';

const LandingPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(addState({ name: 'codeId', value: null }));
		dispatch(addState({ name: 'signUpData', value: null }));
	}, [dispatch]);

	return (
		<>
			<Box className={` hero-gradient bg-no-repeat backg lg:mt-20 mt-14 pb-10 md:pb-20`}>
				<UnauthLayout className={'flex flex-col gap-10 md:gap-20'}>
					<HomeHeroSection />
					<YoutubeEmbed ytLink={'https://youtu.be/aA9dqVP_mX8'} height={'515'} />
				</UnauthLayout>
			</Box>
			<UnauthLayout className={'bg-white flex flex-col '}>
				<Discover />
				<AiDriven isHome />
				<Premium />
				<ResumeAnalysis isHome />
				<CarrerAdvisor isHome />
				<Connections isHome />
				<BuddyBot isHome />
				<LandingPageFAQ />
				<Banner isHome />
			</UnauthLayout>

			<JobListings />
		</>
	);
};

export default LandingPage;
