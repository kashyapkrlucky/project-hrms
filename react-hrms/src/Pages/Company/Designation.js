import React, { useState } from 'react';
import { cards } from '../../Utils/Classes';
import LabelInput from '../../Common/LabelInput';
import BtnSolid from '../../Common/BtnSolid';
import HttpClient from '../../HttpClient';


function Designation({ designations, getDesignations }) {
  const [item, setItem] = useState({
    name: ''
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setItem(() => {
      return { ...item, [name]: value }
    })
  }

  const onSubmit = async () => {
    const { status } = await HttpClient.post('company/designations/add', { name: item.name });
    if (status === 200) {
      getDesignations();
      setItem({ name: '' })
    }
  }

  return (
    <div className={cards + ' flex flex-col gap-4'}>
      <h3 className='font-medium text-lg'>Add Designation</h3>
      <div className='flex flex-row gap-4'>
        <div className='w-2/3'>
          <LabelInput name="name" value={item?.name} type="text" label="Name" onChange={onChange} />
        </div>
        <div className='w-1/3 flex flex-col justify-end'>
          <BtnSolid label='Add' onClick={onSubmit} />
        </div>
      </div>
      <div className="border-t border-slate-400/20 py-3">
        <div className="mb-1.5 text-xs font-medium text-slate-500">Designations</div>
        <div className='flex flex-col gap-2'>
          {
            designations?.map((dsgn, index) => (
              <div key={index} className="flex items-center rounded-md">
                {dsgn?.name}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Designation
