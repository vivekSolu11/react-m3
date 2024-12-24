import React from 'react';
import RoleCard from './RoleCard';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useSelector } from 'react-redux';

const RoleList = ({ onHandleDrawer }) => {
	const { reportData } = useSelector((state) => state.careerAdvisor);
	const listData = reportData?.careerTrajectory;
	return (
		<div className="space-y-4">
			<Timeline
				sx={{
					padding: '0px',
					// gap: '4px',
					'& .MuiTimelineDot-root': {
						background: 'white',
						padding: '0px',
						boxShadow: 'none',
						margin: '0px',
						display: 'flex',
						flexDirection: 'column',
						gap: '12px',
					},
					'& .MuiTimelineItem-root::before': {
						content: 'none',
					},
					'& .MuiTimelineSeparator-root': {
						borderStyle: 'none',
						paddingRight: '22px',
					},
					'& .MuiTimelineContent-root': {
						padding: '12px',
					},
				}}
			>
				{listData?.map((role, index) => (
					<TimelineItem key={index}>
						<TimelineSeparator>
							<TimelineDot
								sx={{
									display: 'flex',
									alignItems: index === 0 ? 'center' : 'flex-start',
									height: index === 0 ? '100%' : 'auto',
									border: 0,
									'@media (max-width: 600px)': {
										height: index === 0 ? '18%' : 'auto', // Apply 30% height for screens smaller than 600px
									},
								}}
							>
								<div
									className={`bg-[#EEF4FD] text-[#508BE9] p-4 rounded-full`}
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: '32px',
										width: '32px',
										...(index === 0 && {
											position: 'relative',
											top: '50%',
											transform: 'translateY(50%)',
										}),
									}}
								>
									{index === 0 ? '-' : index}
								</div>
							</TimelineDot>
							{index < listData?.length - 1 && (
								<TimelineConnector
									className="bg-[#98bdf9] opacity-50"
									sx={{
										height: '100%',
									}}
								/>
							)}
						</TimelineSeparator>
						<TimelineContent className="pt-0 px-0">
							<RoleCard
								role={role}
								current={role.current}
								onHandleDrawer={onHandleDrawer}
							/>
						</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		</div>
	);
};

export default RoleList;
