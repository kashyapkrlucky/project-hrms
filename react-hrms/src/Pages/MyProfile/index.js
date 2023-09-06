import React, { useContext, useState } from 'react'
import SubNavBar from '../../Layouts/SubNavBar'
import { container } from '../../Utils/Classes'
import { NavLink, Outlet } from 'react-router-dom';
import { ProfileLinks } from "../../Utils/DataService";
import TabMenu from '../../Common/TabMenu';
import AboutMe from './AboutMe';
import ProfileInfo from './ProfileInfo';
import EmployeeInfo from './EmployeeInfo';
import Qualifications from './Qualifications';
import Skills from './Skills';
import Identification from './Identification';
import MyDocuments from './MyDocuments';
import BankDetails from './BankDetails';
import Employment from './Employment';

function MyProfile() {
  const [currentTab, setCurrentTab] = useState(0);
  const tabs = [
    'About Me', 'Personal Info', 'Employee Info',
    'Employment History', 'Qualifications', 'Skills',
    'Identification', 'Bank Details', 'Documents'
  ];

  const onSelectTab = (e) => {
    setCurrentTab(e);
  }
  return (
    <>
      <SubNavBar title="MyProfile" />
      <main className={container + ' overflow-y-auto h-4/5'}>
        <div className='flex flex-col'>
          <TabMenu names={tabs} onSelectTab={onSelectTab} />
          <div className='bg-white border-t border-slate-300 py-2 px-1'>
            {currentTab === 0 && <AboutMe />}
            {currentTab === 1 && <ProfileInfo />}
            {currentTab === 2 && <EmployeeInfo />}
            {currentTab === 3 && <Employment />}
            {currentTab === 4 && <Qualifications />}
            {currentTab === 5 && <Skills />}
            {currentTab === 6 && <Identification />}
            {currentTab === 7 && <BankDetails />}
            {currentTab === 8 && <MyDocuments />}
          </div>
          {/* {
            ProfileLinks.map((l, i) => (
              <NavLink key={i}
                to={l.path}
                className={({ isActive, isPending }) =>
                  (isPending ? "pending" : isActive ? "bg-white text-sky-500" : "") + ' text-sm px-4 py-2 capitalize font-medium rounded-t-md'
                }
              >{l.name}</NavLink>
            ))
          } */}
        </div>
        <Outlet />
      </main>
    </>
  )
}

export default MyProfile
