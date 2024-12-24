import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideCustomModal, showAlert } from 'store/sagaActions';
import { ALREADY_APPLIED_MODAL } from 'constants/modalTypeConstant';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMutationAPI } from 'apis/mutation';
import { Spinner } from 'component/index';

const AlreadyApplyModal = () => {
	const dispatch = useDispatch();

	const queryClient = useQueryClient();
	const { applyJob, unApplyJob } = useMutationAPI();

	const { customModalType } = useSelector((state) => state.modal);
	const { jobId, jobListType } = useSelector((state) => state.common);
	const [appliedJobId, setAppliedJobId] = useState('');
	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	const payload = {
		_job: appliedJobId,
	};

	const { mutate, isPending } = useMutation({
		mutationFn: (val) => applyJob(val),
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
					`fetchAppliedJobs`,
					'jobCounts',
				]);
				hideModal();
			}
		},
	});

	const { mutate: removeAppliedJob, isPending: removeAppliedJobPending } = useMutation({
		mutationFn: (val) => unApplyJob(val),
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
					`fetchAppliedJobs`,
					'jobCounts',
				]);
				hideModal();
			}
		},
	});

	const handleApply = () => {
		if (jobListType !== 'applied') {
			mutate(payload);
		} else hideModal();
	};

	const handleUnApply = () => {
		if (jobListType === 'applied') {
			removeAppliedJob(payload);
		} else hideModal();
	};

	useEffect(() => {
		if (jobId) {
			setAppliedJobId(jobId);
		}
	}, [jobId]);

	return (
		<>
			{(isPending || removeAppliedJobPending) && <Spinner />}
			<Dialog
				open={customModalType === ALREADY_APPLIED_MODAL}
				onClose={hideModal}
				aria-labelledby="success-modal-title"
				aria-describedby="success-modal-description"
				fullWidth
				sx={{
					'& .MuiPaper-root': {
						maxWidth: '400px',
						width: '100%',
					},
				}}
			>
				<div className="p-4 pb-6">
					<DialogTitle
						id="success-modal-title"
						className="text-2xl font-medium leading-6 text-center text-[#121212]"
					>
						Did you apply?
					</DialogTitle>
					<DialogContent className="flex items-center justify-center text-center font-normal text-[14px]">
						Let us know so we can help you track your application and refine future
						recommendation for you!
					</DialogContent>
					<DialogActions className="justify-center gap-4">
						<PrimaryButton
							handleClick={handleUnApply}
							buttonText="Not Yet"
							varient="primaryOutline"
							sx={{
								fontSize: '14px',
							}}
						/>
						<PrimaryButton
							handleClick={handleApply}
							buttonText="Yes, Applied!"
							varient="primary"
							sx={{
								fontSize: '14px',
							}}
						/>
					</DialogActions>
				</div>
			</Dialog>
		</>
	);
};

export default AlreadyApplyModal;
