import { useDispatch, useSelector } from 'react-redux';
import { DialogActions, DialogContent } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

import { useMutationAPI } from 'apis/mutation';
import { useQueryAPI } from 'apis/query';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import RadioButton from 'component/customComponents/RadioButton';
import { hideCustomModal, showAlert } from 'store/sagaActions';

const ReportBox = ({ withCancel }) => {
	const dispatch = useDispatch();
	const [value, setValue] = useState();
	const [msg, setMsg] = useState('');
	const [isButtonClicked, setIsButtonClicked] = useState(false);
	const { fetchReportTypeList } = useQueryAPI();
	const { tempCustomModalData } = useSelector((state) => state.modal);

	const { reportJob } = useMutationAPI();
	const queryClient = useQueryClient();
	const { jobListType } = useSelector((state) => state.common);

	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	const { data: reportTypeList } = useQuery({
		queryKey: ['reportType'],
		queryFn: () => fetchReportTypeList(),
		staleTime: 300000,
	});

	const handleChange = (e) => {
		setValue(e.target.value);
		setIsButtonClicked(false);
	};

	const { mutate: reportjobMutate, isPending: reportJobPending } = useMutation({
		mutationFn: (val) => reportJob(val),
		onSuccess: (data) => {
			if (data) {
				hideModal();
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

	const handleReportJob = () => {
		setIsButtonClicked(true);
		//If the value matches the provided jobId and the message is not empty, call the API
		if (value === '67051be30632ec1477295101' && msg.length !== 0) {
			const data = {
				_job: tempCustomModalData?.jobId,
				_reportType: value,
				message: msg,
			};
			reportjobMutate(data);
		} else if (value !== '67051be30632ec1477295101') {
			//For other cases (when jobId is different), still report with a message
			const data = {
				_job: tempCustomModalData?.jobId,
				_reportType: value,
				message: msg,
			};
			reportjobMutate(data);
		}
	};

	return (
		<>
			<DialogContent className="flex flex-col p-0 pt-3 gap-1">
				{reportTypeList?.items.map((item) => (
					<RadioButton
						inputProps={{ 'aria-label': item._id }}
						onChange={handleChange}
						name="radio-buttons"
						checked={value === item._id}
						value={item._id}
						key={item._id}
						label={item.name}
					/>
				))}
				<textarea
					rows={5}
					value={msg}
					placeholder="Enter details here......"
					onChange={(e) => setMsg(e.target.value)}
					className={`w-full text-sm py-1 px-2 focus:outline-none rounded border-[#cccccc] bg-[#ffffff00] `}
				/>
				{value === '67051be30632ec1477295101' &&
					isButtonClicked === true &&
					msg.length === 0 && (
						<p className="text-[#FF0000] text-sm font-normal my-1">
							Please provide details for this report type.
						</p>
					)}
			</DialogContent>
			<DialogActions className={` ${withCancel ? 'items-end' : '[&>button]:w-full'} `}>
				{withCancel && (
					<PrimaryButton
						handleClick={hideModal}
						buttonText="Cancel"
						varient="primaryOutline"
					/>
				)}
				<PrimaryButton
					handleClick={handleReportJob}
					disabled={reportJobPending}
					buttonText="Report"
					varient="primary"
				/>
			</DialogActions>
		</>
	);
};

export default ReportBox;
