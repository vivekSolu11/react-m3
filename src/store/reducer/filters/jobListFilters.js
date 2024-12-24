import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	experience: 'exp',
	companies: [],
	jobTypes: 'jobType',
	workType: 'workType',
	industries: [],
	jobTitle: '',
};
const jobFiltersSlice = createSlice({
	name: 'jobFilters',
	initialState: initialState,
	reducers: {
		updateJobFilter: (state, action) => {
			return { ...state, ...action.payload };
		},
		updateJobType: (state, action) => {
			state.jobTypes = action.payload;
		},
		updateWorkType: (state, action) => {
			state.workType = action.payload;
		},
		updateIndustries: (state, action) => {
			state.industries = action.payload;
		},
		updateJobTitle: (state, action) => {
			state.jobTitle = action.payload;
		},
		resetInfo: () => {
			return initialState;
		},
	},
});

export const {
	updateJobFilter,
	resetInfo,
	updateJobType,
	updateJobTitle,
	updateWorkType,
	updateIndustries,
} = jobFiltersSlice.actions;
export const jobFiltersReducer = jobFiltersSlice.reducer;
