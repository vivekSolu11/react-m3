import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';

import { landiingTabs } from 'constants/initialValues';
import SliderBox from './SliderBox';

import './askbuddy.css';

function a11yProps(index) {
	return {
		id: `${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			className="w-full relative"
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ py: 3, overflow: 'hidden' }}>{children}</Box>}
		</div>
	);
}
const AskBuddy = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className="flex flex-col md:px-4 lg:px-0">
			<div className="text-base mb-[20px] md:text-2xl text-center md:text-[#121212] text-[#1A1A1A] leading-[22.4px]">
				Ask Buddy questions related to
			</div>
			<div className="flex flex-col items-center ">
				<Box sx={{ width: 'fit-content', borderBottom: 0, borderColor: 'divider' }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
						sx={{
							'& .Mui-selected': {
								fontWeight: 500, // selected tab text
							},
							'& .MuiTab-root': {
								color: 'var(--primary) !important',
								borderBottom: '1px solid #CCCCCC', // unselected tab border
								lineHeight: '19.6px',
							},
							'& .MuiTabs-indicator': {
								color: 'var(--primary) !important', // selected tab border
								backgroundColor: '#535353', // border color
								height: '1px', // border thickness
							},

							'& .Mui-selected.MuiTab-root': {
								borderBottom: 'none', // Remove border for selected tab
							},
						}}
					>
						{landiingTabs.map((item, i) => (
							<Tab
								key={item.key}
								className="tab capitalize  md:!px-4 md:text-base text-sm  text-[#666666]"
								label={item.name}
								{...a11yProps(i)}
							/>
						))}
					</Tabs>
				</Box>

				{landiingTabs.map((item, i) => (
					<CustomTabPanel index={i} key={landiingTabs[i].key} value={value}>
						{/* <div className="absolute white_grident block md:hidden   "></div> */}
						<SliderBox item={landiingTabs[i]} value={value} index={i} />
					</CustomTabPanel>
				))}
			</div>
		</div>
	);
};

export default AskBuddy;
