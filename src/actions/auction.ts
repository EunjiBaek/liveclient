import {
    LOAD_NOTICE_REQUEST,
    LOAD_NOTICE_SUCCESS,
    LOAD_NOTICE_FAILURE,
    GET_SCHEDULE_REQUEST,
    GET_SCHEDULE_SUCCESS,
    GET_SCHEDULE_FAILURE,
    BIDDING_INSERT_REQUEST,
    BIDDING_INSERT_SUCCESS,
    BIDDING_INSERT_FAILURE,
    LIKE_WORK_REQUEST,
    LIKE_WORK_SUCCESS,
    LIKE_WORK_FAILURE,
    WISH_INFO_SELECT_REQUEST,
    WISH_INFO_SELECT_SUCCESS,
    WISH_INFO_SELECT_FAILURE,
    GET_BIDS_REQUEST,
    GET_BIDS_SUCCESS,
    GET_BIDS_FAILURE,
    CURRENCY_REQUEST,
    CURRENCY_SUCCESS,
    BIDS_LIST_UPDATE_REQUEST,
    BIDS_LIST_UPDATE_SUCCESS,
    BIDS_LIST_CLAIM_REQUEST,
    BIDS_LIST_CLAIM_SUCCESS
} from '../reducers/auction';

import { biddingInsertReqType, WishInfoSelectReqType } from '../type';


// 공지사항 조회
export const loadNoticeRequest = ({auc_kind, auc_num}: {auc_kind: number, auc_num: number}) => ({
    type: LOAD_NOTICE_REQUEST,
    data: {
        auc_kind,
        auc_num
    }
});

export const loadNoticeSuccess = (data: any) => ({
    type: LOAD_NOTICE_SUCCESS,
    data: data
});


export const loadNoticeFailure = (err: any) => ({
    type: LOAD_NOTICE_FAILURE,
    error: err
});


// 스케줄조회
export const getScheduleRequest = ({auc_kind, auc_num}: {auc_kind: number, auc_num: number}) => ({
    type: GET_SCHEDULE_REQUEST,
    data: {
        auc_kind,
        auc_num
    }
});

export const getScheduleSuccess = (data: any) => ({
    type: GET_SCHEDULE_SUCCESS,
    data: data
});


export const getScheduleFailure = (err: any) => ({
    type: GET_SCHEDULE_FAILURE,
    error: err
});


// 응찰등록
export const biddingInsertRequest = ({auc_kind, auc_num, lot_num, paddle_num, bid_price}: biddingInsertReqType) => ({
    type: BIDDING_INSERT_REQUEST,
    data: {
        auc_kind,
        auc_num,
        lot_num,
        paddle_num,
        bid_price
    }
});

export const biddingInsertSuccess = (data: any) => ({
    type: BIDDING_INSERT_SUCCESS,
    data: data
});


export const biddingInsertFailure = (error: any) => ({
    type: BIDDING_INSERT_FAILURE,
    error
});

// 전체응찰내역조회
export const getBidsRequest = ({auc_kind, auc_num, page_no, page_size, lot_num}: {auc_kind: number, auc_num: number, page_no: number, page_size: number, lot_num: number}) => ({
    type: GET_BIDS_REQUEST,
    data: {
        auc_kind,
        auc_num,
        lot_num,
        page_no,
        page_size
    }
});

export const getBidsSuccess = (data: any) => ({
    type: GET_BIDS_SUCCESS,
    data: data
});


export const getBidsFailure = (error: any) => ({
    type: GET_BIDS_FAILURE,
    error
});


// 관심작품추가하기
export const likeWorkRequest = ({auc_kind, auc_num, lot_num, page_no, page_size, work_seq}: {auc_kind: number, auc_num: number, lot_num: number, page_no: number, page_size: number, work_seq: number}) => ({
    type: LIKE_WORK_REQUEST,
    data: {
        auc_kind,
        auc_num,
        lot_num,
        page_no,
        page_size,
        work_seq
    }
});

export const likeWorkSuccess = (data: any) => ({
    type: LIKE_WORK_SUCCESS,
    data: data
});

export const likeWorkFailure = (err:any) => ({
    type: LIKE_WORK_FAILURE,
    error: err
});


// 관심작품목록가져오기
export const wishInfoSelectRequest = ({auc_kind, auc_num, page_no, page_size}: WishInfoSelectReqType) => ({
    type: WISH_INFO_SELECT_REQUEST,
    data: {
        auc_kind,
        auc_num,
        page_no,
        page_size
    }
});

export const wishInfoSelectSuccess = (data: any) => ({
    type: WISH_INFO_SELECT_SUCCESS,
    data: data
});

export const wishInfoSelectFailure = (error: any) => ({
    type: WISH_INFO_SELECT_FAILURE,
    error
});

// 언어변경
export const currencyRequest = (data: string) => ({
    type: CURRENCY_REQUEST,
    data
});

export const currencySuccess = (data: any) => ({
    type: CURRENCY_SUCCESS,
    data
});

// 응찰내역업데이트 (취소나 삭제 됏을경우)
export const bidsListUpdateRequest = (data: any) => ({
    type: BIDS_LIST_UPDATE_REQUEST,
    data
});

export const bidsListUpdateSuccess = (data: any) => ({
    type: BIDS_LIST_UPDATE_SUCCESS,
    data: data
});


// BIDS_LIST_CLAIM_SUCCESS
export const bidsListClaimRequest = (data: any) => ({
    type: BIDS_LIST_CLAIM_REQUEST,
    data
});

export const bidsListClaimSuccess = (data: any) => ({
    type: BIDS_LIST_CLAIM_SUCCESS,
    data
});







export type ActionRequest =
  | ReturnType<typeof loadNoticeRequest>
  | ReturnType<typeof loadNoticeSuccess>
  | ReturnType<typeof loadNoticeFailure>
  | ReturnType<typeof getScheduleRequest>
  | ReturnType<typeof getScheduleSuccess>
  | ReturnType<typeof getScheduleFailure>
  | ReturnType<typeof biddingInsertRequest>
  | ReturnType<typeof biddingInsertSuccess>
  | ReturnType<typeof biddingInsertFailure>
  | ReturnType<typeof likeWorkRequest>
  | ReturnType<typeof likeWorkSuccess>
  | ReturnType<typeof likeWorkFailure>
  | ReturnType<typeof wishInfoSelectRequest>
  | ReturnType<typeof wishInfoSelectSuccess>
  | ReturnType<typeof wishInfoSelectFailure>
  | ReturnType<typeof getBidsRequest>
  | ReturnType<typeof getBidsSuccess>
  | ReturnType<typeof getBidsFailure>
  | ReturnType<typeof currencyRequest>
  | ReturnType<typeof currencySuccess>
  | ReturnType<typeof bidsListUpdateRequest>
  | ReturnType<typeof bidsListUpdateSuccess>
  | ReturnType<typeof bidsListClaimRequest>
  | ReturnType<typeof bidsListClaimSuccess>
;

