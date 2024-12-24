import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	customModalOpen: false,
	customModalType: '',
	customModalTypeOne: '',
	tempCustomModalData: null,
	alertMessage: '',
	openAlert: false,
	alertStatus: '',
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		showCustomModal: (state, { payload }) => {
			state.customModalOpen = true;
			if (payload.customModalType) {
				state.customModalType = payload.customModalType;
			}
			if (payload.tempCustomModalData) {
				state.tempCustomModalData = payload.tempCustomModalData;
			}
		},
		showCustomModal1: (state, { payload }) => {
			state.customModalTypeOne = payload.customModalTypeOne;
		},
		hideCustomModal1: (state) => {
			state.customModalTypeOne = '';
		},
		hideCustomModal: (state) => {
			state.customModalOpen = false;
			state.customModalType = '';
			state.tempCustomModalData = null;
		},
		showAlert: (state, { payload }) => {
			state.openAlert = true;
			state.alertMessage = payload.message;
			state.alertStatus = payload.status;
			state.className = payload.className;
			state.textColor = payload.textColor;
			state.textSize = payload.textSize;
			state.isIcon = payload.isIcon;
		},
		closeAlert: (state) => {
			state.openAlert = false;
			state.alertMessage = '';
			state.alertStatus = '';
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	showCustomModal,
	hideCustomModal,
	showCustomModal1,
	hideCustomModal1,
	showAlert,
	closeAlert,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
