

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faCalendar,
  faUserShield,
  faChartBar,
  faCog,
  faSignOutAlt,
  faBars,
  faBullhorn,
  faDollarSign,
  faListAlt,
  faChalkboard,
  faCommentDots,
  faEnvelope,
  faVoteYea,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import logo from "../../assets/logoo1.png"
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userName, setUserName] = useState("");
  const [unreadDebateRequests, setUnreadDebateRequests] = useState(5); // افتراضيًا، افترض أن هناك 5 طلبات غير مقروءة
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default navigation

    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "هل تريد حقًا تسجيل الخروج؟",
      icon: "warning",
      iconColor:"#3F7A5E",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#808080",
      confirmButtonText: "نعم، تسجيل الخروج",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear user session and navigate to home
        sessionStorage.removeItem("name");
        navigate("/");
      }
    });
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Retrieve user name from sessionStorage when component mounts
  useEffect(() => {
    const name = sessionStorage.getItem("name");
    setUserName(name || ""); // Default to empty string if no name is found
  }, []);

  const menuItems = [
    // قسم إدارة النظام
    { to: "/AdminDashboard", icon: faHome, label: "لوحة التحكم" },
    { to: "/AdminDashboard/AdminPage", icon: faUserShield, label: "إدارة المشرفين" },

    // قسم الإدارة والمستخدمين
    { to: "/AdminDashboard/UserManagement", icon: faUsers, label: "إدارة المستخدمين" },
    { to: "/AdminDashboard/ElectionsCircle", icon: faChartBar, label: "الدوائر الانتخابية" },
    
    // قسم البيانات والإعلانات
    { to: "/AdminDashboard/Revenu", icon: faDollarSign, label: "الأرباح" },
    { to: "/AdminDashboard/Ads", icon: faBullhorn, label: "الإعلانات" },
    { to: "/AdminDashboard/Result", icon: faVoteYea, label: "النتائج" },
    
    // قسم التواصل
    // { to: "/AdminDashboard/Chats", icon: faCommentDots, label: "المحادثات" },
    { to: "/AdminDashboard/Messages", icon: faEnvelope, label: "الرسائل" },
    
    // قسم الطلبات
    { to: "/AdminDashboard/Request", icon: faListAlt, label: "طلبات القوائم" },
    { to: "/AdminDashboard/Debate", icon: faChalkboard, label: "طلبات المناظرة", unreadCount: unreadDebateRequests }, // إضافة العدد غير المقروء
    { to: "/AdminDashboard/Debate-screen", icon: faPlus, label: "انشاء غرفة" },
    // { to: "/AdminDashboard/Settings", icon: faCog, label: "الإعدادات" },
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
          ${isOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0 transition-all duration-300 ease-in-out z-40 overflow-y-auto`}
      >
        {/* <h2 className="text-2xl font-bold text-center mb-6">نظام إدارة الانتخابات</h2> */}
        <img src={logo} alt="" className="w-36 mx-4"/>
        <div className="text-center mb-6">
          <p className="text-lg font-medium">أهلاً, {userName}</p>
        </div>
        <nav>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="block py-2.5 px-4 rounded transition-all duration-200 hover:bg-gray-600 hover:scale-105 hover:shadow-lg relative"
            >
              <FontAwesomeIcon icon={item.icon} className="h-5 w-5 inline-block ml-2" />
              {item.label}
              {item.unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full  px-1 py-0.5 -translate-x-1/2 translate-y-1/2">
                  {item.unreadCount}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="pt-6 mt-6 border-t-2 border-gray-800">
          <button
            className="block py-2.5 px-4 rounded transition-all duration-200 hover:bg-red-600 hover:scale-105 hover:shadow-lg w-full text-right"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 inline-block ml-2" />
            تسجيل الخروج
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
