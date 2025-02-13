import React from 'react'
import { fxCenBet } from "../Utils/Classes";
import BtnSolid from '../Common/BtnSolid';
import BtnOutline from '../Common/BtnOutline';

function SubNavBar({ title = 'Sub Header', btnOne, btnTwo }) {
    return (
        <header className={fxCenBet + " border-t-2 border-gray-200 h-16"}>
            <h2 className="text-xl font-medium leading-7 text-emerald-500">{title}</h2>
            <div className='flex flex-row gap-4'>
                {
                    btnOne &&
                    <BtnSolid type="button" label={btnOne.label} onClick={btnOne.action} />
                }
                {
                    btnTwo &&
                    <BtnOutline type="button" label={btnTwo.label} onClick={btnTwo.action} />
                }
            </div>
        </header>
    )
}

export default SubNavBar
