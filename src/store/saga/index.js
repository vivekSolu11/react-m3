import { all, takeEvery } from 'redux-saga/effects';

import { commonAction } from '../sagaActions';
import { commonSaga } from './common/common';

function* watchCommon() {
	yield takeEvery(commonAction.type, commonSaga);
}

export default function* rootSaga() {
	yield all([watchCommon()]);
}
