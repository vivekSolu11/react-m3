export * from './common/common';

// modal reducers action
export * from '../reducer/modal/modalSlice';

// auth reducers actions
export * from '../reducer/auth/authSlice';

// common reducers actions
export * from '../reducer/common/commonSlice';

export * from '../reducer/resume/resumeSlice';

export const resetApp = () => ({
	type: 'RESET_STATE',
});
