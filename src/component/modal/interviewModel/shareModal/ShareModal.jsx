import { Dialog, DialogActions, DialogContent, IconButton, TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideCustomModal } from 'store/sagaActions';
import { SHAREMODAL } from 'constants/modalTypeConstant';
import CloseIcon from 'assets/SVGs/CloseIcon';
import {
	EMBED_ICON,
	LINKEDIN_ICON,
	WHATSAPP_ICON,
	FACEBOOK_ICON,
	REDDIT_ICON,
	MORE_ICON,
	COPYBTN_ICON,
} from 'assets/images';

import { PrimaryButton } from 'component/customComponents/button/CustomButton';

import './index.css';

const ShareModal = () => {
	const dispatch = useDispatch();
	const { customModalType } = useSelector((state) => state.modal);

	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	return (
		<Dialog
			open={customModalType === SHAREMODAL}
			onClose={hideModal}
			aria-labelledby="share-modal-title"
			fullWidth
			className="w-[100%] px-6 pt-6 pb-8"
			sx={{
				'& .MuiPaper-root': {
					boxShadow: 'none',
					width: '640px',
					background: '#FFFFFF',
					borderRadius: '12px',
				},
			}}
		>
			<div className="relative flex flex-col items-center p-6">
				<div className="flex justify-between items-center !w-full mb-4">
					<h2 className="text-xl font-medium text-[#1A1A1A] tracking-tight m-0">Share</h2>
					<IconButton
						aria-label="close"
						onClick={hideModal}
						sx={{
							backgroundColor: '#FFF5F6',
							padding: 0,
						}}
					>
						<CloseIcon />
					</IconButton>
				</div>

				<DialogContent className="flex flex-col  max-w-full overflow-hidden">
					<div className="flex flex-col gap-2">
						<div className="text-sm font-medium text-[#666666] tracking-tight">
							Question
						</div>
						<div className="text-xl font-medium tracking-tight  text-[#1A1A1A]">
							How do you approach unfamiliar challenges or tasks?
						</div>
						<div className="flex gap-2 mb-6">
							<div className="text-sm font-normal tracking-tight text-[#666666] !m-0">
								Answer
							</div>
							<div className="text-base font-normal tracking-tight text-[#666666] m-0 truncate-text ">
								I approach unfamiliar challenges by researching, seeking guidance
								from colleagues, and breaking tasks into manageable steps to learn
								and adapt quickly.
							</div>
						</div>
					</div>

					<div className="flex items-center gap-8 mb-6">
						<div className=" flex flex-col gap-4 items-center">
							<img src={EMBED_ICON} alt="embed_icon" />
							<span className="text-xs font-normal text-[#000000]">Embed</span>
						</div>
						<div className=" flex flex-col gap-4 items-center">
							<img src={LINKEDIN_ICON} alt="LinkedIn" />
							<span className="text-xs font-normal text-[#000000]">LinkedIn</span>
						</div>
						<div className=" flex flex-col gap-4 items-center">
							<img src={WHATSAPP_ICON} alt="WhatsApp" />
							<span className="text-xs font-normal text-[#000000]">WhatsApp</span>
						</div>
						<div className=" flex flex-col gap-4 items-center">
							<img src={FACEBOOK_ICON} alt="Facebook" />
							<span className="text-xs font-normal text-[#000000]">Facebook</span>
						</div>
						<div className=" flex flex-col gap-4 items-center">
							<img src={REDDIT_ICON} alt="Reddit" />
							<span className="text-xs font-normal text-[#000000]">Reddit</span>
						</div>

						<div className=" flex flex-col gap-4 items-center ">
							<img src={MORE_ICON} alt="more_icon" />
							<span className="text-xs font-normal text-[#000000]">More</span>
						</div>
					</div>
				</DialogContent>

				<DialogActions
					sx={{
						display: 'flex',
						width: '100%',
						justifyContent: 'center',
						borderTop: '1px solid #E6E6E6',
						padding: '12px 24px 12px 24px',
					}}
				>
					<div className="flex !w-full !px-2 pt-2 pb-4 bg-[#FFFFFF] linkcopy_css">
						<TextField
							fullWidth
							size="small"
							value="https://job.io/interview-questions/-b4ofq13jlk?si=Ca9cLacpFvOJqY-6"
							InputProps={{
								sx: {
									color: '#666',
									'& fieldset': { border: 'none' },
								},
							}}
						/>
						<PrimaryButton
							size="small"
							buttonText="Copy"
							varient="primary"
							btnClassName="!px-3 !py-[6px] !rounded !text-[#1A1A1A] !text-sm !font-medium !tracking-tight"
							startIcon={<img src={COPYBTN_ICON} alt="copybtn_icon" height={16} />}
						/>
					</div>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default ShareModal;
