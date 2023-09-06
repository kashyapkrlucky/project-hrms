import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './Contexts/UserContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from './Common/ErrorBoundary';
import Layout from './Layouts/Layout';
import NotFound from './Common/NotFound';

import SignIn from './Pages/SignIn';
import Dashboard from './Pages/Dashboard';
import MyProfile from './Pages/MyProfile';
import PayBenefits from './Pages/PayBenefits';
import Settings from './Pages/Settings';
import Employees from './Pages/Employees';
import Recruitments from './Pages/Recruitments';
import JobListings from './Pages/JobListings';
import JobInfo from './Pages/JobListings/JobInfo';
import LeaveManager from './Pages/LeaveManager';
import MyTasks from './Pages/MyTasks';
import Company from './Pages/Company';
import EditEmployee from './Pages/Employees/EditEmployee';
import Employee from './Pages/Employee';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  return (
    <UserContext.Provider value={[user, setUser]}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/app" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="job-listings">
                <Route path='' element={<JobListings />} />
                <Route path=":id" element={<JobInfo />} />
              </Route>
              <Route path="recruitments" element={<Recruitments />} />
              <Route path="employees">
                <Route path='' element={<Employees />} />
                <Route path='edit/:id' element={<EditEmployee />} />
              </Route>
              <Route path="my-profile" element={<MyProfile />}></Route>
              <Route path="my-tasks" element={<MyTasks />} />
              <Route path="leave-manager" element={<LeaveManager />} />
              <Route path="company" element={<Company />} />
              <Route path="pay-benefits" element={<PayBenefits />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path='employee/:username' element={<Employee/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </UserContext.Provider>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
