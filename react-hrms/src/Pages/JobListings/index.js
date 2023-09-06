import React, { useEffect, useState } from 'react'
import { container } from "../../Utils/Classes";
import { ModalPage } from '../../Components/ModelPage';
import SubNavBar from '../../Layouts/SubNavBar';
import JobCreate from './JobCreate';
import JobCard from './JobCard';
import NoItems from '../../Common/NoItems';
import HttpClient from '../../HttpClient';
// import { createRandomJob } from '../../Utils/DataService';

function JobListings() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const openForm = () => {
    setIsFormOpen(true);
  }

  const getJobs = async () => {
    const { data: { data }, status } = await HttpClient.get('job/list');
    if (status === 200) {
      setListings(data);
    }
  }

  useEffect(() => {
    getJobs();
  }, []);

  const btnOne = {
    label: 'Post Job',
    action: () => openForm(true)
  }

  return (
    <>
      <SubNavBar title="Job Listings" btnOne={btnOne} />
      <main className={container + ' overflow-y-auto h-4/5'}>
        {
          listings.length > 0 ?
            <div className='grid grid-cols-3 gap-4'>
              {
                (listings?.map((item, index) => (
                  <JobCard key={index} item={item} />
                )))
              }
            </div>
            :
            (<NoItems />)
        }
      </main>
      {
        isFormOpen &&
        <ModalPage>
          <JobCreate getJobs={getJobs} setIsFormOpen={setIsFormOpen} />
        </ModalPage>
      }
    </>
  )
}

export default JobListings
