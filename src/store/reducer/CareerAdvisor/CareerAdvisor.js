import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	selectedCurrentPosition: null,
	selectedDesiredPosition: null,
	reportData: null,
	selectedRole: null,
};

const careerAdvisor = createSlice({
	name: 'careerAdvisor',
	initialState: initialState,
	reducers: {
		updatedCurrentPosition: (state, action) => {
			state.selectedCurrentPosition = action.payload;
		},
		updatedDesiredPosition: (state, action) => {
			state.selectedDesiredPosition = action.payload;
		},
		setCareerAdvisorData: (state, action) => {
			state.reportData = action.payload;
		},
		setSelectedRoleData: (state, action) => {
			state.selectedRole = action.payload;
		},
	},
});

export const {
	updatedCurrentPosition,
	updatedDesiredPosition,
	setCareerAdvisorData,
	setSelectedRoleData,
} = careerAdvisor.actions;

export const careerAdvisorReducer = careerAdvisor.reducer;
