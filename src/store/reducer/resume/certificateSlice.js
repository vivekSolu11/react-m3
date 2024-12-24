import { createSlice } from '@reduxjs/toolkit';

const certificatesSlice = createSlice({
	name: 'certificates',
	initialState: [],
	reducers: {
		addCertificate: (state, action) => {
			state.push(action.payload);
		},
		updateCertificate: (state, action) => {
			const { index, certificate } = action.payload;
			state[index] = { ...state[index], ...certificate };
		},
		removeCertificate: (state, action) => {
			return state.filter((_, idx) => idx !== action.payload);
		},
		updateAllcertificates: (state, action) => {
			return [...action.payload];
		},
		removeAllCertificate: () => {
			return [];
		},
	},
});

export const {
	updateAllcertificates,
	addCertificate,
	updateCertificate,
	removeCertificate,
	removeAllCertificate,
} = certificatesSlice.actions;
export const certificateReducer = certificatesSlice.reducer;
