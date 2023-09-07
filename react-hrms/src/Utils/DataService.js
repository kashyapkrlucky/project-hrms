
import {
    CalendarDaysIcon,
    CalendarIcon,
    ClipboardDocumentCheckIcon,
    Cog8ToothIcon,
    CurrencyDollarIcon,
    InformationCircleIcon,
    MegaphoneIcon,
    Squares2X2Icon,
    UserCircleIcon,
    UserGroupIcon,
    UserPlusIcon
} from '@heroicons/react/24/outline';

// import { faker } from '@faker-js/faker';

export const logoUrl = "https://tailwindui.com/img/logos/mark.svg?color=black&shade=500";

export const NavLinks = [
    {
        category: 'Personal',
        links: [
            { name: 'Dashboard', path: '/app/dashboard', icon: <Squares2X2Icon className='w-6 h-6' /> },
            { name: 'My Calendar', path: '/app/my-calendar', icon: <CalendarDaysIcon className='w-6 h-6' /> },
            { name: 'My Tasks', path: '/app/my-tasks', icon: <ClipboardDocumentCheckIcon className='w-6 h-6' /> },
            { name: 'Pay & Benefits', path: '/app/pay-benefits', icon: <CurrencyDollarIcon className='w-6 h-6' /> },
            { name: 'Leave Manager', path: '/app/leave-manager', icon: <CalendarIcon className='w-6 h-6' /> }
        ]
    },
    {
        category: 'Human Resource',
        links: [
            { name: 'Employees', path: '/app/employees', icon: <UserGroupIcon className='w-6 h-6' /> },
            { name: 'Job Listings', path: '/app/job-listings', icon: <MegaphoneIcon className='w-6 h-6' /> },
            { name: 'Recruitments', path: '/app/recruitments', icon: <UserPlusIcon className='w-6 h-6' /> },
        ]
    },
    {
        category: 'Administration',
        links: [
            { name: 'Company', path: '/app/company', icon: <Cog8ToothIcon className='w-6 h-6' /> },
        ]
    }
];

export const ProfileLinks = [
    { name: 'personal information', path: 'info', active: false },
    { name: 'employment history', path: 'employment', active: false },
    { name: 'qualifications', path: 'qualifications', active: false },
    { name: 'skills', path: 'skills', active: false },
    { name: 'identification', path: 'identification', active: false },
    { name: 'bank details', path: 'bank-details', active: false },
    { name: 'documents', path: 'documents', active: false },
];

export const months = [
    { _id: 1, name: "January" },
    { _id: 2, name: "February" },
    { _id: 3, name: "March" },
    { _id: 4, name: "April" },
    { _id: 5, name: "May" },
    { _id: 6, name: "June" },
    { _id: 7, name: "July" },
    { _id: 8, name: "August" },
    { _id: 9, name: "September" },
    { _id: 10, name: "October" },
    { _id: 11, name: "November" },
    { _id: 12, name: "December" }
];

export const days = [
    { _id: 1, name: 'SUN', longName: 'Sunday' },
    { _id: 2, name: 'MON', longName: 'Monday' },
    { _id: 3, name: 'TUE', longName: 'Tuesday' },
    { _id: 4, name: 'WED', longName: 'Wednesday' },
    { _id: 5, name: 'THU', longName: 'Thursday' },
    { _id: 6, name: 'FRI', longName: 'Friday' },
    { _id: 7, name: 'SAT', longName: 'Saturday' },
]

export const getYears = (startYear = 2000) => {
    const endYear = new Date().getFullYear();
    const years = [];
    for (let index = endYear; index >= startYear; index--) {
        years.push({ _id: index, name: index });
    }
    return years;
}

export const queryCategory = [
    { _id: 1, name: "Human Resource" },
    { _id: 2, name: "IT Support" },
    { _id: 3, name: "Finance" }
];

export const roles = [
    { _id: 1, name: "SuperAdmin" },
    { _id: 2, name: "Admin" },
    { _id: 3, name: "Employee" }
];

export const interviewStatus = [
    { _id: '1', name: "New", color: 'text-blue-500' },
    { _id: '2', name: "In Progress", color: 'text-amber-500' },
    { _id: '3', name: "Selected", color: 'text-green-500' },
    { _id: '4', name: "Rejected", color: 'text-red-500' },
    { _id: '5', name: "On Hold", color: 'text-slate-500' },
    { _id: '6', name: "Offer Released", color: 'text-yellow-500' },
    { _id: '7', name: "Offer Accepeted", color: 'text-green-500' },
    { _id: '8', name: "Offer Rejected", color: 'text-red-500' },
    { _id: '9', name: "Onboarded", color: 'text-green-500' },
    { _id: '10', name: "Not Joined", color: 'text-red-500' },
    { _id: '11', name: "On Hold", color: 'text-yellow-500' },
    { _id: '12', name: "On Hold", color: 'text-yellow-500' },
];

export const leaveTypes = [
    { _id: 1, name: 'Paid Leave', abbr: 'PL', key: 'paidLeave' },
    { _id: 2, name: 'Sick Leave', abbr: 'SL', key: 'sickLeave' },
    { _id: 3, name: 'Casual Leave', abbr: 'CL', key: 'casualLeave' }
]


export const Avatars = [
    { name: 'Dog', url: 'animal-dog.png' },
    { name: 'Bear', url: 'animal-bear.png' },
    { name: 'Cat', url: 'animal-cat.png' },
    { name: 'Panda', url: 'animal-panda.png' },
    { name: 'Rabbit', url: 'animal-rabbit.png' },
    { name: 'Man 1', url: 'man-1.png' },
    { name: 'Man 2', url: 'man-2.png' },
    { name: 'Man 3', url: 'man-3.png' },
    { name: 'Man 4', url: 'man-4.png' },
    { name: 'Man 5', url: 'man-5.png' },
    { name: 'Woman 1', url: 'woman-1.png' },
    { name: 'Woman 2', url: 'woman-2.png' },
    { name: 'Woman 3', url: 'woman-3.png' },
    { name: 'Woman 4', url: 'woman-4.png' },
    { name: 'Woman 5', url: 'woman-5.png' },
];

export const tagList = [
    { id: '1', name: 'Important', icon: <InformationCircleIcon className='w-6 h-6' /> },
    { id: '2', name: 'Personal', icon: <UserCircleIcon className='w-6 h-6' /> },
    { id: '3', name: 'Others', icon: <InformationCircleIcon className='w-6 h-6' /> },
    { id: '4', name: 'All', icon: <Squares2X2Icon className='w-6 h-6' /> },
]
export const taskStatusList = [
    { id: '1', name: 'New' }, { id: '2', name: 'In Progress' }, { id: '3', name: 'Completed' },
]

// const a = {
//     createdAt: "2023-08-18T12:13:05.423Z",
//     department: { _id: "64df22bc43eb0ac0908e7fae", name: "Human Resource" },
//     designation: { _id: "64deabda8a57c1fb45c5ee46", name: "HR Manager" },
//     dob: "2023-08-18T12:12:27.175Z",
//     email: "pp@company.com",
//     empCode: "COM-003",
//     empStatus: "Active",
//     firstName: "Pepper",
//     joiningDate: "2023-08-18T12:12:27.175Z",
//     lastName: "Potts",
//     mobile: 3333333333,
//     reportingTo: "64df1cfc0af6104514a4a85f",
//     team: { _id: "64df31292e0e7ce7567b9911", name: "HR-001" },
//     _id: "64df6051a2120c8565bbf394"
// }