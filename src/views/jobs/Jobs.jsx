import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { useMutationAPI } from 'apis/mutation';
import { Filterbar } from 'component/index';
import JobsCard from 'component/jobs/JobCard';
import CustomizeResumeSidebar from 'component/jobs/modal/CustomizeResumeSidebar';
import { removeState } from 'store/sagaActions';
import { useDispatch } from 'react-redux';

const Jobs = () => {
	const { userResume, userDetails } = useSelector((state) => state.common);

	const { updateProfile } = useMutationAPI();
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	const { mutate: updateProfileDetails, isPending: updateProfilePending } = useMutation({
		mutationFn: (val) => updateProfile(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries(['userDetails', 'fetchRecommendedJobs']);
			}
		},
	});

	useEffect(() => {
		if (userResume && userDetails) {
			let updatedResume = {};
			const firstName = userDetails?.profile?.name?.firstName;
			const lastName = userDetails?.profile?.name?.lastName;
			if (firstName) {
				updatedResume = {
					name: {
						firstName: firstName,
						lastName: lastName,
						fullName: `${firstName} ${lastName}`,
					},
					...userResume,
				};
			}
			updateProfileDetails(updatedResume);
			dispatch(removeState({ name: 'userResume' }));
		}
	}, [userResume, userDetails]);

	return (
		<div className="flex gap-2 flex-col xl:w-[calc(100vw-656px)] lg:w-[calc(100vw-300px)]">
			<Filterbar />
			{updateProfilePending ? (
				<div className="flex items-center justify-center h-[500px] w-full">
					<div className={`btn-loader border-4 border-[#14A019]`} />
				</div>
			) : (
				<JobsCard />
			)}
			<CustomizeResumeSidebar />
		</div>
	);
};

export default Jobs;
