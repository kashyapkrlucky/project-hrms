import React, { useEffect, useState } from 'react'
import { container } from "../../Utils/Classes";
import SubNavBar from '../../Layouts/SubNavBar';
import NoItems from '../../Common/NoItems';
import { ModalPage } from '../../Components/ModelPage';
import NewRecruitment from './NewRecruitment';
import HttpClient from '../../HttpClient';
import RecruitmentCard from './RecruitmentCard';

function Recruitments() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const openForm = () => {
    setIsFormOpen(true);
  }

  const getRecruitments = async () => {
    const { data: { data }, status } = await HttpClient.get('recruitment/list');
    if (status === 200) {
      setListings(data);
    }
  }

  useEffect(() => {
    getRecruitments();
  }, []);

  const btnOne = {
    label: 'New Recruitment',
    action: () => openForm(true)
  }
  return (
    <>
      <SubNavBar title="Recruitments" btnOne={btnOne} />
      <main className={container + ' overflow-y-auto h-4/5'}>
        <div className='flex flex-col gap-4'>
          {
            listings.length > 0 ?
              (listings?.map((item, i) => (
                <RecruitmentCard item={item} key={i} getRecruitments={getRecruitments}></RecruitmentCard>
              )))
              :
              (<NoItems />)
          }
        </div>
      </main>
      {
        isFormOpen &&
        <ModalPage>
          <NewRecruitment getRecruitments={getRecruitments} setIsFormOpen={setIsFormOpen} />
        </ModalPage>
      }
    </>
  )
}

export default Recruitments
