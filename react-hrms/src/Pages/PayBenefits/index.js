import React from 'react';
import SubNavBar from '../../Layouts/SubNavBar';
import { cards, container } from "../../Utils/Classes";
import AddQuery from '../../Components/AddQuery';
import LabelDropDown from '../../Common/LabelDropDown';
import { getYears, months } from "../../Utils/DataService";
import BtnOutline from '../../Common/BtnOutline';

function PayBenefits() {
  const years = getYears(2011);
  return (
    <>
      <SubNavBar title="Pay & Benefits" />
      <main className={container + ' overflow-y-auto h-4/5'}>
        <div className='flex flex-row gap-4'>
          <div className='w-4/6'>
            <div className='flex flex-row gap-4'>
              <div className='w-2/4 flex flex-col gap-4'>
                <div className={cards + ' flex flex-col gap-4'}>
                  <h3 className='font-medium text-lg'>Download PaySlip</h3>
                  <div className='flex flex-row justify-between items-center gap-4'>
                    <LabelDropDown list={months} />
                    <LabelDropDown list={years} />
                    <BtnOutline label='Download' />
                  </div>
                </div>
              </div>
              <div className='w-2/4 flex flex-col gap-4'>
                <div className={cards + ' flex flex-col gap-4'}>
                  <h3 className='font-medium text-lg'>PF Contribution</h3>
                  <div className='flex flex-row gap-4'>
                    <LabelDropDown list={years} />
                    <BtnOutline label='Download' />
                  </div>
                </div>

                <div className={cards + ' flex flex-col gap-4'}>
                  <h3 className='font-medium text-lg'>FORM-16</h3>
                  <div className='flex flex-row gap-4'>
                    <LabelDropDown list={years} />
                    <BtnOutline label='Download' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-2/6'>
            <AddQuery />
          </div>
        </div>
      </main>
    </>
  )
}

export default PayBenefits