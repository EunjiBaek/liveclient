import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import palette from "../styles/palette";
import BiddingSelectInfo from "../components/BiddingSelectInfo";
import BiddingItemForm from '../components/BiddingItemForm';
import { AucStateResType, bidsInfoResType } from "../type";
import { RootState } from '../reducers';
import { FormattedMessage } from "react-intl";
import { getBidsRequest, bidsListUpdateRequest } from '../actions/auction';


// Wrapper
const Wrapper = styled.div`
    overflow: hidden;
    border: 1px solid ${palette.gray[2]};
    border-radius: 5px;
    box-sizing: border-box;
    margin-bottom: 12px;
`;

const BiddingListWrap = styled.div`
    padding: 0 20px;
    height: 500px;
    overflow-y: auto;
    box-sizing: border-box;
`;


const BiddingDeadline = styled.div`
    height: 50px;
    border-bottom: 1px solid ${palette.gray[2]};
    display: flex;
    align-items: center;
    justify-content: center;


    > p {
        color: ${palette.orange[5]};
        padding-right: 4px;
    }

    > img {
        height: 5px;
    }
    
`;


const BiddngListNot = styled.div`
    padding: 0 20px;
    height: 500px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > p {
        margin-top: 5px;
        color: ${palette.gray[3]}
    }
`;


interface props {
    currentLotStat: AucStateResType;
    currentBidHst: bidsInfoResType[] | null;
}


const BiddingSelectContainer = ({currentBidHst, currentLotStat }: props) => {
    const dispatch = useDispatch();
    const { auc_kind, bidsList, workList } = useSelector((state: RootState) => state.auction);
    const { auc_num } = useSelector((state: RootState) => state.auction?.scheduleCnt);
    const currentLotInfo = workList?.find((v) => v.lot_num === currentLotStat?.lot_num);
    const [state, setState] = useState(false);

  
    useEffect(() => {
        dispatch(getBidsRequest({
            "auc_kind": auc_kind,
            "auc_num": auc_num,
            "lot_num": currentLotStat?.lot_num,
            "page_no": 1,
            "page_size": 1000
        }));

    }, [auc_num, currentLotStat?.lot_num]);

    useEffect(() => {
        if (!!currentBidHst) {
            dispatch(bidsListUpdateRequest(currentBidHst)); 
        }    
    }, [currentBidHst]);

    useEffect(() => {
        if(currentLotStat.is_fair_warning === true) {
            setState(true)
        }
    }, [currentLotStat.lot_num, currentLotStat.is_fair_warning]);

    // lot_stat_cd f
    useEffect(() => {
        if(currentLotStat.lot_stat_cd === 'F') {
            setState(false)
        }
    }, [currentLotStat.lot_stat_cd]);


    return (
        <Wrapper>
            <BiddingSelectInfo currentLotInfo={currentLotInfo}/>
            <>
            {bidsList?.length === 0 
                ?
                    <BiddngListNot>
                        <p><FormattedMessage id="no_bids"/></p>
                    </BiddngListNot>
                :
                    <BiddingListWrap>
                        {/* remainico <img src={require('../assets/img/remainico.png')} /> */}
                    {state === true &&
                        <BiddingDeadline>
                            <p><FormattedMessage id='FairWarning'/></p>
                            <img src={require('../assets/img/remainico.gif')} />
                        </BiddingDeadline>
                    }
                    <>

                    {bidsList?.map((list, index) => <BiddingItemForm key={list.bid_hst_seq} list={list} index={index} />
                    )}
                    </>
                    </BiddingListWrap>                            
            }
            </>
        </Wrapper>
    )
}

export default BiddingSelectContainer