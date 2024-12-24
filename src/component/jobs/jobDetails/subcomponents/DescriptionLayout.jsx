import React from 'react';

const DescriptionLayout = ({ icon, title, body }) => {
	return (
		<div className="w-full max-w-[763px]  ">
			<div className="flex  items-center gap-[8px] ">
				<div className=" flex items-center">{icon}</div>
				<div className="text-[20px] font-[500] flex items-center">{title}</div>
			</div>
			<section className="w-full mt-3">{body}</section>
		</div>
	);
};

export default DescriptionLayout;
