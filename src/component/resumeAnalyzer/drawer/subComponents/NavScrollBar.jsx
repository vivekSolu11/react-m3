import { Button } from '@mui/material';
import { StarIcon } from 'assets/index';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { marked } from 'marked';

import { FIX_BUDDY, ISSUE_ICON, SUMMARY_ICON, UPDATED_ICON } from 'assets/images';
import { FixSummaryData } from 'constants/FixSummaryData';

import './index.css';
import { useMutation } from '@tanstack/react-query';
import { useMutationAPI } from 'apis/mutation';
import { useDispatch } from 'react-redux';
import { addState } from 'store/sagaActions';
const NavScrollBar = () => {
	const { fixes } = useSelector((state) => state.common);
	const { updateWithAi } = useMutationAPI();
	const dispatch = useDispatch();

	const allIssues = [
		...(fixes?.issues?.criticalIssues || []),
		...(fixes?.issues?.optionalIssues || []),
		...(fixes?.issues?.urgentIssues || []),
	];

	const allSuggestions = [
		...(fixes?.suggestions?.criticalSuggestions || []),
		...(fixes?.suggestions?.optionalSuggestions || []),
		...(fixes?.suggestions?.urgentSuggestions || []),
	];
	const { mutate, isPending } = useMutation({
		mutationFn: (val) => updateWithAi(val),
		onSuccess: (data) => {
			if (data) {
				dispatch(addState({ name: 'fixes', value: data?.data }));
			}
		},
	});

	const handleUpdateWithAi = async () => {
		await mutate(fixes);
	};
	return (
		<Timeline
			className="letter-traking"
			sx={{
				padding: '0px',
				gap: '4px',
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
					paddingLeft: { xs: '16px', sm: '22px' },
					paddingRight: { xs: 0, sm: '22px' },
				},
				'& .MuiTimelineContent-root': {
					padding: '12px',
				},
			}}
		>
			<TimelineItem>
				<TimelineSeparator>
					<TimelineDot>
						<img
							src={SUMMARY_ICON}
							height={40}
							width={40}
							className=" w-8 h-8 md:w-[40px] md:h-[40px] "
						/>
					</TimelineDot>
					<TimelineConnector />
				</TimelineSeparator>
				<TimelineContent>
					<Typography className="text-[16px] font-[500] text-[#121212]" component="span">
						Original
					</Typography>
					<Typography className="text-[14px] text-[#4D4D4D] tracking-tight">
						{typeof fixes?.originalContent === 'string' && fixes?.originalContent}
					</Typography>
				</TimelineContent>
			</TimelineItem>

			{/* Issues (Summarize all in one) */}
			<TimelineItem>
				<TimelineSeparator>
					<TimelineDot>
						<img
							src={ISSUE_ICON}
							height={40}
							width={40}
							className=" w-8 h-8 md:w-[40px] md:h-[40px] "
						/>
					</TimelineDot>
					<TimelineConnector />
				</TimelineSeparator>
				<TimelineContent className="">
					<div className="text-[16px] tracking-tight font-[500]">Check your issues</div>
					<div className="flex gap-[6px]">
						<div className="flex gap-[2px]">
							<span className="text-[#CD9027]  font-[800]">&middot;</span>
							<span className="text-[#4285F4] font-[800]">&middot;</span>
						</div>{' '}
						<span className="text-[14px] font-[500]">Summary Needs Improvement</span>
					</div>

					<div className="flex flex-col text-[14px] gap-2">
						{FixSummaryData &&
							FixSummaryData.issues.map((issue) => (
								<div
									className={`issue_container text-[14px] ${issue.title === 'Issue Detected' ? 'bg-[#FFFBF5]' : ''}`}
									key={issue?.title}
								>
									<div className="font-medium ">{issue?.title}</div>
									{issue?.title === 'Issue Detected' && (
										<ul className="font-[400] text-[14px] list-disc">
											{allIssues.map((issue, index) => (
												<li key={index}>{issue}</li>
											))}
										</ul>
									)}
									{issue?.title === 'Why This Is Important' && (
										<div className="font-[400] text-[14px]">
											{fixes?.whyTheImprovementIsImportant}
										</div>
									)}
									{issue?.title === 'How to Improve' && (
										<div className="font-[400] text-[14px]">
											{fixes?.howToImprove}
										</div>
									)}
									{/* If there are sub-items in an issue, render them as a list */}
									{/* {issue?.items && (
                    <ul className="p-0">
                      {issue?.items.map((item) => (
                        <li
                          key={item.title}
                          className=" list-none tracking-tight "
                        >
                          <span className="font-[500] tracking-tight">
                            {item.title}:{' '}
                          </span>
                          {item.desc}
                        </li>
                      ))}
                    </ul>
                  )} */}
								</div>
							))}
					</div>
				</TimelineContent>
			</TimelineItem>

			{/* Buddy Summary */}
			<TimelineItem>
				<TimelineSeparator>
					<TimelineDot>
						<img
							src={FIX_BUDDY}
							height={40}
							width={40}
							className=" w-8 h-8 md:w-[40px] md:h-[40px] "
						/>
					</TimelineDot>
					<TimelineConnector />
				</TimelineSeparator>
				<TimelineContent>
					<Typography className="text-[14px] font-[500]">
						Buddy&apos;s Suggestion
					</Typography>
					<div className="font-[400] text-[14px] tracking-tight">
						<ul>
							{allSuggestions?.map((suggestion, index) => (
								<li key={index}>{suggestion}</li>
							))}
						</ul>
					</div>
				</TimelineContent>
			</TimelineItem>

			{/* Updated Summary */}
			<TimelineItem>
				<TimelineSeparator>
					<TimelineDot>
						<div className="flex justify-center items-center p-[10px] w-8 h-8 md:w-[40px] md:h-[40px] rounded-full updated_shadow">
							<img src={UPDATED_ICON} height={20} width={20} />
						</div>
					</TimelineDot>
				</TimelineSeparator>
				<TimelineContent className="flex flex-col gap-3">
					<div className="text-[14px] font-medium">Updated Summary</div>
					<div className="text-[14px] p-3 bg-[#EDFDED] rounded-lg text-[#121212A8]">
						{typeof fixes?.modifiedVersion === 'string' && (
							<div
								className="w-full [&>pre]:text-wrap [&>pre]:w-[525px] "
								dangerouslySetInnerHTML={{
									__html: marked(fixes?.modifiedVersion),
								}}
							/>
						)}
					</div>
					<div className="flex w-full justify-end">
						<Button
							variant=""
							onClick={handleUpdateWithAi}
							className="btn-gradient h-[36.5px] cursor-pointer normal-case text-[#1A1A1A]  justify-center items-center"
						>
							{isPending ? (
								<div className={`btn-loader border-4 h-5 w-5 `}></div>
							) : (
								<div className="flex items-center gap-2">
									<span className="flex justify-center items-center h-5 w-5">
										<StarIcon black />
									</span>
									<span className="text-[14px] ">Update with Ai</span>
								</div>
							)}
						</Button>
					</div>
				</TimelineContent>
			</TimelineItem>
		</Timeline>
	);
};
export default NavScrollBar;
