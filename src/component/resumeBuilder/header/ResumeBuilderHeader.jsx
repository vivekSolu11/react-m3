import React from 'react';
import { useSelector } from 'react-redux';
import { Step, StepLabel, Stepper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { builderTabs } from 'constants/resumeBuilder';
import { LEFT_ARROW } from 'assets/images';

import styles from './resumeBuilderHeader.module.css';

const ResumeBuilderHeader = () => {
	const { builderActiveTab } = useSelector((state) => state.common);

	const navigate = useNavigate();

	return (
		<section className={styles.container}>
			<header className={styles.headerWrapper}>
				<img
					src={LEFT_ARROW}
					alt="Back Arrow"
					className={styles.headerIcon}
					onClick={() => navigate('/resume')}
				/>
				<h1 className={styles.headerText}>Create New Resume</h1>
			</header>

			<nav className={`${styles.stepsContainer} w-full lg:w-4/5 2xl:w-1/2`}>
				<Stepper
					activeStep={builderTabs?.find((item) => item.id === builderActiveTab)?.number}
					className="w-full"
					sx={{
						'& .Mui-completed': {
							color: 'rgba(34, 184, 39, 1) !important',
						},
						'& .MuiSvgIcon-root': {
							color: 'white',
						},
						'& .Mui-active': {
							color: 'black',
							'& .MuiStepIcon-text ': {
								fill: 'white',
							},
						},
					}}
					alternativeLabel
				>
					{builderTabs.map((label) => (
						<Step key={label.number}>
							<StepLabel>{label.text}</StepLabel>
						</Step>
					))}
				</Stepper>
			</nav>
		</section>
	);
};

export default ResumeBuilderHeader;
