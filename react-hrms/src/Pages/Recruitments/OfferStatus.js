import React, { useEffect, useState } from 'react'
import BtnOutline from '../../Common/BtnOutline'
import HttpClient from '../../HttpClient';

function OfferStatus({ item, getRecruitments }) {
    const [currValue, setCurrValue] = useState('');
    const onStatusUpdate = async (e) => {
        const { status } = await HttpClient.put('recruitment/update/status', { _id: item._id, status: e });
        if (status === 200) {
            getRecruitments();
        }
    }
    useEffect(() => {
        setCurrValue(item.status);
    }, [item.status]);
    return (
        <div className='grid grid-cols-2 gap-4'>
            {
                currValue === "1" &&
                (
                    <>
                        <BtnOutline label="Start Interview" onClick={() => onStatusUpdate(2)}></BtnOutline>
                        <BtnOutline label="Reject Profile" onClick={() => onStatusUpdate(4)}></BtnOutline>
                    </>
                )
            }
            {
                currValue === "2" &&
                (
                    <>
                        <BtnOutline label="Selected" onClick={() => onStatusUpdate(3)}></BtnOutline>
                        <BtnOutline label="Rejected" onClick={() => onStatusUpdate(4)}></BtnOutline>
                        <BtnOutline label="On Hold" onClick={() => onStatusUpdate(5)}></BtnOutline>
                    </>
                )
            }
            {
                currValue === "3" &&
                (
                    <>
                        <BtnOutline label="Release Offer" onClick={() => onStatusUpdate(6)}></BtnOutline>
                        <BtnOutline label="Reject" onClick={() => onStatusUpdate(4)}></BtnOutline>
                    </>
                )
            }
            {
                currValue === "5" &&
                (
                    <>
                        <BtnOutline label="Process" onClick={() => onStatusUpdate(2)}></BtnOutline>
                        <BtnOutline label="Reject" onClick={() => onStatusUpdate(4)}></BtnOutline>
                    </>
                )
            }
            {
                currValue === "6" &&
                (
                    <>
                        <BtnOutline label="Offer Accepted" onClick={() => onStatusUpdate(7)}></BtnOutline>
                        <BtnOutline label="Offer Rejected" onClick={() => onStatusUpdate(8)}></BtnOutline>
                    </>
                )
            }
            {
                currValue === "7" &&
                (
                    <>
                        <BtnOutline label="Onboarded" onClick={() => onStatusUpdate(9)}></BtnOutline>
                        <BtnOutline label="Not Joined" onClick={() => onStatusUpdate(10)}></BtnOutline>
                    </>
                )
            }
            {
                (currValue === "4" || currValue === "8" || currValue === "9" || currValue === "10") &&
                (
                    <>
                        <p>No Action Required</p>
                    </>
                )
            }
        </div>
    )
}

export default OfferStatus