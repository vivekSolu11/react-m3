import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMutationAPI } from 'apis/mutation';
import { useQueryAPI } from 'apis/query';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateAllEducation } from 'store/reducer/resume/educationSlice';
import { updateAllSkill } from 'store/reducer/resume/skillSlice';
import { updateAllExperienceExperience } from 'store/reducer/resume/workExperienceSlice';

const DetailHeading = ({ heading, handleEdit, edit }) => {
	const educationData = useSelector((state) => state?.education);
	const [discard, setDiscard] = useState(false);
	const workExperience = useSelector((state) => state?.workExperience);
	const skills = useSelector((state) => state?.skills);
	const { userDetails } = useSelector((state) => state?.common);

	const { updateProfile } = useMutationAPI();
	const queryClient = useQueryClient();
	const { fetchUserDetails } = useQueryAPI();
	const dispatch = useDispatch();
	const { authToken } = useSelector((state) => state.auth);
	const { data } = useQuery({
		queryKey: ['userDetails'],
		queryFn: () => fetchUserDetails(),
		enabled: !!authToken,
	});

	const { mutate: updateProfileDetails } = useMutation({
		mutationFn: (val) => updateProfile(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries(['userDetails']);
			}
		},
	});

	const reqpayload = {
		resume: {
			file: userDetails?.profile?.resume?.file,
			detail: {
				education: educationData?.map((item) => ({
					degree: item.degree,
					duration: item.duration,
					fieldOfStudy: item.fieldOfStudy,
					instituteName: item.instituteName,
				})),
				workExperience: workExperience?.map((item) => ({
					designation: item.designation,
					company: item.company,
					duration: {
						from: item.duration.from || '',
						tillNow: item.duration.tillNow,
						...(item.duration.to ? { to: item.duration.to } : {}),
					},
					location: item.location,
					bulletPoint: item.bulletPoint,
				})),
				skills: skills,
			},
		},
	};

	const handleClick = () => {
		handleEdit();
	};
	const handleSaveClick = () => {
		updateProfileDetails(reqpayload);
		handleEdit();
	};
	const handleDiscard = () => {
		setDiscard((prev) => !prev);
		handleEdit();
	};

	useEffect(() => {
		if (data?.items?.profile?.resume?.detail?.workExperience) {
			dispatch(
				updateAllExperienceExperience(data?.items?.profile?.resume?.detail?.workExperience)
			);
		}
		if (data?.items?.profile?.resume?.detail?.education) {
			dispatch(updateAllEducation(data?.items?.profile?.resume?.detail?.education));
		}
		if (data?.items?.profile?.resume?.detail?.skills) {
			dispatch(updateAllSkill(data?.items?.profile?.resume?.detail?.skills));
		}
	}, [discard]);

	return (
		<div className=" flex justify-between">
			<div className="text-[#1A1A1A] font-[500] ">{heading}</div>
			<div className="flex gap-3">
				{edit ? (
					<div className="flex gap-3">
						<div
							className="text-[#0E8712] font-[500] text-[14px] cursor-pointer"
							onClick={handleDiscard}
						>
							Discard
						</div>
						<div
							className="text-[#0E8712] font-[500] text-[14px] cursor-pointer"
							onClick={handleSaveClick}
						>
							Save
						</div>
					</div>
				) : (
					<div
						className="text-[#0E8712] font-[500] text-[14px] cursor-pointer"
						onClick={handleClick}
					>
						Edit
					</div>
				)}
			</div>
		</div>
	);
};

export default DetailHeading;
