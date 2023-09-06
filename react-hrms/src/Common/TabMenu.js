import React, { useState } from 'react'
import { borderTheme, textTheme } from '../Utils/Classes';

function TabMenu({ names = [], onSelectTab }) {
    const [selected, setSelected] = useState(0);
    const onChange = (e) => {
        setSelected(e);
        onSelectTab(e);
    }
    return (
        <div className='flex flex-row bg-white'>
            {names.map((x, i) => (
                <p key={i} onClick={() => onChange(i)} className={'py-2 px-4 text-sm cursor-pointer ' + (selected === i ? `border-b-2 ${textTheme} ${borderTheme}` : '')}>{x}</p>
            ))}
        </div>
    )
}

export default TabMenu
