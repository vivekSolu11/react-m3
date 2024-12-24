import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	discoverData: [],
	activeCategory: {},
};

const discover = createSlice({
	name: 'discover',
	initialState: initialState,
	reducers: {
		addDiscoveryTabData: (state, action) => {
			state.discoverData = action.payload;
		},
		updateCategory: (state, action) => {
			state.activeCategory = action.payload;
		},
	},
});

export const { updateCategory, addDiscoveryTabData } = discover.actions;

export const discoverReducer = discover.reducer;
