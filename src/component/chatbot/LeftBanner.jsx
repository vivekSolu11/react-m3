import React from 'react';
import { useSelector } from 'react-redux';

import { COMPANY_DEFAULT } from 'assets/images';

const LeftBanner = () => {
	const { jobTags } = useSelector((state) => state.common);

	const rows = [0, 1, 2, 3]; // 4 rows

	function shuffleArray(array) {
		const newArray = [...array]; // Create a copy of the array

		// Fisher-Yates shuffle algorithm
		for (let i = newArray.length - 1; i > 0; i--) {
			const randomIndex = Math.floor(Math.random() * (i + 1));
			[newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]]; // Swap
		}

		return newArray;
	}

	return (
		<div className="w-full max-w-[700px] bg-chatsidebanner justify-between h-full rounded-3xl hidden lg:flex  flex-col pt-[84px] ">
			<div className="flex flex-col justify-center gap-1 items-center self-center text-3xl text-zinc-800">
				<div>We have found</div>
				<div className="mt-1 text-6xl font-semibold text-stone-950 max-md:text-4xl">
					{jobTags?.jobCount > 1000 ? `${jobTags?.jobCount}+` : '1000+'}
				</div>
				<div>jobs for you</div>
			</div>
			<div className="moving-container">
				{rows.map((rowIndex) => (
					<div
						key={rowIndex}
						className={`moving-row ${
							rowIndex % 2 === 0 ? 'left-to-right' : 'right-to-left'
						}`}
					>
						<div className="tags-wrapper">
							{jobTags?.companies?.length > 15 &&
								shuffleArray(jobTags?.companies)
									?.slice(0, 25)
									?.map((tag) => (
										<div key={tag?.designations[0]} className="tag">
											<img
												className="logo"
												src={tag?.companyLogo || COMPANY_DEFAULT}
												height={32}
												width={32}
											/>
											<span className="text">{tag?.designations[0]}</span>
										</div>
									))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default LeftBanner;
