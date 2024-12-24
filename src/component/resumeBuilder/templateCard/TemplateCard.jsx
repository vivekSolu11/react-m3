import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
	addResumeState,
	addState,
	removeState,
	showCustomModal,
	showCustomModal1,
	updateresumeCreate,
} from 'store/sagaActions';

import styles from './templateCard.module.css';
import { useSelector } from 'react-redux';
import { handleAlert, resetResumeDetails } from 'utils/helperFunctions/helperFunction';
import { useMediaQuery } from '@mui/material';
import { RESUME_PREVIEW_MOBILE_MODAL } from 'constants/modalTypeConstant';
import PreviewOption from './PreviewOption';

const TemplateCard = ({
	id,
	imageSrc,
	isFree,
	type,
	templateId,
	isRedirect,
	showPreview,
	resetInfo = false,
}) => {
	const { tempCustomModalData } = useSelector((state) => state.modal);

	const dispatch = useDispatch();
	const isSmallScreen = useMediaQuery('(max-width:1024px)');

	const { userDetails } = useSelector((state) => state.common);
	const handleUseTemplate = () => {
		if (resetInfo) {
			resetResumeDetails(dispatch);
		}
		dispatch(removeState({ name: 'analysisData' }));
		dispatch(addState({ name: 'builderActiveTab', value: 'edit_template' }));
		dispatch(
			addState({
				name: 'resumePreview',
				value: {
					state: true,
					value: imageSrc,
					id: templateId ? templateId : null,
				},
			})
		);
		dispatch(addResumeState({ name: 'templateId', value: templateId }));
		if (type === 'saved') {
			dispatch(addResumeState({ name: 'resumeId', value: id }));
		} else {
			dispatch(addResumeState({ name: 'resumeId', value: null }));
			if (resetInfo) {
				dispatch(updateresumeCreate(true));
			}
		}
	};

	const handlePreview = () => {
		dispatch(addResumeState({ name: 'templateId', value: templateId }));
		if (type === 'saved') {
			dispatch(addResumeState({ name: 'resumeId', value: id }));
		} else {
			dispatch(addResumeState({ name: 'resumeId', value: null }));
			dispatch(updateresumeCreate(true));
		}
		dispatch(
			addState({
				name: 'resumePreview',
				value: {
					state: true,
					value: imageSrc,
					id: templateId ? templateId : null,
				},
			})
		);
	};

	return (
		<>
			<article
				className={styles.templateCard}
				onClick={() => {
					if (isSmallScreen) {
						dispatch(
							showCustomModal({
								tempCustomModalData: {
									id: id,
								},
							})
						);
						dispatch(
							showCustomModal1({
								customModalTypeOne: RESUME_PREVIEW_MOBILE_MODAL,
							})
						);
					}
				}}
			>
				<div className={styles.imageWrapper}>
					<img src={imageSrc} alt="Template preview" className={styles.templateImage} />
					{isFree && <span className={styles.freeLabel}>Free</span>}
				</div>
				<div className={styles.buttonGroup}>
					{userDetails?.profile?.name?.fullName ? (
						<Link
							className={styles.useButton}
							onClick={handleUseTemplate}
							to={isRedirect ? `/resume/create` : null}
						>
							Use Template
						</Link>
					) : (
						<div
							className={styles.useButton}
							onClick={() =>
								handleAlert(dispatch, 'Please update your profile', 'error')
							}
						>
							Use Template
						</div>
					)}

					{showPreview && (
						<button className={styles.previewButton} onClick={handlePreview}>
							Preview
						</button>
					)}
				</div>
			</article>
			{id === tempCustomModalData?.id && isSmallScreen && (
				<PreviewOption
					imageSrc={imageSrc}
					showPreview={false}
					isRedirect={isRedirect}
					handleUseTemplate={handleUseTemplate}
					handlePreview={handlePreview}
				/>
			)}
		</>
	);
};

export default TemplateCard;
