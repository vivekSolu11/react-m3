import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LEFT_ARROW, REANALYZE } from 'assets/images';
import CustomMenu from 'component/customComponents/menu/CustomMenu';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CryptoJS from 'crypto-js';

import { addState, hideCustomModal, showAlert, showCustomModal } from 'store/sagaActions';
import { useMutationAPI } from 'apis/mutation';
import { PREFERENCE_MODAL, SCORE_MODAL } from 'constants/modalTypeConstant';
import { handleAlert } from 'utils/helperFunctions/helperFunction';

import './index.css';

const key = import.meta.env.VITE_CRYPTO_KEY;
const keyutf = CryptoJS.enc.Utf8.parse(key);
const iv = CryptoJS.enc.Base64.parse(key);

const ReportHeader = ({ onHandleButtons }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const queryClient = useQueryClient();
	const { resumeAnalysis, jsonTopdf } = useMutationAPI();

	const { analysisData, userDetails } = useSelector((state) => state.common);

	const { mutate: resumeAnalysisMutation } = useMutation({
		mutationFn: (val) => resumeAnalysis(val),
		onSuccess: (data) => {
			if (data) {
				dispatch(
					addState({
						name: 'previousScore',
						value: analysisData.generalAnalysis.resumeScore,
					})
				);
				dispatch(addState({ name: 'analysisData', value: data?.data?.Analysis }));
				dispatch(
					addState({
						name: 'reportData',
						value: data?.data?.Analysis?.fullReport,
					})
				);
				dispatch(
					addState({
						name: 'issueCount',
						value: {
							urgent:
								data?.data?.Analysis?.grandTotalIssues?.urgentIssuesCount -
								data?.data?.Analysis?.sections?.personalInfo?.issuesCount
									?.urgentIssuesCount,
							optional:
								data?.data?.Analysis?.grandTotalIssues?.optionalIssuesCount -
								data?.data?.Analysis?.sections?.personalInfo?.issuesCount
									?.optionalIssuesCount,
							critical:
								data?.data?.Analysis?.grandTotalIssues?.criticalIssuesCount -
								data?.data?.Analysis?.sections?.personalInfo?.issuesCount
									?.criticalIssuesCount,
						},
					})
				);
				dispatch(
					showCustomModal({
						customModalType: SCORE_MODAL,
					})
				);
				queryClient.invalidateQueries(['userDetails']);
			}
		},
		onError: () => {
			handleAlert(dispatch, 'Failed to analyse resume', 'error');
			dispatch(hideCustomModal());
		},
	});

	const handleNavigate = () => {
		navigate('/resume/analyzer');
	};

	const handleReAnalyze = (data) => {
		const payload = {
			resume_uri: data,
			userId: userDetails?._user,
		};
		resumeAnalysisMutation(payload);
	};

	const { mutate: jsonTopMutation, isPending } = useMutation({
		mutationFn: (val) => jsonTopdf(val),
		onSuccess: (data) => {
			if (data) {
				handleReAnalyze(data?.data?.data?.items?.fileUrl);
			}
		},
		onError: () => {
			handleAlert(dispatch, 'Failed to analyse resume', 'error');
			dispatch(hideCustomModal());
		},
	});

	const fetchJSONpdf = () => {
		const resumeAnalyzerAndCustomizer =
			userDetails?.topups?.find(
				(entry) => entry.topup?.name === 'resumeAnalyzerAndCustomizer'
			)?.usage || null;
		if (
			userDetails?.subscription?.usage?.resumeAnalyzes === 0 &&
			!resumeAnalyzerAndCustomizer
		) {
			dispatch(
				showAlert({
					message:
						'Your resume analysis limit has been reached. Please upgrade your plan.',
					status: 'error',
				})
			);

			return;
		}

		const plainText = document.getElementById('jsxContent');
		const stringContent = plainText.innerHTML;
		const cyperText = CryptoJS.AES.encrypt(stringContent, keyutf, {
			iv: iv,
		}).toString();

		const payload = {
			encryptedHtmlData: cyperText,
			fileName: `Resume_${userDetails?.profile?.name?.firstName}_Joblo.pdf`,
			isAnalyze: true,
		};

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

		jsonTopMutation(payload);
	};

	return (
		<div className="w-full flex justify-between ">
			<div className="flex items-center gap-2">
				<img
					height={20}
					width={20}
					alt="arrow icon"
					src={LEFT_ARROW}
					onClick={handleNavigate}
					className="cursor-pointer"
				/>
				<div className="flex text-[16px] font-[500] text-[#1A1A1A]">
					Resume Analysis Report
				</div>
			</div>
			<div
				onClick={onHandleButtons}
				className="flex bg-[#FFFFFF] items-center dot_btn_border py-[7px] px-3 rounded-[8px] h-[30px] md:hidden"
			>
				&middot;&middot;&middot;
			</div>
			<div className=" hidden md:flex gap-2 normal-case">
				<CustomMenu
					MenuButtonComponent={
						<PrimaryButton
							buttonText="Download Resume"
							varient="primaryOutline"
							btnClassName="normal-case !font-[500] flex justify-center items-center !text-[14px] !px-[20px] !py-[10px] h-[40px] !border-[#666666] !text-[#1A1A1A] !rounded-[4px]"
							as="div"
						/>
					}
				/>

				<Button
					onClick={fetchJSONpdf}
					variant="contained"
					className="flex gap-2 font-[500] normal-case text-[#1A1A1A] bg-prim-sol shadow-none rounded-[4px]"
					disabled={isPending}
				>
					<span>Re-Analyze</span>
					<img height={20} width={20} src={REANALYZE} />
				</Button>
			</div>
		</div>
	);
};

export default ReportHeader;
