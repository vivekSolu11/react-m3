import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { StarIcon } from 'assets/index';

import Style from './editTemplateList.module.css';

const color = {
	1: {
		color: '#4285F4',
		text: 'Optional',
	},
	2: {
		color: '#FF9518',
		text: 'Critical',
	},
	3: {
		color: '#CD2735',
		text: 'Urgent',
	},
};
export const NumberBox = ({ number, count }) => {
	const [typeAnalyzer, setTypeAnalyzer] = useState(false);
	const router = useLocation();
	useEffect(() => {
		if (router.pathname === '/resume/report') {
			setTypeAnalyzer(true);
		}
	}, [router.pathname]);

	const Color = color[number].color;
	const Text = color[number].text;
	return (
		<div
			className={`${Style.numberBox} ${Style.improvement_body}   `}
			style={{ borderColor: `${Color}40`, background: `${Color}1A` }}
		>
			<div style={{ background: `${Color}` }} className={`${Style.Dot} flex gap-1`}></div>
			{count || 0}
			{typeAnalyzer && <span className=" flex  font-medium text-[12px]">{Text}</span>}
		</div>
	);
};
export const FixBox = ({ handleFix, ...props }) => {
	return (
		<div
			{...props}
			onClick={handleFix}
			className={`${Style.Fix} ${Style.numberBox} bg-prim-grad cursor-pointer`}
		>
			<StarIcon black /> Fix
		</div>
	);
};
