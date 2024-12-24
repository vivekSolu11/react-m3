import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SideDrawer from 'component/common/drawer/Drawer';
import { hideCustomModal, showAlert, showCustomModal } from 'store/sagaActions';
import { JOB_CARD_MORE_OPTION, REPORT_MOBILE_MODAL } from 'constants/modalTypeConstant';
import { AlertCircle, NotIntrestedIcon, SaveIcon, ShareIcon } from 'assets/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMutationAPI } from 'apis/mutation';
import { Spinner } from 'component/index';

const JobCardMoreOptionMobile = ({ jobId, isSaved }) => {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const { jobListType } = useSelector((state) => state.common);
	const { customModalType } = useSelector((state) => state.modal);

	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	const { saveJob, notInterestedJob, unSaveJob } = useMutationAPI();

	const handleShareClick = (e) => {
		e.stopPropagation();
		const linkToCopy = `${window.location.origin}/jobs/${jobId}`;

		navigator.clipboard
			.writeText(linkToCopy)
			.then(() => {
				dispatch(
					showAlert({
						message: 'Link copied to clipboard!',
						status: 'success',
					})
				);
				hideModal();
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
				queryClient.invalidateQueries({
					queryKey: [
						`fetch${jobListType?.charAt(0)?.toUpperCase() + jobListType.slice(1)}Jobs`,
						'jobCounts',
					],
				});
				hideModal();
			}
		},
	});

	const { mutate: notInterested, isPending: notInterestedPending } = useMutation({
		mutationFn: (val) => notInterestedJob(val),
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
				]);
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
				hideModal();
			}
		},
	});

	const payload = {
		_job: jobId,
	};

	const handleSaveJob = (e) => {
		e.stopPropagation();
		if (isSaved) {
			unSaveMutation(payload);
		} else mutate(payload);
	};

	const handleNotInterested = (e) => {
		e.stopPropagation();
		notInterested(payload);
	};

	return (
		<SideDrawer
			open={customModalType === JOB_CARD_MORE_OPTION}
			onClose={(e) => {
				e.stopPropagation();
				hideModal();
			}}
			openFrom="bottom"
			width={'auto'}
			noHeader
			bodyClass={'h-auto  px-2'}
		>
			{(isPending || notInterestedPending || unSavePending) && <Spinner />}
			<div className="flex flex-col my-2 text-sm">
				<div
					className="p-4 cursor-pointer flex items-center gap-2"
					onClick={(e) => handleSaveJob(e)}
				>
					<SaveIcon /> {isSaved ? 'Remove' : 'Save'}
				</div>
				<div
					className="p-4 cursor-pointer flex items-center gap-2 "
					onClick={(e) => handleShareClick(e)}
				>
					<ShareIcon />
					Share
				</div>
				<div
					className="p-4 cursor-pointer flex items-center gap-2  "
					onClick={(e) => handleNotInterested(e)}
				>
					<NotIntrestedIcon /> Not interested
				</div>
				<div
					className="p-4 cursor-pointer flex items-center gap-2  "
					onClick={(e) => {
						e.stopPropagation();
						dispatch(
							showCustomModal({
								customModalType: REPORT_MOBILE_MODAL,
							})
						);
					}}
				>
					<AlertCircle /> Report job
				</div>
			</div>
		</SideDrawer>
	);
};

export default JobCardMoreOptionMobile;
