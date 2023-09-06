import React from 'react';
import { container } from "../Utils/Classes";
import { faker } from '@faker-js/faker';

function UserList({ list = [] }) {
    return (
        <div className={container + " bg-white rounded-lg"}>
            <div role="list" className="divide-y divide-gray-100 bg-white rounded-lg">
                {
                    list.map((emp, i) => (
                        <div className="flex justify-between gap-x-6 py-4" key={i}>
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-lg font-medium leading-6 text-gray-900">{emp.firstName + ' ' + emp.lastName}</p>
                                    <p className="mt-1 truncate text-sm leading-5 text-gray-500">{emp.email}</p>
                                    <p className="text-sm leading-6 text-gray-900">{emp.designation && emp.designation.name} | {emp.empCode}</p>
                                    <p className="text-sm leading-6 text-gray-900">{emp.department && emp.department.name} | {emp.team && emp.team.name}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                                            
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default UserList
