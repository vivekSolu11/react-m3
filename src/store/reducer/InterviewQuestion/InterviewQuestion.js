import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	selectedCurrentPositionForInterview: null,
	selectedCompany: null,
	reportData: null,
	selectedRole: null,
};

const InterviewQuestion = createSlice({
	name: 'InterviewQuestion',
	initialState: initialState,
	reducers: {
		updatedCurrentPositionForInterview: (state, action) => {
			state.selectedCurrentPositionForInterview = action.payload;
		},
		updateCompnay: (state, action) => {
			state.selectedCompany = action.payload;
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
	updatedCurrentPositionForInterview,
	updateCompnay,
	setCareerAdvisorData,
	setSelectedRoleData,
} = InterviewQuestion.actions;

export const InterviewQuestionReducer = InterviewQuestion.reducer;
