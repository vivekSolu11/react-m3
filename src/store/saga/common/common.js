import { put } from 'redux-saga/effects';
import axios from 'axios';
import { commonFail, commonStart, commonSuccess } from '../../sagaActions';

export function* commonSaga(action) {
	const { endPoint, method, success, stateObj, payloadData, onCompletion, fail } = action.payload;

	yield put(commonStart({ stateObj }));

	try {
		// Make the HTTP request using Axios
		const response = yield axios({
			url: endPoint,
			method: method,
			data: payloadData,
			headers: {
				Authorization: 'Bearer TOKEN',
			},
		});

		const resObj = { res: response, stateObj: stateObj };

		// Handle success
		if (success) {
			success(response);
		}

		// Handle completion
		if (onCompletion) {
			onCompletion();
		}

		yield put(commonSuccess(resObj));
	} catch (error) {
		// Handle error
		yield put(commonFail(error.response || error.message));
		if (fail) fail(error.response || error.message);
	}
}
