import React from 'react'
function StudyCard({ type, course, specialization, university, year, division }) {
  return (
    <div className='p-3 '>
      <div className='text-xl font-medium'>
        {type}
      </div>
      <div className='font-medium'>
        {course} - {specialization}
      </div>
      <div className='text-sm'>
        {university} - {year}
      </div>
      <div className='text-sm text-slate-400'>
        {division}
      </div>
    </div>
  )
}

function Qualifications() {
  const studyList = [
    { type: 'Post Graduate', course: '', specialization: '', university: '', year: '', division: '' },
    { type: 'Graduate', course: 'B. Tech', specialization: 'Computers Science & Engineering', university: 'ABC University, London', year: '2011', division: '1st' },
    { type: 'InterMediate', course: 'XII Std', specialization: 'Science', university: 'Hogwarts School', year: '2007', division: '1st' },
    { type: 'High School', course: 'X Std', specialization: 'Science', university: 'Hogwarts School', year: '2005', division: '1st' },
  ];
  return (
    <dl className="divide-y divide-gray-100">
      {
        studyList.map((e, i) => (e.course && <StudyCard key={i} {...e} />))
      }
    </dl>
  )
}

export default Qualifications
