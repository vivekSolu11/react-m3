import React from 'react';

import { faqData } from 'constants/faqQuestions';
import { FAQ } from 'component';

const JobFAQ = () => {
	return (
		<div className="flex flex-col gap-8 md:pr-3 bg-white  w-full ">
			<div className="flex flex-col gap-2">
				<div className="text-xl font-medium">Frequently Asked Questions</div>
				<div className="text-lightText text-[12px]">
					Explore our Frequently Asked Questions to find answers to common queries about
					the subscription model.
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
						ansText={'text-[12px]'}
						quesText={'text-[14px]'}
					/>
				))}
			</div>
		</div>
	);
};

export default JobFAQ;
