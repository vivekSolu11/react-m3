import React from 'react';

import { Mission, Product, Career, OurVision, UnauthLayout } from 'component/index';

const AboutUs = () => {
	return (
		<UnauthLayout className="lg:mt-20 mt-14">
			<Mission />
			<Product />
			<Career />
			<OurVision />
		</UnauthLayout>
	);
};

export default AboutUs;
