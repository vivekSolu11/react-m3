import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Badge } from '@mui/material';

import { Leadership, linkedinIcon, LinktoIcon } from 'assets/images';

import './index.css';

const LeadershipCard = ({ name, position }) => {
	return (
		<div className="w-full  md:max-w-[168px] p-3 md:p-4 borderreview border-[#D9F9DA] rounded-[8px] bg-[#ABF0A11A] ">
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between ">
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
						<Avatar alt="Travis Howard" src={Leadership} />
					</Badge>
					<Link
						className="h-[36px] w-[36px] "
						to="https://www.google.com"
						target="_blank"
					>
						<img className="w-full cursor-pointer" src={LinktoIcon} alt="link-icon" />
					</Link>
				</div>
				<div className="flex flex-col gap-1">
					<div className="font-[500] md:text-[16px] text-[14px]">{name}</div>
					<div className="font-[400] md:text-[14px] text-[12px] ">{position}</div>
				</div>
			</div>
		</div>
	);
};

export default LeadershipCard;
