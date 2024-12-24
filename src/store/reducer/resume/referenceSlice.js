import { createSlice } from '@reduxjs/toolkit';

const referencesSlice = createSlice({
	name: 'references',
	initialState: [],
	reducers: {
		addReference: (state, action) => {
			state.push(action.payload);
		},
		updateReference: (state, action) => {
			const { index, reference } = action.payload;
			state[index] = { ...state[index], ...reference };
		},
		removeReference: (state, action) => {
			return state.filter((_, idx) => idx !== action.payload);
		},
		updateAllReferences: (state, action) => {
			return [...action.payload];
		},
		removeAllReferences: () => {
			return [];
		},
	},
});

export const {
	addReference,
	updateReference,
	removeReference,
	removeAllReferences,
	updateAllReferences,
} = referencesSlice.actions;
export const referencesReducer = referencesSlice.reducer;
