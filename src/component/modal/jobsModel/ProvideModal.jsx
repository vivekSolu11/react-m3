import { Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { hideCustomModal } from 'store/reducer/modal/modalSlice';
import { PROVIDE_MODAL } from 'constants/modalTypeConstant';
import { SMILEIMG, NEUTRALFACE, SADFACE } from 'assets/images';

import './provide.css';

const ProvideModal = () => {
	const dispatch = useDispatch();
	const { customModalType } = useSelector((state) => state.modal);

	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	return (
		<>
			<Dialog
				open={customModalType === PROVIDE_MODAL}
				aria-labelledby="form-dialog"
				className="provide_Modal"
			>
				<DialogContent className="provide" style={{ padding: '0px' }}>
					<p>Provide your Feedback</p>
				</DialogContent>
				<DialogTitle id="provide-dialog">
					<img src={SADFACE} alt="sad face" />
					<img src={NEUTRALFACE} alt="neutral face" />
					<img className="smileface" src={SMILEIMG} alt="smile face" />
				</DialogTitle>
				<p className="reachOut">
					<input type="checkbox" className="checkbox" />
					Don’t ask me again!
				</p>
				<DialogActions
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Button style={{ textTransform: 'none' }}>Skip</Button>
					<Button
						style={{
							textTransform: 'none',
							backgroundColor: '#F2F2F2',
							color: '#B3B3B3',
							padding: '10px 20px',
						}}
						onClick={hideModal}
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ProvideModal;
