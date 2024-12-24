import { createSlice } from '@reduxjs/toolkit';

const linksSlice = createSlice({
	name: 'links',
	initialState: [],
	reducers: {
		addLink: (state, action) => {
			state.push(action.payload);
		},
		updateLink: (state, action) => {
			const { index, link } = action.payload;
			state[index] = { ...state[index], ...link };
		},
		removeLink: (state, action) => {
			return state.filter((_, idx) => idx !== action.payload);
		},
		updateAllLinks: (state, action) => {
			return [...action.payload];
		},
		removeAllLinks: () => {
			return [];
		},
	},
});

export const { addLink, updateLink, removeLink, removeAllLinks, updateAllLinks } =
	linksSlice.actions;
export const linksReducer = linksSlice.reducer;
