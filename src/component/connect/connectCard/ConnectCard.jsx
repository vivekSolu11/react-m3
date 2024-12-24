import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { COMPANY_ICON, JOB_ICON, LINKDIN_PIC, PROFILE_PIC } from 'assets/images';

import Chips from 'component/customComponents/chips/Chips';
import { LINKDINCONNECTMODAL } from 'constants/modalTypeConstant';
import { showCustomModal } from 'store/sagaActions';

import '../../connect/connect.css';
import { Avatar, Badge } from '@mui/material';
import styled from '@emotion/styled';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
	width: 16,
	height: 16,
	objectFit: 'contain',
	border: `2px solid ${theme.palette.background.paper}`,
}));
const ConnectCard = ({ image, name, position, company, connections, connectUrl }) => {
	const dispatch = useDispatch();

	const handleOpenCareer = () => {
		dispatch(
			showCustomModal({
				customModalType: LINKDINCONNECTMODAL,
				tempCustomModalData: {
					connectUrl: connectUrl,
				},
			})
		);
	};

	const [imageSrc, setImageSrc] = useState(image);

	// Function to handle image load error
	const handleImageError = () => {
		setImageSrc(PROFILE_PIC); // Set the default image URL
	};

	return (
		<div className={`border rounded-lg shadow-sm bg-white w-full`}>
			{/* User Image */}
			<div className="flex justify-center">
				<img
					src={imageSrc}
					onError={handleImageError}
					alt={`Profile picture of ${name}`}
					className="w-full hidden md:block h-auto object-cover rounded-t-lg"
				/>
			</div>
			<div className="p-3  flex flex-col gap-4">
				<div className=" flex flex-col gap-3">
					<div className="flex flow-row gap-5 ">
						<Badge
							overlap="circular"
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							className="w-fit md:hidden"
							badgeContent={<SmallAvatar alt={'LinkedInPic'} src={LINKDIN_PIC} />}
						>
							<Avatar
								className="h-12 w-12"
								alt={`Profile picture of ${name}`}
								src={imageSrc}
							/>
						</Badge>

						<div className="flex flex-col md:flow-row gap-1 ">
							{/* User Name */}
							<h3 className="m-0 font-semibold text-[20px] leading-[22.4px] tracking-[-0.02em] text-left text-[#121212]">
								{name}
							</h3>
							<p className="m-0 block md:hidden text-[12px] font-normal leading-[18px] tracking-[-0.02em] text-left text-[#666666]">
								{position}
							</p>
							<div className="hidden md:flex items-center">
								<a href={connectUrl} target="_blank" rel="noreferrer">
									<img src={LINKDIN_PIC} alt="LinkedInPic" className="w-4 h-4" />
								</a>
							</div>
						</div>
					</div>
					<div className="flex flex-col md:flow-row justify-between ">
						{/* Position */}
						<div className="hidden md:flex gap-1 items-center mt-2">
							<div className="border border-[#666666]">
								<img
									src={JOB_ICON}
									alt="Job_Icon"
									className="w-[11.67px] h-[10.5px]"
								/>
							</div>
							<p className="m-0 text-[12px] font-normal leading-[18px] tracking-[-0.02em] text-left text-[#666666]">
								{position}
							</p>
						</div>

						{/* Company */}
						<div className="flex gap-1 items-center mt-1">
							<div className="border-1-[#666666]">
								<img
									src={COMPANY_ICON}
									alt="Company_Icon"
									className="w-4 h-4 md:w-[14px] md:h-[14px]"
								/>
							</div>
							<p className="m-0 text-[12px] font-normal leading-[18px] tracking-[-0.02em] text-left text-[#666666]">
								{company}
							</p>
						</div>
					</div>

					{/* Mutuals and Connections */}
					<div className="flex gap-2">
						<Chips
							color={'#fff'}
							name={`${connections?.mutual || 0} mutuals`}
							className="text-[11px] font-normal tracking-wide text-[#666666] py-1 px-2"
							customStyle={{
								border: '1px solid #cccccc',
								borderRaduis: '12px',
								maxWidth: '100%',
								background: '#fff',
							}}
						/>
						<Chips
							color={'#fff'}
							name={`${connections?.total || 0} connections`}
							className="text-[11px] font-normal tracking-wide text-[#666666] py-1 px-2"
							customStyle={{
								background: '#fff',
								border: '1px solid #cccccc',
								borderRaduis: '12px',
								maxWidth: '100%',
							}}
						/>
					</div>
				</div>

				{/* Connect Button */}
				<button
					type="button"
					onClick={handleOpenCareer}
					className="mt-1  w-full text-sm font-medium text-[#0E8712] tracking-tight py-[6px] px-3 bg-[white] rounded-lg
       cursor-pointer button-action"
				>
					Connect
				</button>
			</div>
		</div>
	);
};

export default ConnectCard;
