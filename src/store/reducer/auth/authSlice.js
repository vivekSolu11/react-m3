import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	logoutLoading: false,
	authToken: '',
	isAvailable: null,
	loginEmail: '',
	errorMsg: '',
	signUpData: null,
	signInData: null,
	socialSignInData: null,
	isLogin: false,
	loginData: null,
};

const authSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setIsLogin: (state, { payload }) => {
			state.isLogin = payload;
		},
		setIsLoginData: (state, { payload }) => {
			state.loginData = payload;
		},

		clearAuth: (state) => {
			state.authToken = null;
		},
		updateAuthToken: (state, { payload }) => {
			state.authToken = payload.token;
		},
	},
});

// Action creators are generated for each case reducer function
export const { clearAuth, updateAuthToken, setIsLogin, setIsLoginData } = authSlice.actions;

export const authReducer = authSlice.reducer;
