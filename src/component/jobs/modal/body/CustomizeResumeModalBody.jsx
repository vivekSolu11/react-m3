import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { addState, hideCustomModal, showCustomModal } from 'store/sagaActions';
import {
	ALREADY_APPLIED_MODAL,
	CUSTOMIZE_RESUME_SIDE_MODAL,
	PREFERENCE_MODAL,
	UPLOAD_RESUME_MODAL,
} from 'constants/modalTypeConstant';
import { CVIcon } from 'assets/index';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import CheckBox from 'component/customComponents/checkBox';
import { useMutationAPI } from 'apis/mutation';
import { handleAlert } from 'utils/helperFunctions/helperFunction';
const CustomizeResumeModalBody = () => {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	const { userDetails, jobId } = useSelector((state) => state.common);
	const { tempCustomModalData } = useSelector((state) => state.modal);

	const handleOpenAlreadyAppliedModal = () => {
		const intervalId = setInterval(() => {
			dispatch(hideCustomModal());
			dispatch(
				showCustomModal({
					customModalType: ALREADY_APPLIED_MODAL,
				})
			);
			clearInterval(intervalId); // Clear the interval after running it once
		}, 1000); // Delay of 1 second
	};
	const { customiseResume } = useMutationAPI();

	const { mutate } = useMutation({
		mutationFn: (val) => customiseResume(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries(['userDetails']);
				dispatch(
					showCustomModal({
						customModalType: CUSTOMIZE_RESUME_SIDE_MODAL,
						// tempCustomModalData: {
						//   analysisData: data?.data,
						// },
					})
				);
				dispatch(addState({ name: 'customizeResume', value: data?.data }));
			}
		},
		onError: () => {
			dispatch(hideCustomModal());
			handleAlert(dispatch, 'Failed to parse the document', 'error');
		},
	});

	const handleopenResumeUploadModal = () => {
		dispatch(hideCustomModal());

		dispatch(
			showCustomModal({
				customModalType: PREFERENCE_MODAL,
				tempCustomModalData: {
					modalType: 'ANALYZER',
					className: 'pt-6 pb-8  px-6 flex rounded-[24px]  ',
					borderRadius: '24px',
					widthMax: '784px',
					MUiMargin: '0px',
				},
			})
		);

		if (userDetails?.profile?.resume?.file) {
			const payload = {
				userId: userDetails?._user,
				jobId: tempCustomModalData?.jobId || jobId,
			};
			mutate(payload);
		} else {
			dispatch(
				showCustomModal({
					customModalType: UPLOAD_RESUME_MODAL,
				})
			);
		}
	};

	return (
		<div className="px-4  md:px-6 py-6 md:py-8">
			<DialogTitle id="success-modal-title" className="flex p-0  flex-col gap-2">
				<div className="font-[600] text-base md:text-lg">
					Craft your resume to fit this role.
				</div>
				<div className="text-sm md:text-base font-normal">
					Would you like to customise your Resume & increase shortlisting chances before
					applying to job?
				</div>
			</DialogTitle>
			<DialogContent className="flex items-center justify-center">
				<CVIcon />
			</DialogContent>
			<DialogActions
				sx={{
					padding: 0,
					'& .MuiDialogActions-root': {
						padding: 0,
						margin: 0,
						'& .MuiDialogActions-root:not(style)~:not(style)': {
							marginLeft: 0,
						},
					},
				}}
				className="flex flex-col-reverse  md:flex-row justify-center sm:justify-between "
			>
				<CheckBox ClassName="!w-fit self-start " label={'Don’t ask me again'} />
				<div className="flex  flex-row gap-3 w-full justify-between  ">
					<Link
						to={tempCustomModalData?.url}
						target="_blank"
						rel="noopener noreferrer"
						className="w-full"
					>
						<PrimaryButton
							handleClick={handleOpenAlreadyAppliedModal}
							buttonText="Apply anyway"
							varient="primaryOutline"
							fullWidth
							btnClassName="!px-[20px] !py-[10px]  !h-[40px] md:!h-[48px] !md:px-[28px] !md:py-[13px] !text-[14px] !md:text-[16px] !md:font-[500] "
						/>
					</Link>
					<PrimaryButton
						fullWidth
						handleClick={handleopenResumeUploadModal}
						buttonText="Customize resume"
						varient="primary"
						btnClassName=" !px-[20px] !py-[10px] !h-[40px] md:!h-[48px] !md:px-[28px] !md:py-[13px] !text-[13 px] !md:text-[16px] !md:font-[500] "
					/>
				</div>
				{/* Checkbox for mobile screens */}
			</DialogActions>
		</div>
	);
};

export default CustomizeResumeModalBody;
