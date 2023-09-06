import React from 'react'
import SubNavBar from '../../Layouts/SubNavBar';
import ProfileForm from './ProfileForm'
import { container } from '../../Utils/Classes'

function Settings() {
  return (
    <>
      <SubNavBar title="Settings" />
      <main className={container + ' overflow-y-auto h-4/5'}>
        <ProfileForm />
      </main>
    </>
  )
}

export default Settings
