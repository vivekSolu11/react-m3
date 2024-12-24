import React, { useEffect, useState } from 'react';
import { faqData } from 'constants/faqQuestions';
import { FAQ } from 'component';
import { SearchBarIcon } from 'assets/index';

const HelpSupport = () => {
	const [placeholder, setPlaceholder] = useState('Search...');

	useEffect(() => {
		const updatePlaceholder = () => {
			if (window.innerWidth < 640) {
				setPlaceholder('Search');
			} else {
				setPlaceholder('Search for any query');
			}
		};

		updatePlaceholder();

		window.addEventListener('resize', updatePlaceholder);

		return () => {
			window.removeEventListener('resize', updatePlaceholder);
		};
	}, []);
	return (
		<div className="flex flex-col gap-8 p-4 bg-white rounded-[12px] w-full mx-auto max-w-[779px]">
			<div className="flex flex-col gap-2">
				<div className="text-xl font-medium">Frequently Asked Questions</div>
				<div className="text-lightText text-[14px]">
					Explore our Frequently Asked Questions to find answers to common queries about
					the subscription model.
				</div>
			</div>
			<div className="relative md:w-[443px]">
				<input
					placeholder={placeholder}
					type="text"
					className="px-[16px] text-[14px] font-normal w-full py-[12px] outline-none  rounded-[4px] sm:rounded-full border-none bg-[#F2F2F2] "
				></input>
				<div>
					<SearchBarIcon
						className=" w-[20px] h-[20px] p-[2.5px] absolute top-[10px] right-4 stroke-[#22B827] md:stroke-[#666666] "
						strokeColor={''}
					/>
				</div>
			</div>
			<div>
				{faqData.map((item, index) => (
					<FAQ
						color="bg-white"
						key={item.question}
						ans={item.answer}
						ques={item.question}
						id={index}
						ansText={'text-[14px]'}
						quesText={'text-[16px]'}
					/>
				))}
			</div>
		</div>
	);
};

export default HelpSupport;
