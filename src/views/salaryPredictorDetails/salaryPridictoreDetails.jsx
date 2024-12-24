import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import { useQueryAPI } from 'apis/query';
import SalaryDetailsBox from 'component/salaryPridictore/SalaryDetailsBox/SalaryDetailsBox';
import SalaryDetailsHeader from 'component/salaryPridictore/SalaryDetailsHeader/SalaryDetailsHeader';

const SalaryPredictorDetails = () => {
	const { fetchSalaryDetails } = useQueryAPI();
	const { selectedJobTitle, selectedCompany, selectedLocation } = useSelector(
		(state) => state.salary
	);
	// Function to fetch data on click
	const fetchData = () => {
		const params = {
			designation: selectedJobTitle?._id,
			company: selectedCompany?._id,
			location: selectedLocation?.city,
		};
		return fetchSalaryDetails(params);
	};

	const { data, refetch, isFetching, isLoading, isPending } = useQuery({
		queryKey: ['fetchSalaryDetails'],
		staleTime: 300000,
		queryFn: fetchData,
	});
	useEffect(() => {
		refetch();
	}, []);
	return (
		<main className="h-full overflow-y-auto overflow-hide mb-6 flex flex-col gap-4 ">
			<SalaryDetailsHeader />
			<SalaryDetailsBox
				resData={data?.data}
				refetch={refetch}
				loading={isFetching || isLoading || isPending}
			/>
		</main>
	);
};

export default SalaryPredictorDetails;
