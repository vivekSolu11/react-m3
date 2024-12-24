import { createSlice } from '@reduxjs/toolkit';
import { initialSkills } from 'constants/resumeBuilder';

const skillsSlice = createSlice({
	name: 'skills',
	initialState: [
		{
			title: 'Technical Skills',
			key: 'technicalSkills',
			visible: true,
			data: [],
		},
		{
			visible: true,
			title: 'Software Skills',
			key: 'softwareSkills',
			data: [],
		},
		{
			visible: true,
			title: 'Research Skills',
			key: 'researchSkills',
			data: [],
		},
		{
			title: 'Communication Skills',
			key: 'communicationSkills',
			visible: true,
			data: [],
		},
	],
	reducers: {
		addSkill: (state, action) => {
			const { category, skill } = action.payload;
			const index = state.findIndex((data) => data.key === category);
			if (state[index]?.data) {
				state[index]?.data?.push(skill);
			} else {
				state[index].data = [skill];
			}
		},
		addAllSkill: (state, action) => {
			return [...action.payload];
		},
		toggleSkillVisibility(state, action) {
			const category = state.find((item) => item.key === action.payload);
			if (category) {
				category.visible = !category.visible; // Toggle the visibility
			}
		},

		removeSkill: (state, action) => {
			const { category, skillKey } = action.payload;
			const categoryIndex = state.findIndex((item) => item.key === category);
			if (categoryIndex !== -1) {
				state[categoryIndex].data = state[categoryIndex].data.filter(
					(skill) => skill.key !== skillKey
				);
			}
		},
		updateAllSkill: (state, action) => {
			return action.payload;
		},
		resetSkill: () => {
			return initialSkills;
		},
	},
});

export const {
	addSkill,
	resetSkill,
	addAllSkill,
	removeSkill,
	toggleSkillVisibility,
	updateAllSkill,
} = skillsSlice.actions;
export const skillsReducer = skillsSlice.reducer;
