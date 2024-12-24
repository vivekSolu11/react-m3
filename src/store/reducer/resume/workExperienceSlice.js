import { createSlice } from '@reduxjs/toolkit';

const workExperienceSlice = createSlice({
	name: 'workExperience',
	initialState: [],
	reducers: {
		addExperience: (state, action) => {
			state.push(action.payload);
		},
		updateExperience: (state, action) => {
			const { index, data } = action.payload;
			state[index] = { ...state[index], ...data };
		},
		updateAllExperienceExperience: (state, action) => {
			return [...action.payload];
		},
		removeExperience: (state, action) => {
			return state.filter((_, idx) => idx !== action.payload);
		},

		resetExperience: () => {
			return [];
		},
	},
});

export const {
	addExperience,
	updateExperience,
	removeExperience,
	updateAllExperienceExperience,
	resetExperience,
} = workExperienceSlice.actions;
export const workExperienceReducer = workExperienceSlice.reducer;
