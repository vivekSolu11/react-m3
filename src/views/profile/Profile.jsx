import { useQuery } from '@tanstack/react-query';
import { useQueryAPI } from 'apis/query';
import { EditProfileSection, ProfileResumeDetail } from 'component/index';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateAllEducation } from 'store/reducer/resume/educationSlice';
import { updateAllSkill } from 'store/reducer/resume/skillSlice';
import { updateAllExperienceExperience } from 'store/reducer/resume/workExperienceSlice';

const Profile = () => {
	const { fetchUserDetails } = useQueryAPI();
	const dispatch = useDispatch();
	// const resumeDetails = useSelector(
	//   (state) => state?.common?.userDetails?.resume,
	// );

	const { authToken } = useSelector((state) => state.auth);
	const { data } = useQuery({
		queryKey: ['userDetails'],
		queryFn: () => fetchUserDetails(),
		enabled: !!authToken,
	});

	useEffect(() => {
		if (data?.items?.profile?.resume?.detail?.workExperience?.length) {
			dispatch(
				updateAllExperienceExperience(data?.items?.profile?.resume?.detail?.workExperience)
			);
		}

		if (data?.items?.profile?.resume?.detail?.education?.length) {
			dispatch(updateAllEducation(data?.items?.profile?.resume?.detail?.education));
		}

		if (data?.items?.profile?.resume?.detail?.skills?.length) {
			dispatch(updateAllSkill(data?.items?.profile?.resume?.detail?.skills));
		}
	}, [data]);

	return (
		<div className="flex h-[calc(100vh-106px)] overflow-y-auto flex-col gap-4">
			<EditProfileSection />
			<ProfileResumeDetail />
		</div>
	);
};

export default Profile;
