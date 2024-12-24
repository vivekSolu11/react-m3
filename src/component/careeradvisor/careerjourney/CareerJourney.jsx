import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import LinkedinModal from 'component/modal/connectModel/LinkedinModal';
import LinkedMessage from 'component/modal/jobsDetail/LinkedinMessage';

import Journey from './subcomponent/Header/Journey';
import CareerTrajectory from './subcomponent/careertrajectory/CareerTrajectory';
import Skill from './subcomponent/skill/Skill';
import CoursesCard from './subcomponent/courses/CoursesCard';
import ConnectSection from './subcomponent/connection/ConnectionSection';
import JobBanner from './subcomponent/banner/JobBanner';
import CareerFaq from '../careerFaq/CareerFaq';
import CareerHeader from '../header/CareerHeader';
import SideDrawer from 'component/common/drawer/Drawer';
import DetailsCareer from '../detailsCareer/DetailsCareer';
import { useMutationAPI } from 'apis/mutation';
import { setCareerAdvisorData } from 'store/reducer/CareerAdvisor/CareerAdvisor';
import { GreenLoader } from 'component/index';

const CareerJourney = () => {
	const [isFullReportOpen, setIsFullReportOpen] = useState();
	const dispatch = useDispatch();
	const { selectedRole, reportData, selectedCurrentPosition, selectedDesiredPosition } =
		useSelector((state) => state.careerAdvisor);
	const { userDetails } = useSelector((state) => state.common);

	// Function to handle toggling for each drawer
	const toggleFullReportDrawer = (newOpen) => () => {
		setIsFullReportOpen(newOpen);
	};
	const { careeradvisorData } = useMutationAPI();

	const { mutate, isPending } = useMutation({
		mutationFn: (val) => careeradvisorData(val),
		onSuccess: (data) => {
			if (data) {
				dispatch(setCareerAdvisorData(data?.data?.career_roadmap));
			}
		},
	});

	useEffect(() => {
		mutate({
			current_position: selectedCurrentPosition?.name,
			desired_position: selectedDesiredPosition?.name,
			user_id: userDetails?._id,
		});
	}, []);
	return (
		<main className="bg-[#EDFDED] h-[calc(100vh-200px)] ">
			<CareerHeader />
			{isPending ? (
				<GreenLoader className={'m-auto h-full'} />
			) : (
				<>
					<section className="bg-[#FFFFFF] rounded-lg overflow-hidden flex flex-col gap-6 md:flex-none md:gap-0">
						{/* JobJourney component being called here */}
						<Journey />
						<CareerTrajectory onHandleDrawer={() => setIsFullReportOpen(true)} />
						<ConnectSection />
						<Skill
							techSkill={reportData?.essentialTechnicalSkills}
							softSkill={reportData?.essentialSoftSkills}
						/>
						<CoursesCard Courses={reportData?.courseSuggestions} />
						<JobBanner />
					</section>
					<div className=" mt-4">
						<CareerFaq />
					</div>
					<SideDrawer
						width={756}
						openFrom={'right'}
						bodyClass="!h-[calc(100vh-72px)]"
						open={isFullReportOpen}
						onClose={toggleFullReportDrawer(false)}
						title={selectedRole?.jobRole?.title}
						HeaderCss="border-b-0"
					>
						<DetailsCareer />
					</SideDrawer>
					<LinkedinModal />
					<LinkedMessage />
				</>
			)}
		</main>
	);
};

export default CareerJourney;
