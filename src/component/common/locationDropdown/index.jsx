import React, { useState, useEffect, useRef, memo } from 'react';
import { useDispatch } from 'react-redux';

import { useApiRequest } from 'hooks/apiHandler';
import CustomInputField from 'component/customComponents/inputField';
import { formatLocation } from 'utils/common';
import { removeState } from 'store/sagaActions';
import { useSelector } from 'react-redux';

const LocationInput = ({
	options,
	handleChange,
	label,
	inputClass,
	error,
	helperText,
	value,
	startIcon,
	onBlur,
	setLocation,
	...rest
}) => {
	const [inputValue, setInputValue] = useState('');
	const [locationData, setLocationData] = useState(options);
	const [loading, setLoading] = useState(false);
	const [customTimeOut, setCustomTimeOut] = useState(null);
	const [isFocused, setIsFocused] = useState(false); // Track focus state
	const containerRef = useRef(null);
	const inputRef = useRef(null);
	const apiRequest = useApiRequest();

	const dispatch = useDispatch();
	const { userLocation } = useSelector((state) => state.common);

	const fetchSuggestions = async (query) => {
		if (!query) return setLocationData([]);

		setLoading(true);
		try {
			const response = await apiRequest(`/location/getLocation?search=${query}`, 'GET');
			setLocationData(response?.data?.data?.items || []);
		} catch (error) {
			console.error('Error fetching suggestions:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (event) => {
		setInputValue(event?.target?.value);
		if (!event?.target?.value && setLocation) setLocation({});
		if (userLocation) dispatch(removeState({ name: 'userLocation' }));
		if (customTimeOut) {
			clearTimeout(customTimeOut);
		}
		setCustomTimeOut(
			setTimeout(() => {
				if (event?.target?.value !== '') {
					fetchSuggestions(event?.target?.value);
				}
			}, 500)
		);
	};

	const handleSuggestionClick = (location) => {
		delete location?._id;
		handleChange(location);
		setInputValue(`${location?.city}, ${location?.state}, ${location?.country}`);
		setLocationData([]);
		setIsFocused(false); // Close dropdown after selection
	};

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

	useEffect(() => {
		if (!inputValue) {
			handleChange && handleChange({});
		}
	}, [inputValue]);

	useEffect(() => {
		if (value) {
			setInputValue(
				Object.values(value ? value : {})
					.filter((value) => value)
					.join(',')
			);
		} else {
			setInputValue('');
		}
	}, [value]);

	useEffect(() => {
		if (value) {
			setInputValue(formatLocation(value));
		}

		return () => {
			if (customTimeOut) {
				clearTimeout(customTimeOut);
			}
		};
	}, []);

	return (
		<div className="relative w-full" ref={containerRef}>
			<CustomInputField
				ref={inputRef}
				name="location"
				error={error}
				lable={label}
				helperText={helperText}
				inputClass={inputClass}
				placeholder="Location"
				autoComplete="off"
				labelClass={'text-start'}
				value={inputValue}
				onBlur={onBlur}
				onFocus={() => setIsFocused(true)} // Set focus state
				handleChange={handleInputChange}
				startIcon={startIcon}
				{...rest}
			/>
			{loading ? (
				<div
					className={`absolute shadow-md text-center z-10 w-full bg-white p-2 text-gray-500 mt-1 ${error && 'top-10'}`}
				>
					Loading...
				</div>
			) : (
				inputValue &&
				locationData?.length > 0 &&
				isFocused && ( // Only show dropdown when focused
					<div
						className={`absolute shadow-md text-center z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-[300px] overflow-y-auto  ${error && 'top-10'}`}
					>
						{locationData?.length > 0 ? (
							locationData?.map(({ _id, ...location }) => (
								<div
									key={_id}
									onClick={() => handleSuggestionClick(location)}
									className="p-2 hover:bg-prim-sol cursor-pointer text-base font-normal text-start transition-colors "
								>
									{Object.values(location).join(',')}
								</div>
							))
						) : (
							<div className="text-center p-2 text-gray-500">No data</div>
						)}
					</div>
				)
			)}
		</div>
	);
};

export default memo(LocationInput);
