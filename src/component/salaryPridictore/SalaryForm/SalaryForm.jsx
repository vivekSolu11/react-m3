import React from 'react';
import { useDispatch } from 'react-redux';

import { SALARY_IMG } from 'assets/images';
import SalarytRecentSearch from '../SalaryRecentSearch/SalaryRecentSearch';

import '../../connect/connect.css';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import { PlusIcon } from 'assets/index';
import { ADD_SALARY, ADD_SALARY_MOBILE } from 'constants/modalTypeConstant';
import { showCustomModal } from 'store/sagaActions';
import AddSalary from '../AddSalary/AddSalaryModel';
import { useMediaQuery } from '@mui/material';
import AddSalaryModel from '../AddSalary/AddSalaryMobileModel';
import SalaryDropdownBox from './SalaryDropdownBox';
import ThankYouModal from 'component/modal/aboutPageModel/ThankYouModal';

const SalaryForm = () => {
	const isSmallScreen = useMediaQuery('(max-width: 768px)');

	const dispatch = useDispatch();

	return (
		<div className="flex flex-col justify-center pb-16 xl:pb-8 p-6 bg-white rounded-2xl   items-center gap-6 w-full ">
			<div className="flex flex-col gap-9 border-b   w-full text-center">
				<img src={SALARY_IMG} alt="Networking" className="mx-auto" />

				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-4">
						<h1 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] tracking-tight m-0">
							Salary Predictor
						</h1>
						<p className="text-sm md:text-base font-normal tracking-tight leading-[22.4px] text-[#666666] m-0">
							Discover salary potential across various professions in India and find
							out how much you can earn based on your skills.
						</p>
					</div>
					<div className="flex flex-col gap-4 items-center">
						<SalaryDropdownBox />
					</div>
				</div>
			</div>
			<SalarytRecentSearch />
			<div className="w-full  h-[1px] border border-solid border-lightgray" />
			<div className="flex flex-col justify-center items-center font-normal text-base gap-4">
				<div>Help in enhancing salary transparency.</div>
				<PrimaryButton
					varient="primaryOutline"
					handleClick={() =>
						dispatch(
							showCustomModal({
								customModalType: isSmallScreen ? ADD_SALARY_MOBILE : ADD_SALARY,
							})
						)
					}
					buttonText="Add your Salary"
					startIcon={<PlusIcon />}
				/>
			</div>

			<AddSalary />
			<AddSalaryModel />
			<ThankYouModal />
		</div>
	);
};

export default SalaryForm;
