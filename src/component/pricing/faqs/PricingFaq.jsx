import { FAQ } from 'component/index';
import { faqData } from 'constants/faqQuestions';
import React from 'react';

const PricingFaq = () => {
	return (
		<div className="flex flex-col gap-8 p-6 bg-white rounded-[12px] w-full mx-auto">
			<div className="flex flex-col gap-2">
				<div className="text-xl font-medium">Pricing FAQ&apos;S</div>
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

export default PricingFaq;
