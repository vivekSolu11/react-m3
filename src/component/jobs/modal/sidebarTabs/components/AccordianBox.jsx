import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React, { useState } from 'react';

const AccordianBox = ({ data }) => {
	const [expanded, setExpanded] = useState(false);
	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};
	return (
		<>
			{data.map((item, index) => (
				<Accordion
					className="shadow-none"
					key={index}
					disableGutters
					elevation={0}
					sx={{
						boxShadow: 'none',
						mb: '20px',
						borderTop: index === 0 ? 'transparent' : '1px solid rgba(230, 230, 230, 1)',
						'&.MuiAccordion-root::before ': {
							background: 'none',
						},
						'&:first-of-type': {
							border: 'none ',
						},
						'&.MuiAccordion-root': {
							marginTop: '0px',
							marginBottom: '0px',
						},
					}}
					expanded={expanded === index}
					onChange={handleChange(index)}
				>
					<AccordionSummary
						className="px-2 border-none  bg-white "
						expandIcon={
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8.00001 11.2004C7.53335 11.2004 7.06668 11.0204 6.71335 10.6671L2.36668 6.32042C2.17335 6.12708 2.17335 5.80708 2.36668 5.61375C2.56001 5.42042 2.88001 5.42042 3.07335 5.61375L7.42001 9.96042C7.74001 10.2804 8.26001 10.2804 8.58001 9.96042L12.9267 5.61375C13.12 5.42042 13.44 5.42042 13.6333 5.61375C13.8267 5.80708 13.8267 6.12708 13.6333 6.32042L9.28668 10.6671C8.93335 11.0204 8.46668 11.2004 8.00001 11.2004Z"
									fill="#292D32"
								/>
							</svg>
						}
						aria-controls={`panel${index}-content`}
						id={`panel${index}-header`}
					>
						<Typography className="flex gap-2 text-[14px] font-[500] -tracking-[0.02rem] ">
							<div className="h-6 w-6 rounded-full flex items-center justify-center text-primary bg-[#edfded]">
								{index + 1}
							</div>
							{item?.question || item?.title}
						</Typography>
					</AccordionSummary>
					<AccordionDetails className="px-2 bg-[#F5F5F5] md:bg-white pb-[20px]">
						<Typography className="text-[12px] text-[#666666]">
							{item?.answer || item?.description}
						</Typography>
					</AccordionDetails>
				</Accordion>
			))}
		</>
	);
};

export default AccordianBox;
