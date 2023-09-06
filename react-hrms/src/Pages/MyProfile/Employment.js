import React from 'react';

function EmpCard({ profile, employer, from, to, location }) {
  return (
    <div className='p-3 '>
      <div className='font-medium'>
        {profile} - {employer}
      </div>
      <div className='text-sm'>
        {from} - {to}
      </div>
      <div className='text-sm text-slate-400'>
        {location}
      </div>
    </div>
  )
}

function Employment() {
  const employments = [
    { profile: 'Senior Software Engineer', employer: 'ABC technologies pvt ltd', from: '2021', to: 'Present', location: 'Gurgaon' },
    { profile: 'Senior Software Engineer', employer: 'JKL India pvt ltd', from: '2016', to: '2021', location: 'Noida' },
    { profile: 'Software Engineer', employer: 'XYZ IT solutions', from: '2011', to: '2016', location: 'Noida' }
  ]
  return (
    <div className="bg-white rounded-lg">
      <dl className="divide-y divide-gray-100">
        {
          employments.map((e, i) => (
            <EmpCard key={i} {...e} />
          ))
        }
      </dl>
    </div>
  )
}

export default Employment
