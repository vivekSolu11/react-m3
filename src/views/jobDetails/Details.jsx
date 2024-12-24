import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useQueryAPI } from 'apis/query';
import { useDispatch } from 'react-redux';

import { CompanyDetail, CompanyInsights, JobDetails, JobFAQ, PrimaryButton } from 'component/index';
import Navbar from 'component/jobs/jobDetails/subcomponents/Navbar';
import { addState, hideCustomModal, showCustomModal } from 'store/sagaActions';
import { BACK_ARROW } from 'assets/images';
import LoaderModal from 'component/chatbot/LoaderModal';
import ScoreModal from 'component/modal/resumeAnalyzer/ScoreModal';
import { CUSTOMIZE_RESUME_MODAL } from 'constants/modalTypeConstant';
import CustomizeResumeModal from 'component/jobs/modal/customizeResumeModal';
import AlreadyApplyModal from 'component/jobs/modal/AlreadyApplyModal';
import UploadResumeModal from 'component/jobs/modal/UploadResumeModal';
import CustomizeResumeSidebar from 'component/jobs/modal/CustomizeResumeSidebar';

import './Details.css';
import { checkAnyDataPresentInSideData } from 'utils/common';

const Details = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { fetchGetJobsDetailsById } = useQueryAPI();

	const { jobId } = useParams();
	const { data: JobDetailsData, isPending } = useQuery({
		queryKey: ['fetchGetJobsDetails', jobId],
		queryFn: () => fetchGetJobsDetailsById(Number(jobId)),
		enabled: !!jobId,
	});

	useEffect(() => {
		dispatch(addState({ name: 'JobDetails', value: JobDetailsData?.items }));
	}, [JobDetailsData]);

	const handleNavigate = () => {
		navigate('/jobs');
	};
	const handleModal = () => {
		navigate('/resume/analyzer');
	};

	const handleopenCustomizeModal = (jobUrl) => {
		dispatch(addState({ name: 'jobId', value: JobDetailsData?.items?._id }));
		dispatch(
			addState({
				name: 'jobDetail',
				value: {
					companyName: JobDetailsData?.items?.company?.name,
					positionName: JobDetailsData?.items?.designation?.name,
					companyLogo: JobDetailsData?.companyInfo?.logo,
					jobId: JobDetailsData?.items?._id,
				},
			})
		);
		dispatch(
			showCustomModal({
				customModalType: CUSTOMIZE_RESUME_MODAL,
				tempCustomModalData: {
					url: jobUrl,
				},
			})
		);
	};
	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	return (
		<div className="max-w-[773px]  w-full mx-auto">
			{isPending ? (
				<div className="flex items-center justify-center h-[calc(100vh-175px)] w-full">
					<div className={`btn-loader border-4 border-[#14A019]`} />
				</div>
			) : (
				<div className="pb-8 relative  items-center flex flex-col">
					<div className="flex w-full justify-between mb-4 ">
						<div className="flex items-center gap-2">
							<img
								alt="back icon"
								height={20}
								width={20}
								src={BACK_ARROW}
								className="cursor-pointer"
								onClick={handleNavigate}
							/>{' '}
							<div className="text-[16px] font-[500] flex flex-wrap text-ellipsis">
								{JobDetailsData?.items?.designation?.name}
							</div>
						</div>
						<div className="md:flex hidden flex-shrink-0 gap-2 ">
							<PrimaryButton
								handleClick={handleModal}
								buttonText="Analyze Resume"
								varient="primaryOutline"
								size="small"
								btnClassName=" !py-[10px] !px-[20px] !text-[14px] !h-[40px]   "
							/>
							<PrimaryButton
								handleClick={() =>
									handleopenCustomizeModal(JobDetailsData?.items.applyUrls.jobUrl)
								}
								buttonText="Apply Now"
								varient="primary"
								size="small"
								btnClassName=" !py-[10px] !px-[20px] !text-[14px] !font-[500] !h-[40px]"
							/>
						</div>

						<div
							// onClick={onHandleButtons}
							className="flex bg-[#FFFFFF] items-center dot_btn_border py-[7px] px-3 rounded-[8px] h-[30px] md:hidden"
						>
							&middot;&middot;&middot;
						</div>
					</div>
					<div className="max-w-[763px] w-full">
						<div id="header" className="flex     w-full">
							<Navbar />
						</div>
						<Box
							id="scrollContainer"
							className="h-[calc(100vh-162px)] rounded-b-lg Job-scrollBar overflow-y-scroll"
						>
							<div className="gap-4 flex flex-col">
								<JobDetails job={JobDetailsData?.items} />
								<CompanyDetail />
								{checkAnyDataPresentInSideData(
									JobDetailsData?.items?.companyInfo?.companyInsight
								) && <CompanyInsights />}
								<JobFAQ />
							</div>
						</Box>
					</div>
				</div>
			)}
			<CustomizeResumeModal JobDetailsData={JobDetailsData} />
			<AlreadyApplyModal />
			<UploadResumeModal />
			<CustomizeResumeSidebar />
			<LoaderModal
				className={'pt-6 pb-8 px-6 flex rounded-[24px]  '}
				borderRadius="24px"
				widthMax="784px"
			/>
			<ScoreModal hideModal={hideModal} />
			<div className=" md:hidden z-50 absolute grid w-full grid-cols-2 bottom-20 place-items-center  pr-8 gap-2 ">
				<PrimaryButton
					handleClick={handleModal}
					buttonText="Analyze Resume"
					varient="primaryOutline"
					size="small"
					btnClassName=" !w-full !py-[10px] !px-[20px] !text-[14px] !h-[40px] "
				/>
				<PrimaryButton
					handleClick={() =>
						handleopenCustomizeModal(JobDetailsData?.items.applyUrls.jobUrl)
					}
					buttonText="Apply Now"
					varient="primary"
					size="small"
					btnClassName=" !py-[10px] !w-full !px-[20px] !text-[14px] !font-[500] !h-[40px]"
				/>
			</div>
		</div>
	);
};

export default Details;
