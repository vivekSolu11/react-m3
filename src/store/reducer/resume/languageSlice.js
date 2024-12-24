import { createSlice } from '@reduxjs/toolkit';

const languagesSlice = createSlice({
	name: 'languages',
	initialState: [],
	reducers: {
		addLanguage: (state, action) => {
			state.push(action.payload);
		},
		addAllLanguage: (state, action) => {
			return [...action.payload];
		},
		removeLanguage: (state, action) => {
			return state.filter((_, idx) => idx !== action.payload);
		},
		resetLanguages: () => {
			return [];
		},
	},
});

export const { resetLanguages, addAllLanguage, addLanguage, removeLanguage } =
	languagesSlice.actions;
export const languagesReducer = languagesSlice.reducer;
