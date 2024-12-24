import React, { memo } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';

import './jobs.css';

const JobDetailItem = ({ icon: Icon, text, jobdetailview }) =>
	text && ( // Only render if text is not null or undefined
		<div
			className={`flex items-center text-sm  gap-1 p-[5px] ${jobdetailview ? ' md:py-0 md:px-0 ' : ' md:p-0 md:w-auto'}`}
		>
			<Icon className="h-4 w-4" />
			<span>{text}</span>
		</div>
	);

const JobDescription = ({
	location,
	experience,
	salary,
	jobType,
	workModel,
	jobdetailview = false,
}) => {
	const jobDetails = [
		{ icon: LocationOnOutlinedIcon, text: location },
		{
			icon: StarBorderOutlinedIcon,
			text: experience ? `${experience} yrs exp` : null,
		}, // Conditional for experience
		{ icon: AccountBalanceWalletOutlinedIcon, text: salary || 'Not Disclosed' },
		{ icon: ScheduleOutlinedIcon, text: jobType },
		{ icon: DesktopWindowsOutlinedIcon, text: workModel },
	];

	return (
		<div
			className={`text-card-icon-outl ${
				jobdetailview
					? 'grid grid-cols-2 sm:flex flex-wrap gap-2 md:gap-8 text-sm font-normal items-center md:pt-[3px]'
					: 'grid grid-cols-2 sm:flex flex-wrap gap-2 md:gap-y-2 md:gap-x-6 text-xs font-medium items-center -tracking-[0.02rem] jobdetails_css'
			}`}
		>
			{jobDetails.map(
				(detail, index) =>
					detail.text && ( // Only render the JobDetailItem if the text is available
						<JobDetailItem
							key={index}
							icon={detail.icon}
							text={detail.text}
							jobdetailview={jobdetailview}
						/>
					)
			)}
		</div>
	);
};

export default memo(JobDescription);
