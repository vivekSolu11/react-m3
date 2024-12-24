// root reducers
import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import { commonReducer } from './common/commonSlice';
import { modalReducer } from './modal/modalSlice';
import { infoReducer } from './resume/infoSlice';
import { workExperienceReducer } from './resume/workExperienceSlice';
import { educationReducer } from './resume/educationSlice';
import { certificateReducer } from './resume/certificateSlice';
import { extraCCActivitiesReducer } from './resume/extraCCActivitiesSlice';
import { hobbiesReducer } from './resume/hobbiesSlice';
import { languagesReducer } from './resume/languageSlice';
import { linksReducer } from './resume/linkSlice';
import { referencesReducer } from './resume/referenceSlice';
import { skillsReducer } from './resume/skillSlice';
import { resumeReducer } from './resume/resumeSlice';
import { jobFiltersReducer } from './filters/jobListFilters';
import { jobFiltersDropdownReducer } from './filters/jobFiltersDropdown';
import { resumeErrorReducer } from './resume/errorSlice';
import { connectReducer } from './connect/connectSlice';
import { discoverReducer } from './discover/discoverSlice';
import { salaryReducer } from './salary/salarySlice';
import { careerAdvisorReducer } from './CareerAdvisor/CareerAdvisor';
import { userReducer } from './user/userSlice';
import { InterviewQuestionReducer } from './InterviewQuestion/InterviewQuestion';

const appReducer = combineReducers({
	auth: authReducer,
	common: commonReducer,
	modal: modalReducer,
	info: infoReducer,
	jobFilters: jobFiltersReducer,
	jobFiltersDropdown: jobFiltersDropdownReducer,
	workExperience: workExperienceReducer,
	education: educationReducer,
	skills: skillsReducer,
	certificates: certificateReducer,
	languages: languagesReducer,
	hobbies: hobbiesReducer,
	references: referencesReducer,
	extraCCActivities: extraCCActivitiesReducer,
	links: linksReducer,
	resume: resumeReducer,
	resumeError: resumeErrorReducer,
	connect: connectReducer,
	discover: discoverReducer,
	salary: salaryReducer,
	careerAdvisor: careerAdvisorReducer,
	user: userReducer,
	InterviewQuestion: InterviewQuestionReducer,
});

const rootReducer = (state, action) => {
	if (action.type === 'RESET_STATE') {
		state = undefined;
	}
	return appReducer(state, action);
};

export default rootReducer;
