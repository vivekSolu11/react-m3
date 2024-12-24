import { createSlice } from '@reduxjs/toolkit';

const resumeSlice = createSlice({
	name: 'resume',
	initialState: {
		addedSections: [],
		resumeCreate: true,
		sectionCompleted: 0,
	},
	reducers: {
		addResumeState: (state, action) => {
			const { name, value } = action.payload;
			state[name] = value;
		},
		addResumeSectionState: (state, action) => {
			state.addedSections.push(action.payload[0]);
		},
		removeResumeSectionState: (state, action) => {
			const data = state.addedSections.filter((item) => item.key !== action.payload);
			state.addedSections = data;
		},

		updateResumeState: (state, action) => {
			const { name, value } = action.payload;
			state[name] = value;
		},
		updateresumeCreate: (state, action) => {
			state.resumeCreate = action.payload;
		},

		// Removes the state by key
		removeResumeState: (state, action) => {
			const { name } = action.payload;
			delete state[name];
		},

		updateSection: (state, action) => {
			const { completed } = action.payload;
			state.sectionCompleted = completed;
		},
	},
});

export const {
	addResumeState,
	removeResumeState,
	updateResumeState,
	addResumeSectionState,
	removeResumeSectionState,
	updateresumeCreate,
	updateSection,
} = resumeSlice.actions;
export const resumeReducer = resumeSlice.reducer;
