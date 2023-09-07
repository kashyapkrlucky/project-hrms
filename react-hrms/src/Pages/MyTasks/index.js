import React, { useContext, useEffect, useState } from 'react';
import CustomPage from '../../Common/CustomPage';
import { cards, textTheme } from '../../Utils/Classes';
import HttpClient from '../../HttpClient';
import { ModalPage } from '../../Components/ModelPage';
import TaskCard from './TaskCard';
import TaskAction from './TaskAction';
import NoItems from '../../Common/NoItems';
import { UserContext } from '../../Contexts/UserContext';
import { tagList } from '../../Utils/DataService';


function MyTasks() {
  const [currentTag, setCurrentTag] = useState('4');
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [user] = useContext(UserContext);

  const [task, setTask] = useState({
    empId: user._id,
    title: '',
    tag: '1',
    status: '1'
  });

  const changeTag = (t) => {
    setCurrentTag(t);
  }

  const filterList = (tl) => {
    if (currentTag < '4') {
      if (currentTag === tl.tag) {
        return true;
      }
    } else {
      return true;
    }
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const onSubmit = async (e) => {
    if (e.isUpdate) {
      const { data: { data }, status } = await HttpClient.put('task/update', task);
      if (status === 200) {
        getTasks(data);
      }
    } else {
      const { data: { data }, status } = await HttpClient.post('task/add', e.task);
      if (status === 200) {
        getTasks(data);
      }
    }
    setIsFormOpen(false);
    resetForm();
  }

  const onUpdate = (tl) => {
    setIsFormOpen(true);
    setTask(tl);
  }

  const resetForm = () => {
    setTask({
      empId: user._id,
      title: '',
      tag: '',
      status: ''
    });
  }

  const getTasks = async () => {
    const { data: { data }, status } = await HttpClient.get(`task/${user._id}`);
    if (status === 200) {
      setTasks(data);
    } else {
      console.log("Error");
    }
  }

  const onDelete = async (id) => {
    const { data: { data }, status } = await HttpClient.delete(`task/delete/${id}`, {});
    if (status === 200) {
      getTasks(data);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  const btnOne = {
    label: 'Add a Task',
    action: () => setIsFormOpen(true)
  }

  return (
    <CustomPage title="My Tasks" btnOne={btnOne}>
      <div className={'flex flex-row gap-4 ' + cards}>
        <div className='w-1/5 flex flex-col gap-2'>
          <p className='text-slate-500 text-xs uppercase py-2'>Favorites</p>
          {
            tagList.map((t, i) => (
              <div className={'font-medium text-sm cursor-pointer py-2 flex flex-row items-center gap-2 ' + (currentTag === t.id ? textTheme : '')} key={i} onClick={() => changeTag(t.id)}>
                {t.icon}
                <span className='capitalize'>{t.name}</span>
              </div>
            ))
          }
        </div>
        <div className='w-4/5 flex flex-col gap-4 border-l pl-4 border-slate-300 divide-y divide-gray-100 '>
          {
            tasks.length > 0 ?
              tasks.map((t, i) => (
                filterList(t) && <TaskCard
                  key={i}
                  item={t}
                  onUpdate={onUpdate}
                  onDelete={onDelete} />
              )) :
              (<NoItems />)
          }
        </div>
      </div>
      {
        isFormOpen &&
        <ModalPage>
          <TaskAction
            setIsFormOpen={setIsFormOpen}
            task={task}
            onChange={onChange}
            onSubmit={onSubmit}
            resetForm={resetForm} />
        </ModalPage>
      }
    </CustomPage>
  )
}

export default MyTasks
