import { all, fork } from 'redux-saga/effects';
import auctionSaga from './auction';
import userSaga from './user';
import axios from 'axios';

// axios.defaults.baseURL = 'http://www.release.k-auction.com';
// axios.defaults.withCredentials = true;

// userSaga
export default function* rootSaga() {
    yield all([fork(auctionSaga), fork(userSaga)])
}