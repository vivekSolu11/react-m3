import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

const CardMoreOptionModal = ({ open, handleClose }) => {
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			<Box
				sx={{
					position: 'absolute',
					top: '41%',
					left: '37%',
					transform: 'translate(-50%, -50%)',
					width: '200px',
					height: 'auto',
					bgcolor: 'rgba(255, 255, 255, 1)',
					boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.15)',
					padding: '16px 8px',
					borderRadius: '8px 8px',
					display: 'flex',
					flexDirection: 'column',
					gap: '8px',
					justifyContent: 'center',
					outline: 'none',
				}}
			>
				{/* First option */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						padding: '8px 12px',
						gap: '8px',
						'&:hover': {
							backgroundColor: 'rgba(0, 0, 0, 0.04)',
						},
					}}
				>
					<NotInterestedOutlinedIcon
						fontSize="small"
						sx={{
							transition: 'color 0.3s',
							'&:hover': {
								color: 'rgba(0, 0, 0, 0.6)',
							},
						}}
					/>
					<Typography variant="body2" color="textSecondary">
						Not interested
					</Typography>
				</Box>

				{/* Second option */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						padding: '8px 12px',
						gap: '8px',
						'&:hover': {
							backgroundColor: 'rgba(0, 0, 0, 0.04)',
						},
					}}
				>
					<ReportProblemOutlinedIcon
						fontSize="small"
						sx={{
							transition: 'color 0.3s',
							'&:hover': {
								color: 'rgba(0, 0, 0, 0.6)',
							},
						}}
					/>
					<Typography variant="body2" color="textSecondary">
						Report job
					</Typography>
				</Box>
			</Box>
		</Modal>
	);
};

export default CardMoreOptionModal;
