import React from 'react';

import { NORESULT } from 'assets/images';

const NoResultFound = ({ className, showResult = true }) => {
	return (
		<div
			className={`max-w-[328px] gap-5 md:max-w-[763px] w-full md:gap-6 flex flex-col ${className}`}
		>
			<div className="flex justify-center items-center">
				<img
					src={NORESULT}
					alt="No Result"
					className="max-w-[268px] rounded-[12px]  md:max-w-[475px] w-full md:h-auto md:rounded-[12px]"
				/>
			</div>
			<div className="text-center flex flex-col gap-2">
				<span className="text-base font-medium md:text-2xl -tracking-[0.02em] text-[#1A1A1A]">
					No results found...
				</span>
				{showResult && (
					<span className="text-xs font-normal md:text-sm -tracking-[0.02em] text-[#666666]">
						Finding the perfect fit takes time.Let&apos;s keep searching and personalize
						your profile for even better matches.
					</span>
				)}
			</div>
		</div>
	);
};

export default NoResultFound;
