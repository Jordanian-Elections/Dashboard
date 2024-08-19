

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Overview from './Overview';
import UserManagement from './UserManagement';
import ElectionManagement from './ElectionManagement';
import AdminPage from './AdminPage';
import ElectionsCircle from './ElectionsCircle';
import Revenu from './Revenu';
import Request from './Request';
import Ads from './Ads';
import Chats from './Chats';
import Messages from './Messages';
import Result from './Result';
import Debate from './Debate';


function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <Routes>
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/" element={<Overview />} />
          <Route path="/UserManagement" element={<UserManagement />} />
          <Route path="elections" element={<ElectionManagement />} /> 
          <Route path="ElectionsCircle" element={<ElectionsCircle />} /> 
          <Route path="/Revenu" element={<Revenu />} /> 
          <Route path="/Request" element={<Request />} /> 
          <Route path="/Ads" element={<Ads />} /> 
          <Route path="/Chats" element={<Chats />} /> 
          <Route path="/Messages" element={<Messages />} /> 
          <Route path="/Result" element={<Result />} /> 
          <Route path="/Debate" element={<Debate />} /> 
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;
