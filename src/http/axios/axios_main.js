import axios from 'axios';

const axiosMain = axios.create({
	baseURL: import.meta.env.VITE_END_POINT_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosMain.interceptors.request.use(
	(config) => {
		// If the data is instance of FormData, remove the Content-Type header
		if (config.data instanceof FormData) {
			delete config.headers['Content-Type'];
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const setBaseUrl = (baseUrl) => {
	axiosMain.defaults.baseURL = baseUrl;
};

export default axiosMain;
