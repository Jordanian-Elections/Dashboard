
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faCalendar, faUserShield } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  return (
    <div className="bg-indigo-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition-transform duration-200 ease-in-out">
      <h2 className="text-2xl font-semibold text-center">مدير الانتخابات</h2>
      <nav>
        <Link
          to="/admin-dashboard/AdminPage"
          className="block py-2.5 px-4 rounded transition-colors duration-200 hover:bg-indigo-700 hover:text-white"
        >
          <FontAwesomeIcon icon={faUserShield} className="h-5 w-5 inline-block mr-2" />  
            إدارة المشرفين
        </Link>
        <Link
          to="/admin-dashboard"
          className="block py-2.5 px-4 rounded transition-colors duration-200 hover:bg-indigo-700 hover:text-white"
        >
          <FontAwesomeIcon icon={faHome} className="h-5 w-5 inline-block mr-2" />
          نظرة عامة
        </Link>
        <Link
          to="/admin-dashboard/UserManagement"
          className="block py-2.5 px-4 rounded transition-colors duration-200 hover:bg-indigo-700 hover:text-white"
        >
          <FontAwesomeIcon icon={faUsers} className="h-5 w-5 inline-block mr-2" />
          إدارة المستخدمين
        </Link>
        <Link
          to="/admin-dashboard/elections"
          className="block py-2.5 px-4 rounded transition-colors duration-200 hover:bg-indigo-700 hover:text-white"
        >
          <FontAwesomeIcon icon={faCalendar} className="h-5 w-5 inline-block mr-2" />
          إدارة الانتخابات
        </Link>
        <Link
          to="/admin-dashboard/ElectionsCircle"
          className="block py-2.5 px-4 rounded transition-colors duration-200 hover:bg-indigo-700 hover:text-white"
        >
          <FontAwesomeIcon icon={faCalendar} className="h-5 w-5 inline-block mr-2" />
          إدارة الدوائر الانتخابية
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
