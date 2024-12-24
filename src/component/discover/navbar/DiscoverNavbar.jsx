import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { updateCategory } from 'store/reducer/discover/discoverSlice';

const DetailsNavbar = () => {
	const dispatch = useDispatch();
	const { discoverData } = useSelector((state) => state.discover);

	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		dispatch(updateCategory(discoverData[newValue]));
	};

	return (
		<Box
			sx={{
				flexGrow: 1,
				display: 'flex',

				width: '100%',

				bgcolor: 'background.paper',
			}}
			className="w-full pl-4 md:p-0"
		>
			<Tabs
				value={value}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons={discoverData?.length > 5}
				aria-label="visible arrows tabs example"
				sx={{
					[`& .${tabsClasses.scrollButtons}`]: {
						'&.Mui-disabled': { opacity: 0.3 }, // Disabled state styling
						display: 'flex', // Default display
						'@media (max-width: 599.95px)': {
							display: 'flex', // Ensure it's still displayed on smaller screens
						},
					},
					'& .MuiTabs-flexContainer': {
						gap: '40px',
					},
					'& .MuiTab-root': {
						padding: '0px',
						minWidth: '0px',
					},
				}}
			>
				{discoverData?.length &&
					discoverData?.map((tab, i) => (
						<Tab
							key={tab._id || i}
							className="text-[14px] font-[500] tracking-tight"
							label={tab.name}
						/>
					))}
			</Tabs>
		</Box>
	);
};

export default DetailsNavbar;
