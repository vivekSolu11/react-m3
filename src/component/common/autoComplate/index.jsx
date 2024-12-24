import React, { useEffect, useState } from 'react';
import { Autocomplete, ClickAwayListener } from '@mui/material';
import TextField from '@mui/material/TextField';

import { useApiRequest } from 'hooks/apiHandler';

import styles from '../dropdown/dropdown.module.css';

const CustomMultiSelect = ({ placeholder, options, handleChange, selectedValues, url }) => {
	const [open, setOpen] = useState(false);
	const [suggestions, setSuggestions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [company, setCompany] = useState([]);

	const apiRequest = useApiRequest();

	// Fetch options based on user input
	const fetchOptions = async (query) => {
		setIsLoading(true);
		try {
			const response = await apiRequest(`${url}?search=${query}`, 'GET');
			const data = response?.data?.data?.items.map((item) => ({
				label: item?.name,
				value: item?._id,
			}));
			setSuggestions(data || []);
		} catch (error) {
			console.error('Error fetching suggestions:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// Handle input change for search
	const handleInputChange = (event, value, reason) => {
		if (reason === 'input') {
			fetchOptions(value);
		}
	};

	// Merge arrays uniquely by ID
	const mergeUniqueById = (existingData = [], newData = []) => {
		return Array.from(
			new Map([...existingData, ...newData].map((item) => [item.value, item])).values()
		);
	};

	useEffect(() => {
		setCompany(options);
	}, [options]);

	const handleClickAway = () => {
		setOpen(false); // Close dropdown when clicking outside
	};

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<div className="relative cursor-pointer">
				<Autocomplete
					className={`${styles.whiterounded} cursor-pointer z-10 rounded-full`}
					sx={{
						'& .MuiAutocomplete-endAdornment': {
							display: 'none',
						},
						'& .MuiAutocomplete-clearIndicator': {
							display: 'none',
						},
						'& .MuiAutocomplete-listbox': {
							width: '250px',
						},
					}}
					open={open}
					onOpen={() => setOpen(true)}
					onClose={() => setOpen(false)}
					onInputChange={handleInputChange} // Handle input change here
					getOptionLabel={(option) => option?.label}
					renderInput={(params) => (
						<TextField
							{...params}
							placeholder={placeholder}
							sx={{
								cursor: 'pointer',
								fontSize: '12px',
								'& .MuiOutlinedInput-root': {
									padding: '0px 35px 0 12px !important',
									flexDirection: 'row-reverse',
								},
								'& .MuiOutlinedInput-root input': {
									padding: '2px 4px 6px 4px !important',
								},
								'& ::placeholder': {
									color: '#333333',
									fontWeight: 500,
									fontSize: '12px !important',
									opacity: 1,
								},
							}}
							className="w-[150px]"
						/>
					)}
					renderTags={() =>
						selectedValues?.length > 0 ? (
							<span className="w-5 h-4 rounded-2xl text-[#0E8712] bg-[#EDFDED] text-xs flex items-center justify-center">
								{selectedValues?.length}
							</span>
						) : (
							''
						)
					}
					multiple
					options={suggestions.length ? suggestions : company} // Include selected values explicitly
					value={selectedValues} // Array of objects
					onChange={(event, value) => {
						const updatedCompanyData = mergeUniqueById(company, value);
						setCompany(updatedCompanyData);
						handleChange(event, value); // Pass the event and value to the parent handler
						setSuggestions([]); // Optional delay to prevent flicker
					}}
					isOptionEqualToValue={(option, value) => option.value === value.value}
					loading={isLoading}
				/>

				<div
					onClick={() => setOpen(!open)}
					className="pr-2 absolute right-0 top-[4px] flex items-center justify-center"
				>
					{open ? (
						<svg
							width="25"
							height="25"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M15 12.5L10 7.5L5 12.5"
								stroke="#1A1A1A"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					) : (
						<svg
							width="25"
							height="25"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M5 7.5L10 12.5L15 7.5"
								stroke="#1A1A1A"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					)}
				</div>
			</div>
		</ClickAwayListener>
	);
};

export default CustomMultiSelect;
