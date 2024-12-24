import React, { useState } from 'react';
import { Popover } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMutationAPI } from 'apis/mutation';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { PDF, PROFILE_OPTIONS } from 'assets/images';
import { handleAlert, handleDownload } from 'utils/helperFunctions/helperFunction';
import { showCustomModal } from 'store/sagaActions';
import { UPLOAD_RESUME_MODAL } from 'constants/modalTypeConstant';
import UploadResumeModal from 'component/jobs/modal/UploadResumeModal';

const ResumeDetail = () => {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const { updateProfile } = useMutationAPI();

	const { userDetails } = useSelector((state) => state?.common);
	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);
	const id = open ? 'resume-Popover' : undefined;

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const { mutate: updateProfileDetails } = useMutation({
		mutationFn: (val) => updateProfile(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries(['userDetails', 'fetchRecommendedJobs']);
				handleAlert(
					dispatch,
					'Your resume has been deleted',
					'',
					'bg-[#1A1A1AE5]  rounded-lg ',
					'white',
					'16px',
					false
				);
			}
		},
	});

	const handleDeleteResume = () => {
		const payload = {
			resume: {},
		};
		// call api update profile
		updateProfileDetails(payload);
	};

	const handleDownloadResume = (e) => {
		e.preventDefault();
		const file = {
			url: userDetails?.profile?.resume?.file?.url,
			name: `Resume_${userDetails?.profile?.name?.firstName}_Joblo.pdf`,
		};
		handleDownload(file, dispatch, 'Your resume has been downloaded');
	};

	const handleUpdateResume = () => {
		dispatch(
			showCustomModal({
				customModalType: UPLOAD_RESUME_MODAL,
				tempCustomModalData: {
					hideCustomizeModal: true,
				},
			})
		);
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="flex tracking-tight flex-col gap-1 ">
				<div className="text-[20px] font-[500]">Resume Detail</div>
				<div className="text-xs font-normal text-[#666666]">
					You have a 70% greater chance of being discovered by recruiters if you upload an
					updated resume.
				</div>
			</div>
			{userDetails?.profile?.resume?.file ? (
				<div className="bg-[#ABF0A11A] w-full flex justify-between p-3">
					<div className="flex gap-3">
						<span className=" flex items-center justify-center w-[48px] h-[48px] p-2 rounded-[12px] bg-[#F4F4F4]">
							<img height={32} width={32} src={PDF} />
						</span>
						<div className="flex flex-col gap-1">
							<div className="text-[#1A1A1A] font-[500] text-[14px]">
								{userDetails?.profile?.resume?.file?.name}
							</div>
							<div className="text-[#666666] text-[12px]">
								{userDetails?.profile?.resume?.updatedAt
									? `Last Updated : ${moment(userDetails?.profile?.resume?.updatedAt).format('DD MMM YYYY').toUpperCase()}`
									: ''}
							</div>
						</div>
					</div>
					<div className="cursor-pointer">
						<img src={PROFILE_OPTIONS} alt="Options icon" onClick={handleClick} />
					</div>
				</div>
			) : (
				<div className="text-[14px]"> No Resume Uploaded</div>
			)}
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				sx={{ ml: 1 }}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<div className="py-2 px-2 flex flex-col ">
					<div
						className="py-3 px-4 text-sm flex items-center gap-3 cursor-pointer"
						onClick={() => {
							handleUpdateResume();
							handleClose();
						}}
					>
						Update
					</div>

					<div
						className="py-3 px-4 text-sm flex items-center gap-3 cursor-pointer"
						onClick={(e) => {
							handleDownloadResume(e);
							handleClose();
						}}
					>
						Download
					</div>
					<div
						className="py-3 px-4 text-sm flex items-center gap-3 cursor-pointer"
						onClick={() => {
							handleDeleteResume();
							handleClose();
						}}
					>
						Delete
					</div>
				</div>
			</Popover>
			<UploadResumeModal />
		</div>
	);
};

export default ResumeDetail;
