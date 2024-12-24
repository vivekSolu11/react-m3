import { createSlice } from '@reduxjs/toolkit';

const extraCCActivitiesSlice = createSlice({
	name: 'extraCCActivities',
	initialState: [],
	reducers: {
		addActivity: (state, action) => {
			state.push(action.payload);
		},
		addAllActivity: (state, action) => {
			return [...action.payload];
		},
		removeActivity: (state, action) => {
			return state.filter((_, idx) => idx !== action.payload);
		},
		resetActivity: () => {
			return [];
		},
	},
});

export const { addActivity, addAllActivity, removeActivity, resetActivity } =
	extraCCActivitiesSlice.actions;
export const extraCCActivitiesReducer = extraCCActivitiesSlice.reducer;
