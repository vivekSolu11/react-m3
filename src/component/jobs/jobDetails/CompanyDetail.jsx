import { Box } from '@mui/material';
import React from 'react';

import DetailLayout from './subcomponents/DetailLayout';
import DescriptionLayout from './subcomponents/DescriptionLayout';
import CompanyDescription from './subcomponents/CompanyDescription';
import { CompanyDetailsIcon } from 'assets/index';

const CompanyDetail = () => {
	return (
		<Box id="CompanyDetail" className=" bg-white rounded-[12px] w-full mx-auto   ">
			<DetailLayout>
				<DescriptionLayout
					title="Company Details"
					body={<CompanyDescription />}
					icon={<CompanyDetailsIcon />}
				/>
			</DetailLayout>
		</Box>
	);
};

export default CompanyDetail;
