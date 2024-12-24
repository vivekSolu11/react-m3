/* eslint-disable no-unsafe-optional-chaining */
import Chips from 'component/customComponents/chips/Chips';
import { DURATION_ICON, SALARY_ICON } from 'assets/images';

import '../../../../careeradvisor/career.css';
import { setSelectedRoleData } from 'store/reducer/CareerAdvisor/CareerAdvisor';
import { useDispatch } from 'react-redux';

const RoleCard = ({ role, current, onHandleDrawer }) => {
	const dispatch = useDispatch();

	const skills = [
		...role?.essentialSoftSkills?.skills,
		...role?.essentialTechnicalSkills?.skills,
	];
	return (
		<div
			className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 p-4 bg-white border rounded-md shadow-sm card_container cursor-pointer"
			onClick={() => {
				dispatch(setSelectedRoleData(role));
				onHandleDrawer();
			}}
		>
			{/* Role details */}
			<div className="w-full">
				<div className="flex flex-col">
					{current && (
						<span className="text-[#666666] font-medium text-xs tracking-tight">
							Current Role
						</span>
					)}
					<div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center text-start sm:text-center">
						<h3 className="text-base font-semibold tracking-tight text-[#1A1A1A] m-0">
							{role.jobRole?.title}
						</h3>

						{/* Salary and Duration */}
						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
							<span className="flex items-center gap-2 text-sm font-normal text-[#666666] tracking-tight">
								<img
									src={SALARY_ICON}
									alt="salaryicon"
									className="w-4 h-4 sm:w-auto sm:h-auto"
								/>
								{role.expectedSalary}
							</span>
							<span className="flex items-center gap-2 text-sm font-normal text-[#666666] tracking-tight">
								<img
									src={DURATION_ICON}
									alt="durationicon"
									className="w-4 h-4 sm:w-auto sm:h-auto"
								/>
								{`${role?.estimatedDuration?.from} Years - ${role?.estimatedDuration?.to} Years`}
							</span>
						</div>
					</div>
				</div>

				<p className="text-sm font-normal tracking-tight text-[#1A1A1A] mt-2">
					{role.jobRole?.description}
				</p>

				{/* Tags (Chips) */}
				<div className="flex flex-wrap gap-2 mt-4">
					{skills?.length &&
						skills?.slice(0, 4)?.map((chip) => (
							<Chips
								key={chip}
								name={chip}
								customStyle={{
									borderRadius: '4px',
									border: '1px solid #0E3C8740',
									background: '#F5F9FF',
								}}
								className="text-xs font-medium tracking-wide text-[#0E3C87] py-1 px-3"
							/>
						))}
					{skills.length > 4 && (
						<Chips
							name={`+${skills?.length - skills?.slice(0, 4).length}`}
							customStyle={{
								borderRadius: '4px',
								border: '1px solid #0E3C8740',
								background: '#F5F9FF',
							}}
							className="text-xs font-medium tracking-wide text-[#0E3C87] py-1 px-3"
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default RoleCard;
