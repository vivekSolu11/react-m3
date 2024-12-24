import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FixBox, NumberBox } from './NumberBox';
import { updateInfo } from 'store/reducer/resume/infoSlice';
import { addState } from 'store/sagaActions';
import { removeInfoError } from 'store/reducer/resume/errorSlice';

const Summery = () => {
	const dispatch = useDispatch();
	const info = useSelector((state) => state.info);
	const [wordCount, setWordCount] = useState(0);
	const { infoError } = useSelector((state) => state.resumeError);
	const { analysisData } = useSelector((state) => state.common);

	const maxWords = 100;
	const [summary, setSummary] = useState('');

	const handleUpdateSummary = (e) => {
		if (e.target.value) {
			dispatch(removeInfoError('summary'));
		}
		setSummary(e.target.value);
		dispatch(updateInfo({ summary: e.target.value }));
		const words = e.target.value.trim().split(/\s+/).filter(Boolean); // Split by whitespace and filter empty strings
		setWordCount(words.length);
	};

	const handleFixSummary = () => {
		dispatch(addState({ name: 'fixesTitle', value: 'Fixing Summary' }));
		dispatch(addState({ name: 'fixSummary', value: true }));
		dispatch(addState({ name: 'fixes', value: analysisData?.sections?.summary }));
	};

	useEffect(() => {
		if (info?.summary) {
			setSummary(info.summary);
			const words = info?.summary?.trim().split(/\s+/).filter(Boolean);
			setWordCount(words.length);
		} else {
			setSummary('');
		}
	}, [info]);

	return (
		<div className={`flex flex-col gap-2 px-2 summary-section`}>
			<div className="flex justify-between flex-wrap gap-2 ">
				<div className="flex  gap-4 items-center w-fit">
					<div className="text-xl font-medium w-fit">Summary</div>
					{/* <RemoveRedEyeOutlinedIcon sx={{ fill: '#CCCCCC' }} /> */}
				</div>
				<div className="flex w-full md:w-fit justify-end gap-2">
					<div className="flex gap-2 flex-wrap">
						{analysisData?.sections?.summary?.issuesCount?.optionalIssuesCount ? (
							<NumberBox
								number={1}
								count={
									analysisData?.sections?.summary?.issuesCount
										?.optionalIssuesCount
								}
							/>
						) : null}
						{analysisData?.sections?.summary?.issuesCount?.criticalIssuesCount ? (
							<NumberBox
								number={2}
								count={
									analysisData?.sections?.summary?.issuesCount
										?.criticalIssuesCount
								}
							/>
						) : null}
						{analysisData?.sections?.summary?.issuesCount?.urgentIssuesCount ? (
							<NumberBox
								number={3}
								count={
									analysisData?.sections?.summary?.issuesCount?.urgentIssuesCount
								}
							/>
						) : null}
					</div>

					<div className="flex items-center">
						{(analysisData?.sections?.summary?.issuesCount?.optionalIssuesCount ||
							analysisData?.sections?.summary?.issuesCount?.criticalIssuesCount ||
							analysisData?.sections?.summary?.issuesCount?.urgentIssuesCount) >
							0 && <FixBox handleFix={handleFixSummary} />}
					</div>
				</div>
			</div>
			<textarea
				rows={5}
				value={summary}
				placeholder="Write summary here..."
				onChange={handleUpdateSummary}
				className="w-full text-sm focus:outline-none border-none border-[#ffffff00] bg-[#ffffff00]"
			/>
			<div
				className="text-xs font-normal flex
      gap-2 "
			>
				<span className="self-end">{` ${wordCount}/${maxWords}`}</span>
				{wordCount > maxWords && (
					<span style={{ color: 'red' }}>
						{' '}
						- Please reduce word count to below {maxWords}.
					</span>
				)}
				{infoError?.summary ? (
					<span style={{ color: 'red' }}>{infoError?.summary}</span>
				) : null}
			</div>
		</div>
	);
};

export default Summery;
