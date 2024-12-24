import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	name: '',
	image: '',
	email: '',
	phone: '',
	githubUrl: '',
	linkedInUrl: '',
	otherUrl: '',
	location: '',
	summary: '',
	jobProfile: '',
};
const infoSlice = createSlice({
	name: 'info',
	initialState: initialState,
	reducers: {
		updateInfo: (state, action) => {
			return { ...state, ...action.payload };
		},
		resetInfo: () => {
			return initialState;
		},
	},
});

export const { updateInfo, resetInfo } = infoSlice.actions;
export const infoReducer = infoSlice.reducer;
