import React, { useState } from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';

const CustomAutocomplete = ({ open, onOptionChange, data, slectedData }) => {
	const [inputValue, setInputValue] = useState('');

	const handleChange = (event, newValue) => {
		onOptionChange(newValue);
	};

	return (
		<div>
			<Autocomplete
				options={data.filter((option) => !slectedData?.includes(option))}
				getOptionLabel={(option) => option.name}
				onChange={handleChange}
				open={open}
				inputValue={inputValue}
				sx={{
					'& .MuiAutocomplete-endAdornment': {
						display: 'none',
					},
				}}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				renderInput={(params) => (
					<TextField
						sx={{
							fontSize: '14px',
							'& .MuiOutlinedInput-root': {
								padding: '0px 12px !important',
							},
							'& .MuiFormHelperText-root.Mui-error': {
								margin: '3px 0',
							},
							'& input': {
								color: 'red',
							},
						}}
						onChange={handleChange}
						{...params}
					/>
				)}
			/>
		</div>
	);
};

export default CustomAutocomplete;
