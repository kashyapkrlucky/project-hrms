import React from 'react';
import LabelInput from '../../Common/LabelInput';
import LabelDropDown from '../../Common/LabelDropDown';
import BtnOutline from '../../Common/BtnOutline';
import BtnSolid from '../../Common/BtnSolid';
import { tagList, taskStatusList } from '../../Utils/DataService';

function TaskAction({ task, onChange, onSubmit, setIsFormOpen, resetForm }) {
    return (
        <div className="bg-white rounded-lg w-1/3 p-4">
            <div className="flex flex-col h-full">
                <div className="border-b border-gray-900/10 pb-4">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 mt-4">
                        { task._id ? 'Update Task' : 'New Task'}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600"></p>
                </div>
                <div className="mt-2 py-2 grid gap-4 grid-cols-12 overflow-y-auto">
                    <div className="col-span-12">
                        <LabelInput name="title" value={task.title} type="text" label="title" onChange={onChange} />
                    </div>
                    <div className="col-span-12">
                        <LabelDropDown name="tag" value={task.tag} label='Tag' list={tagList.slice(0, 3)} onChange={onChange} />
                    </div>
                    <div className="col-span-12">
                        <LabelDropDown name="status" value={task.status} label='status' list={taskStatusList} onChange={onChange} />
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-4">
                    <BtnOutline label="Cancel" onClick={() => { setIsFormOpen(false); resetForm(); }} />
                    {task._id ?
                        <BtnSolid label="Update" onClick={() => onSubmit({ task, isUpdate: true })} classes="bg-green-500 hover:bg-green-500" /> :
                        <BtnSolid label="Add" onClick={() => onSubmit({ task, isUpdate: false })} />
                    }
                </div>
            </div>
        </div>
    )
}

export default TaskAction
