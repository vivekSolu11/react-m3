import React, { useEffect, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import CryptoJS from 'crypto-js';
import {
	checkSummaryComplete,
	checkPersonalInfoComplete,
	checkSkillsComplete,
	checkWorkExperienceComplete,
	checkEducationComplete,
} from 'utils/common';
import LineSpacingControl from './LineSpacingControl';
import PaginationControl from './PaginationControl';
import ZoomControl from './ZoomControl.jsx';
import { EDIT_NAME, ICON_CHECK } from 'assets/images';
import MouseHoverPopover from 'component/common/Popover/MouseHoverPopover';
import SectionCompletion from '../sectionCompletion/SectionCompletion';
import ResumeTemplate from './ResumeTemplate';
import { useQueryAPI } from 'apis/query';
import { addState, updateSection } from 'store/sagaActions';
import DownloadResume from './DownloadResume';

import styles from './resumePreview.module.css';

const key = import.meta.env.VITE_CRYPTO_KEY;
const keyutf = CryptoJS.enc.Utf8.parse(key);
const iv = CryptoJS.enc.Base64.parse(key);

function ResumePreview({
	sectionClass,
	showSectionCompletion = true,
	showLineSpacing = true,
	showPreview = true,
	showHeader = true,
	showPagination = true,
}) {
	const { fetchTemplateById } = useQueryAPI();

	const { resumePreview, resumeName, userDetails, userLocation } = useSelector(
		(state) => state.common
	);
	const { authToken } = useSelector((state) => state.auth);
	const { sectionCompleted } = useSelector((state) => state.resume);

	const education = useSelector((state) => state.education);
	const workExperience = useSelector((state) => state.workExperience);
	const skills = useSelector((state) => state.skills);
	const info = useSelector((state) => state.info);

	const dispatch = useDispatch();

	const [selectedLineSpacing, setSelectedLineSpacing] = useState('1.43');
	const [template, setTemplate] = useState('');
	const [pages, setPages] = useState(0);
	const [activePage, setActivePage] = useState(1);

	const isPersonalInfoComplete = checkPersonalInfoComplete(info, userLocation);

	const isSummaryComplete = checkSummaryComplete(info);

	const isSkillsComplete = checkSkillsComplete(skills);

	// Work Experience Validation
	const isWorkExperienceComplete = () => checkWorkExperienceComplete(workExperience);

	// Education Validation
	const isEducationComplete = () => checkEducationComplete(education);

	const [updatefileName, setUpdatefileName] = useState(false);
	const [fileName, setFileName] = useState(
		`Resume_${userDetails?.profile?.name?.firstName}_Joblo`
	);

	const { data, isLoading } = useQuery({
		queryKey: ['fetchTemplatesById', resumePreview?.id],
		queryFn: () => fetchTemplateById(resumePreview?.id),
		staleTime: 300000,
		enabled: !!resumePreview?.id && !!authToken,
	});

	const resumeTemplate = data?.data?.data?.items;

	const handleUpdateName = (e) => {
		setFileName(e.target.value);
		dispatch(addState({ name: 'resumeName', value: e.target.value }));
	};

	useEffect(() => {
		let completed = 0;
		if (isPersonalInfoComplete) completed += 20;
		if (isSummaryComplete) completed += 20;
		if (isWorkExperienceComplete()?.status) completed += 20;
		if (isEducationComplete()?.status) completed += 20;
		if (isSkillsComplete) completed += 20;

		dispatch(updateSection({ completed }));
	}, [
		isPersonalInfoComplete,
		isSummaryComplete,
		isWorkExperienceComplete,
		isEducationComplete,
		isSkillsComplete,
	]);

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
		if (resumeName) setFileName(resumeName);
	}, [resumeName]);

	return (
		<>
			<TransformWrapper
				centerOnInit
				maxScale={2}
				minScale={0.4}
				initialScale={0.5}
				limitToBounds={true}
			>
				{({ zoomIn, zoomOut }) => (
					<section className={`${styles.container} ${sectionClass}`}>
						{showHeader && (
							<header className={`${styles.header} hidden lg:flex`}>
								<div className={styles.headerContent}>
									<h1 className={styles.headerTitle}>Resume Preview</h1>
									<div className={styles.fileNameWrapper}>
										{updatefileName ? (
											<input
												className={styles.fileName}
												type="text"
												value={fileName}
												onChange={(e) => handleUpdateName(e)}
											/>
										) : (
											<span className={styles.fileName}>{fileName}</span>
										)}
										<img
											src={!updatefileName ? EDIT_NAME : ICON_CHECK}
											alt="Edit name"
											className={styles.fileIcon}
											onClick={() => setUpdatefileName(!updatefileName)}
										/>
									</div>
								</div>
								{showSectionCompletion ? (
									<MouseHoverPopover
										customDiv={
											<section className={styles.completionContainer}>
												<div className={styles.completionLabel}>
													Section Completion
												</div>
												<div className={styles.completionPercentage}>
													{sectionCompleted}%
												</div>
											</section>
										}
									>
										<SectionCompletion
											isPersonalInfoComplete={isPersonalInfoComplete}
											isSummaryComplete={isSummaryComplete}
											isSkillsComplete={isSkillsComplete}
											isWorkExperienceComplete={isWorkExperienceComplete}
											isEducationComplete={isEducationComplete}
											sectionCompleted={sectionCompleted}
										/>
									</MouseHoverPopover>
								) : null}
							</header>
						)}

						<main className={styles.mainContent}>
							{showLineSpacing ? (
								<div className={`${styles.controlsWrapper} hidden lg:flex`}>
									<LineSpacingControl
										selectedLineSpacing={selectedLineSpacing}
										setSelectedLineSpacing={setSelectedLineSpacing}
									/>
								</div>
							) : null}

							<TransformComponent
								wrapperClass="flex-grow w-full bg-[#0e0e0e0a]"
								maxScale={2}
								minScale={0.4}
								initialScale={0.8}
								limitToBounds={false}
							>
								{showPreview ? (
									<ResumeTemplate
										htmlTemplate={template}
										selectedLineSpacing={selectedLineSpacing}
										setPages={setPages}
										activePage={activePage}
										isLoading={isLoading}
									/>
								) : (
									<img
										src={resumePreview?.value}
										alt="template-image"
										className={styles.template_preview}
									/>
								)}
							</TransformComponent>
							<div className={`${styles.navigationControls} hidden lg:flex`}>
								{showPagination ? (
									<PaginationControl
										setActivePage={setActivePage}
										pages={pages}
										activePage={activePage}
									/>
								) : (
									<div></div>
								)}
								<ZoomControl zoomIn={zoomIn} zoomOut={zoomOut} />
							</div>
						</main>
					</section>
				)}
			</TransformWrapper>
			<DownloadResume htmlTemplate={template} selectedLineSpacing={selectedLineSpacing} />
		</>
	);
}

export default ResumePreview;
