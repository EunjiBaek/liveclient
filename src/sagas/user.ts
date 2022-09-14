import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    GET_MYBID_REQUEST
} from '../reducers/user';
import {
    getMyBidSuccess, 
    getMyBidFailure
}
from '../actions/user';

import * as api from '../api/user';
import { AxiosError, AxiosResponse } from 'axios';


function* getMyBidSaga(action: any) {

    console.log(action.data);

    try {
        const result:AxiosResponse = yield call(api.getMyBid, action.data);
        if (result.data.resultCd === '00') {
            yield put(getMyBidSuccess(result.data.data.Table));
        } else {
            const err = new Error("유효하지 않은 통신");
            throw err;
        }

    } catch (err) {
        console.error(err);
        yield put(getMyBidFailure((err as any).message))
    }
}



function* watchGetMybid() {
    yield takeLatest(GET_MYBID_REQUEST, getMyBidSaga);
}



export default function* userSaga() {
    yield all([
        fork(watchGetMybid),
    ]);
}
