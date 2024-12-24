import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axiosMain, { setBaseUrl } from 'http/axios/axios_main';
import { handleAlert, handleReset } from 'utils/helperFunctions/helperFunction';

export const useApiRequest = () => {
	const token = useSelector((state) => state.auth.authToken);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const apiRequest = async (
		url,
		method = 'GET',
		payload = null,
		customHeaders,
		baseUrl = import.meta.env.VITE_END_POINT_URL
	) => {
		try {
			const headers = {
				Authorization: `Bearer ${token}`,
				...customHeaders,
			};

			if (baseUrl) setBaseUrl(baseUrl);

			const config = {
				method,
				url,
				headers,
			};

			if (payload) {
				config.data = payload;
			}

			return await axiosMain(config);
		} catch (error) {
			if (error?.status === 401) {
				const message = 'Session expired, Please login';
				handleAlert(dispatch, message, 'error');
				handleReset(dispatch);
				navigate('/');
			} else {
				const message =
					error.response.data.error.message ||
					error?.data?.data?.message ||
					error?.response?.data?.message ||
					'Your request has failed, please try again';
				handleAlert(dispatch, message, 'error');
			}
		}
	};

	return apiRequest;
};
