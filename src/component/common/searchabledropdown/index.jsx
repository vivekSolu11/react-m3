import React, { useState, useEffect, useRef } from 'react';
import { useApiRequest } from 'hooks/apiHandler';
import CustomInputField from 'component/customComponents/inputField';

const SearchableDropdown = ({
	options,
	handleChange,
	label,
	inputClass,
	error,
	helperText,
	value,
	startIcon,
	onBlur,
	url,
	placeholder,
	boxClassName,
	labelClass,
	...rest
}) => {
	const [inputValue, setInputValue] = useState(value?.name?.replace('\t', '') || '');

	const [Data, setData] = useState(options);
	const [loading, setLoading] = useState(false);
	const [customTimeOut, setCustomTimeOut] = useState(null);
	const [isFocused, setIsFocused] = useState(false); // Track focus state
	const containerRef = useRef(null);
	const inputRef = useRef(null);
	const apiRequest = useApiRequest();

	const fetchSuggestions = async (query) => {
		setLoading(true);
		try {
			if (query) {
				const response = await apiRequest(`${url}?search=${query}`, 'GET');
				setData(response?.data?.data?.items || []);
			} else {
				const response = await apiRequest(`${url}`, 'GET');
				setData(response?.data?.data?.items || []);
			}
		} catch (error) {
			console.error('Error fetching suggestions:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
		if (customTimeOut) {
			clearTimeout(customTimeOut);
		}
		setCustomTimeOut(
			setTimeout(() => {
				// if (event.target.value !== '') {
				fetchSuggestions(event.target.value);
				// }
			}, 500)
		);
	};

	const handleSuggestionClick = (location) => {
		handleChange(location);
		setInputValue(location.name);
		setData([]);
		setIsFocused(false); // Close dropdown after selection
	};

	useEffect(() => {
		if (!inputValue) {
			handleChange({});
		}
	}, [inputValue]);

	useEffect(() => {
		fetchSuggestions('');
		return () => {
			if (customTimeOut) {
				clearTimeout(customTimeOut);
			}
		};
	}, []);

	// Close dropdown on outside click
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (containerRef.current && !containerRef.current.contains(event.target)) {
				setIsFocused(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [containerRef]);
	// Function to calculate dropdown position
	const getDropdownPosition = () => {
		if (containerRef.current) {
			const { bottom } = containerRef.current.getBoundingClientRect();
			const dropdownHeight = Data?.length > 0 ? 250 : 40; // Adjust based on your dropdown height
			const availableSpace = window.innerHeight - bottom;

			return availableSpace < dropdownHeight ? 'top' : 'bottom';
		}
		return 'bottom';
	};

	const dropdownPosition = getDropdownPosition();
	return (
		<div className="relative w-full" ref={containerRef}>
			<CustomInputField
				ref={inputRef}
				name={label}
				error={error}
				lable={label}
				helperText={helperText}
				inputClass={inputClass}
				placeholder={placeholder}
				boxClassName={boxClassName}
				labelClass={`text-start ${labelClass}`}
				value={inputValue}
				autoComplete="off"
				onBlur={onBlur}
				onFocus={() => setIsFocused(true)} // Set focus state
				handleChange={handleInputChange}
				startIcon={startIcon}
				{...rest}
			/>
			{isFocused && Data?.length > 0 && (
				<div
					className={`absolute shadow-md text-center z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-[300px] overflow-y-auto ${error && 'top-10'} ${
						dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
					}`}
				>
					{loading ? (
						<div className="p-2 text-gray-500">Loading...</div>
					) : Data.length > 0 ? (
						Data.map(({ _id, name }) => (
							<div
								key={_id}
								onClick={() =>
									handleSuggestionClick({ _id, name: name?.replace('\t', '') })
								}
								className="p-2 hover:bg-prim-sol cursor-pointer text-base font-normal text-start transition-colors"
							>
								{name}
							</div>
						))
					) : (
						<div className="text-center p-2 text-gray-500">No data</div>
					)}
				</div>
			)}
		</div>
	);
};

export default SearchableDropdown;
