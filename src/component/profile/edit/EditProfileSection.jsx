import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
	CURRENT_COMPANY,
	DEFAULT_PROFILE,
	DESIGNATION_IMG,
	EMAIL_IMG,
	EXPERIENCE_IMG,
	LOCATION_IMG,
	PHONE_IMG,
	PROFILE_EDIT_IMG,
} from 'assets/images';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import LinkedinProfile from '../subcomponents/LinkedinProfile';

import './EditProfileSection.css';

const EditProfileSection = () => {
	const navigate = useNavigate();
	const userDetails = useSelector((state) => state.common.userDetails);

	const handleNavigate = () => {
		navigate('/profile/edit');
	};

	const formatExperience = ({ year, month } = {}) => {
		if (year > 0 && month > 0) {
			return `${year} Year${year !== 1 ? 's' : ''} ${month} Month${month !== 1 ? 's' : ''}`;
		} else if (year > 0) {
			return `${year} Year${year !== 1 ? 's' : ''}`;
		} else if (month > 0) {
			return `${month} Month${month !== 1 ? 's' : ''}`;
		}
		return '--';
	};

	const formatLocation = ({ city, state, country } = {}) => {
		const parts = [city, state, country].filter(Boolean); // Keep only defined and non-empty values
		return parts.length > 0 ? parts.join(', ') : '--';
	};

	const ProfileData = [
		{
			id: '0z',
			img: DESIGNATION_IMG,
			data: userDetails?.profile?.designation?.name,
		},
		{
			id: '1a1',
			img: EXPERIENCE_IMG,
			data: formatExperience(userDetails?.profile?.experience) || '--',
		},

		{
			id: '2b2',
			img: EMAIL_IMG,
			data: userDetails?.email || '--',
		},
		{
			id: '3c3',
			img: CURRENT_COMPANY,
			data: userDetails?.profile?.company?.name || '--',
		},
		{
			id: '4d4',
			img: LOCATION_IMG,
			data: formatLocation(userDetails?.profile?.location),
		},
		{
			id: '5e5',
			img: PHONE_IMG,
			data: userDetails?.phone || '--',
		},
	];

	return (
		<div className="md:p-6 pt-[20px] px-4 pb-4 rounded-lg bg-[#FFFFFF] flex flex-col w-full">
			<div className=" w-full rounded-lg lg:p-4 lg:edit-container flex flex-col gap-6">
				<div className="flex flex-col md:flex-row w-full gap-6 md:gap-3 ">
					<div className="flex gap-4 ">
						<img
							src={
								userDetails?.profile?.image?.url ||
								userDetails?.image?.url ||
								DEFAULT_PROFILE
							}
							className="w-[48px] object-contain h-[48px] rounded-full md:w-[96px] md:h-[96px]"
						/>
						<div className="flex md:hidden w-full items-center justify-between">
							{' '}
							<span className="font-[500] text-[16px]">
								{userDetails?.profile?.name?.fullName || 'Username'}
							</span>{' '}
							<PrimaryButton
								buttonText="edit"
								btnClassName="!px-4 !py-2 !rounded-lg !h-[36px] !text-[#0E8712] font-[500] text-[14px]"
								size="small"
								startIcon={<img alt="Edit icon" src={PROFILE_EDIT_IMG} />}
								varient="primaryOutline"
								handleClick={handleNavigate}
							/>{' '}
						</div>
					</div>
					<div className="flex w-full flex-col  gap-4">
						<div className=" hidden md:flex w-full items-center justify-between">
							{' '}
							<span className="font-[500] text-[16px]">
								{userDetails?.profile?.name?.fullName || 'Username'}
							</span>{' '}
							<PrimaryButton
								buttonText="edit"
								btnClassName="!px-4 !py-2 !rounded-lg !h-[36px] !text-[#0E8712] font-[500] text-[14px]"
								size="small"
								startIcon={<img alt="Edit icon" src={PROFILE_EDIT_IMG} />}
								varient="primaryOutline"
								handleClick={handleNavigate}
							/>{' '}
						</div>
						<div className="xl:grid    flex flex-wrap gap-2 md:justify-between gap-y-2 xl:grid-cols-3">
							{ProfileData.length &&
								ProfileData.map((item) => (
									<div
										key={item.id}
										className="text-[12px]  text-wrap whitespace-normal break-all flex items-center gap-1 text-[#666666]"
									>
										<img
											src={item.img}
											alt="Icons"
											className="w-[14px] h-[14px]"
										/>
										{item?.data}
									</div>
								))}
						</div>
					</div>
				</div>

				<div>
					<LinkedinProfile user={false} location={userDetails?.location} />
				</div>
			</div>
		</div>
	);
};

export default EditProfileSection;
