import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMutationAPI } from 'apis/mutation';
import { BRIFECASE_ICON, SEARCH_IMG, STAR_ICON } from 'assets/images';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateJobTitle } from 'store/reducer/filters/jobListFilters';

const JobBanner = () => {
	const { selectedDesiredPosition } = useSelector((state) => state.careerAdvisor);
	const { updatePreference } = useMutationAPI();
	const { jobListType } = useSelector((state) => state.common);
	const queryClient = useQueryClient();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { mutate } = useMutation({
		mutationFn: (val) => updatePreference(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries([
					`fetch${jobListType?.charAt(0)?.toUpperCase() + jobListType.slice(1)}Jobs`,
					'userDetails',
				]);
				navigate('/jobs');
			}
		},
	});
	const handleUpdatePreference = () => {
		const payload = {
			jobSeekerInfo: {
				designation: selectedDesiredPosition ?? null,
			},
		};

		mutate(payload);
	};

	return (
		<div
			className="flex flex-col md:flex-row justify-between md:items-center bg-[#76FF7A] text-black rounded-lg gap-3 p-6 mx-4 mb-4 mt-10"
			style={{
				backgroundImage: `url(${SEARCH_IMG})`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'right bottom', // Adjust position as needed
				backgroundSize: '100px 100px', // Adjust size as needed
			}}
		>
			{/* Left Section: Icon and Text */}
			<div className="flex items-center justify-center space-x-2">
				<img src={BRIFECASE_ICON} alt="icon" className="text-gray-700 text-xl" />
				<span className="text-sm font-medium text-[#1A1A1A]">
					Job openings for {selectedDesiredPosition?.name}
				</span>
			</div>

			{/* Right Section: Button */}
			<button
				onClick={() => {
					dispatch(updateJobTitle(selectedDesiredPosition?._id));
					handleUpdatePreference();
				}}
				className="border-[#60DD64] cursor-pointer rounded px-5 py-[10px] bg-[#FFFFFFE5] items-center w-fit flex gap-2 "
			>
				<img src={STAR_ICON} alt="btnicon" className="mr-2" />
				<span className="text-sm font-medium tracking-tight text-[#0E8712]">See Jobs</span>
			</button>
		</div>
	);
};

export default JobBanner;
