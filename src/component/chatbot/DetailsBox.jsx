import React from 'react';
import { useDispatch } from 'react-redux';
import { addState } from 'store/sagaActions';

const JobCard = ({ title, content, onClick }) => (
	<div
		onClick={onClick}
		className={`flex flex-col  shrink gap-2 p-3 bg-[#F5FFF5] rounded-lg border border-solid  border-[#0E87121F]  `}
	>
		<div className="text-xs font-medium tracking-tight text-zinc-900">{title}</div>
		<div className=" cursor-pointer shadow-sm text-sm text-primary rounded-bl-none border border-solid border-[#0E871240] rounded-lg bg-white px-3 py-2">
			“{content}”
		</div>
	</div>
);

const DetailsBox = ({ heading = '', points = [], onClose }) => {
	const dispatch = useDispatch();
	const onClick = (val) => {
		dispatch(addState({ name: 'sliderQues', value: val }));
		// navigate('/chat-with-bot');
		onClose();
	};
	return (
		<div className="flex flex-col gap-5">
			<div className="flex gap-2 text-sm font-medium items-center">
				<div className="h-2 w-2 bg-prim-sol rounded-lg"></div>
				{heading}
			</div>
			<main className="flex flex-wrap gap-3 items-start  w-full max-md:max-w-full">
				{points?.length > 0 &&
					points?.map((job, index) => (
						<JobCard
							key={index}
							onClick={() => {
								onClick(job.botQ);
							}}
							title={job.heading}
							content={job.botQ}
						/>
					))}
			</main>
		</div>
	);
};

export default DetailsBox;
