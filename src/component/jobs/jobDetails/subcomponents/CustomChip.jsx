import React from 'react';
import { Avatar, Chip } from '@mui/material';

const CustomChip = ({ item, icon = null }) => {
	return (
		<Chip
			sx={{
				backgroundColor: '#F5F9FF',
				borderRadius: '4px',
				padding: 0,
				'& .MuiChip-label': {
					paddingLeft: '0px',
					paddingRight: '0px',
				},
			}}
			className="text-[#0E3C87] py-1 font-[500] text-[11px]  px-[8px] md:px-[12px]"
			avatar={icon ? <Avatar className="w-[16px] h-[16px] mx-[4px]" src={icon} /> : null}
			label={item}
		/>
	);
};

export default CustomChip;
