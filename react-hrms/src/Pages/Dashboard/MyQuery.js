import React from 'react';
import { cards } from "../../Utils/Classes";
import ShowList from '../../Components/ShowList';

function MyQuery() {
  const list = ['one item', 'two item', 'three item'];
  return (
    <div className={cards + ' h-60 gap-4'}>
      <h3 className='font-medium text-lg'>My Query</h3>
      <ShowList list={list}/>
    </div>
  )
}

export default MyQuery
