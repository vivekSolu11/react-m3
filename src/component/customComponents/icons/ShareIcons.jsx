import React from 'react';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useDispatch } from 'react-redux';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Popover } from '@mui/material';

import Jobsaveicon from 'assets/SVGs/Jobsaveicon';
import { AlertCircle, NotIntrestedIcon, RefreshIcon } from 'assets/index';
import { addState, showAlert, showCustomModal } from 'store/sagaActions';
import { CUSTOMIZE_RESUME_MODAL, REPORT_MODAL } from 'constants/modalTypeConstant';
import { Spinner } from 'component/index';
import { useMutationAPI } from 'apis/mutation';

import './icons.css';

const ShareIcons = ({ jobId, isSaved, jobNumber, applyUrl }) => {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	const { jobListType } = useSelector((state) => state.common);

	const { saveJob, notInterestedJob, unSaveJob } = useMutationAPI();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const handleopenCustomizeModal = () => {
		handleClose();
		dispatch(addState({ name: 'jobId', value: jobId }));
		dispatch(
			showCustomModal({
				customModalType: CUSTOMIZE_RESUME_MODAL,
				tempCustomModalData: {
					url: applyUrl,
					jobId: jobId,
				},
			})
		);
	};

	const handleopenResumeUploadModal = () => {
		dispatch(
			showCustomModal({
				customModalType: REPORT_MODAL,
				tempCustomModalData: {
					jobId: jobId,
				},
			})
		);
		handleClose();
	};

	const handleShareClick = () => {
		const linkToCopy = `${window.location.origin}/jobs/${jobNumber}`;

		navigator.clipboard
			.writeText(linkToCopy)
			.then(() => {
				dispatch(
					showAlert({
						message: 'Link copied to clipboard!',
						status: 'success',
					})
				);
			})
			.catch((err) => {
				dispatch(
					showAlert({
						message: err,
						status: 'success',
					})
				);
			});
	};

	const { mutate, isPending } = useMutation({
		mutationFn: (val) => saveJob(val),
		onSuccess: (data) => {
			if (data) {
				dispatch(
					showAlert({
						message: data?.data?.data?.message,
						status: 'success',
					})
				);
				queryClient.invalidateQueries([
					`fetch${jobListType?.charAt(0)?.toUpperCase() + jobListType.slice(1)}Jobs`,
					'jobCounts',
					'fetchGetJobsDetails',
				]);
			}
		},
	});

	const { mutate: notInterested, isPending: notInterestedPending } = useMutation({
		mutationFn: (val) => notInterestedJob(val),
		onSuccess: (data) => {
			if (data) {
				handleClose();
				dispatch(
					showAlert({
						message: data?.data?.data?.message,
						status: 'success',
					})
				);
				queryClient.invalidateQueries({
					queryKey: [
						`fetch${jobListType?.charAt(0)?.toUpperCase() + jobListType.slice(1)}Jobs`,
					],
				});
			}
		},
	});

	const { mutate: unSaveMutation, isPending: unSavePending } = useMutation({
		mutationFn: (val) => unSaveJob(val),
		onSuccess: (data) => {
			if (data) {
				dispatch(
					showAlert({
						message: data?.data?.data?.message,
						status: 'success',
					})
				);
				queryClient.invalidateQueries([
					`fetch${jobListType?.charAt(0)?.toUpperCase() + jobListType.slice(1)}Jobs`,
					'jobCounts',
				]);
			}
		},
	});

	const payload = {
		_job: jobId,
	};

	const handleSaveJob = () => {
		if (isSaved) {
			unSaveMutation(payload);
		} else mutate(payload);
	};

	const handleNotInterested = () => {
		notInterested(payload);
		handleClose();
	};

	return (
		<>
			{(isPending || notInterestedPending || unSavePending) && <Spinner />}
			<div className="flex flex-wrap gap-4 items-center">
				<div className="w-4 h-4 flex justify-center items-center cursor-pointer">
					<Jobsaveicon onClick={handleSaveJob} fill={isSaved ? 'black' : 'none'} />
				</div>
				<div onClick={handleShareClick} className="w-4 h-4 cursor-pointer">
					<ShareOutlinedIcon className="w-4 h-4 text-card-icon-outl" />
				</div>
				<div className="w-4 h-4 cursor-pointer" onClick={handleClick}>
					<MoreVertOutlinedIcon className="w-4 h-4 text-card-icon-outl" />
				</div>
			</div>
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
					horizontal: 'left',
				}}
			>
				<div className="py-4 px-2 flex flex-col">
					{jobListType === 'applied' ? (
						<div
							onClick={handleopenCustomizeModal}
							className="py-3 px-4 text-sm flex items-center gap-3 cursor-pointer"
						>
							<RefreshIcon /> Didn’t apply? Apply again
						</div>
					) : (
						<div
							onClick={handleNotInterested}
							className="py-3 px-4 text-sm flex items-center gap-3 cursor-pointer"
						>
							<NotIntrestedIcon /> Not Interested
						</div>
					)}
					<div
						onClick={handleopenResumeUploadModal}
						className="py-3 px-4 text-sm flex items-center gap-3 cursor-pointer"
					>
						<AlertCircle /> Report job
					</div>
				</div>
			</Popover>
		</>
	);
};

export default ShareIcons;
