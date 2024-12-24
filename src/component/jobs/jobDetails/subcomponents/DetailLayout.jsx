import React from 'react';

const DetailLayout = ({ children, className, id }) => {
	return (
		<section
			id={id}
			className={` pt-[24px] md:pt-[20px] pb-[16px] md:pb-[24px] md:px-[24px] px-[16px] flex flex-col gap-8 ${className}`}
		>
			{children}
		</section>
	);
};

export default DetailLayout;
