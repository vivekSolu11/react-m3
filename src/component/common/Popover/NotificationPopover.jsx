import React, { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';

const CustomTabPanel = ({ children, value, index }) => {
	return (
		<div hidden={value !== index} id={`simple-tabpanel-${index}`}>
			{value === index && <div>{children}</div>}
		</div>
	);
};

const data = [
	{
		title: 'New Feature Alert!1',
		desc: 'We’re pleased to introduce the latest enhancements in our templating experience.',
		isbutton: true,
		time: '14h',
	},
	{
		title: 'New Feature Alert!2',
		desc: 'We’re pleased to introduce the latest enhancements in our templating experience.',
		isbutton: false,
		time: '14h',
	},
	{
		title: 'New Feature Alert!3',
		desc: 'We’re pleased to introduce the latest enhancements in our templating experience.',
		isbutton: false,
		time: '14h',
	},
	{
		title: 'New Feature Alert!45',
		desc: 'We’re pleased to introduce the latest enhancements in our templating experience.',
		isbutton: false,
		time: '14h',
	},
	{
		title: 'New Feature Alert!4',
		desc: 'We’re pleased to introduce the latest enhancements in our templating experience.',
		isbutton: true,
		time: '14h',
	},
	{
		title: 'New Feature Alert!6',
		desc: 'We’re pleased to introduce the latest enhancements in our templating experience.',
		isbutton: false,
		time: '14h',
	},
	{
		title: 'New Feature Alert!7',
		desc: 'We’re pleased to introduce the latest enhancements in our templating experience.',
		isbutton: false,
		time: '14h',
	},
];

const Item = ({ title, desc, isbutton, time }) => {
	return (
		<div className="flex items-start justify-between p-6 px-2">
			<div className="flex flex-col max-w-[356px] w-full  text-[14px] gap-2">
				<div className="text-[#121212] font-[600]">{title}</div>
				<div className="text-[#1A1A1A] font-[400]">{desc}</div>
				{isbutton && (
					<PrimaryButton
						btnClassName="!px-3 !py-[6px] !text-[14px] !"
						buttonText="Try now"
					/>
				)}
			</div>
			<div className="flex flex-col justify-center items-center">
				<div className="text-[#121212A8] text-[12px]">{time}</div>
				<span className="text-[#121212] font-[600] text-[20px] ">&#8230;</span>
			</div>
		</div>
	);
};

const Number = ({ number = 2 }) => {
	return <div className="px-2 py-1  bg-[#22B827] text-white rounded-full">{number}</div>;
};
const NotificationPopover = ({ height }) => {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<div>
			<div className="flex md:pt-4 pb-6 px-2 items-center justify-between">
				<div className="font-[600] text-[20px]  text-[#121212] ">Notifications</div>
				<div className="text-[#0E8712] font-[500]  text-[14px] tracking-tight">
					Mark all as read
				</div>
			</div>
			<Tabs
				sx={{
					padding: 0,
					minHeight: 40,
					'& .MuiTab-root': {
						minHeight: 32,
						padding: 0,
					},
				}}
				value={value}
				onChange={handleChange}
				aria-label="basic tabs example"
			>
				<Tab
					icon={<Number />}
					iconPosition="end"
					className="text-[14px] gap-1 flex font-[500] tracking-tight"
					label="All"
				/>
				<Tab className="text-[14px] font-[500] tracking-tight" label="Unread" />
			</Tabs>
			<div className={`h-[500px] ${height}  overflow-y-auto`}>
				<CustomTabPanel value={value} index={0}>
					<div>
						{data?.length &&
							data.map((item) => (
								<Item
									key={item.title}
									title={item.title}
									desc={item.desc}
									time={item.time}
									isbutton={item.isbutton}
								/>
							))}
					</div>
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
					Item Twodwqd
				</CustomTabPanel>
			</div>
		</div>
	);
};

export default NotificationPopover;
