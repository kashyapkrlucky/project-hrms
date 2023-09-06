import React, { useState } from 'react';

function EmployeeInfo() {

    return (
        <dl className="divide-y divide-gray-100">
            <div className="p-3 grid grid-cols-4 gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Department</dt>
                <dd className="col-span-3 mt-1 text-sm leading-6 text-gray-700">
                    Engineering
                </dd>
            </div>
            <div className="p-3 grid grid-cols-4 gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Team</dt>
                <dd className="col-span-3 mt-1 text-sm leading-6 text-gray-700">
                    HGY-657
                </dd>
            </div>

            <div className="p-3 grid grid-cols-4 gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Designation</dt>
                <dd className="col-span-3 mt-1 text-sm leading-6 text-gray-700">
                    Senior Software Engineer
                </dd>
            </div>
            <div className="p-3 grid grid-cols-4 gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Employee Code</dt>
                <dd className="col-span-3 mt-1 text-sm leading-6 text-gray-700">
                    COM-001
                </dd>
            </div>
            <div className="p-3 grid grid-cols-4 gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Employee Status</dt>
                <dd className="col-span-3 mt-1 text-sm leading-6 text-gray-700">
                    Permanent
                </dd>
            </div>
            <div className="p-3 grid grid-cols-4 gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Joining Date</dt>
                <dd className="col-span-3 mt-1 text-sm leading-6 text-gray-700">
                    01/04/2021
                </dd>
            </div>
            <div className="p-3 grid grid-cols-4 gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Reporting Manager</dt>
                <dd className="col-span-3 mt-1 text-sm leading-6 text-gray-700">
                    Robert Wayne
                </dd>
            </div>
        </dl>
    )
}

export default EmployeeInfo
