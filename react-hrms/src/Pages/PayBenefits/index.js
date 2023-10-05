import React from 'react';
import LabelDropDown from '../../Common/LabelDropDown';
import { getYears, months } from "../../Utils/DataService";
import CustomCard from '../../Common/CustomCard';
import { ArrowDownTrayIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import CustomPage from '../../Common/CustomPage';

function PayBenefits() {
  const years = getYears(2011);
  return (
    <CustomPage title="Pay & Benefits" >
      <div className='flex flex-row gap-4'>

        <CustomCard classes='w-1/3 flex flex-col gap-4'>
          <h3 className='font-medium text-lg'>Download PaySlip</h3>
          <div className='flex flex-row justify-between items-end gap-4'>
            <LabelDropDown label='Select Year' list={years} />
            <LabelDropDown label='Select Month' list={months} />
            <button className='h-8 w-24 rounded-sm bg-blue-500 flex flex-row items-center justify-center'>
              <ArrowDownTrayIcon className='w-6 h-6 text-white' />
            </button>
          </div>
        </CustomCard>

        <CustomCard classes='w-1/3 flex flex-col gap-4'>
          <h3 className='font-medium text-lg'>PF Contribution</h3>
          <div className='flex flex-row gap-4'>
            <LabelDropDown list={years} />

            <button className='h-8 w-24 rounded-sm bg-blue-500 flex flex-row items-center justify-center'>
              <ArrowDownTrayIcon className='w-6 h-6 text-white' />
            </button>
          </div>
        </CustomCard>

        <CustomCard classes='w-1/3 flex flex-col gap-4'>
          <h3 className='font-medium text-lg'>FORM-16</h3>
          <div className='flex flex-row gap-4'>
            <LabelDropDown list={years} />

            <button className='h-8 w-24 rounded-sm bg-blue-500 flex flex-row items-center justify-center'>
              <ArrowDownTrayIcon className='w-6 h-6 text-white' />
            </button>
          </div>
        </CustomCard>

      </div>
    </CustomPage>
  )
}

export default PayBenefits