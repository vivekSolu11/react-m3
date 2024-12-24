import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	selectedJobTitle: '',
	selectedCompany: '',
	selectedLocation: '',
};

const connectSlice = createSlice({
	name: 'connect',
	initialState,
	reducers: {
		updateconnectValue: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateconnectValue } = connectSlice.actions;

export const connectReducer = connectSlice.reducer;
