import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { BackArrow } from 'assets/index';

const AccordianTab = ({
	key,
	title,
	expanded,
	onChange,
	children,
	sx,
	summeryclassName,
	borderBottom = true,
}) => {
	return (
		<Accordion
			className="shadow-none"
			disableGutters
			elevation={0}
			sx={{
				boxShadow: 'none',
				mb: '20px',
				borderBottom: borderBottom ? '1px solid #E6E6E6' : 'none',
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
				...sx,
			}}
			expanded={expanded}
			onChange={onChange}
		>
			<AccordionSummary
				className={`p-0 border-none bg-white ${summeryclassName}`}
				aria-controls={key}
				expandIcon={
					<div className=" rotate-icon  flex items-center justify-center rounded-full">
						<BackArrow />
					</div>
				}
				id={key}
			>
				<Typography className="  text-base font-[500] -tracking-[0.02rem] ">
					{title}
				</Typography>
			</AccordionSummary>
			<AccordionDetails className="p-0 bg-white flex gap-6 flex-col">
				{children}
			</AccordionDetails>
		</Accordion>
	);
};

export default AccordianTab;
