import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Drawer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

import { AnalyzerFaq, ButtonsDrawer, ReportHeader, AnalysisReport } from 'component/index';
import ExportModel from 'component/resumeBuilder/header/Model/ExportModel';
import LoaderModal from 'component/chatbot/LoaderModal';
import ScoreModal from 'component/modal/resumeAnalyzer/ScoreModal';
import { PREFERENCE_MODAL, SCORE_MODAL } from 'constants/modalTypeConstant';
import { addState, hideCustomModal, showCustomModal } from 'store/sagaActions';
import DownloadResume from 'component/resumeBuilder/resumePreview/DownloadResume';
import { useQueryAPI } from 'apis/query';
import { useMutationAPI } from 'apis/mutation';
import { handleAlert } from 'utils/helperFunctions/helperFunction';

import './index.css';

const key = import.meta.env.VITE_CRYPTO_KEY;
const keyutf = CryptoJS.enc.Utf8.parse(key);
const iv = CryptoJS.enc.Base64.parse(key);

const ResumeReport = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { resumePreview, userDetails } = useSelector((state) => state.common);
	const { fetchTemplateById } = useQueryAPI();
	const { resumeAnalysis, jsonTopdf } = useMutationAPI();

	const queryClient = useQueryClient();
	const { authToken } = useSelector((state) => state.auth);
	const [template, setTemplate] = useState('');
	const [openExportOptions, setOpenExportOptions] = useState(false);
	const [isButtons, setIsButtons] = useState();

	const { analysisData } = useSelector((state) => state.common);

	if (!analysisData) {
		navigate('/resume/analyzer');
	}

	const { mutate: resumeAnalysisMutation } = useMutation({
		mutationFn: (val) => resumeAnalysis(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries(['userDetails']);
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
			}
		},
		onError: () => {
			handleAlert(dispatch, 'Failed to analyse resume', 'error');
			dispatch(hideCustomModal());
		},
	});

	const handleReAnalyze = (data) => {
		const payload = {
			resume_uri: data,
			userId: userDetails?._user,
		};
		resumeAnalysisMutation(payload);
	};

	const { mutate: jsonTopMutation } = useMutation({
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
		const plainText = document.getElementById('jsxContent');
		const stringContent = plainText.innerHTML;
		const cyperText = CryptoJS.AES.encrypt(stringContent, keyutf, {
			iv: iv,
		}).toString();

		const payload = {
			encryptedHtmlData: cyperText,
			fileName: 'pdf_resume',
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

	const handleModal = () => {
		fetchJSONpdf();
		setIsButtons(false);
	};

	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	const toggleIsButtons = (newOpen) => () => {
		setIsButtons(newOpen);
	};

	const { data } = useQuery({
		queryKey: ['fetchTemplatesById', resumePreview?.id],
		queryFn: () => fetchTemplateById(resumePreview?.id),
		staleTime: 300000,
		enabled: !!resumePreview?.id && !!authToken,
	});

	const resumeTemplate = data?.data?.data?.items;

	useEffect(() => {
		if (resumeTemplate?.content) {
			const ciphertext = resumeTemplate?.content;
			const plaintext = CryptoJS.AES.decrypt(ciphertext, keyutf, {
				iv: iv,
			}).toString(CryptoJS.enc.Utf8);
			setTemplate(plaintext);
		}
	}, [resumeTemplate]);

	useEffect(() => {
		dispatch(
			addState({
				name: 'resumePreview',
				value: {
					state: true,
					value: 'https://joblodev.s3.ap-south-1.amazonaws.com/user/f0a1e7245bc8c5e90916cf26b8fefe77459e67baf95d6aa11600316eb0a23f9b/resume-builder-thumbnail/66e18f1611aef66a31a0bcda-1729847990451',
					id: userDetails?.profile?.resumeId,
				},
			})
		);
	}, []);

	return (
		<div className=" w-full h-full  overflow-y-scroll bg-[#F5F5F5] p-4 md:p-6 flex flex-col gap-6 ">
			<ReportHeader onHandleButtons={() => setIsButtons(true)} />
			<div>
				<AnalysisReport />
				<AnalyzerFaq className="rounded-t-none container_border pt-8 " />
			</div>
			<Drawer
				sx={{
					'& .MuiDrawer-paper': {
						borderTopLeftRadius: '8px',
						borderTopRightRadius: '8px',
					},
				}}
				open={isButtons}
				anchor="bottom"
				onClose={toggleIsButtons(false)}
			>
				<ButtonsDrawer
					onExport={() => setOpenExportOptions(true)}
					handleModal={handleModal}
				/>
			</Drawer>
			<ExportModel onClose={() => setOpenExportOptions(false)} open={openExportOptions} />
			<LoaderModal
				className={'pt-6 pb-8 px-6 flex rounded-[24px]  '}
				borderRadius="24px"
				widthMax="784px"
			/>
			<ScoreModal Comparision={true} hideModal={hideModal} />
			<DownloadResume htmlTemplate={template} />
		</div>
	);
};

export default ResumeReport;
