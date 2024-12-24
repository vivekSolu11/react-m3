import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import { minusIcon, plusIcon } from 'assets/images';

import './index.css';

const FaqAccordion = ({ ques, ans, index, quesText, ansText, color }) => {
	const [expanded, setExpanded] = useState(false);

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	return (
		<Accordion
			className="shadow-none   "
			key={index}
			disableGutters
			elevation={0}
			sx={{
				boxShadow: 'none',
				mb: '20px',
				borderTop: index === 0 ? 'transparent' : '1px solid rgba(230, 230, 230, 1)',
				'&.MuiAccordion-root::before': {
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
				className={`p-0 border-none bg-[#F5F5F5] md:bg-white ${color} `}
				expandIcon={
					<div className="accordionIcon_border flex items-center justify-center rounded-full">
						<img src={expanded === index ? minusIcon : plusIcon} alt="Toggle Icon" />
					</div>
				}
				aria-controls={`panel${index}-content`}
				index={`panel${index}-header`}
			>
				<Typography className={` font-[500] -tracking-[0.02rem] ${quesText} `}>
					{ques}
				</Typography>
			</AccordionSummary>
			<AccordionDetails className={`p-0 bg-[#F5F5F5] md:bg-white pb-[20px] ${color}`}>
				<Typography className={`text-[#666666] ${ansText}`}>{ans}</Typography>
			</AccordionDetails>
		</Accordion>
	);
};

export default FaqAccordion;
