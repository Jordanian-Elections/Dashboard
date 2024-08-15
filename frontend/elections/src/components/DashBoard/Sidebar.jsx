

// import React, { useState,useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faHome, 
//   faUsers, 
//   faCalendar, 
//   faUserShield, 
//   faChartBar, 
//   faCog, 
//   faSignOutAlt,
//   faBars
// } from '@fortawesome/free-solid-svg-icons';

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => setIsOpen(!isOpen);
//   useEffect(() => {
//     const name = sessionStorage.getItem('name');
//     setUserName(name || ''); // Default to empty string if no name is found
//   }, []);

//   const menuItems = [
//     { to: "/dashboard", icon: faHome, label: "لوحة التحكم" },
//     { to: "/admin", icon: faUserShield, label: "إدارة المشرفين" },
//     { to: "/users", icon: faUsers, label: "إدارة المستخدمين" },
//     { to: "/elections", icon: faCalendar, label: "إدارة الانتخابات" },
//     { to: "/constituencies", icon: faChartBar, label: "الدوائر الانتخابية" },
//     { to: "/settings", icon: faCog, label: "الإعدادات" },
//   ];

//   return (
//     <>
//       <button
//         onClick={toggleSidebar}
//         className="fixed top-4 right-4 z-50 bg-zait text-white p-2 rounded-md transition-all duration-300 hover:bg-zait focus:outline-none focus:ring-2 focus:ring-zait focus:ring-opacity-50 md:hidden"
//       >
//         <FontAwesomeIcon icon={faBars} />
//       </button>
//       <div 
//         className={`
//           bg-gradient-to-b from-zait to-zait text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 right-0 transform
//          text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition-transform duration-200 ease-in-out
//            ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 transition-all duration-300 ease-in-out z-40 overflow-y-auto`}
//       >
//         <h2 className="text-2xl font-bold text-center mb-6">نظام إدارة الانتخابات</h2>
//         <div className="text-center mb-6">
//           <p className="text-lg font-medium">أهلاً, {userName}</p>
//         </div>
//         <nav>
//           {menuItems.map((item, index) => (
//             <Link
//               key={index}
//               to={item.to}
//               className="block py-2.5 px-4 rounded transition-all duration-200 hover:bg-gray-600 hover:scale-105 hover:shadow-lg"
//             >
//               <FontAwesomeIcon icon={item.icon} className="h-5 w-5 inline-block ml-2" />
//               {item.label}
//             </Link>
//           ))}
//         </nav>
//         <div className="pt-6 mt-6 border-t-2 border-gray-800">
//           <Link
//             to="/logout"
//             className="block py-2.5 px-4 rounded transition-all duration-200 hover:bg-red-600 hover:scale-105 hover:shadow-lg"
//           >
//             <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 inline-block ml-2" />
//             تسجيل الخروج
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faUsers, 
  faCalendar, 
  faUserShield, 
  faChartBar, 
  faCog, 
  faSignOutAlt,
  faBars
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userName, setUserName] = useState('');

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Retrieve user name from sessionStorage when component mounts
  useEffect(() => {
    const name = sessionStorage.getItem('name');
    setUserName(name || ''); // Default to empty string if no name is found
  }, []);

  const menuItems = [
    { to: "/AdminDashboard", icon: faHome, label: "لوحة التحكم" },
    { to: "/AdminDashboard/AdminPage", icon: faUserShield, label: "إدارة المشرفين" },
    { to: "/AdminDashboard/UserManagement", icon: faUsers, label: "إدارة المستخدمين" },
    { to: "/AdminDashboard/ElectionManagement", icon: faCalendar, label: "إدارة الانتخابات" },
    { to: "/AdminDashboard/ElectionsCircle", icon: faChartBar, label: "الدوائر الانتخابية" },
    { to: "/AdminDashboard/UserManagement", icon: faCog, label: "الإعدادات" },
  ];

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-50 bg-zait text-white p-2 rounded-md transition-all duration-300 hover:bg-zait focus:outline-none focus:ring-2 focus:ring-zait focus:ring-opacity-50 md:hidden"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div 
        className={`
          bg-gradient-to-b from-zait to-zait text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 right-0 transform
         text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition-transform duration-200 ease-in-out
           ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 transition-all duration-300 ease-in-out z-40 overflow-y-auto`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">نظام إدارة الانتخابات</h2>
        <div className="text-center mb-6">
          <p className="text-lg font-medium">أهلاً, {userName}</p>
        </div>
        <nav>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="block py-2.5 px-4 rounded transition-all duration-200 hover:bg-gray-600 hover:scale-105 hover:shadow-lg"
            >
              <FontAwesomeIcon icon={item.icon} className="h-5 w-5 inline-block ml-2" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="pt-6 mt-6 border-t-2 border-gray-800">
          <Link
            to="/logout"
            className="block py-2.5 px-4 rounded transition-all duration-200 hover:bg-red-600 hover:scale-105 hover:shadow-lg"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 inline-block ml-2" />
            تسجيل الخروج
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
