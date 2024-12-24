import React from 'react';
import { Avatar, AvatarGroup } from '@mui/material';
import { useDispatch } from 'react-redux';

import { Linkedin1, Linkedin2, Linkedin3 } from 'assets/images';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import { LINKEDIN_MESSAGE, LINKEDIN_UNLOCK } from 'constants/modalTypeConstant';

import './index.css';
import { showCustomModal } from 'store/sagaActions';

const LinkedInCard = ({ data, isBlur, isVerified = false }) => {
	const images = [Linkedin1, Linkedin2, Linkedin3];
	const dispatch = useDispatch();
	const handleOpenModal = () => {
		dispatch(
			showCustomModal({
				customModalType: LINKEDIN_UNLOCK,
			})
		);
	};
	const handleOpenTemplate = () => {
		dispatch(
			showCustomModal({
				customModalType: LINKEDIN_MESSAGE,
			})
		);
	};

	return (
		<div className="p-1 pb-2  w-full flex flex-col gap-4 relative card-border">
			<div className="bg-LinkedinCard  text-[14px] font-[500] pl-2 py-[4.5px] z-10">
				Beyond Your Network
			</div>
			<div className="flex flex-col pl-1 gap-4">
				<div
					className={`flex justify-between items-center ${isBlur ? 'linkedinBlur ' : ''}`}
				>
					<div className="flex-col  gap-1">
						<div className="text-sm">{data.name}</div>
						<div className="text-[11px] text-[#666666]">+{data.mutual} connections</div>
					</div>
					<div>
						<AvatarGroup max={3}>
							{data.img.map((item, index) => (
								<Avatar
									key={index}
									sx={{
										'&.MuiAvatar-root': {
											marginLeft: '-20px',
										},

										'&.MuiAvatar-root:lastchild': {
											marginLeft: '0px',
										},
									}}
									src={images[item]}
								></Avatar>
							))}
						</AvatarGroup>
					</div>
				</div>
				<div className="z-10">
					<PrimaryButton
						handleClick={isVerified ? handleOpenTemplate : handleOpenModal}
						buttonText="view"
						varient="primaryOutline"
						size="small"
						btnClassName="!px-6 !text-[12px]  !font-medium"
					/>
				</div>
			</div>
		</div>
	);
};

export default LinkedInCard;
