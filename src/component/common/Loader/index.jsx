import React from 'react';

const Loader = ({ className }) => {
	return (
		<div className={`flex items-center justify-center h-[150px] w-full ${className}`}>
			<div className={`btn-loader border-4 border-[#14A019]`} />
		</div>
	);
};

export default Loader;
