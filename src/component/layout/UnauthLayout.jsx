import React from 'react';

const UnauthLayout = ({ children, className }) => {
	return <div className={`max-w-[1200px] m-auto mt-8 px-4 xl:px-0 ${className}`}>{children}</div>;
};

export default UnauthLayout;
