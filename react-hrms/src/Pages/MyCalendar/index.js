import React from 'react'
import CustomPage from '../../Common/CustomPage'
import { cards } from '../../Utils/Classes'

function MyCalendar() {
  const Categories = ['Office', 'Appointments', 'Personal', 'Others']
  return (
    <CustomPage title="My Calendar">
      <div className={'flex flex-row gap-4 h-full ' + cards}>
      </div>
    </CustomPage>
  )
}

export default MyCalendar