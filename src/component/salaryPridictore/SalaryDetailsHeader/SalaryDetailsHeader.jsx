import { useMediaQuery } from '@mui/material';
import { BACK_ARROW } from 'assets/images';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import { ADD_SALARY, ADD_SALARY_MOBILE } from 'constants/modalTypeConstant';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showCustomModal } from 'store/sagaActions';

const SalaryDetailsHeader = () => {
	const { selectedJobTitle, selectedLocation } = useSelector((state) => state.salary);
	const isSmallScreen = useMediaQuery('(max-width: 768px)');

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleNavigate = () => {
		navigate('/salary-pridictore');
	};
	return (
		<div className="flex justify-between">
			<div className="flex w-full justify-between  ">
				<div className="flex items-center gap-2">
					<img
						alt="back icon"
						height={20}
						width={20}
						src={BACK_ARROW}
						className="cursor-pointer"
						onClick={handleNavigate}
					/>{' '}
					<div className="text-base font-medium flex flex-wrap text-ellipsis">
						{selectedJobTitle?.name}
					</div>
					<span className=" md:flex hidden h-4 w-[2px] border border-solid border-lightgray" />
					<div className=" md:flex hidden text-base font-medium text-ellipsis text-[#666]">
						{selectedLocation?.city}
					</div>
					{/* <span className=" md:flex hidden h-4 w-[2px] border border-solid border-lightgray" />
          <div className=" md:flex hidden text-base font-normal text-ellipsis text-[#666]">
            Last updated: 18 June, 2024
          </div> */}
				</div>
				<div className="md:flex hidden flex-shrink-0 gap-2 ">
					<PrimaryButton
						handleClick={() => {
							dispatch(
								showCustomModal({
									customModalType: isSmallScreen ? ADD_SALARY_MOBILE : ADD_SALARY,
								})
							);
						}}
						buttonText="Update Your Salary"
						varient="primaryOutline"
						size="small"
						btnClassName=" !py-[10px] !px-[20px] !text-[14px] !h-[40px]   "
					/>
				</div>
				<div className="flex md:hidden flex-shrink-0 gap-2 ">
					<PrimaryButton
						handleClick={() => {
							dispatch(
								showCustomModal({
									customModalType: ADD_SALARY_MOBILE,
								})
							);
						}}
						buttonText="Update Your Salary"
						varient="primaryOutline"
						size="small"
						btnClassName="!text-sm !py-1   "
					/>
				</div>
			</div>
		</div>
	);
};

export default SalaryDetailsHeader;
