import { createSlice } from '@reduxjs/toolkit';

const hobbiesSlice = createSlice({
	name: 'hobbies',
	initialState: [],
	reducers: {
		addHobby: (state, action) => {
			state.push(action.payload);
		},
		addAllHobby: (state, action) => {
			return [...action.payload];
		},
		removeHobby: (state, action) => {
			return state.filter((_, idx) => idx !== action.payload);
		},
		removeAllHobby: () => {
			return [];
		},
	},
});

export const { addHobby, addAllHobby, removeHobby, removeAllHobby } = hobbiesSlice.actions;
export const hobbiesReducer = hobbiesSlice.reducer;
