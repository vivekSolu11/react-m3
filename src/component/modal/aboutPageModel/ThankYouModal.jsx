import { Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { hideCustomModal } from 'store/reducer/modal/modalSlice';
import { THANK_YOU_MODAL } from 'constants/modalTypeConstant';
import { SMILEIMG } from 'assets/images';

import './thankyouModal.css';

const ThankYouModal = () => {
	const dispatch = useDispatch();
	const { customModalType } = useSelector((state) => state.modal);

	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	return (
		<>
			<Dialog
				open={customModalType === THANK_YOU_MODAL}
				aria-labelledby="form-dialog"
				className="thank_modal"
			>
				<DialogTitle id="form-dialog">
					<img src={SMILEIMG} alt="" />
				</DialogTitle>

				<DialogContent className="thankYou" style={{ padding: '0px' }}>
					<p style={{ margin: '0px' }}>Thank you!</p>
				</DialogContent>
				<p className="reachOut">We’ll reach out to you soon</p>
				<DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
					<Button
						style={{
							textTransform: 'none',
							color: '#1A1A1A',
							backgroundColor: '#76FF7A',
							padding: '10px 40px',
							marginBottom: '24px',
						}}
						onClick={hideModal}
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ThankYouModal;
