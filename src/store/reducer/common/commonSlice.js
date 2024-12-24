import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	errorMsg: '',
	anchorPosition: { top: 720, left: 0 },
	builderActiveTab: 'select_template',
	jobListType: 'recommended',
	jobFilter: 'sortBy=matchScore&sortValue=-1',
	mobileChatBotMessage: '',
	showFullBot: false,
	fromMobile: false,
	analysisData: null,
	issueCount: {
		urgent: 0,
		optional: 0,
		critical: 0,
	},
};

const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		commonStart: (state) => {
			state.isLoading = true;
		},
		commonSuccess: (state, action) => {
			const { stateObj, res } = action.payload;
			state[stateObj] = res;
			state.isLoading = false;
			state.errorMsg = '';
		},
		commonFail: (state, action) => {
			state.isLoading = false;
			state.errorMsg = action.payload;
		},
		clearState: (state, action) => {
			const { stateName } = action.payload;
			state[stateName] = null;
		},

		addState: (state, action) => {
			const { name, value } = action.payload;
			state[name] = value;
		},

		removeState: (state, action) => {
			const { name } = action.payload;
			delete state[name];
		},

		removeSection: (state, action) => {
			const { name } = action.payload;
			// Safely check for the property using Object.prototype.hasOwnProperty.call
			if (Object.prototype.hasOwnProperty.call(state.analysisData.sections, name)) {
				delete state.analysisData.sections[name];
			}
		},

		updateIssueCount: (state, action) => {
			state.issueCount = { ...action.payload };
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	commonStart,
	commonSuccess,
	commonFail,
	clearState,
	addState,
	removeState,
	removeSection,
	updateIssueCount,
} = commonSlice.actions;

export const commonReducer = commonSlice.reducer;
