
// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   BarChart,
// // //   Bar,
// // //   XAxis,
// // //   YAxis,
// // //   CartesianGrid,
// // //   Tooltip,
// // //   Legend,
// // //   ResponsiveContainer,
// // // } from "recharts";
// // // import { motion } from "framer-motion";
// // // import {
// // //   UserCheck,
// // //   Users,
// // //   Vote,
// // // } from "lucide-react";
// // // import axios from "axios";

// // // const Home = () => {
// //   // const [stats1, setStats1] = useState({
// //   //   circleVotedCount: 0,
// //   //   circleVotedPercentage: 0,
// //   //   partyVotedCount: 0,
// //   //   partyVotedPercentage: 0,
// //   // });

// // //   const [stats, setStats] = useState({
// // //     voterParticipation: 0,
// // //     totalVoters: 0,
// // //     activeElections: 0,
// // //     recentElections: [],
// // //   });

// // //   const [chartData, setChartData] = useState([]);
// // //   const [users, setUsers] = useState([]);
// // //   const [search, setSearch] = useState("");
// // //   const [role, setRole] = useState("");
// // //   const [page, setPage] = useState(1);
// // //   const [pageSize] = useState(10);
// // //   const [total, setTotal] = useState(0);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [newElection, setNewElection] = useState({ startDate: '', endDate: '' });
// // //   const [upcomingElection, setUpcomingElection] = useState(null);

// //   // useEffect(() => {
// //   //   const fetchStats1 = async () => {
// //   //     try {
// //   //       setLoading(true);
// //   //       setError(null);
// //   //       const response = await axios.get("http://localhost:3001/api/stats");
// //   //       setStats1(response.data);

// //   //       // Update chartData with the correct percentage values
// //   //       setChartData([
// //   //         {
// //   //           name: "دائرة الزرقاء ",
// //   //           participation: response.data.circleVotedPercentage,
// //   //         },
// //   //         {
// //   //           name: " دائرة عمان الأولى",
// //   //           participation: response.data.circleVotedPercentage,
// //   //         },
// //   //         {
// //   //           name: " دائرة عمان الثانية",
// //   //           participation: response.data.partyVotedPercentage,
// //   //         },
// //   //       ]);
// //   //     } catch (err) {
// //   //       setError("Failed to fetch stats: " + err.message);
// //   //     } finally {
// //   //       setLoading(false);
// //   //     }
// //   //   };

// //   //   fetchStats1();
// //   // }, []);

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         setLoading(true);
// // //         setError(null);
// // //         const [statsResponse, usersResponse] = await Promise.all([
// // //           axios.get("http://localhost:3001/api/stats"),
// // //           axios.get("/api/users", {
// // //             params: { search, role, page, pageSize },
// // //           }),
// // //         ]);

// // //         setStats(statsResponse.data);
// // //         setUsers(usersResponse.data.users);
// // //         setTotal(usersResponse.data.total);
// // //       } catch (error) {
// // //         setError("Error fetching data: " + error.message);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [search, role, page, pageSize]);

  
// // //   useEffect(() => {
// // //     const fetchUpcomingElection = async () => {
// // //       try {
// // //         const response = await axios.get('http://localhost:3001/api/stats//elections/upcoming');
// // //         setUpcomingElection(response.data);
// // //       } catch (error) {
// // //         setError("Error fetching upcoming election: " + error.message);
// // //       }
// // //     };

// // //     fetchUpcomingElection();
// // //   }, []);

// // //   const handleSubmit = async (event) => {
// // //     event.preventDefault();
// // //     try {
// // //       await axios.post('http://localhost:3001/api/stats/elections', {
// // //         startDate: newElection.startDate,
// // //         endDate: newElection.endDate,
// // //       });
// // //       setNewElection({ startDate: '', endDate: '' });
// // //       alert('Election time added successfully!');
// // //     } catch (error) {
// // //       alert("Failed to add election time: " + error.message);
// // //     }
// // //   };


  



// // //   const getRemainingTime = (endTime) => {
// // //     const now = new Date();
// // //     const end = new Date(endTime);
// // //     const timeDiff = end - now;

// // //     if (timeDiff <= 0) return "بدأت الانتخابات أو انتهت";

// // //     const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
// // //     const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// // //     const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
// // //     const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

// // //     return `${days} أيام ${hours} ساعات ${minutes} دقائق ${seconds} ثوانٍ`;
// // //   };

// // //   const StatCard = ({
// // //     title,
// // //     localPercentage,
// // //     partyPercentage,
// // //     icon: Icon,
// // //     color,
// // //   }) => (
// // //     <motion.div
// // //       className={`${color} rounded-lg shadow-md p-6 text-white`}
// // //       whileHover={{ scale: 1.05 }}
// // //       transition={{ type: "spring", stiffness: 300 }}
// // //     >
// // //       <div className={`bg-${color}-500 rounded-lg shadow-md p-6 text-white`}>
// // //         <div className="flex items-center mb-4">
// // //           <Icon size={28} className="mr-4" />
// // //           <h2 className="text-xl font-semibold">{title}</h2>
// // //         </div>
// // //         <div className="text-gray-200">
// // //           <p className="text-lg font-semibold mb-2">
// // //             الدوائر المحلية: {localPercentage}
// // //           </p>
// // //           <p className="text-lg font-semibold">الدوائر الحزبية: {partyPercentage}</p>
// // //         </div>
// // //       </div>
// // //     </motion.div>
// // //   );

// // //   const getStatusColor = (status) => {
// // //     switch (status) {
// // //       case "active":
// // //         return "bg-green-200 text-green-800";
// // //       case "pending":
// // //         return "bg-yellow-200 text-yellow-800";
// // //       case "completed":
// // //         return "bg-gray-200 text-gray-800";
// // //       default:
// // //         return "bg-gray-200 text-gray-800";
// // //     }
// // //   };

// // //   if (loading) return (
// // //     <div className="flex justify-center items-center h-screen">
// // //       <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zait"></div>
// // //     </div>
// // //   );
// // //   if (error) return (
// // //     <div className="flex justify-center items-center h-screen">
// // //       <div className="text-center p-6 rounded-md bg-red-200 border border-red-400 text-red-900">
// // //         <svg
// // //           xmlns="http://www.w3.org/2000/svg"
// // //           fill="none"
// // //           viewBox="0 0 24 24"
// // //           stroke="currentColor"
// // //           className="w-16 h-16 mx-auto mb-4"
// // //         >
// // //           <path
// // //             strokeLinecap="round"
// // //             strokeLinejoin="round"
// // //             strokeWidth={2}
// // //             d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m0 0l2 2m-2-2l-2 2m2-2l-2-2"
// // //           />
// // //         </svg>
// // //         <h2 className="text-xl font-bold mb-2">عذراً، حدث خطأ!</h2>
// // //         <p className="text-lg">واجهنا مشكلة أثناء تحميل البيانات الانتخابية. يُرجى المحاولة لاحقاً.</p>
// // //         <p className="text-sm mt-2">رسالة الخطأ: {error}</p>
// // //       </div>
// // //     </div>
// // //   );
// // //   return (
// // //     <div className="p-6 bg-gray-100 min-h-screen" dir="rtl">
// // //       <h1 className="text-4xl font-bold mb-8 text-gray-800">
// // //         لوحة المعلومات الانتخابية
// // //       </h1>

// //       // <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //       //   <StatCard
// //       //     title="نسبة مشاركة الناخبين"
// //       //     localPercentage={stats1.circleVotedPercentage}
// //       //     partyPercentage={stats1.partyVotedPercentage}
// //       //     icon={UserCheck}
// //       //     color="bg-gray-600"
// //       //   />

// //       //   <StatCard
// //       //     title="العدد الإجمالي الناخبين"
// //       //     localPercentage={stats1.circleVotedCount}
// //       //     partyPercentage={stats1.partyVotedCount}
// //       //     icon={Users}
// //       //     color="bg-zait"
// //       //   />
// //       //   <StatCard
// //       //     title="الانتخابات النشطة"
// //       //     localPercentage={stats.activeElections} // Updated property
// //       //     partyPercentage={0} // Added a default value
// //       //     icon={Vote}
// //       //     color="bg-gray-400"
// //       //   />
// //       // </div>

// // //       <motion.div
// // //         className="bg-white rounded-lg shadow-md p-6 mb-8"
// // //         initial={{ opacity: 0, y: 20 }}
// // //         animate={{ opacity: 1, y: 0 }}
// // //         transition={{ duration: 0.5 }}
// // //       >
// // //         <h2 className="text-2xl font-semibold mb-4">نسبة المشاركة في الانتخابات </h2>
// // //         <ResponsiveContainer width="100%" height={300}>
// // //           <BarChart data={chartData}>
// // //             <CartesianGrid strokeDasharray="3 3" />
// // //             <XAxis dataKey="name" />
// // //             <YAxis />
// // //             <Tooltip />
// // //             <Legend />
// // //             <Bar dataKey="participation" fill="#3F7A5E" name="نسبة المشاركة" />
// // //           </BarChart>
// // //         </ResponsiveContainer>
// // //       </motion.div>

// // //       <motion.div className="text-center my-8">
// // //          <h2 className="text-2xl font-bold mb-4">إضافة توقيت الانتخابات</h2>
// // //          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
// // //            <div className="mb-4">
// // //              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
// // //                تاريخ بدء الانتخابات
// // //              </label>
// // //              <input
// // //               type="datetime-local"
// // //               id="startDate"
// // //               value={newElection.startDate}
// // //               onChange={(e) => setNewElection({ ...newElection, startDate: e.target.value })}
// // //               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
// // //               required
// // //             />
// // //           </div>
// // //           <div className="mb-4">
// // //             <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
// // //               تاريخ انتهاء الانتخابات
// // //             </label>
// // //             <input
// // //               type="datetime-local"
// // //               id="endDate"
// // //               value={newElection.endDate}
// // //               onChange={(e) => setNewElection({ ...newElection, endDate: e.target.value })}
// // //               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
// // //               required
// // //             />
// // //           </div>
// // //           <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
// // //             حفظ
// // //           </button>
// // //         </form>
// // //       </motion.div>

// // //       {upcomingElection && (
// // //         <motion.div className="text-center my-8">
// // //           <h2 className="text-2xl font-bold mb-4">الانتخابات القادمة</h2>
// // //           <div className="text-lg font-semibold mb-4">
// // //             <p>تبدأ في: {new Date(upcomingElection.start_date).toLocaleString()}</p>
// // //             <p>تنتهي في: {new Date(upcomingElection.end_date).toLocaleString()}</p>
// // //           </div>
// // //           <div className="text-xl font-bold">
// // //             الوقت المتبقي: {getRemainingTime(upcomingElection.end_date)}
// // //           </div>
// // //         </motion.div>
// // //       )}

      

// // //     </div>
// // //   );
// // // };

// // // export default Home;


// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   BarChart,
// // //   Bar,
// // //   XAxis,
// // //   YAxis,
// // //   CartesianGrid,
// // //   Tooltip,
// // //   Legend,
// // //   ResponsiveContainer,
// // // } from "recharts";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import {
// // //   UserCheck,
// // //   Users,
// // //   Vote,
// // //   Clock,
// // //   Calendar,
// // // } from "lucide-react";
// // // import axios from "axios";

// // // const Home = () => {
// // //   const [stats, setStats] = useState({
// // //     circleVotedCount: 0,
// // //     circleVotedPercentage: 0,
// // //     partyVotedCount: 0,
// // //     partyVotedPercentage: 0,
// // //     activeElections: 0,
// // //   });

// // //   const [chartData, setChartData] = useState([]);
// // //   const [upcomingElection, setUpcomingElection] = useState(null);
// // //   const [countdown, setCountdown] = useState("");
// // //   const [newElection, setNewElection] = useState({ startDate: '', endDate: '' });

// // //   const [stats1, setStats1] = useState({
// // //     circleVotedCount: 0,
// // //     circleVotedPercentage: 0,
// // //     partyVotedCount: 0,
// // //     partyVotedPercentage: 0,
// // //   });


// // //   const StatCard = ({
// // //         title,
// // //         localPercentage,
// // //         partyPercentage,
// // //         icon: Icon,
// // //         color,
// // //       }) => (
// // //         <motion.div
// // //           className={`${color} rounded-lg shadow-md p-6 text-white`}
// // //           whileHover={{ scale: 1.05 }}
// // //           transition={{ type: "spring", stiffness: 300 }}
// // //         >
// // //           <div className={`bg-${color}-500 rounded-lg shadow-md p-6 text-white`}>
// // //             <div className="flex items-center mb-4">
// // //               <Icon size={28} className="mr-4" />
// // //               <h2 className="text-xl font-semibold">{title}</h2>
// // //             </div>
// // //             <div className="text-gray-200">
// // //               <p className="text-lg font-semibold mb-2">
// // //                 الدوائر المحلية: {localPercentage}
// // //               </p>
// // //               <p className="text-lg font-semibold">الدوائر الحزبية: {partyPercentage}</p>
// // //             </div>
// // //           </div>
// // //         </motion.div>
// // //       );
// // //       useEffect(() => {
// // //         const fetchStats1 = async () => {
// // //           try {
// // //             setLoading(true);
// // //             setError(null);
// // //             const response = await axios.get("http://localhost:3001/api/stats");
// // //             setStats1(response.data);
    
// // //             // Update chartData with the correct percentage values
// // //             setChartData([
// // //               {
// // //                 name: "دائرة الزرقاء ",
// // //                 participation: response.data.circleVotedPercentage,
// // //               },
// // //               {
// // //                 name: " دائرة عمان الأولى",
// // //                 participation: response.data.circleVotedPercentage,
// // //               },
// // //               {
// // //                 name: " دائرة عمان الثانية",
// // //                 participation: response.data.partyVotedPercentage,
// // //               },
// // //             ]);
// // //           } catch (err) {
// // //             setError("Failed to fetch stats: " + err.message);
// // //           } finally {
// // //             setLoading(false);
// // //           }
// // //         };
    
// // //         fetchStats1();
// // //       }, []);

// // //   useEffect(() => {
// // //     const fetchStats = async () => {
// // //       try {
// // //         const response = await axios.get("http://localhost:3001/api/stats");
// // //         setStats(response.data);
// // //         setChartData([
// // //           { name: "دائرة الزرقاء", participation: response.data.circleVotedPercentage },
// // //           { name: "دائرة عمان الأولى", participation: response.data.circleVotedPercentage },
// // //           { name: "دائرة عمان الثالثة", participation: response.data.partyVotedPercentage },
// // //         ]);
// // //       } catch (err) {
// // //         console.error("Failed to fetch stats:", err);
// // //       }
// // //     };

// // //     fetchStats();
// // //   }, []);

// // //   useEffect(() => {
// // //     const fetchUpcomingElection = async () => {
// // //       try {
// // //         const response = await axios.get('http://localhost:3001/api/stats/elections/upcoming');
// // //         setUpcomingElection(response.data);
// // //       } catch (error) {
// // //         console.error("Error fetching upcoming election:", error);
// // //       }
// // //     };

// // //     fetchUpcomingElection();
// // //   }, []);

// // //   useEffect(() => {
// // //     const timer = setInterval(() => {
// // //       if (upcomingElection) {
// // //         const now = new Date();
// // //         const start = new Date(upcomingElection.start_date);
// // //         const end = new Date(upcomingElection.end_date);
// // //         let timeDiff, message;

// // //         if (now < start) {
// // //           timeDiff = start - now;
// // //           message = "لم تبدأ الانتخابات،   المتبقي على بدئها: ";
// // //         } else if (now >= start && now <= end) {
// // //           timeDiff = end - now;
// // //           message = "الوقت المتبقي لانتهاء الانتخابات: ";
// // //         } else {
// // //           setCountdown("لقد انتهت الانتخابات");
// // //           clearInterval(timer);
// // //           return;
// // //         }

// // //         const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
// // //         const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// // //         const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
// // //         const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

// // //         setCountdown(`${message} ${days} أيام ${hours} ساعات ${minutes} دقائق ${seconds}  ثوانٍ`);
// // //       }
// // //     }, 1000);

// // //     return () => clearInterval(timer);
// // //   }, [upcomingElection]);

// // //   const handleSubmit = async (event) => {
// // //     event.preventDefault();
// // //     try {
// // //       await axios.post('http://localhost:3001/api/stats/elections', newElection);
// // //       setNewElection({ startDate: '', endDate: '' });
// // //       alert('تمت إضافة موعد الانتخابات بنجاح!');
// // //     } catch (error) {
// // //       alert("فشل في إضافة موعد الانتخابات: " + error.message);
// // //     }
// // //   };

// // //   const StatCard1 = ({ title, value, icon: Icon, color }) => (
// // //     <motion.div
// // //       className={`${color} rounded-lg shadow-lg p-6 text-white transition-all duration-300 ease-in-out`}
// // //       whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
// // //       // initial={{ opacity: 0, y: 20 }}
// // //       animate={{ opacity: 1, y: 0 }}
// // //       // transition={{ type: "spring", stiffness: 300 }}
// // //     >
// // //       <div className="flex items-center mb-4">
// // //         <Icon size={32} className="ml-4" />
// // //         <h2 className="text-2xl font-bold">{title}</h2>
// // //       </div>
// // //       <p className="text-4xl font-extrabold">{value}</p>
// // //     </motion.div>
// // //   );

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8" dir="rtl">
// // //       <motion.h1 
// // //         className="text-5xl font-bold mb-12 text-zait text-center"
// // //         initial={{ opacity: 0, y: -20 }}
// // //         animate={{ opacity: 1, y: 0 }}
// // //         transition={{ duration: 0.5, delay: 0.2 }}
// // //       >
// // //         لوحة المعلومات الانتخابية
// // //       </motion.h1>
// // //       <AnimatePresence>
// // //         {upcomingElection && (
// // //           <motion.div 
// // //             className="bg-gradient-to-t from-zait to-zait text-white p-6 rounded-xl shadow-lg mb-8 text-center"
// // //             initial={{ opacity: 0, y: -20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             exit={{ opacity: 0, y: -20 }}
// // //             transition={{ duration: 0.5 }}
// // //           >
// // //             <h2 className="text-2xl font-bold mb-4">الوقت المتبقي للانتخابات</h2>
// // //             <div className="text-xl font-bold flex items-center justify-center space-x-4">
// // //               <Clock size={32} />
// // //               <span>{countdown}</span>
// // //             </div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>


// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// // //         <StatCard
// // //           title="نسبة مشاركة الناخبين"
// // //           localPercentage={stats1.circleVotedPercentage}
// // //           partyPercentage={stats1.partyVotedPercentage}
// // //           icon={UserCheck}
// // //           color="bg-gray-600"
// // //         />

// // //         <StatCard
// // //           title="العدد الإجمالي الناخبين"
// // //           localPercentage={stats1.circleVotedCount}
// // //           partyPercentage={stats1.partyVotedCount}
// // //           icon={Users}
// // //           color="bg-zait"
// // //         />
// // //         <StatCard
// // //           title="الانتخابات النشطة"
// // //           localPercentage={stats.activeElections} // Updated property
// // //           partyPercentage={0} // Added a default value
// // //           icon={Vote}
// // //           color="bg-gray-400"
// // //         />
// // //       </div>

// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
// // //         <StatCard
// // //           title="نسبة مشاركة الناخبين"
// // //           value={`الدائرة الحزبية ${stats.circleVotedPercentage}%`}
// // //           icon={UserCheck}
// // //           color="bg-gradient-to-br from-gray-400 to-gray-400"
// // //         />
// // //         <StatCard
// // //           title="العدد الإجمالي للناخبين"
// // //           value={stats.circleVotedCount.toLocaleString()}
// // //           icon={Users}
// // //           color="bg-gradient-to-br from-zait to-zait"
// // //         />
// // //         <StatCard
// // //           title="الانتخابات النشطة"
// // //           value={stats.activeElections}
// // //           icon={Vote}
// // //           color="bg-gradient-to-br from-gray-600 to-gray-600"
// // //         />
// // //       </div>

// // //       <motion.div
// // //         className="bg-white rounded-xl shadow-lg p-8 mb-12"
// // //         initial={{ opacity: 0, y: 20 }}
// // //         animate={{ opacity: 1, y: 0 }}
// // //         transition={{ duration: 0.5, delay: 0.4 }}
// // //       >
// // //         <h2 className="text-3xl font-bold mb-6 text-gray-800">نسبة المشاركة في الانتخابات</h2>
// // //         <ResponsiveContainer width="100%" height={400}>
// // //           <BarChart data={chartData}>
// // //             <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
// // //             <XAxis dataKey="name" stroke="#333" />
// // //             <YAxis stroke="#333" />
// // //             <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
// // //             <Legend wrapperStyle={{ paddingTop: '20px' }} />
// // //             <Bar dataKey="participation" fill="#3F7A5E" name="نسبة المشاركة" radius={[8, 8, 0, 0]} />
// // //           </BarChart>
// // //         </ResponsiveContainer>
// // //       </motion.div>

// // //       <motion.div 
// // //         className="bg-white rounded-xl shadow-lg p-8 mb-12"
// // //         initial={{ opacity: 0, y: 20 }}
// // //         animate={{ opacity: 1, y: 0 }}
// // //         transition={{ duration: 0.5, delay: 0.6 }}
// // //       >
// // //         <h2 className="text-3xl font-bold mb-6 text-zait">إضافة موعد الانتخابات</h2>
// // //         <form onSubmit={handleSubmit} className="space-y-6">
// // //           <div>
// // //             <label htmlFor="startDate" className="block text-lg font-medium text-gray-700 mb-2">
// // //               تاريخ بدء الانتخابات
// // //             </label>
// // //             <div className="relative">
// // //               <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
// // //               <input
// // //                 type="datetime-local"
// // //                 id="startDate"
// // //                 value={newElection.startDate}
// // //                 onChange={(e) => setNewElection({ ...newElection, startDate: e.target.value })}
// // //                 className="pl-12 w-full border-2 border-gray-200 rounded-lg py-3 focus:ring-2 focus:ring-zait focus:border-transparent transition duration-200"
// // //                 required
// // //               />
// // //             </div>
// // //           </div>
// // //           <div>
// // //             <label htmlFor="endDate" className="block text-lg font-medium text-gray-700 mb-2">
// // //               تاريخ انتهاء الانتخابات
// // //             </label>
// // //             <div className="relative">
// // //               <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
// // //               <input
// // //                 type="datetime-local"
// // //                 id="endDate"
// // //                 value={newElection.endDate}
// // //                 onChange={(e) => setNewElection({ ...newElection, endDate: e.target.value })}
// // //                 className="pl-12 w-full border-2 border-gray-300 rounded-lg py-3 focus:ring-2 focus:ring-zait focus:border-transparent transition duration-200"
// // //                 required
// // //               />
// // //             </div>
// // //           </div>
// // //           <motion.button 
// // //             type="submit" 
// // //             className="w-full bg-gradient-to-r from-zait to-zait text-white py-3 px-6 rounded-lg text-lg font-semibold hover:from-gray-400 hover:to-gray-400 transition-all duration-300 shadow-md hover:shadow-lg"
// // //             whileHover={{ scale: 1.05 }}
// // //             whileTap={{ scale: 0.95 }}
// // //           >
// // //             حفظ
// // //           </motion.button>
// // //         </form>
// // //       </motion.div>
// // //     </div>
// // //   );
// // // };

// // // export default Home;


// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   BarChart,
// // //   Bar,
// // //   XAxis,
// // //   YAxis,
// // //   CartesianGrid,
// // //   Tooltip,
// // //   Legend,
// // //   ResponsiveContainer,
// // // } from "recharts";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import {
// // //   UserCheck,
// // //   Users,
// // //   Vote,
// // //   Clock,
// // //   Calendar,
// // // } from "lucide-react";
// // // import axios from "axios";

// // // const Home = () => {
// // //   const [stats, setStats] = useState({
// // //     circleVotedCount: 0,
// // //     circleVotedPercentage: 0,
// // //     partyVotedCount: 0,
// // //     partyVotedPercentage: 0,
// // //     activeElections: 0,
// // //   });

// // //   const [chartData, setChartData] = useState([]);
// // //   const [upcomingElection, setUpcomingElection] = useState(null);
// // //   const [countdown, setCountdown] = useState("");
// // //   const [newElection, setNewElection] = useState({ startDate: '', endDate: '' });

// // //   useEffect(() => {
// // //     const fetchStats = async () => {
// // //       try {
// // //         const response = await axios.get("http://localhost:3001/api/stats");
// // //         setStats(response.data);
// // //         setChartData([
// // //           { name: "دائرة الزرقاء", participation: response.data.circleVotedPercentage },
// // //           { name: "دائرة عمان الأولى", participation: response.data.circleVotedPercentage },
// // //           { name: "دائرة عمان الثالثة", participation: response.data.partyVotedPercentage },
// // //         ]);
// // //       } catch (err) {
// // //         console.error("Failed to fetch stats:", err);
// // //       }
// // //     };

// // //     const fetchUpcomingElection = async () => {
// // //       try {
// // //         const response = await axios.get('http://localhost:3001/api/stats/elections/upcoming');
// // //         setUpcomingElection(response.data);
// // //       } catch (error) {
// // //         console.error("Error fetching upcoming election:", error);
// // //       }
// // //     };

// // //     fetchStats();
// // //     fetchUpcomingElection();
// // //   }, []);

// // //   useEffect(() => {
// // //     const timer = setInterval(() => {
// // //       if (upcomingElection) {
// // //         const now = new Date();
// // //         const start = new Date(upcomingElection.start_date);
// // //         const end = new Date(upcomingElection.end_date);
// // //         let timeDiff, message;

// // //         if (now < start) {
// // //           timeDiff = start - now;
// // //           message = "لم تبدأ الانتخابات، المتبقي على بدئها: ";
// // //         } else if (now >= start && now <= end) {
// // //           timeDiff = end - now;
// // //           message = "الوقت المتبقي لانتهاء الانتخابات: ";
// // //         } else {
// // //           setCountdown("لقد انتهت الانتخابات");
// // //           clearInterval(timer);
// // //           return;
// // //         }

// // //         const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
// // //         const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// // //         const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
// // //         const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

// // //         setCountdown(`${message} ${days} أيام ${hours} ساعات ${minutes} دقائق ${seconds} ثوانٍ`);
// // //       }
// // //     }, 1000);

// // //     return () => clearInterval(timer);
// // //   }, [upcomingElection]);

// // //   const handleSubmit = async (event) => {
// // //     event.preventDefault();
// // //     try {
// // //       await axios.post('http://localhost:3001/api/stats/elections', newElection);
// // //       setNewElection({ startDate: '', endDate: '' });
// // //       alert('تمت إضافة موعد الانتخابات بنجاح!');
// // //     } catch (error) {
// // //       alert("فشل في إضافة موعد الانتخابات: " + error.message);
// // //     }
// // //   };

// // //   const StatCard = ({ title, localPercentage, partyPercentage, icon: Icon, color }) => (
// // //     <motion.div
// // //       className={`${color} rounded-lg shadow-md p-6 text-white`}
// // //       whileHover={{ scale: 1.05 }}
// // //       transition={{ type: "spring", stiffness: 300 }}
// // //     >
// // //       <div className="flex items-center mb-4">
// // //         <Icon size={28} className="mr-4" />
// // //         <h2 className="text-xl font-semibold">{title}</h2>
// // //       </div>
// // //       <div className="text-gray-200">
// // //         <p className="text-lg font-semibold mb-2">
// // //           الدوائر المحلية: {localPercentage}
// // //         </p>
// // //         <p className="text-lg font-semibold">الدوائر الحزبية: {partyPercentage}</p>
// // //       </div>
// // //     </motion.div>
    
// // //   );

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8" dir="rtl">
// // //       <motion.h1 
// // //         className="text-5xl font-bold mb-12 text-zait text-center"
// // //         initial={{ opacity: 0, y: -20 }}
// // //         animate={{ opacity: 1, y: 0 }}
// // //         transition={{ duration: 0.5, delay: 0.2 }}
// // //       >
// // //         لوحة المعلومات الانتخابية
// // //       </motion.h1>

// // //       <AnimatePresence>
// // //         {upcomingElection && (
// // //           <motion.div 
// // //             className="bg-gradient-to-t from-zait to-zait text-white p-6 rounded-xl shadow-lg mb-8 text-center"
// // //             initial={{ opacity: 0, y: -20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             exit={{ opacity: 0, y: -20 }}
// // //             transition={{ duration: 0.5 }}
// // //           >
// // //             <h2 className="text-2xl font-bold mb-4">الوقت المتبقي للانتخابات</h2>
// // //             <div className="text-xl font-bold flex items-center justify-center space-x-4">
// // //               <Clock size={32} />
// // //               <span>{countdown}</span>
// // //             </div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>

// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// // //         <StatCard
// // //           title="نسبة مشاركة الناخبين"
// // //           localPercentage={stats.circleVotedPercentage}
// // //           partyPercentage={stats.partyVotedPercentage}
// // //           icon={UserCheck}
// // //           color="bg-gray-600"
// // //         />
// // //         <StatCard
// // //           title="العدد الإجمالي الناخبين"
// // //           localPercentage={stats.circleVotedCount}
// // //           partyPercentage={stats.partyVotedCount}
// // //           icon={Users}
// // //           color="bg-zait"
// // //         />
// // //         <StatCard
// // //           title="الانتخابات النشطة"
// // //           localPercentage={stats.activeElections}
// // //           partyPercentage={0}
// // //           icon={Vote}
// // //           color="bg-gray-400"
// // //         />
// // //       </div>

// // //       <motion.div
// // //         className="bg-white rounded-xl shadow-lg p-8 mb-12"
// // //         initial={{ opacity: 0, y: 20 }}
// // //         animate={{ opacity: 1, y: 0 }}
// // //         transition={{ duration: 0.5, delay: 0.4 }}
// // //       >
// // //         <h2 className="text-3xl font-bold mb-6 text-gray-800">نسبة المشاركة في الانتخابات</h2>
// // //         <ResponsiveContainer width="100%" height={400}>
// // //           <BarChart data={chartData}>
// // //             <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
// // //             <XAxis dataKey="name" stroke="#333" />
// // //             <YAxis stroke="#333" />
// // //             <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
// // //             <Legend wrapperStyle={{ paddingTop: '20px' }} />
// // //             <Bar dataKey="participation" fill="#3F7A5E" name="نسبة المشاركة" radius={[8, 8, 0, 0]} />
// // //           </BarChart>
// // //         </ResponsiveContainer>
// // //       </motion.div>

// // //       <motion.div 
// // //         className="bg-white rounded-xl shadow-lg p-8 mb-12"
// // //         initial={{ opacity: 0, y: 20 }}
// // //         animate={{ opacity: 1, y: 0 }}
// // //         transition={{ duration: 0.5, delay: 0.6 }}
// // //       >
// // //         <h2 className="text-2xl font-bold mb-4">إضافة موعد الانتخابات</h2>
// // //         <form onSubmit={handleSubmit}>
// // //           <div className="mb-4">
// // //             <label className="block text-gray-700 mb-2">تاريخ بدء الانتخابات</label>
// // //             <input
// // //               type="date"
// // //               className="w-full px-4 py-2 border rounded-lg"
// // //               value={newElection.startDate}
// // //               onChange={(e) => setNewElection({ ...newElection, startDate: e.target.value })}
// // //               required
// // //             />
// // //           </div>
// // //           <div className="mb-4">
// // //             <label className="block text-gray-700 mb-2">تاريخ انتهاء الانتخابات</label>
// // //             <input
// // //               type="date"
// // //               className="w-full px-4 py-2 border rounded-lg"
// // //               value={newElection.endDate}
// // //               onChange={(e) => setNewElection({ ...newElection, endDate: e.target.value })}
// // //               required
// // //             />
// // //           </div>
// // //           <button
// // //             type="submit"
// // //             className="bg-zait text-white py-2 px-4 rounded-lg shadow-md hover:bg-zait-dark transition duration-200"
// // //           >
// // //             إضافة موعد
// // //           </button>
// // //         </form>
// // //       </motion.div>
// // //     </div>
// // //   );
// // // };

// // // export default Home;


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
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   UserCheck,
//   Users,
//   Vote,
//   Clock,
// } from "lucide-react";
// import axios from "axios";
// import StatCard from "./StatCard"; // Ensure the correct path to StatCard

// const Home = () => {
//   const [stats, setStats] = useState({
//     circleVotedCount: 0,
//     circleVotedPercentage: 0,
//     partyVotedCount: 0,
//     partyVotedPercentage: 0,
//     activeElections: 0,
//   });

//   const [chartData, setChartData] = useState([]);
//   const [upcomingElection, setUpcomingElection] = useState(null);
//   const [countdown, setCountdown] = useState("");
//   const [newElection, setNewElection] = useState({ startDate: '', endDate: '' });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/api/stats");
//         setStats(response.data);
//         setChartData([
//           { name: "دائرة الزرقاء", participation: response.data.circleVotedPercentage },
//           { name: "دائرة عمان الأولى", participation: response.data.circleVotedPercentage },
//           { name: "دائرة عمان الثالثة", participation: response.data.partyVotedPercentage },
//         ]);
//       } catch (err) {
//         console.error("Failed to fetch stats:", err);
//       }
//     };

//     const fetchUpcomingElection = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/stats/elections/upcoming');
//         setUpcomingElection(response.data);
//       } catch (error) {
//         console.error("Error fetching upcoming election:", error);
//       }
//     };

//     fetchStats();
//     fetchUpcomingElection();
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (upcomingElection) {
//         const now = new Date();
//         const start = new Date(upcomingElection.start_date);
//         const end = new Date(upcomingElection.end_date);
//         let timeDiff, message;

//         if (now < start) {
//           timeDiff = start - now;
//           message = "لم تبدأ الانتخابات، المتبقي على بدئها: ";
//         } else if (now >= start && now <= end) {
//           timeDiff = end - now;
//           message = "الوقت المتبقي لانتهاء الانتخابات: ";
//         } else {
//           setCountdown("لقد انتهت الانتخابات");
//           clearInterval(timer);
//           return;
//         }

//         const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

//         setCountdown(`${message} ${days} أيام ${hours} ساعات ${minutes} دقائق ${seconds} ثوانٍ`);
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [upcomingElection]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await axios.post('http://localhost:3001/api/stats/elections', newElection);
//       setNewElection({ startDate: '', endDate: '' });
//       alert('تمت إضافة موعد الانتخابات بنجاح!');
//     } catch (error) {
//       alert("فشل في إضافة موعد الانتخابات: " + error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8" dir="rtl">
//       <motion.h1 
//         className="text-5xl font-bold mb-12 text-zait text-center"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         لوحة المعلومات الانتخابية
//       </motion.h1>

//       <AnimatePresence>
//         {upcomingElection && (
//           <motion.div 
//             className="bg-gradient-to-t from-zait to-zait text-white p-6 rounded-xl shadow-lg mb-8 text-center"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h2 className="text-2xl font-bold mb-4">الوقت المتبقي للانتخابات</h2>
//             <div className="text-xl font-bold flex items-center justify-center space-x-4">
//               <Clock size={32} />
//               <span>{countdown}</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

//       <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8" dir="rtl">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="p-6 bg-white rounded-lg shadow-lg bg-gray-400">
//           <div className="flex items-center">
//             <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md">
//               <Users className="text-gray-700" size={24} />
//             </div>
//             <div className="ml-4">
//               <h3 className="text-lg font-semibold text-gray-800">العدد الإجمالي الناخبين</h3>
//               {/* <p className="text-2xl font-bold text-gray-600 mt-1">{stats.activeElections}</p> */}
//               <p className="text-lg text-gray-500 mt-1">N/A</p>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 bg-white rounded-lg shadow-lg bg-gray-600">
//           <div className="flex items-center">
//             <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md">
//               <UserCheck className="text-gray-700" size={24} />
//             </div>
//             <div className="ml-4">
//               <h3 className="text-lg font-semibold text-gray-800">نسبة مشاركة الناخبين</h3>
//               <p className="text-2xl font-bold text-gray-600 mt-1">
//                 {/* {formatPercentage(stats.circleVotedPercentage)} */}
//               </p>
//               <p className="text-lg text-gray-500 mt-1">
//                 {/* {formatPercentage(stats.partyVotedPercentage)} */}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 bg-white rounded-lg shadow-lg bg-zait">
//           <div className="flex items-center">
//             <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md">
//               <Users className="text-gray-700" size={24} />
//             </div>
//             <div className="ml-4">
//               <h3 className="text-lg font-semibold text-gray-800">حالة الانتخاب</h3>
//               <p className="text-2xl font-bold text-gray-600 mt-1">
//                 {/* {stats.circleVotedCount} */}
//               </p>
//               <p className="text-lg text-gray-500 mt-1">
//                 {/* {stats.partyVotedCount} */}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//         <StatCard
//           title="العدد الإجمالي الناخبين"
//           localPercentage={stats.activeElections}
//           partyPercentage={0}
//           icon={Users}
//           color="bg-gray-400"
//         />
//         <StatCard
//           title="نسبة مشاركة الناخبين"
//           localPercentage={stats.circleVotedPercentage}
//           partyPercentage={stats.partyVotedPercentage}
//           icon={UserCheck}
//           color="bg-gray-600"
//         />
//         <StatCard
//           title="حالة الانتخاب  "
//           localPercentage={stats.circleVotedCount}
//           partyPercentage={stats.partyVotedCount}
//           icon={Users}
//           color="bg-zait"
//         />
//       </div>

//       <motion.div
//         className="bg-white rounded-xl shadow-lg p-8 mb-12"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//       >
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">نسبة المشاركة في الانتخابات</h2>
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="participation" fill="#4f9a94" />
//           </BarChart>
//         </ResponsiveContainer>
//       </motion.div>

//       <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 mb-12">
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">إضافة موعد الانتخابات</h2>
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="startDate">
//             تاريخ البدء
//           </label>
//           <input
//             type="datetime-local"
//             id="startDate"
//             value={newElection.startDate}
//             onChange={(e) => setNewElection({ ...newElection, startDate: e.target.value })}
//             className="border border-gray-300 rounded-md p-2 w-full"
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="endDate">
//             تاريخ الانتهاء
//           </label>
//           <input
//             type="datetime-local"
//             id="endDate"
//             value={newElection.endDate}
//             onChange={(e) => setNewElection({ ...newElection, endDate: e.target.value })}
//             className="border border-gray-300 rounded-md p-2 w-full"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-zait text-white py-2 px-4 rounded-md shadow-md hover:bg-zait-dark"
//         >
//           إضافة
//         </button>
//       </form>
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
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   UserCheck,
//   Users,
//   Clock,
// } from "lucide-react";
// import axios from "axios";

// const Home = () => {
//   const [stats, setStats] = useState({
//     circleVotedCount: 0,
//     circleVotedPercentage: 0,
//     partyVotedCount: 0,
//     partyVotedPercentage: 0,
//     activeElections: 0,
//   });

//   const [chartData, setChartData] = useState([]);
//   const [upcomingElection, setUpcomingElection] = useState(null);
//   const [countdown, setCountdown] = useState("");
//   const [newElection, setNewElection] = useState({ startDate: '', endDate: '' });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/api/stats");
//         setStats(response.data);
//         setChartData([
//           { name: "دائرة الزرقاء", participation: response.data.circleVotedPercentage },
//           { name: "دائرة عمان الأولى", participation: response.data.circleVotedPercentage },
//           { name: "دائرة عمان الثالثة", participation: response.data.partyVotedPercentage },
//         ]);
//       } catch (err) {
//         console.error("Failed to fetch stats:", err);
//       }
//     };

//     const fetchUpcomingElection = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/stats/elections/upcoming');
//         setUpcomingElection(response.data);
//       } catch (error) {
//         console.error("Error fetching upcoming election:", error);
//       }
//     };

//     fetchStats();
//     fetchUpcomingElection();
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (upcomingElection) {
//         const now = new Date();
//         const start = new Date(upcomingElection.start_date);
//         const end = new Date(upcomingElection.end_date);
//         let timeDiff, message;

//         if (now < start) {
//           timeDiff = start - now;
//           message = "لم تبدأ الانتخابات، المتبقي على بدئها: ";
//         } else if (now >= start && now <= end) {
//           timeDiff = end - now;
//           message = "الوقت المتبقي لانتهاء الانتخابات: ";
//         } else {
//           setCountdown("لقد انتهت الانتخابات");
//           clearInterval(timer);
//           return;
//         }

//         const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

//         setCountdown(`${message} ${days} أيام ${hours} ساعات ${minutes} دقائق ${seconds} ثوانٍ`);
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [upcomingElection]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await axios.post('http://localhost:3001/api/stats/elections', newElection);
//       setNewElection({ startDate: '', endDate: '' });
//       alert('تمت إضافة موعد الانتخابات بنجاح!');
//     } catch (error) {
//       alert("فشل في إضافة موعد الانتخابات: " + error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8" dir="rtl">
//       <motion.h1 
//         className="text-5xl font-bold mb-12 text-zait text-center"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         لوحة المعلومات الانتخابية
//       </motion.h1>

//       <AnimatePresence>
//         {upcomingElection && (
//           <motion.div 
//             className="bg-gradient-to-t from-zait to-zait text-white p-6 rounded-xl shadow-lg mb-8 text-center"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h2 className="text-2xl font-bold mb-4">الوقت المتبقي للانتخابات</h2>
//             <div className="text-xl font-bold flex items-center justify-center space-x-4">
//               <Clock size={32} />
//               <span>{countdown}</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="p-6 bg-white rounded-lg shadow-lg bg-gray-400">
//           <div className="flex items-center">
//             <div className="ml-4">
//             <div className="flex space-x-4">
//               <Users className="text-zait ml-4" size={32} /><h3 className="text-xl font-semibold text-gray-800">نسبة مشاركة الناخبين</h3>

//              </div>
//              <p className="text-xl  text-gray-600 mt-1">
//              الدوائر المحلية: {stats.circleVotedCount}
//               </p>
//              <p className="text-xl  text-gray-600 mt-1">
//              الدوائر الحزبية: {stats.partyVotedCount}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 rounded-lg shadow-lg bg-gray-400">
//           <div className="flex items-center">
//             <div className="ml-4">
//               <div className="flex space-x-4">
//               <UserCheck className="text-zait ml-4" size={32} /><h3 className="text-xl font-semibold text-gray-800">نسبة مشاركة الناخبين</h3>

//               </div>
//               <p className="text-xl  text-gray-600 mt-1">
//                  الدوائر المحلية:{stats.partyVotedPercentage}%
//               </p>
//               <p className="text-xl  text-gray-600 mt-1">
//                 الدائرة الحزبية: {stats.circleVotedPercentage}%
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 bg-white rounded-lg shadow-lg bg-zait">
//           <div className="flex items-center">
          
//             <div className="ml-4">
//             <div className="flex space-x-4">
//               <UserCheck className="text-gray-400 ml-4" size={32} /><h3 className="text-xl font-semibold text-gray-800"> حالة الانتخاب</h3>

//               </div>
//               <p className="text-2xl font-bold text-gray-600 mt-1">
                
//               </p>
              
//             </div>
//           </div>
//         </div>
//       </div>

//       <motion.div
//         className="bg-white rounded-xl shadow-lg p-8 mb-12"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//       >
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">نسبة المشاركة في الانتخابات</h2>
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="participation" fill="#3F7A5E"  name="نسبة المشاركة"/>
//           </BarChart>
//         </ResponsiveContainer>
//       </motion.div>

//       <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 mb-12">
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">إضافة موعد الانتخابات</h2>
//         <div className="mb-4">
//           <label className="block text-lg font-semibold mb-2">تاريخ بدء الانتخابات</label>
//           <input
//             type="datetime-local"
//             value={newElection.startDate}
//             onChange={(e) => setNewElection({ ...newElection, startDate: e.target.value })}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-lg font-semibold mb-2">تاريخ انتهاء الانتخابات</label>
//           <input
//             type="datetime-local"
//             value={newElection.endDate}
//             onChange={(e) => setNewElection({ ...newElection, endDate: e.target.value })}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-zait text-white py-2 px-4 rounded-lg hover:bg-zait transition duration-300"
//         >
//           إضافة الموعد
//         </button>
//       </form>
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
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   UserCheck,
//   Users,
//   Clock,
// } from "lucide-react";
// import axios from "axios";

// const Home = () => {
//   const [stats, setStats] = useState({
//     circleVotedCount: 0,
//     circleVotedPercentage: 0,
//     partyVotedCount: 0,
//     partyVotedPercentage: 0,
//     activeElections: 0,
//   });

//   const [chartData, setChartData] = useState([]);
//   const [upcomingElection, setUpcomingElection] = useState(null);
//   const [countdown, setCountdown] = useState("");
//   const [newElection, setNewElection] = useState({ startDate: '', endDate: '' });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/api/stats");
//         setStats(response.data);
//         setChartData([
//           { name: "دائرة الزرقاء", participation: response.data.circleVotedPercentage },
//           { name: "دائرة عمان الأولى", participation: response.data.circleVotedPercentage },
//           { name: "دائرة عمان الثالثة", participation: response.data.partyVotedPercentage },
//         ]);
//       } catch (err) {
//         console.error("Failed to fetch stats:", err);
//       }
//     };

//     const fetchUpcomingElection = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/stats/elections/upcoming');
//         setUpcomingElection(response.data);
//       } catch (error) {
//         console.error("Error fetching upcoming election:", error);
//       }
//     };

//     fetchStats();
//     fetchUpcomingElection();
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (upcomingElection) {
//         const now = new Date();
//         const start = new Date(upcomingElection.start_date);
//         const end = new Date(upcomingElection.end_date);
//         let timeDiff, message;

//         if (now < start) {
//           timeDiff = start - now;
//           message = "لم تبدأ الانتخابات، المتبقي على بدئها: ";
//         } else if (now >= start && now <= end) {
//           timeDiff = end - now;
//           message = "الوقت المتبقي لانتهاء الانتخابات: ";
//         } else {
//           setCountdown("لقد انتهت الانتخابات");
//           clearInterval(timer);
//           return;
//         }

//         const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

//         setCountdown(`${message} ${days} أيام ${hours} ساعات ${minutes} دقائق ${seconds} ثوانٍ`);
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [upcomingElection]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await axios.post('http://localhost:3001/api/stats/elections', newElection);
//       setNewElection({ startDate: '', endDate: '' });
//       alert('تمت إضافة موعد الانتخابات بنجاح!');
//     } catch (error) {
//       alert("فشل في إضافة موعد الانتخابات: " + error.message);
//     }
//   };

//   let electionStatus;
//   if (upcomingElection) {
//     const now = new Date();
//     const start = new Date(upcomingElection.start_date);
//     const end = new Date(upcomingElection.end_date);

//     if (now < start) {
//       electionStatus = "الانتخابات لم تبدأ بعد";
//     } else if (now >= start && now <= end) {
//       electionStatus = "الانتخابات جارية";
//     } else {
//       electionStatus = "الانتخابات انتهت";
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8" dir="rtl">
//       <motion.h1 
//         className="text-5xl font-bold mb-12 text-zait text-center"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         لوحة المعلومات الانتخابية
//       </motion.h1>

//       <AnimatePresence>
//         {upcomingElection && (
//           <motion.div 
//             className="bg-gradient-to-t from-zait to-zait text-white p-6 rounded-xl shadow-lg mb-8 text-center"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h2 className="text-2xl font-bold mb-4">الوقت المتبقي للانتخابات</h2>
//             <div className="text-xl font-bold flex items-center justify-center space-x-4">
//               <Clock size={32} />
//               <span>{countdown}</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="p-6 bg-white rounded-lg shadow-lg bg-gray-400">
//           <div className="flex items-center">
//             <div className="ml-4">
//               <div className="flex space-x-4">
//                 <Users className="text-zait ml-4" size={32} />
//                 <h3 className="text-xl font-semibold text-gray-800">نسبة مشاركة الناخبين</h3>
//               </div>
//               <p className="text-xl text-gray-600 mt-1">
//                 الدوائر المحلية: {stats.circleVotedCount}
//               </p>
//               <p className="text-xl text-gray-600 mt-1">
//                 الدوائر الحزبية: {stats.partyVotedCount}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 rounded-lg shadow-lg bg-gray-400">
//           <div className="flex items-center">
//             <div className="ml-4">
//               <div className="flex space-x-4">
//                 <UserCheck className="text-zait ml-4" size={32} />
//                 <h3 className="text-xl font-semibold text-gray-800">نسبة مشاركة الناخبين</h3>
//               </div>
//               <p className="text-xl text-gray-600 mt-1">
//                 الدوائر المحلية: {stats.partyVotedPercentage}%
//               </p>
//               <p className="text-xl text-gray-600 mt-1">
//                 الدائرة الحزبية: {stats.circleVotedPercentage}%
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 bg-white rounded-lg shadow-lg bg-zait">
//           <div className="flex items-center">
//             <div className="ml-4">
//               <div className="flex space-x-4">
//                 <Clock className="text-gray-400 ml-4" size={32} />
//                 <h3 className="text-xl font-semibold text-gray-800">حالة الانتخابات</h3>
//               </div>
//               <p className="text-2xl font-bold text-gray-600 mt-1">
//                 {electionStatus || "لا توجد بيانات"}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <motion.div
//         className="bg-white rounded-xl shadow-lg p-8 mb-12"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//       >
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">نسبة المشاركة في الانتخابات</h2>
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="participation" fill="#3F7A5E" />
//           </BarChart>
//         </ResponsiveContainer>
//       </motion.div>

//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">إضافة موعد الانتخابات</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700">تاريخ بدء الانتخابات:</label>
//           <input
//             type="datetime-local"
//             value={newElection.startDate}
//             onChange={(e) => setNewElection({ ...newElection, startDate: e.target.value })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-zait focus:border-zait"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">تاريخ انتهاء الانتخابات:</label>
//           <input
//             type="datetime-local"
//             value={newElection.endDate}
//             onChange={(e) => setNewElection({ ...newElection, endDate: e.target.value })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-zait focus:border-zait"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-zait text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700"
//         >
//           إضافة
//         </button>
//       </form>
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
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCheck,
  Users,
  Clock,
  Calendar,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

const Home = () => {
  const [stats, setStats] = useState({
    circleVotedCount: 0,
    circleVotedPercentage: 0,
    partyVotedCount: 0,
    partyVotedPercentage: 0,
    activeElections: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [upcomingElection, setUpcomingElection] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [newElection, setNewElection] = useState({ startDate: '', endDate: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsResponse, upcomingElectionResponse] = await Promise.all([
          axios.get("http://localhost:3001/api/stats"),
          axios.get('http://localhost:3001/api/stats/elections/upcoming')
        ]);
        
        setStats(statsResponse.data);
        setChartData([
          { name: "دائرة الزرقاء", participation: statsResponse.data.circleVotedPercentage },
          { name: "دائرة عمان الأولى", participation: statsResponse.data.circleVotedPercentage },
          { name: "دائرة عمان الثالثة", participation: statsResponse.data.partyVotedPercentage },
        ]);
        setUpcomingElection(upcomingElectionResponse.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى لاحقًا.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (upcomingElection) {
        const now = new Date();
        const start = new Date(upcomingElection.start_date);
        const end = new Date(upcomingElection.end_date);
        let timeDiff, message;

        if (now < start) {
          timeDiff = start - now;
          message = "لم تبدأ الانتخابات، المتبقي على بدئها: ";
        } else if (now >= start && now <= end) {
          timeDiff = end - now;
          message = "الوقت المتبقي لانتهاء الانتخابات: ";
        } else {
          setCountdown("لقد انتهت الانتخابات");
          clearInterval(timer);
          return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setCountdown(`${message} ${days} أيام ${hours} ساعات ${minutes} دقائق ${seconds} ثوانٍ`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [upcomingElection]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/stats/elections', newElection);
      setNewElection({ startDate: '', endDate: '' });
      alert('تمت إضافة موعد الانتخابات بنجاح!');
    } catch (error) {
      alert("فشل في إضافة موعد الانتخابات: " + error.message);
    }
  };

  let electionStatus;
  if (upcomingElection) {
    const now = new Date();
    const start = new Date(upcomingElection.start_date);
    const end = new Date(upcomingElection.end_date);

    if (now < start) {
      electionStatus = "الانتخابات لم تبدأ بعد";
    } else if (now >= start && now <= end) {
      electionStatus = "الانتخابات جارية";
    } else {
      electionStatus = "الانتخابات انتهت";
    }
  }

  const StatCard = ({ title, icon: Icon, children }) => (
    <motion.div 
      className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center mb-4">
        <Icon className="text-zait ml-4" size={32} />
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      {children}
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zait"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">خطأ!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8" dir="rtl">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-zait text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        لوحة المعلومات الانتخابية
      </motion.h1>

      <AnimatePresence>
        {upcomingElection && (
          <motion.div 
            className="bg-gradient-to-r from-zait to-green-700 text-white p-4 md:p-6 rounded-xl shadow-lg mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">الوقت المتبقي للانتخابات</h2>
            <div className="text-lg md:text-xl font-bold flex items-center justify-center space-x-2 md:space-x-4">
              <Clock size={24} className="ml-2" />
              <span>{countdown}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <StatCard title="إحصائيات المشاركة" icon={Users}>
          <p className="text-lg text-gray-600 mt-1">
            الدوائر المحلية: {stats.circleVotedCount}
          </p>
          <p className="text-lg text-gray-600 mt-1">
            الدوائر الحزبية: {stats.partyVotedCount}
          </p>
        </StatCard>

        <StatCard title="نسبة المشاركة" icon={UserCheck}>
          <p className="text-lg text-gray-600 mt-1">
            الدوائر المحلية: {stats.circleVotedPercentage}%
          </p>
          <p className="text-lg text-gray-600 mt-1">
            الدائرة الحزبية: {stats.partyVotedPercentage}%
          </p>
        </StatCard>

        <StatCard title="حالة الانتخابات" icon={AlertCircle}>
          <p className="text-xl font-semibold text-zait mt-1">
            {electionStatus || "لا توجد بيانات"}
          </p>
        </StatCard>
      </div>

      <motion.div
        className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-8 md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">نسبة المشاركة في الانتخابات</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#333" />
            <YAxis stroke="#333" />
            <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="participation" fill="#3F7A5E" name="نسبة المشاركة" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit} 
        className="bg-white p-4 md:p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">إضافة موعد الانتخابات</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">تاريخ بدء الانتخابات:</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="datetime-local"
              value={newElection.startDate}
              onChange={(e) => setNewElection({ ...newElection, startDate: e.target.value })}
              className="pl-10 w-full border-2 border-gray-300 rounded-md py-2 focus:ring-2 focus:ring-zait focus:border-transparent transition duration-200"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">تاريخ انتهاء الانتخابات:</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="datetime-local"
              value={newElection.endDate}
              onChange={(e) => setNewElection({ ...newElection, endDate: e.target.value })}
              className="pl-10 w-full border-2 border-gray-300 rounded-md py-2 focus:ring-2 focus:ring-zait focus:border-transparent transition duration-200"
              required
            />
          </div>
        </div>
        <motion.button
          type="submit"
          className="bg-zait text-white px-6 py-2 rounded-md shadow-sm hover:bg-green-700 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          إضافة
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Home;