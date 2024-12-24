import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	education: [],
	workExperience: [],
	skills: [],
};

const userSlice = createSlice({
	name: 'userResume Details',
	initialState,
	reducers: {
		setEducation: (state, { payload }) => {
			state.education = payload;
		},
		setWorkExperience: (state, { payload }) => {
			state.workExperience = payload;
		},
		setSkills: (state, { payload }) => {
			state.skills = payload;
		},
	},
});

export const { setEducation, setWorkExperience, setSkills } = userSlice.actions;

export const userReducer = userSlice.reducer;
