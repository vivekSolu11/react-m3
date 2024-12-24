import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Dialog,
	Button,
	DialogTitle,
	DialogActions,
	DialogContent,
	TextField,
	useMediaQuery,
	Box,
	FormControlLabel,
} from '@mui/material';

import { FEEDBACK_MODAL, PROVIDE_MODAL } from 'constants/modalTypeConstant';
import { hideCustomModal, showCustomModal } from 'store/reducer/modal/modalSlice';
import CloseIcon from 'assets/SVGs/CloseIcon';
import DiscreteSlider from '../CustomSlider';

import './feedbackModal.css';

const FeedbackModal = () => {
	const dispatch = useDispatch();
	const { customModalType } = useSelector((state) => state.modal);

	const [rating, setRating] = useState('');
	const [title, setTitle] = useState('');
	const [details, setDetails] = useState('');

	const isMobile = useMediaQuery('(max-width:600px)');

	const handleSubmit = () => {
		dispatch(hideCustomModal());
		dispatch(
			showCustomModal({
				customModalType: PROVIDE_MODAL,
			})
		);
	};

	const handleRatingChange = (value) => {
		setRating(value);
	};
	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	const isButtonActive = title.trim() !== '' && details.trim() !== '';

	return (
		<>
			<Dialog
				open={customModalType === FEEDBACK_MODAL}
				aria-labelledby="dialog-title"
				fullWidth
				className="feedback_modal"
			>
				<div onClick={hideModal} className="closeIcon">
					<CloseIcon />
				</div>
				{isMobile && <h1 className="rateYourExperience">Rate your Experience!</h1>}
				<DialogTitle id="dialog-title">
					Based on your product experience, how likely are you to recommend the product to
					your friends, family, and colleagues?*
				</DialogTitle>
				<DialogContent style={{ overflow: 'hidden', padding: '0px 50px 0px 50px' }}>
					{!isMobile && (
						<div className="likely">
							<p>less likely</p>
							<p>most likely</p>
						</div>
					)}

					{isMobile && <DiscreteSlider />}

					{!isMobile && (
						<Box className="rating-group">
							{[...Array(10)].map((_, index) => (
								<FormControlLabel
									key={index + 1}
									value={String(index + 1)}
									control={
										<Box
											className={`square-radio ${rating === String(index + 1) ? 'selected' : ''}`}
											onClick={() => handleRatingChange(String(index + 1))}
										>
											{index + 1}
										</Box>
									}
									label=""
								/>
							))}
						</Box>
					)}
					{!isMobile && (
						<hr
							style={{
								height: '0px',
								backgroundColor: '#000000',
								opacity: '0.3',
							}}
						/>
					)}

					{!isMobile && <p className="giveFeedback">Give us your feedback</p>}
					<p className="details">Feedback Title</p>
					<TextField
						label="Enter title here..."
						placeholder=""
						fullWidth
						margin="normal"
						variant="outlined"
						className="feedback-input"
						style={{ marginTop: '0px' }}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<p className="detail">Details about your feedback</p>
					<TextField
						label="Enter details here..."
						placeholder=""
						fullWidth
						multiline
						rows={3}
						margin="normal"
						variant="outlined"
						className="feedback-input"
						style={{ marginTop: '0px' }}
						value={details}
						onChange={(e) => setDetails(e.target.value)}
					/>
				</DialogContent>

				<DialogActions
					style={{
						display: 'flex',
						justifyContent: 'center',
						padding: '0px',
						marginTop: '40px',
						...(isMobile && { borderTop: '1px solid #E6E6E6' }),
					}}
				>
					<Button
						onClick={handleSubmit}
						variant="contained"
						className="buttonsubmit"
						style={{
							textTransform: 'none',
							backgroundColor: isButtonActive ? '#76FF7A' : '#F2F2F2',
							boxShadow: 'none',
							padding: '12px 40px',
							color: isButtonActive ? 'black' : '#B3B3B3',
							fontWeight: '400',
							...(isMobile && { marginTop: '16px' }),
						}}
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default FeedbackModal;
