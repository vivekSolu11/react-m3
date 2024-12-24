import React, { useState } from 'react';
import { Tabs, Tab, Box, Button } from '@mui/material';
import NavScrollBar from './subComponents/NavScrollBar';
import './index.css';

const CustomTabs = () => {
	const [selectedTab, setSelectedTab] = useState(0);

	const handleChange = (event, newValue) => {
		setSelectedTab(newValue);
	};

	return (
		<Box
			//  sx={{ width: '100%' }}

			className="pl-6  "
		>
			<Tabs
				value={selectedTab}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons={false}
				aria-label="scrollable auto tabs example"
				TabIndicatorProps={{
					style: {
						display: 'none',
					},
				}}
				className=" tabs_Container rounded-l-full sm:rounded-full inline-flex mb-6 !h-[41px]"
				sx={{
					background: '#E6E6E6',
					'& .MuiTab-root': {
						textTransform: 'none',

						padding: '8px 24px',
						borderRadius: '30px', // Rounded corners for tabs
						backgroundColor: '#E6E6E6', // Default background color for tabs
						fontWeight: 500,
						'&.Mui-selected': {
							backgroundColor: '#121212', // Background color when tab is selected
							color: '#fff',
							fontWeight: 600, // White text when selected
							padding: '10px 24px',
						},
						'& .MuiButtonBase-root-MuiTab-root': {
							height: '41px',
						},
					},
				}}
			>
				<Tab label="Overall" />
				<Tab label="Bullet 1" />
				<Tab label="Bullet 2" />
				<Tab label="Bullet 3" />
				<Tab label="Bullet 4" />
			</Tabs>
		</Box>
	);
};

const FixExperience = ({ onClose }) => {
	return (
		<div>
			<div className="pt-[40px] h-[calc(100vh-186px)] overflow-y-auto">
				<CustomTabs />
				<NavScrollBar />
			</div>
			<div className="flex w-full ai-container justify-end py-[16px] px-[40px] ">
				<Button
					variant="contained"
					className="shadow-none bg-prim-sol normal-case px-[15px] py-[20px] h-[46px]"
					onClick={onClose}
				>
					Submit Updated Version
				</Button>
			</div>
		</div>
	);
};

export default FixExperience;
