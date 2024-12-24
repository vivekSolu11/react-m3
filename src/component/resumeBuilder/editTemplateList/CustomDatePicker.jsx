import React, { useEffect, useRef, useState } from 'react';

import { PlusIcon, RightArrow } from 'assets/index';
import { formatDate } from 'utils/common';

import styles from './editTemplateList.module.css';
import CheckBox from 'component/customComponents/checkBox';
import moment from 'moment';

const CustomDatePicker = ({ handleDateChange, dates, className, error, isPresent }) => {
	const datePickerRef = useRef(null);
	const [showDatePickers, setShowDatePickers] = useState(false);
	const [present, setPresent] = useState(dates?.tillNow || false);
	const [startDate, setStartDate] = useState(dates?.from || '');
	const [endDate, setEndDate] = useState(dates?.tillNow ? 'Present' : dates?.to || '');
	const handleToggle = () => {
		setShowDatePickers(!showDatePickers);
	};

	const handleStartDateChange = (e) => {
		setStartDate(e.target.value);
	};

	const handleEndDateChange = (e) => {
		setEndDate(e.target.value);
	};

	const handleDateRangeClick = () => {
		setShowDatePickers(true); // Open date pickers when the date range is clicked
	};

	const handleSaveDates = () => {
		if (startDate && endDate) {
			handleDateChange({
				from: moment(startDate).isValid() ? new Date(startDate).toISOString() : '',
				to: present
					? 'Present'
					: moment(endDate).isValid()
						? new Date(endDate).toISOString()
						: '',
				tillNow: present,
			});
		}
	};
	useEffect(() => {
		if (dates?.tillNow) {
			setPresent(true);
		}
	}, []);

	useEffect(() => {
		handleSaveDates();
	}, [startDate, endDate, present]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
				setShowDatePickers(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	return (
		<div className={className} ref={datePickerRef}>
			{startDate && (endDate || present) && !showDatePickers ? (
				<div
					onClick={handleDateRangeClick}
					className={`${styles.fields} text-[#666666] text-sm cursor-pointer relative rounded ${error ? 'border-[#CD2735]' : 'border-[#0000003b]'} !py-2`}
				>
					{formatDate(startDate)} - {formatDate(endDate)}
				</div>
			) : showDatePickers ? (
				<div
					className="flex items-center gap-2"
					// Close date pickers when focus is lost
				>
					<div
						className={`${styles.fields} cursor-pointer relative rounded  ${error ? 'border-[#CD2735]' : 'border-[#0000003b]'}  !py-2`}
					>
						<input
							type="date"
							id="modified"
							className={styles.datePicker}
							value={startDate}
							onChange={handleStartDateChange}
						/>
						<span className="z-0 cursor-pointer w-[75px]">
							{startDate ? formatDate(startDate) : 'Start Date'}
						</span>
					</div>
					<RightArrow />
					<div className="flex gap-1">
						<div
							className={`${styles.fields} cursor-pointer relative rounded  ${error ? 'border-[#CD2735]' : 'border-[#0000003b]'}  !py-2`}
						>
							<input
								type="date"
								id="modified"
								className={styles.datePicker}
								value={endDate}
								disabled={present}
								min={startDate} // Set min to the start date
								onChange={handleEndDateChange}
								onBlur={handleSaveDates} // Close date pickers when focus is lost
							/>

							<span className="z-0 cursor-pointer w-[75px]">
								{endDate ? formatDate(endDate) : 'End Date'}
							</span>
						</div>
						{isPresent && (
							<CheckBox
								label={'Present'}
								size={'small'}
								defaultChecked={present}
								ClassName={'py-0 !w-fit z-10'}
								onChange={(e) => {
									setPresent(e.target.checked);
									if (e.target.checked) {
										setEndDate('Present');
									} else {
										setEndDate(new Date());
									}
								}}
							/>
						)}
					</div>
				</div>
			) : (
				<div
					className={`${styles.fields} rounded  ${error ? 'border-[#CD2735]' : 'border-[#0000003b]'}  !py-2`}
					onClick={handleToggle}
				>
					<PlusIcon color={'#000'} />
					<span>Add Duration</span>
				</div>
			)}

			{error && <span className="text-sm text-[#CD2735] font-normal">{error}</span>}
		</div>
	);
};

export default CustomDatePicker;
