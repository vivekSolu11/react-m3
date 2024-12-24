import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SideDrawer from 'component/common/drawer/Drawer';
import AccordianTab from './AccordianTab';
import CustomInputField from '../customComponents/inputField/index';
import CheckBox from 'component/customComponents/checkBox';
import { PrimaryButton } from 'component';
import { PlusIcon } from 'assets/index';
import {
	Commitments,
	Industry,
	JobFunction,
	JobType,
	company,
	datePostType,
	mode,
} from '../../constants/updatePreference';
import RadioButton from 'component/customComponents/RadioButton';
import UploadBox from './UploadBox';
import RangeSlider from 'component/rangeSlider/RangeSlider';
import './chatbot.css';

const UpdatePreferenceMobile = ({ isOpen, onClose }) => {
	const { experienceData } = useSelector((state) => state.jobFiltersDropdown);

	const [activeJob, setActiveJob] = useState();
	const [activeMode, setActiveMode] = useState();
	const [file, setFile] = useState();
	const [expanded, setExpanded] = useState(false);
	const [date, setDate] = useState();
	const [value, setValue] = useState([0, 1]);
	const [exp, setExp] = useState();
	const [amount, setAmount] = useState([0, 4.5]);

	const handleSliderChange = (event, newValue) => {
		setValue(newValue);
	};
	const handleSalaryChange = (event, newAmount) => {
		setAmount(newAmount);
	};
	const formatValueWithLac = (value) => {
		return `${value} lac`;
	};
	const formatValueWithYears = (value) => {
		return `${value} yrs`;
	};

	const handleChangeDate = (event) => {
		setDate(event.target.value);
	};

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	const handleConfirm = () => {
		onClose();
	};
	const Header = () => {
		return <div className="text-[16px] font-[500]"> Update Preference</div>;
	};

	return (
		<SideDrawer
			HeaderCss="!h-[88px] !p-6"
			drawerHeight="100%"
			drawerRadius="12px"
			openFrom="bottom"
			open={isOpen}
			title={<Header />}
			Svgclass="stroke-[#000000]"
			onClose={onClose}
		>
			<div className="drawer-content pt-[20px] py-3 px-4 ">
				<UploadBox
					bgImage={true}
					file={file}
					onDelete={() => setFile(null)}
					onChange={(e) => setFile(e.target.file[0])}
					withHowToUpload
					label={'Upload Resume'}
				/>
				<div className="line-box">
					<div className="line"></div>OR
					<div className="line"></div>
				</div>
				<div className="flex flex-col gap-[20px]">
					<div className="fields flex-col lg:flex-row">
						<CustomInputField label={'Job Title'} />
						<CustomInputField label={'Location'} />
					</div>

					<div className="flex gap-2 flex-col">
						<div className="font-[500]  text-black">Experience(years) </div>
						<RangeSlider
							value={value}
							min={0}
							max={10}
							step={0.5}
							valueLabelFormat={formatValueWithYears}
							handleChange={handleSliderChange}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<div className=" font-[500] text-black">Experience </div>
						<div className="labels flex-wrap">
							{experienceData?.length &&
								experienceData?.map((option, index) => (
									<button
										onClick={() => setExp(option)}
										className={`labelSelection  ${exp === option ? 'active' : 'text-[#4d4d4d]'}`}
										key={index}
									>
										{option}
									</button>
								))}
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<div className="matchDescription font-[500] text-black">Job Type</div>
						<div className="labels flex-wrap">
							{JobType?.length &&
								JobType?.map((option, index) => (
									<button
										onClick={() => setActiveJob(option.value)}
										className={`labelSelection ${activeJob === option.value ? 'active' : 'text-[#4d4d4d]'}`}
										key={index}
									>
										{option.label}
									</button>
								))}
						</div>
					</div>

					<div className=" font-[500]  text-black">Salary (₹ per year)</div>
					<div className="flex gap-2 flex-col">
						<RangeSlider
							value={amount}
							min={0}
							max={10}
							step={0.5}
							handleChange={handleSalaryChange}
							valueLabelFormat={formatValueWithLac}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<div className="matchDescription font-[500] text-black">Date Posted</div>
						<div className="grid grid-cols-2">
							{datePostType?.length &&
								datePostType?.map((option) => (
									<RadioButton
										inputProps={{ 'aria-label': option.label }}
										onChange={handleChangeDate}
										name="radio-buttons"
										checked={date === option.value}
										value={option.value}
										key={option.value}
										label={option.label}
									/>
								))}
						</div>
					</div>

					<AccordianTab
						title={'Job Details'}
						onChange={handleChange('job_details')}
						expanded={expanded === 'job_details'}
						key={'job_details'}
					>
						<div className="flex flex-col gap-3">
							<div className="text-sm">Industry</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
								{Industry?.length &&
									Industry?.map((item) => (
										<CheckBox key={item?.value} label={item?.label} />
									))}
								<PrimaryButton
									varient="primaryOutline"
									buttonText="Add Job Industry"
									size="medium"
									btnClassName="!border-none !pl-3"
									startIcon={<PlusIcon />}
								/>
							</div>
						</div>
						<div className="flex flex-col gap-3">
							<div className="text-sm text-[#666666] font-medium">Job Function</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
								{JobFunction?.length &&
									JobFunction.map((item) => (
										<CheckBox key={item?.value} label={item?.label} />
									))}
								<PrimaryButton
									varient="primaryOutline"
									startIcon={<PlusIcon />}
									size="medium"
									btnClassName="!border-none !pl-3"
									buttonText="Add Job Function"
								/>
							</div>
						</div>
					</AccordianTab>

					<AccordianTab
						title={'Company Information'}
						onChange={handleChange('comp_info')}
						expanded={expanded === 'comp_info'}
						key={'comp_info'}
					>
						<div className="flex flex-col gap-3">
							<div className="flex">Company</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
								{company?.length &&
									company?.map((item) => (
										<CheckBox key={item?.value} label={item?.label} />
									))}
							</div>
						</div>
					</AccordianTab>

					<AccordianTab
						title={'Preferred Luxury'}
						onChange={handleChange('preferred_luxury')}
						expanded={expanded === 'preferred_luxury'}
						key={'preferred_luxury'}
					>
						<div className="labels flex-wrap">
							{mode?.length &&
								mode?.map((option, index) => (
									<button
										onClick={() => setActiveMode(option)}
										className={`labelSelection ${activeMode === option ? 'active' : 'text-[#4d4d4d]'}`}
										key={index}
									>
										{option}
									</button>
								))}
						</div>
						<div className="flex flex-col gap-3">
							<div className="flex">Commitments</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
								{Commitments?.length &&
									Commitments?.map((item) => (
										<CheckBox key={item?.value} label={item?.label} />
									))}
							</div>
						</div>
					</AccordianTab>
				</div>
			</div>

			<div className=" gap-3 flex justify-end mt-4">
				<PrimaryButton
					handleClick={handleConfirm}
					buttonText="Cancel"
					varient="primaryOutline"
				/>
				<PrimaryButton
					handleClick={handleConfirm}
					buttonText="Continue"
					varient="primary"
				/>
			</div>
		</SideDrawer>
	);
};

export default UpdatePreferenceMobile;
