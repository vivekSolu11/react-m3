import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	experienceData: [],
	designationsData: [],
	companiesData: [],
	datePostedData: [],
	jobTypesData: [],
	workTypeData: [],
	industriesData: [],
	jobFunctionsData: [],
	commitmentsData: [],
};

const mergeUniqueById = (existingData = [], newData = []) => {
	return Array.from(
		new Map([...existingData, ...newData].map((item) => [item._id, item])).values()
	);
};

const jobFiltersDropdownSlice = createSlice({
	name: 'jobFiltersDropdown',
	initialState: initialState,
	reducers: {
		updateExperienceData: (state, action) => {
			state.experienceData = action.payload; // Append new objects
		},
		updatejobTypesData: (state, action) => {
			state.jobTypesData = action.payload; // Append new objects
		},
		updateWorkModeData: (state, action) => {
			state.workTypeData = action.payload; // Append new objects
		},
		updatedatePostedData: (state, action) => {
			state.datePostedData = action.payload; // Append new objects
		},
		updateDesignation: (state, action) => {
			state.designationsData = action.payload; // Append new objects
		},
		updateCompanyData: (state, action) => {
			state.companiesData = mergeUniqueById(state.companiesData, action.payload);
		},
		updateIndustryData: (state, action) => {
			state.industriesData = mergeUniqueById(state.industriesData, action.payload);
		},

		updateJobFunctionData: (state, action) => {
			state.jobFunctionsData = Array.from(
				new Set([...state.jobFunctionsData, ...action.payload])
			);
		},
		updateCommitments: (state, action) => {
			state.commitmentsData = Array.from(
				new Set([...state.commitmentsData, ...action.payload])
			);
		},

		resetInfo: () => {
			return initialState;
		},
	},
});

export const {
	updateExperienceData,
	updateCompanyData,
	updatejobTypesData,
	updateIndustryData,
	updateWorkModeData,
	updatedatePostedData,
	updateJobFunctionData,
	updateCommitments,
	updateDesignation,
} = jobFiltersDropdownSlice.actions;
export const jobFiltersDropdownReducer = jobFiltersDropdownSlice.reducer;
