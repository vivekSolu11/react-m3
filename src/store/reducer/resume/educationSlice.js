import { createSlice } from '@reduxjs/toolkit';

const educationSlice = createSlice({
	name: 'education',
	initialState: [],
	reducers: {
		addEducation: (state, action) => {
			state.push(action.payload);
		},
		updateEducation: (state, action) => {
			const { index, data } = action.payload;
			state[index] = { ...state[index], ...data };
		},
		updateAllEducation: (state, action) => {
			return [...action.payload];
		},
		removeEducation: (state, action) => {
			return state.filter((_, idx) => idx !== action.payload);
		},
		resetEducation: () => {
			return [];
		},
	},
});

export const {
	addEducation,
	updateEducation,
	removeEducation,
	updateAllEducation,
	resetEducation,
} = educationSlice.actions;
export const educationReducer = educationSlice.reducer;
