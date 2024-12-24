import React, { useState, useEffect, useRef } from 'react';
import { PlusIcon } from 'assets/index';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import { useApiRequest } from 'hooks/apiHandler';

const Boxtypes = {
	'job-functions': '_jobFunctions',
	industries: '_industries',
	companies: '_companies',
	commitments: '_commitments',
};

const SuggestionInput = ({ options, type = '', onOptionClick, btnLabel }) => {
	const [inputValue, setInputValue] = useState('');
	const [show, setShow] = useState(false);
	const [filteredSuggestions, setFilteredSuggestions] = useState(options);
	const [loading, setLoading] = useState(false);
	const containerRef = useRef(null);
	const inputRef = useRef(null);

	const apiRequest = useApiRequest();

	const fetchSuggestions = async (query) => {
		if (!query) return setFilteredSuggestions([]);

		setLoading(true);
		try {
			const response = await apiRequest(
				`/job/${type}?search=${query}&${Boxtypes[type]}=${options.map((opt) => opt._id).join(',')}`,
				'GET'
			);
			setFilteredSuggestions(response?.data?.data?.items || []);
		} catch (error) {
			console.error('Error fetching suggestions:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (containerRef.current && !containerRef.current.contains(event.target)) {
				setShow(false);
				setInputValue('');
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			fetchSuggestions(inputValue);
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [inputValue]);

	const handleChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleSuggestionClick = (suggestion) => {
		onOptionClick(suggestion);
		setInputValue('');
		setShow(false);
		setFilteredSuggestions([]);
	};

	useEffect(() => {
		if (show && inputRef.current) {
			inputRef.current.focus();
		}
	}, [show]);

	// Function to calculate dropdown position
	const getDropdownPosition = () => {
		if (containerRef.current) {
			const { bottom } = containerRef.current.getBoundingClientRect();
			const dropdownHeight = filteredSuggestions.length > 0 ? 200 : 40; // Adjust based on your dropdown height
			const availableSpace = window.innerHeight - bottom;

			return availableSpace < dropdownHeight ? 'top' : 'bottom';
		}
		return 'bottom';
	};

	const dropdownPosition = getDropdownPosition();

	return (
		<div className="relative w-64" ref={containerRef}>
			{show ? (
				<>
					<input
						ref={inputRef}
						type="text"
						value={inputValue}
						onChange={handleChange}
						placeholder="Type to search..."
						className="w-full p-2 border h-[46px] text-base border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{loading ? (
						<div className="absolute shadow-md text-center z-10 w-full bg-white p-2 text-gray-500 mt-1">
							Loading...
						</div>
					) : (
						inputValue && (
							<div
								className={`absolute shadow-lg text-center h-[300px] overflow-y-auto overflow-hide   z-10 w-full bg-white border border-lightgray rounded-md mt-1 ${
									dropdownPosition === 'top'
										? 'bottom-full mb-1'
										: 'top-full mt-1'
								}`}
							>
								{filteredSuggestions.length > 0 ? (
									filteredSuggestions.map((suggestion) => (
										<div
											key={suggestion._id}
											onClick={() => handleSuggestionClick(suggestion)}
											className="p-2 hover:bg-prim-sol cursor-pointer text-start transition-colors"
										>
											{suggestion.name}
										</div>
									))
								) : (
									<div className="text-center p-2 text-gray-500">No data</div>
								)}
							</div>
						)
					)}
				</>
			) : (
				<PrimaryButton
					variant="seconderyOutline"
					buttonText={btnLabel}
					size="medium"
					handleClick={() => setShow(true)}
					btnClassName="!border-none !pl-3 !text-sm !bg-[#ffffff00] !text-[#666]"
					startIcon={<PlusIcon color={'#666'} />}
				/>
			)}
		</div>
	);
};

export default SuggestionInput;
