import React, { useState } from 'react';

function ProfileInfo() {

    return (
        <dl className="divide-y divide-gray-100">
            <div className="p-3 grid grid-cols-4 gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                <dd className="col-span-3 mt-1 text-sm leading-6 text-gray-700">Margot Specter</dd>
            </div>
            <div className="p-3 grid grid-cols-4 gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Mobile Number</dt>
                <dd className="col-span-3 mt-1 text-sm leading-6 text-gray-700">+91-9876543210</dd>
            </div>
            <div className="p-3 grid grid-cols-4 gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                <dd className="col-span-3 mt-1 text-sm leading-6 text-gray-700">margotfoster@example.com</dd>
            </div>
            <div className="p-3 grid grid-cols-4 gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Date Of Birth</dt>
                <dd className="col-span-3 mt-1 text-sm leading-6 text-gray-700">01/01/1990</dd>
            </div>
            <div className="p-3 grid grid-cols-4 gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Present Address</dt>
                <dd className="col-span-3 mt-1 text-sm leading-6 text-gray-700">X-123, sector 111, Random City, Country, 000000</dd>
            </div>
            <div className="p-3 grid grid-cols-4 gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
                <dd className="col-span-3 mt-1 text-sm leading-6 text-gray-700">Female</dd>
            </div>
            <div className="p-3 grid grid-cols-4 gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Marital Status</dt>
                <dd className="col-span-3 mt-1 text-sm leading-6 text-gray-700">UnMarried</dd>
            </div>
            <div className="p-3 grid grid-cols-4 gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
                <dd className="col-span-3 mt-1 text-sm leading-6 text-gray-700">Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.</dd>
            </div>
            

            <div className="p-3 grid grid-cols-4 gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Languages</dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                            <div className="flex w-0 flex-1 items-center">
                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                    <span className="truncate font-medium">English</span>
                                    <span className="flex-shrink-0 text-gray-400">Native</span>
                                </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">

                            </div>
                        </li>
                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                            <div className="flex w-0 flex-1 items-center">
                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                    <span className="truncate font-medium">Spanish</span>
                                    <span className="flex-shrink-0 text-gray-400">Beginner</span>
                                </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">

                            </div>
                        </li>
                    </ul>
                </dd>
            </div>


        </dl>
    )
}

export default ProfileInfo
