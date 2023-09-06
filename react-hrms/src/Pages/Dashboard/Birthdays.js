import React from 'react';
import { cards } from "../../Utils/Classes";
import ShowList from '../../Components/ShowList';

function Birthdays() {
  const list = ['one item', 'two item', 'three item'];
  return (
    <div className={cards + ' h-60 gap-4'}>
      <h3 className='font-medium text-lg'>Upcoming Birthdays</h3>
      <ShowList list={list}/>
    </div>
  )
}

export default Birthdays
