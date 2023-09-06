import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavLinks, logoUrl } from "../Utils/DataService";
import { textTheme } from '../Utils/Classes';

function SideMenu() {
  const linkStyle = " font-medium text-sm px-3 py-2 flex flex-row items-center gap-2";
  return (
    <aside className="w-1/6 h-full bg-white flex flex-col gap-2 border-r-2 border-gray-200 px-4">
      <div className='flex flex-row gap-4 p-4'>
        <img className="h-8 w-8" src={logoUrl} alt="Your Company" />
        <p className='text-xl'>Ascent HR</p>
      </div>
      <div className='flex flex-col gap-2 justify-center text-slate-600'>
        {
          NavLinks.map((cat, k) => (
            <div className='flex flex-col' key={k}>
              <p className='text-slate-500 font-light text-xs uppercase py-2'>{cat.category}</p>
              {
                cat.links.map((l, i) => (
                  <NavLink key={i}
                    to={l.path}
                    className={({ isActive, isPending }) =>
                      (isPending ? "pending" : (isActive ? `bg-slate-100 rounded-md ${textTheme}` : "text-slate-700") + linkStyle)
                    }
                  >
                    {l.icon}
                    <span>{l.name}</span>
                  </NavLink>
                ))
              }
            </div>
          ))
        }
      </div>
    </aside>
  )
}

export default SideMenu