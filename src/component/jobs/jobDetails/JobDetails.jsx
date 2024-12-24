import React from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';

import BuddyCard from './subcomponents/BuddyCard';
import DetailLayout from './subcomponents/DetailLayout';
import DescriptionLayout from './subcomponents/DescriptionLayout';
import AboutDescription from './subcomponents/AboutDescription';
import { AboutIcon, JobDetailIcon, QualificationIcon } from 'assets/index';
import JobDetailDescription from './subcomponents/JobDetailDescription';
import QualificationDescription from './subcomponents/QualificationDescription';
import LinkedinUnlock from 'component/modal/jobsDetail/LinkedinUnlock';
import LinkedinSuccess from 'component/modal/jobsDetail/LinkedinSuccess';
import LinkedinMessage from 'component/modal/jobsDetail/LinkedinMessage';
import JobsDetails from '../JobsDetails';
import { hideCustomModal } from 'store/sagaActions';
import ReportModel from '../modal/ReportModel';
const JobDetails = ({ job }) => {
	const dispatch = useDispatch();
	const hideModal = () => {
		dispatch(hideCustomModal());
	};
	return (
		<Box className=" bg-white rounded-b-[12px] w-full mx-auto overflow-x-hidden ">
			<DetailLayout id="overview" className="">
				<JobsDetails
					job={job}
					showRatingReview={true}
					jobdetailview={true}
					showJobDetails={true}
				/>
				<BuddyCard jobId={job?._id} job={job} />
				<DescriptionLayout title="About" body={<AboutDescription />} icon={<AboutIcon />} />
				<DescriptionLayout
					title="Job Detail"
					body={<JobDetailDescription />}
					icon={<JobDetailIcon />}
				/>
				<DescriptionLayout
					title="Qualification"
					body={<QualificationDescription />}
					icon={<QualificationIcon />}
				/>
			</DetailLayout>
			<LinkedinUnlock hideModal={hideModal} />
			<LinkedinSuccess hideModal={hideModal} />
			<LinkedinMessage hideModal={hideModal} />
			<ReportModel />
		</Box>
	);
};

export default JobDetails;
