// import { SECTION_EDIT } from 'assets/images';
import React from 'react';

const DetailItemlayout = ({ children }) => {
	return (
		<div className="flex justify-between">
			<div className="flex gap-3">{children}</div>

			<div> {/* <img src={SECTION_EDIT} alt="content edit icon" /> */}</div>
		</div>
	);
};

export default DetailItemlayout;
