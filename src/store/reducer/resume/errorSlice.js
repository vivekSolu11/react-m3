import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	infoError: {},
	expError: {},
	eduError: {},
};
const errorSlice = createSlice({
	name: 'resumeError',
	initialState: initialState,
	reducers: {
		addInfoError: (state, action) => {
			state.infoError = { ...state.infoError, ...action.payload };
		},
		removeInfoError: (state, action) => {
			const obj = state.infoError;
			delete obj[action.payload];
		},
		addWorkExpError: (state, action) => {
			state.expError = { ...state.expError, ...action.payload };
		},
		removeWorkExpError: (state, action) => {
			const { id, field } = action.payload;
			// Remove the error for the specified work experience ID
			const obj = state.expError[id];
			if (obj && Object.keys(obj).length > 0) {
				delete obj[field];
			}
		},
		addEduError: (state, action) => {
			state.eduError = { ...state.eduError, ...action.payload };
		},
		removeEduError: (state, action) => {
			const { id: EduId, field: field } = action.payload;
			// Remove the error for the specified work education ID
			const obj = state.eduError[EduId];
			if (obj && Object?.keys(obj)?.length) {
				delete obj[field];
			}
		},

		resetError: () => {
			return initialState;
		},
	},
});

export const {
	addInfoError,
	addWorkExpError,
	removeWorkExpError,
	addEduError,
	removeEduError,
	removeInfoError,
	resetError,
} = errorSlice.actions;
export const resumeErrorReducer = errorSlice.reducer;
