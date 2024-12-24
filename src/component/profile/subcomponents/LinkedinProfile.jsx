import { Avatar, Badge } from '@mui/material';
import { DEFAULT_PROFILE, linkedinIcon, LinktoIcon, LOCATION_IMG } from 'assets/images';
import React from 'react';

const LinkedinProfile = ({ user, location }) => {
	return (
		<div className="  w-full px-4 py-3 borderreview rounded-[8px] flex flex-col gap-3 ">
			<div className="text-[#666666] text-[14px]">Linkedin Profile</div>
			{user ? (
				<div className="flex  w-full justify-between">
					<div className="flex gap-2 font-medium text-[14px]">
						<Badge
							overlap="circular"
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							badgeContent={
								<Avatar
									sx={{
										position: 'absolute ',
										bottom: '-2px',
										height: '18px',
										width: '18px',
										border: '1px solid white',
									}}
									alt="Remy Sharp"
									src={linkedinIcon}
								/>
							}
						>
							<Avatar alt="Travis Howard" src={DEFAULT_PROFILE} />
						</Badge>
						<div className="flex   flex-col flex-wrap">
							{user || 'Username'}
							<div className="text-[12px] flex items-center gap-1 text-[#666666]">
								<img src={LOCATION_IMG} alt=" location icon" />
								{location || 'N.A'}
							</div>
						</div>
					</div>
					<div>
						<img height={36} width={36} src={LinktoIcon}></img>
					</div>
				</div>
			) : (
				<div className="text-[14px]">No Linkedin Account Added</div>
			)}
		</div>
	);
};

export default LinkedinProfile;
