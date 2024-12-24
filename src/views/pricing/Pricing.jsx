import { PricingFaq, Pricingheader, PricingSlider } from 'component/index';

import React from 'react';

const Pricing = () => {
	return (
		<div className="h-[calc(100vh-106px)] overflow-y-auto">
			<Pricingheader />
			<PricingSlider />
			<PricingFaq />
		</div>
	);
};

export default Pricing;
