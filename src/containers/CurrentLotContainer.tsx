import React from 'react';
import CurrentLotForm from "../components/CurrentLotForm";
import { WorkListResType } from '../type';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';


interface Props {
    currentLotInfo: WorkListResType;
};


const CurrentLotContainer = ({currentLotInfo}: Props) => {

    const { auc_num } = useSelector((state: RootState) => state.auction?.scheduleCnt);

    return (
        <>
            <CurrentLotForm auc_num={auc_num} currentLotInfo={currentLotInfo}/>
        </>

    )
}

export default CurrentLotContainer