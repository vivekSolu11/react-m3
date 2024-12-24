import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';

import { faqData } from 'constants/faqQuestions';
import { FAQ_MINUS, FAQ_PLUS } from 'assets/images';

import './FAQ.css';

export default function AccordionExpandIcon() {
	const [expanded, setExpanded] = useState(false);
	const [showAll, setShowAll] = useState(false); // State to control showing all FAQs

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	const toggleShowAll = () => {
		setShowAll(!showAll); // Toggle between showing all and showing less
	};

	// Determine the number of FAQs to show based on "showAll" state
	const visibleFaqs = showAll ? faqData : faqData.slice(0, 3); // Show all or only the first 3

	return (
		<section
			id="faq"
			className="md:mt-[120px] rounded-[12px] p-4 md:p-0 bg-[#F5F5F5] md:bg-white"
		>
			<Box className="flex justify-center flex-col gap-2 md:items-center mb-6">
				<Box className="text-[64px] hidden md:block font-[600] w-full text-center">
					FAQ(s)
				</Box>
				<Box className="text-[20px] leading-[28px] font-[500] md:hidden text-[#1A1A1A]">
					Frequently Asked Questions
				</Box>

				<Box className="  md:mb-[80px] text-black/60 md:text-center md:text-[20px] text-[14px] leading-[21px] font-[500] box-border max-w-[794px] w-full">
					Explore our FAQs to find detailed answers to common questions and learn how to
					get the most out of our platform.
				</Box>
			</Box>

			{visibleFaqs.map((item, index) => (
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
						className="p-0 border-none bg-[#F5F5F5] md:bg-white"
						expandIcon={
							<div className="accordionIcon_border  flex items-center justify-center rounded-full">
								<img
									src={expanded === index ? FAQ_MINUS : FAQ_PLUS}
									alt="toggle-icon"
								/>
							</div>
						}
						aria-controls={`panel${index}-content`}
						id={`panel${index}-header`}
					>
						<Typography className=" md:text-[24px] text-[14px] text-[#1A1A1A] font-[500] -tracking-[0.02rem] ">
							{item.question}
						</Typography>
					</AccordionSummary>
					<AccordionDetails className="p-0 bg-[#F5F5F5] md:bg-white pb-[20px]">
						<Typography className="text-[14px] md:text-[16px] text-[#666666]">
							{item.answer}
						</Typography>
					</AccordionDetails>
				</Accordion>
			))}

			{/* View All / View Less Button */}
			<Box className="hidden md:flex justify-center mt-[80px]">
				<Button
					variant="contained"
					className="bg-prim-sol font-[500] text-[16px] fw500 text-black normal-case shadow-none h-[48px]"
					onClick={toggleShowAll} // Handle the toggle on click
				>
					{showAll ? 'View Less' : 'View All'}
				</Button>
			</Box>
		</section>
	);
}
