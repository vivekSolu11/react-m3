import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	selectedJobTitle: '',
	selectedCompany: '',
	selectedLocation: '',
};

const salarySlice = createSlice({
	name: 'salary',
	initialState,
	reducers: {
		updateSalary: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateSalary } = salarySlice.actions;

export const salaryReducer = salarySlice.reducer;
