// import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { motion } from 'framer-motion';
// import { UserCheck, Users, Vote, Calendar, Search, Filter, ChevronLeft, ChevronRight, PlusCircle, Edit2, Trash2 } from 'lucide-react';
// import axios from 'axios';

// const Home = () => {
//   const [stats1, setStats1] = useState({
//     circleVotedCount: 0,
//     circleVotedPercentage: 0,
//     partyVotedCount: 0,
//     partyVotedPercentage: 0
//   });
//   const [stats, setStats] = useState({
//     voterParticipation: 0,
//     totalVoters: 0,
//     activeElections: 0,
//     recentElections: []
//   });
//   const [chartData, setChartData] = useState({
//     circleVotedCount1: 0,
//     circleVotedPercentage1: 0,
//     partyVotedCount1: 0,
//     partyVotedPercentage1: 0
//   });
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState('');
//   const [role, setRole] = useState('');
//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(10);
//   // const [total, setTotal] = useState(0);
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(null); // Added error state

//   useEffect(() => {
//     const fetchStats1 = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/stats');
//         setStats1(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats1();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [statsResponse, chartResponse, usersResponse] = await Promise.all([
//           axios.get('http://localhost:3001/api/stats'),
//           axios.get('http://localhost:3001/api/chart-data'),
//           axios.get('/api/users', { params: { search, role, page, pageSize } })
//         ]);

//         setStats(statsResponse.data);
//         setChartData(statsResponse.data);
//         setUsers(usersResponse.data.users);
//         setTotal(usersResponse.data.total);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [search, role, page, pageSize]);

//   const StatCard = ({ title, localPercentage, partyPercentage, icon: Icon, color }) => (
//     <motion.div
//       className={`${color} rounded-lg shadow-md p-6 text-white`}
//       whileHover={{ scale: 1.05 }}
//       transition={{ type: "spring", stiffness: 300 }}
//     >

//       <div className={`bg-${color}-500 rounded-lg shadow-md p-6 text-white`}>
//     <div className="flex items-center mb-4">
//       <Icon size={28} className="mr-4" />
//       <h2 className="text-xl font-semibold">{title}</h2>
//     </div>
//     <div className="text-gray-200">
//       <p className="text-lg font-semibold mb-2">
//          الدوائر المحلية: {localPercentage}
//       </p>
//       <p className="text-lg font-semibold">
//         الدوائر الحزبية: {partyPercentage}
//       </p>
//     </div>
//   </div>
//           </motion.div>
//   );

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active': return 'bg-green-200 text-green-800';
//       case 'pending': return 'bg-yellow-200 text-yellow-800';
//       case 'completed': return 'bg-gray-200 text-gray-800';
//       default: return 'bg-gray-200 text-gray-800';
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen" dir="rtl">
//       <h1 className="text-4xl font-bold mb-8 text-gray-800">لوحة المعلومات الانتخابية</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <StatCard
//           title="نسبة مشاركة الناخبين"
//           localPercentage={stats1.circleVotedPercentage}
//           partyPercentage={stats1.partyVotedPercentage}
//           icon={UserCheck}
//           color="bg-blue-500"
//         />
        
//         <StatCard
//           title="العدد الإجمالي الناخبين"
//           localPercentage={stats1.circleVotedCount}
//           partyPercentage={stats1.partyVotedCount}
//                     icon={Users}
//           color="bg-green-500"
//         />
//         <StatCard
//           title="الانتخابات النشطة"
//           value={stats.activeElections}
//           icon={Vote}
//           color="bg-purple-500"
//         />
//       </div>

//       <motion.div 
//         className="bg-white rounded-lg shadow-md p-6 mb-8"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="text-2xl font-semibold mb-4">نسبة المشاركة في الانتخابات </h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="participation" fill="#3F7A5E" name="نسبة المشاركة" />
//           </BarChart>
//         </ResponsiveContainer>
//       </motion.div>


// {/* 
//       <motion.div 
//         className="bg-white rounded-lg shadow-md p-6 mb-8"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="text-2xl font-semibold mb-4">الانتخابات الأخيرة</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full text-right">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="p-3">العنوان</th>
//                 <th className="p-3">تاريخ البدء</th>
//                 <th className="p-3">تاريخ الانتهاء</th>
//                 <th className="p-3">الحالة</th>
//               </tr>
//             </thead>
//             <tbody>
//               {stats.recentElections.map((election) => (
//                 <motion.tr 
//                   key={election.id} 
//                   className="border-b"
//                   whileHover={{ backgroundColor: "#f3f4f6" }}
//                 >
//                   <td className="p-3">{election.title}</td>
//                   <td className="p-3">{new Date(election.start_date).toLocaleDateString('ar-JO')}</td>
//                   <td className="p-3">{new Date(election.end_date).toLocaleDateString('ar-JO')}</td>
//                   <td className="p-3">
//                     <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(election.status)}`}>
//                       {election.status === 'active' ? 'نشط' : election.status === 'pending' ? 'قادم' : 'مكتمل'}
//                     </span>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </motion.div> */}

//       {/* <motion.div 
//         className="bg-white rounded-lg shadow-md p-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="text-2xl font-semibold mb-4">إدارة المستخدمين</h2>
//         <div className="flex flex-wrap gap-4 mb-4">
//           <div className="flex items-center border rounded-lg">
//             <input 
//               type="text"
//               placeholder="البحث عن المستخدمين..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="p-2 border-none rounded-l-lg w-80"
//             />
//             <button className="p-2 bg-blue-500 text-white rounded-r-lg">
//               <Search />
//             </button>
//           </div>
//           <button 
//             onClick={() => setRole(role === '' ? 'admin' : '')}
//             className="p-2 bg-green-500 text-white rounded-lg"
//           >
//             {role === '' ? 'عرض المسؤولين فقط' : 'عرض الكل'}
//           </button>
//         </div>

//         {loading ? (
//           <div className="text-center py-6">تحميل...</div>
//         ) : error ? (
//           <div className="text-center py-6 text-red-500">{error}</div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-right">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="p-3">الاسم</th>
//                   <th className="p-3">البريد الإلكتروني</th>
//                   <th className="p-3">الدور</th>
//                   <th className="p-3">الإجراءات</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map(user => (
//                   <tr key={user.id} className="border-b">
//                     <td className="p-3">{user.name}</td>
//                     <td className="p-3">{user.email}</td>
//                     <td className="p-3">{user.role}</td>
//                     <td className="p-3">
//                       <button className="text-blue-500 hover:text-blue-700">
//                         <Edit2 size={16} />
//                       </button>
//                       <button className="text-red-500 hover:text-red-700 ml-2">
//                         <Trash2 size={16} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="mt-4 flex justify-between items-center">
//               <button 
//                 onClick={() => setPage(prev => Math.max(prev - 1, 1))}
//                 className="p-2 bg-gray-300 rounded-lg"
//                 disabled={page === 1}
//               >
//                 <ChevronLeft />
//               </button>
//               <span>الصفحة {page} من {Math.ceil(total / pageSize)}</span>
//               <button 
//                 onClick={() => setPage(prev => Math.min(prev + 1, Math.ceil(total / pageSize)))}
//                 className="p-2 bg-gray-300 rounded-lg"
//                 disabled={page === Math.ceil(total / pageSize)}
//               >
//                 <ChevronRight />
//               </button>
//             </div>
//           </div>
//         )}
//       </motion.div> */}
//     </div>
//   );
// };

// export default Home;


// import React, { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { motion } from "framer-motion";
// import {
//   UserCheck,
//   Users,
//   Vote,
//   ChevronLeft,
//   ChevronRight,
//   Edit2,
//   Trash2,
// } from "lucide-react";
// import axios from "axios";

// const Home = () => {
//   const [stats1, setStats1] = useState({
//     circleVotedCount: 0,
//     circleVotedPercentage: 0,
//     partyVotedCount: 0,
//     partyVotedPercentage: 0,
//   });

//   const [stats, setStats] = useState({
//     voterParticipation: 0,
//     totalVoters: 0,
//     activeElections: 0,
//     recentElections: [],
//   });

//   const [chartData, setChartData] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [role, setRole] = useState("");
//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(10);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // Added error state

//   useEffect(() => {
//     const fetchStats1 = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/api/stats");
//         setStats1(response.data);

//         // Update chartData with the correct percentage values
//         setChartData([
//           {
//             name: "دائرة الزرقاء ",
//             participation: response.data.circleVotedPercentage,
//           },
//           {
//             name: " دائرة عمان الأولى",
//             participation: response.data.circleVotedPercentage,
//           },
//           {
//             name: " دائرة عمان الثانية",
//             participation: response.data.partyVotedPercentage ,
//           },
//         ]);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats1();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [statsResponse, usersResponse] = await Promise.all([
//           axios.get("http://localhost:3001/api/stats"),
//           axios.get("/api/users", {
//             params: { search, role, page, pageSize },
//           }),
//         ]);

//         setStats(statsResponse.data);
//         setUsers(usersResponse.data.users);
//         setTotal(usersResponse.data.total);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [search, role, page, pageSize]);

//   const StatCard = ({
//     title,
//     localPercentage,
//     partyPercentage,
//     icon: Icon,
//     color,
//   }) => (
//     <motion.div
//       className={`${color} rounded-lg shadow-md p-6 text-white`}
//       whileHover={{ scale: 1.05 }}
//       transition={{ type: "spring", stiffness: 300 }}
//     >
//       <div className={`bg-${color}-500 rounded-lg shadow-md p-6 text-white`}>
//         <div className="flex items-center mb-4">
//           <Icon size={28} className="mr-4" />
//           <h2 className="text-xl font-semibold">{title}</h2>
//         </div>
//         <div className="text-gray-200">
//           <p className="text-lg font-semibold mb-2">
//             الدوائر المحلية: {localPercentage}
//           </p>
//           <p className="text-lg font-semibold">الدوائر الحزبية: {partyPercentage}</p>
//         </div>
//       </div>
//     </motion.div>
//   );

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "active":
//         return "bg-green-200 text-green-800";
//       case "pending":
//         return "bg-yellow-200 text-yellow-800";
//       case "completed":
//         return "bg-gray-200 text-gray-800";
//       default:
//         return "bg-gray-200 text-gray-800";
//     }
//   };
//   if (loading) return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zait"></div>
//     </div>
//   );
//   if (error) return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="text-center p-4 rounded-md bg-red-100 border border-red-300 text-red-700">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           className="w-16 h-16 mx-auto mb-4"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m0 0l2 2m-2-2l-2 2m2-2l-2-2"
//           />
//         </svg>
//         <h2 className="text-xl font-bold mb-2">حدث خطأ ما!</h2>
//         <p className="text-lg">يرجى المحاولة مرة أخرى لاحقًا.</p>
//       </div>
//     </div>
//   );
  

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen" dir="rtl">
//       <h1 className="text-4xl font-bold mb-8 text-gray-800">
//         لوحة المعلومات الانتخابية
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <StatCard
//           title="نسبة مشاركة الناخبين"
//           localPercentage={stats1.circleVotedPercentage}
//           partyPercentage={stats1.partyVotedPercentage}
//           icon={UserCheck}
//           color="bg-gray-600"
//         />

//         <StatCard
//           title="العدد الإجمالي الناخبين"
//           localPercentage={stats1.circleVotedCount}
//           partyPercentage={stats1.partyVotedCount}
//           icon={Users}
//           color="bg-zait"
//         />
//         <StatCard
//           title="الانتخابات النشطة"
//           value={stats.activeElections}
//           icon={Vote}
//           color="bg-gray-400"
//         />
//       </div>

//       <motion.div
//         className="bg-white rounded-lg shadow-md p-6 mb-8"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="text-2xl font-semibold mb-4">نسبة المشاركة في الانتخابات </h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="participation" fill="#3F7A5E" name="نسبة المشاركة" />
//           </BarChart>
//         </ResponsiveContainer>
//       </motion.div>

//       {/* Other components like user management and recent elections can be placed here */}

//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
  UserCheck,
  Users,
  Vote,
} from "lucide-react";
import axios from "axios";

const Home = () => {
  const [stats1, setStats1] = useState({
    circleVotedCount: 0,
    circleVotedPercentage: 0,
    partyVotedCount: 0,
    partyVotedPercentage: 0,
  });

  const [stats, setStats] = useState({
    voterParticipation: 0,
    totalVoters: 0,
    activeElections: 0,
    recentElections: [],
  });

  const [chartData, setChartData] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats1 = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:3001/api/stats");
        setStats1(response.data);

        // Update chartData with the correct percentage values
        setChartData([
          {
            name: "دائرة الزرقاء ",
            participation: response.data.circleVotedPercentage,
          },
          {
            name: " دائرة عمان الأولى",
            participation: response.data.circleVotedPercentage,
          },
          {
            name: " دائرة عمان الثانية",
            participation: response.data.partyVotedPercentage,
          },
        ]);
      } catch (err) {
        setError("Failed to fetch stats: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats1();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [statsResponse, usersResponse] = await Promise.all([
          axios.get("http://localhost:3001/api/stats"),
          axios.get("/api/users", {
            params: { search, role, page, pageSize },
          }),
        ]);

        setStats(statsResponse.data);
        setUsers(usersResponse.data.users);
        setTotal(usersResponse.data.total);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, role, page, pageSize]);

  const StatCard = ({
    title,
    localPercentage,
    partyPercentage,
    icon: Icon,
    color,
  }) => (
    <motion.div
      className={`${color} rounded-lg shadow-md p-6 text-white`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={`bg-${color}-500 rounded-lg shadow-md p-6 text-white`}>
        <div className="flex items-center mb-4">
          <Icon size={28} className="mr-4" />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="text-gray-200">
          <p className="text-lg font-semibold mb-2">
            الدوائر المحلية: {localPercentage}
          </p>
          <p className="text-lg font-semibold">الدوائر الحزبية: {partyPercentage}</p>
        </div>
      </div>
    </motion.div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-200 text-green-800";
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "completed":
        return "bg-gray-200 text-gray-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zait"></div>
    </div>
  );
  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center p-6 rounded-md bg-red-200 border border-red-400 text-red-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-16 h-16 mx-auto mb-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m0 0l2 2m-2-2l-2 2m2-2l-2-2"
          />
        </svg>
        <h2 className="text-xl font-bold mb-2">عذراً، حدث خطأ!</h2>
        <p className="text-lg">واجهنا مشكلة أثناء تحميل البيانات الانتخابية. يُرجى المحاولة لاحقاً.</p>
        <p className="text-sm mt-2">رسالة الخطأ: {error}</p>
      </div>
    </div>
  );
  return (
    <div className="p-6 bg-gray-100 min-h-screen" dir="rtl">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        لوحة المعلومات الانتخابية
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="نسبة مشاركة الناخبين"
          localPercentage={stats1.circleVotedPercentage}
          partyPercentage={stats1.partyVotedPercentage}
          icon={UserCheck}
          color="bg-gray-600"
        />

        <StatCard
          title="العدد الإجمالي الناخبين"
          localPercentage={stats1.circleVotedCount}
          partyPercentage={stats1.partyVotedCount}
          icon={Users}
          color="bg-zait"
        />
        <StatCard
          title="الانتخابات النشطة"
          localPercentage={stats.activeElections} // Updated property
          partyPercentage={0} // Added a default value
          icon={Vote}
          color="bg-gray-400"
        />
      </div>

      <motion.div
        className="bg-white rounded-lg shadow-md p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">نسبة المشاركة في الانتخابات </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="participation" fill="#3F7A5E" name="نسبة المشاركة" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Other components like user management and recent elections can be placed here */}

    </div>
  );
};

export default Home;
