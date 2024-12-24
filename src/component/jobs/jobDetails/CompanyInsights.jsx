import { Box } from '@mui/material';
import React from 'react';
import DetailLayout from './subcomponents/DetailLayout';
import DescriptionLayout from './subcomponents/DescriptionLayout';
import InsightsDescription from './subcomponents/InsightsDescription';
import { CompanyInsightIcon } from 'assets/index';

const CompanyInsights = () => {
	return (
		<Box id="CompanyInsights" className=" bg-white rounded-[12px] w-full mx-auto    ">
			<DetailLayout>
				<DescriptionLayout
					title={'Company Insight'}
					body={<InsightsDescription />}
					icon={<CompanyInsightIcon />}
				/>
			</DetailLayout>
		</Box>
	);
};

export default CompanyInsights;
