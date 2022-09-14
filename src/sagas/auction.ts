import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    LOAD_NOTICE_REQUEST,
    GET_SCHEDULE_REQUEST,
    BIDDING_INSERT_REQUEST,
    LIKE_WORK_REQUEST,
    WISH_INFO_SELECT_REQUEST,
    GET_BIDS_REQUEST,
    CURRENCY_REQUEST,
    BIDS_LIST_UPDATE_REQUEST,
    BIDS_LIST_CLAIM_REQUEST
} from '../reducers/auction';
import {
    loadNoticeSuccess, 
    loadNoticeFailure,
    getScheduleSuccess,
    getScheduleFailure,
    biddingInsertSuccess,
    biddingInsertFailure,
    likeWorkSuccess,
    likeWorkFailure,
    wishInfoSelectSuccess,
    wishInfoSelectFailure,
    getBidsSuccess,
    getBidsFailure,
    currencySuccess,
    bidsListUpdateSuccess,
    bidsListClaimSuccess
}
from '../actions/auction';

import * as api from '../api/auction';
import { AxiosResponse } from 'axios';


// 공지사항 조회
function* loadNoticeSaga(action: any) {
    try {
        const result:AxiosResponse = yield call(api.loadNotice, action.data);
        // eslint-disable-next-line eqeqeq
        if (result.data.resultCd === '00') {
            yield put(loadNoticeSuccess(result.data));
        } else {
            const err = new Error('please improve your code');
            throw err;
        }
    } catch (err) {
        console.error(err)
        yield put(loadNoticeFailure((err as any).message));
    }
}


// 경매스케줄 조회
function* loadScheduleSaga(action: any) {
    try {
        const result:AxiosResponse = yield call(api.loadSchedule, action.data);

        // eslint-disable-next-line eqeqeq
        if (result.data.resultCd === '00') {
            yield put(getScheduleSuccess(result.data));
        } else {
            const err = new Error('please improve your code');
            throw err;
        }
    } catch (err) {
        console.error(err)
        yield put(getScheduleFailure((err as any).message));
    }
}

// 응찰등록
function* biddingInsertSaga(action: any) {

    try {
        const result:AxiosResponse = yield call(api.biddingInsert, action.data);
        // eslint-disable-next-line eqeqeq  
        if (result.data.resultCd === '00') {
            
            if (result.data.data.Table[0].code == "00") {
                yield put(biddingInsertSuccess(result.data.data.Table[0]));
            } else {
                const err = new Error(result.data.data.Table[0].msg);
                throw err;
            }
    
        } else {
            const err = new Error("유효하지 않은 통신");
            throw err;
        }

    } catch (err) {
        console.error(err);
        yield put(biddingInsertFailure((err as any).message))
    }
}


// 관심작품추가
function* likeWorkSaga(action: any) {

    const lot_num = action.data.lot_num;
    try {
        const result:AxiosResponse = yield call(api.likeWork, action.data);
        if (result.data.resultCd === '00') {
            yield put(likeWorkSuccess(lot_num));
        } else {
            const err = new Error("유효하지 않은 통신");
            throw err;
        }

    } catch (err) {
        console.error(err);
        yield put(likeWorkFailure((err as any).message))
    }
}

// 관심작품목록가져오기
function* wishInfoSelectSaga(action: any) {

    try {
        const result:AxiosResponse = yield call(api.wishInfoSelect, action.data);
        // eslint-disable-next-line eqeqeq  
        if (result.data.resultCd === '00') {

            yield put(wishInfoSelectSuccess(result.data.data.Table));
    
        } else {
            const err = new Error("유효하지 않은 통신");
            throw err;
        }

    } catch (err) {
        console.error(err);
        yield put(wishInfoSelectFailure((err as any).message))
    }
}


// 전체응찰내역조회
function* getBidsSaga(action: any) {

    try {
        const result:AxiosResponse = yield call(api.getBids, action.data);
        // eslint-disable-next-line eqeqeq  
        if (result.data.resultCd === '00') {
            yield put(getBidsSuccess(result.data.data.Table));
        } else {
            const err = new Error("유효하지 않은 통신");
            throw err;
        }

    } catch (err) {
        console.error(err);
        yield put(getBidsFailure((err as any).message))
    }
}


// 언어변경
function* currencySaga(action: any) {

    console.log(action.data)

    try {
        yield put(currencySuccess(action.data));

    } catch (err) {
        console.error(err);
    }
}

// 응찰내역업데이트
function* bidsListUpdateSaga(action: any) {
    try {
        yield put(bidsListUpdateSuccess(action.data));

    } catch (err) {
        console.error(err);
    }
}


// 클레임정보
function* bidsListClaimSaga(action: any) {
    try {
        const result = action.data;
        yield put(bidsListClaimSuccess(result.data));    
  
    } catch (err) {
        console.error(err);
    }
}





function* watchLoadSchedule() {
    yield takeLatest(GET_SCHEDULE_REQUEST, loadScheduleSaga)
}

function* watchLoadNotice() {
    yield takeLatest(LOAD_NOTICE_REQUEST, loadNoticeSaga);
}

function* watchBiddingInsert() {
    yield takeLatest(BIDDING_INSERT_REQUEST, biddingInsertSaga);
}

function* watchLikeWork() {
    yield takeLatest(LIKE_WORK_REQUEST, likeWorkSaga);
}

function* watchWishInfoSelect() {
    yield takeLatest(WISH_INFO_SELECT_REQUEST, wishInfoSelectSaga);
}

function* watchGetBids() {
    yield takeLatest(GET_BIDS_REQUEST, getBidsSaga);
}

function* watchCurrency() {
    yield takeLatest(CURRENCY_REQUEST, currencySaga);
}

function* watchBidListUpdate() {
    yield takeLatest(BIDS_LIST_UPDATE_REQUEST, bidsListUpdateSaga);
}

function* watchBidListClaim() {
    yield takeLatest(BIDS_LIST_CLAIM_REQUEST, bidsListClaimSaga);
}



export default function* auctionSaga() {
    yield all([
        fork(watchLoadSchedule),
        fork(watchLoadNotice),
        fork(watchLikeWork),
        fork(watchBiddingInsert),
        fork(watchWishInfoSelect),
        fork(watchGetBids),
        fork(watchCurrency),
        fork(watchBidListUpdate),
        fork(watchBidListClaim)
    ]);
}



