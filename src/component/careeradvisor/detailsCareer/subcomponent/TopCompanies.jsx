import React from 'react';

import '../../../careeradvisor/career.css';
import { useQueryAPI } from 'apis/query';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { convertSalaryToLPA } from 'utils/common';

const TopCompanies = () => {
	const { fetchTopCompanies } = useQueryAPI();

	const { selectedRole } = useSelector((state) => state.careerAdvisor);

	const { data } = useQuery({
		queryKey: ['fetchTopCompanies', selectedRole],
		staleTime: 300000,

		queryFn: () => fetchTopCompanies(selectedRole?.jobRole?.title || ''), // Pass pageParam for pagination
	});
	const resData = data?.data?.data?.items;
	if (!(resData?.length > 0)) return null;
	return (
		<div className="mt-6">
			<h2 className="text-sm font-medium text-[#000000] m-0">
				Top companies hiring for this role
			</h2>
			{/* Add the external CSS class for table styling */}
			<table className="top-companies-table min-w-full mt-4">
				<thead>
					{/* The border between thead and tbody will be applied via external CSS */}
					<tr className="text-xs font-medium tracking-tight text-[#666666]">
						<th className="px-4 py-4 text-left">Company</th>
						<th className="px-4 py-4 text-left">Experience</th>
						<th className="px-4 py-4 text-left">Salary</th>
					</tr>
				</thead>
				<tbody>
					{resData?.map(({ _id, CompanyName, experienceRange, salaryRange }) => (
						<tr key={_id}>
							<td className="px-4 py-4 text-sm font-medium tracking-tight text-[#121212]">
								{CompanyName}
							</td>
							<td className="px-4 py-4">
								<span className="text-sm font-medium tracking-tight text-[#121212]">
									{experienceRange?.[0]?.from}-{experienceRange?.[0]?.to}
								</span>
								<span className="text-sm font-normal text-[#121212]"> yrs</span>
							</td>
							<td className="px-4 py-4">
								<span className="text-sm font-medium tracking-tight text-[#121212]">
									₹{convertSalaryToLPA(salaryRange?.[0]?.min)}-
									{convertSalaryToLPA(salaryRange?.[0]?.max)}
								</span>{' '}
								<span className="text-sm font-normal text-[#121212]">LPA</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TopCompanies;
