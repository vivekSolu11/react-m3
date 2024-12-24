import React from 'react';
import SalaryDropdownBox from '../SalaryForm/SalaryDropdownBox';
import ProfileIcon from 'assets/SVGs/ProfileIcon';
import Chips from 'component/customComponents/chips/Chips';
import ShieldIcon from 'assets/SVGs/ShieldIcno';
import { CompanyImg } from 'assets/images';
import { PenIcon } from 'assets/index';
import ReliabilitySection from 'component/careeradvisor/careerjourney/subcomponent/careertrajectory/ReliabilitySection';
import RecommandOpening from './RecommandOpening';
import CheckoutBox from './CheckoutBox';
import { useSelector } from 'react-redux';
import { convertSalaryToLPA } from 'utils/common';
import Loader from 'component/common/Loader';
import AddSalary from '../AddSalary/AddSalaryModel';
import AddSalaryModel from '../AddSalary/AddSalaryMobileModel';
import ThankYouModal from 'component/modal/aboutPageModel/ThankYouModal';
import { useDispatch } from 'react-redux';
import DropdownDrawer from '../AddSalary/DropdownDrawer';
import { showAlert, showCustomModal } from 'store/sagaActions';
import { SALARY_FILTER_MOBILE } from 'constants/modalTypeConstant';
import { useMutation } from '@tanstack/react-query';
import { useMutationAPI } from 'apis/mutation';

const SalaryDetailsBox = ({ resData, refetch, loading }) => {
	const { selectedJobTitle, selectedCompany, selectedLocation } = useSelector(
		(state) => state.salary
	);
	const dispatch = useDispatch();

	const { submitFeedback } = useMutationAPI();

	const { mutate } = useMutation({
		mutationFn: (val) => submitFeedback(val),
		onSuccess: (data) => {
			if (data) {
				dispatch(
					showAlert({
						message: data?.data?.data?.message,
						status: 'success',
					})
				);
			}
		},
	});

	const onsubmit = async (val, q) => {
		const data = {
			module: 'SalaryModule',
			SalaryModule: {
				_designation: selectedJobTitle?._id,
				_company: selectedCompany?._id,
				location: selectedLocation?.city,
				question: q,
				rating: val,
			},
		};
		await mutate(data);
	};
	return (
		<>
			<div className=" bg-white flex md:hidden justify-between items-center rounded-xl p-4">
				<div className="flex flex-col gap-2">
					<div className="text-sm">{selectedJobTitle?.name}</div>
					<div className="text-xs text-[#666]">
						{selectedCompany?.name} | {selectedLocation?.city}
					</div>
				</div>
				<div
					className="cursor-pointer"
					onClick={() => {
						dispatch(
							showCustomModal({
								customModalType: SALARY_FILTER_MOBILE,
							})
						);
					}}
				>
					<PenIcon />
				</div>
			</div>
			<div className="flex flex-col gap-4 justify-between items-center rounded-xl md:rounded-none bg-white p-6 pb-20 xl:pb-4">
				<SalaryDropdownBox fromDetails refetch={refetch} />
				<div className="hidden md:block h-[1px] w-full bg-lightgray" />
				{loading ? (
					<div className={'h-screen'}>
						<Loader />
					</div>
				) : (
					<>
						<div className="flex flex-col gap-8 w-full">
							<div className="flex flex-col gap-6 w-full">
								<div className="flex flex-wrap items-center gap-2">
									<div className="text-base font-medium flex flex-wrap text-ellipsis">
										₹{resData?.avgAnnualSalary}
									</div>
									<div className="text-base font-medium text-ellipsis text-[#666]">
										Avg Annual Salary
									</div>
									<span className="h-4 w-[2px] border border-solid border-lightgray" />
									<div className="text-base flex items-center gap-1 font-normal text-ellipsis text-[#666]">
										<ProfileIcon />
										{resData?.dataPoints}
									</div>
									<span className="h-4 w-[2px] border border-solid border-lightgray" />
									<Chips
										num={1}
										name={`${resData?.confidence} Confident`}
										icon={<ShieldIcon />}
										className={'px-2 h-[28px] gap-2 text-xs rounded'}
									/>
								</div>
								<div className="flex flex-col md:flex-row gap-3 md:gap-4 md:items-center font-medium text-2xl md:text-[40px] text-[#1a1a1a]">
									₹{convertSalaryToLPA(resData?.salaryRange?.min)} LPA{' '}
									<span className="text-[#666] font-normal text-2xl md:text-[32px]">
										to
									</span>
									₹{convertSalaryToLPA(resData?.salaryRange?.max)} LPA
								</div>
							</div>

							<div className="flex flex-col gap-6">
								<div className="text-base font-medium">
									Salaries from other companies
								</div>

								<div className="flex flex-col gap-4">
									<div className="flex md:grid grid-cols-4 font-medium text-[#666] text-sm">
										<div className="col-span-2">Company Name</div>
										<div className="col-span-1 hidden md:block text-right">
											Required Experience
										</div>
										<div className="col-span-1 hidden md:block text-right">
											Avg Annual Salary
										</div>
									</div>
									<div className="flex flex-col gap-2">
										{resData?.otherCompanies?.map((item, i) => (
											<div
												key={i}
												style={{ borderBottomStyle: 'solid' }}
												className="flex flex-wrap flex-col items-start md:grid grid-cols-4 pt-2 pb-4 border-b  border-b-lightgray md:items-center font-medium text-[#666] text-sm"
											>
												<div className="col-span-2 flex flex-col md:flex-row gap-2">
													<img
														src={CompanyImg}
														height={40}
														width={40}
														className="rounded"
													/>
													<div className="flex flex-col gap-1">
														<div className="col-span-1 text-left text-sm text-[#1a1a1a]">
															{item?.companyName}
														</div>
														<div className="col-span-1 text-left text-xs flex gap-2">
															{item?.designation}
															<div className="md:hidden block  text-xs">
																{item?.experience?.from} -{' '}
																{item?.experience?.to} years
															</div>
														</div>
													</div>
												</div>
												<div className="hidden md:block col-span-1 text-end pr-6 text-xs">
													{item?.experience?.from} -{' '}
													{item?.experience?.to} years
												</div>
												<div className="col-span-1 text-right self-end">
													<div className="flex flex-col gap-1 items-end">
														<div className="col-span-1 text-left text-sm text-[#1a1a1a]">
															₹
															{convertSalaryToLPA(
																item?.avgAnnualSalary
															)}{' '}
															Lakhs{' '}
														</div>
														<div className="col-span-1 text-left text-xs">
															₹
															{convertSalaryToLPA(
																item?.salaryRange?.min
															)}{' '}
															LPA - ₹
															{convertSalaryToLPA(
																item?.salaryRange?.max
															)}{' '}
															LPA
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						<CheckoutBox />

						<ReliabilitySection
							title={`How accurate is total pay range of  ₹${convertSalaryToLPA(resData?.salaryRange?.min)} -
               ₹${convertSalaryToLPA(resData?.salaryRange?.max)} per year?`}
							type={'SalaryModule'}
							onClick={(a) =>
								onsubmit(
									a,
									`How accurate is total pay range of ₹${convertSalaryToLPA(resData?.salaryRange?.min)} - ₹${convertSalaryToLPA(resData?.salaryRange?.max)} per year?`
								)
							}
							desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
						/>
						<RecommandOpening />
						<CheckoutBox
							title="Tired of not getting shortlisted?"
							desc="Analyze your Resume on Joblo.ai, Get instant fixes"
						/>
					</>
				)}{' '}
				<AddSalary title={'Update your Salary'} update />
				<AddSalaryModel title={'Update your Salary'} update />
				<ThankYouModal />
				<DropdownDrawer refetch={refetch} />
			</div>
		</>
	);
};

export default SalaryDetailsBox;
