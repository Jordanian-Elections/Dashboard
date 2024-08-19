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
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsResponse, upcomingElectionResponse, electionsResponse] = await Promise.all([
          axios.get("http://localhost:3001/api/stats"),
          axios.get('http://localhost:3001/api/stats/elections/upcoming'),
          axios.get('http://localhost:3001/api/election-times') // Fetch all election times
        ]);
        
        setStats(statsResponse.data);
        setChartData([
          { name: "دائرة الزرقاء", participation: statsResponse.data.circleVotedPercentage },
          { name: "دائرة عمان الأولى", participation: statsResponse.data.circleVotedPercentage },
          { name: "دائرة عمان الثالثة", participation: statsResponse.data.partyVotedPercentage },
        ]);
        setUpcomingElection(upcomingElectionResponse.data);
        setElections(electionsResponse.data); // Set election times
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
      await axios.post('http://localhost:3001/api/election-times', newElection);
      setNewElection({ startDate: '', endDate: '' });
      alert('تمت إضافة موعد الانتخابات بنجاح!');
      // Refresh the list of elections
      const response = await axios.get('http://localhost:3001/api/election-times');
      setElections(response.data);
    } catch (error) {
      alert("فشل في إضافة موعد الانتخابات: " + error.message);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/election-times', selectedElection);
      setSelectedElection(null);
      alert('تمت تحديث موعد الانتخابات بنجاح!');
      // Refresh the list of elections
      const response = await axios.get('http://localhost:3001/api/election-times');
      setElections(response.data);
    } catch (error) {
      alert("فشل في تحديث موعد الانتخابات: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/election-times/${id}`);
      alert('تم حذف موعد الانتخابات بنجاح!');
      // Refresh the list of elections
      const response = await axios.get('http://localhost:3001/api/election-times');
      setElections(response.data);
    } catch (error) {
      alert("فشل في حذف موعد الانتخابات: " + error.message);
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
        <StatCard title="عدد الدوائر الانتخابية المراقبة" icon={UserCheck}>
          <p className="text-xl font-semibold text-gray-800">{stats.circleVotedCount}</p>
        </StatCard>
        <StatCard title="نسبة المشاركة في الدوائر الانتخابية" icon={Users}>
          <p className="text-xl font-semibold text-gray-800">{stats.circleVotedPercentage}%</p>
        </StatCard>
        <StatCard title="عدد الأحزاب المشاركة" icon={Calendar}>
          <p className="text-xl font-semibold text-gray-800">{stats.partyVotedCount}</p>
        </StatCard>
        <StatCard title="نسبة مشاركة الأحزاب" icon={AlertCircle}>
          <p className="text-xl font-semibold text-gray-800">{stats.partyVotedPercentage}%</p>
        </StatCard>
        <StatCard title="عدد الانتخابات النشطة" icon={Clock}>
          <p className="text-xl font-semibold text-gray-800">{stats.activeElections}</p>
        </StatCard>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">بيانات التصويت حسب الدائرة</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="participation" fill="#4B9CD3" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">إضافة موعد انتخابات</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="startDate" className="block text-gray-700">تاريخ البدء</label>
              <input
                type="datetime-local"
                id="startDate"
                value={newElection.startDate}
                onChange={(e) => setNewElection({ ...newElection, startDate: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="endDate" className="block text-gray-700">تاريخ الانتهاء</label>
              <input
                type="datetime-local"
                id="endDate"
                value={newElection.endDate}
                onChange={(e) => setNewElection({ ...newElection, endDate: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <button type="submit" className="bg-zait text-white p-2 rounded">إضافة موعد الانتخابات</button>
        </form>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">تعديل / حذف مواعيد الانتخابات</h2>
        {elections.length === 0 ? (
          <p className="text-gray-700">لا توجد مواعيد انتخابات متاحة.</p>
        ) : (
          <ul className="space-y-4">
            {elections.map((election) => (
              <li key={election._id} className="flex items-center justify-between p-4 border rounded bg-white shadow-sm">
                <div>
                  <p className="text-lg font-semibold">{new Date(election.start_date).toLocaleString()} - {new Date(election.end_date).toLocaleString()}</p>
                </div>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => setSelectedElection(election)} 
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    تعديل
                  </button>
                  <button 
                    onClick={() => handleDelete(election._id)} 
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    حذف
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedElection && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">تعديل موعد الانتخابات</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="startDate" className="block text-gray-700">تاريخ البدء</label>
                  <input
                    type="datetime-local"
                    id="startDate"
                    value={selectedElection.start_date}
                    onChange={(e) => setSelectedElection({ ...selectedElection, start_date: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="endDate" className="block text-gray-700">تاريخ الانتهاء</label>
                  <input
                    type="datetime-local"
                    id="endDate"
                    value={selectedElection.end_date}
                    onChange={(e) => setSelectedElection({ ...selectedElection, end_date: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">تحديث</button>
              <button 
                onClick={() => setSelectedElection(null)} 
                className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
              >
                إغلاق
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;



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
//   Calendar,
//   AlertCircle,
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
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [statsResponse, upcomingElectionResponse] = await Promise.all([
//           axios.get("http://localhost:3001/api/stats"),
//           axios.get('http://localhost:3001/api/stats/elections/upcoming')
//         ]);
        
//         setStats(statsResponse.data);
//         setChartData([
//           { name: "دائرة الزرقاء", participation: statsResponse.data.circleVotedPercentage },
//           { name: "دائرة عمان الأولى", participation: statsResponse.data.circleVotedPercentage },
//           { name: "دائرة عمان الثالثة", participation: statsResponse.data.partyVotedPercentage },
//         ]);
//         setUpcomingElection(upcomingElectionResponse.data);
//       } catch (err) {
//         console.error("Failed to fetch data:", err);
//         setError("حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى لاحقًا.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
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

//   const StatCard = ({ title, icon: Icon, children }) => (
//     <motion.div 
//       className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
//       whileHover={{ scale: 1.03 }}
//       transition={{ type: "spring", stiffness: 300 }}
//     >
//       <div className="flex items-center mb-4">
//         <Icon className="text-zait ml-4" size={32} />
//         <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
//       </div>
//       {children}
//     </motion.div>
//   );

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zait"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//           <strong className="font-bold">خطأ!</strong>
//           <span className="block sm:inline"> {error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8" dir="rtl">
//       <motion.h1 
//         className="text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-zait text-center"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         لوحة المعلومات الانتخابية
//       </motion.h1>

//       <AnimatePresence>
//         {upcomingElection && (
//           <motion.div 
//             className="bg-gradient-to-r from-zait to-green-700 text-white p-4 md:p-6 rounded-xl shadow-lg mb-8 text-center"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">الوقت المتبقي للانتخابات</h2>
//             <div className="text-lg md:text-xl font-bold flex items-center justify-center space-x-2 md:space-x-4">
//               <Clock size={24} className="ml-2" />
//               <span>{countdown}</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
//         <StatCard title="إحصائيات المشاركة" icon={Users}>
//           <p className="text-lg text-gray-600 mt-1">
//             الدوائر المحلية: {stats.circleVotedCount}
//           </p>
//           <p className="text-lg text-gray-600 mt-1">
//             الدوائر الحزبية: {stats.partyVotedCount}
//           </p>
//         </StatCard>

//         <StatCard title="نسبة المشاركة" icon={UserCheck}>
//           <p className="text-lg text-gray-600 mt-1">
//             الدوائر المحلية: {stats.circleVotedPercentage}%
//           </p>
//           <p className="text-lg text-gray-600 mt-1">
//             الدائرة الحزبية: {stats.partyVotedPercentage}%
//           </p>
//         </StatCard>

//         <StatCard title="حالة الانتخابات" icon={AlertCircle}>
//           <p className="text-xl font-semibold text-zait mt-1">
//             {electionStatus || "لا توجد بيانات"}
//           </p>
//         </StatCard>
//       </div>

//       <motion.div
//         className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-8 md:mb-12"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//       >
//         <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">نسبة المشاركة في الانتخابات</h2>
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//             <XAxis dataKey="name" stroke="#333" />
//             <YAxis stroke="#333" />
//             <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
//             <Legend wrapperStyle={{ paddingTop: '20px' }} />
//             <Bar dataKey="participation" fill="#3F7A5E" name="نسبة المشاركة" radius={[8, 8, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </motion.div>

//       <motion.form 
//         onSubmit={handleSubmit} 
//         className="bg-white p-4 md:p-6 rounded-lg shadow-lg"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.6 }}
//       >
//         <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">إضافة موعد الانتخابات</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">تاريخ بدء الانتخابات:</label>
//           <div className="relative">
//             <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="datetime-local"
//               value={newElection.startDate}
//               onChange={(e) => setNewElection({ ...newElection, startDate: e.target.value })}
//               className="pl-10 w-full border-2 border-gray-300 rounded-md py-2 focus:ring-2 focus:ring-zait focus:border-transparent transition duration-200"
//               required
//             />
//           </div>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">تاريخ انتهاء الانتخابات:</label>
//           <div className="relative">
//             <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="datetime-local"
//               value={newElection.endDate}
//               onChange={(e) => setNewElection({ ...newElection, endDate: e.target.value })}
//               className="pl-10 w-full border-2 border-gray-300 rounded-md py-2 focus:ring-2 focus:ring-zait focus:border-transparent transition duration-200"
//               required
//             />
//           </div>
//         </div>
//         <motion.button
//           type="submit"
//           className="bg-zait text-white px-6 py-2 rounded-md shadow-sm hover:bg-green-700 transition-colors duration-300"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           إضافة
//         </motion.button>
//       </motion.form>
//     </div>
//   );
// };

// export default Home;




// // import React, { useState, useEffect } from "react";
// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// // } from "recharts";
// // import { motion, AnimatePresence } from "framer-motion";
// // import {
// //   UserCheck,
// //   Users,
// //   Clock,
// //   Calendar,
// //   AlertCircle,
// // } from "lucide-react";
// // import axios from "axios";

// // const Home = () => {
// //   const [stats, setStats] = useState({
// //     circleVotedCount: 0,
// //     circleVotedPercentage: 0,
// //     partyVotedCount: 0,
// //     partyVotedPercentage: 0,
// //     activeElections: 0,
// //   });

// //   const [chartData, setChartData] = useState([]);
// //   const [upcomingElection, setUpcomingElection] = useState(null);
// //   const [countdown, setCountdown] = useState("");
// //   const [newElection, setNewElection] = useState({ startDate: '', endDate: '' });
// //   const [electionTimes, setElectionTimes] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       setLoading(true);
// //       try {
// //         const [statsResponse, upcomingElectionResponse, electionTimesResponse] = await Promise.all([
// //           axios.get("http://localhost:3001/api/stats"),
// //           axios.get('http://localhost:3001/api/stats/elections/upcoming'),
// //           axios.get('http://localhost:3001/api/time/election-times')
// //         ]);

// //         setStats(statsResponse.data);
// //         setChartData([
// //           { name: "دائرة الزرقاء", participation: statsResponse.data.circleVotedPercentage },
// //           { name: "دائرة عمان الأولى", participation: statsResponse.data.circleVotedPercentage },
// //           { name: "دائرة عمان الثالثة", participation: statsResponse.data.partyVotedPercentage },
// //         ]);
// //         setUpcomingElection(upcomingElectionResponse.data);
// //         setElectionTimes(electionTimesResponse.data);
// //       } catch (err) {
// //         console.error("Failed to fetch data:", err);
// //         setError("حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى لاحقًا.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   useEffect(() => {
// //     const calculateCountdown = () => {
// //       if (upcomingElection) {
// //         const now = new Date();
// //         const start = new Date(upcomingElection.start_date);
// //         const end = new Date(upcomingElection.end_date);
// //         let timeDiff, message;

// //         if (now < start) {
// //           timeDiff = start - now;
// //           message = "لم تبدأ الانتخابات، المتبقي على بدئها: ";
// //         } else if (now >= start && now <= end) {
// //           timeDiff = end - now;
// //           message = "الوقت المتبقي لانتهاء الانتخابات: ";
// //         } else {
// //           setCountdown("لقد انتهت الانتخابات");
// //           return false; // Stop the interval
// //         }

// //         const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
// //         const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// //         const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
// //         const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

// //         setCountdown(`${message} ${days} أيام ${hours} ساعات ${minutes} دقائق ${seconds} ثوانٍ`);
// //         return true; // Continue the interval
// //       }
// //       return false; // Stop the interval
// //     };

// //     const timer = setInterval(() => {
// //       const shouldContinue = calculateCountdown();
// //       if (!shouldContinue) clearInterval(timer); // Stop the interval if needed
// //     }, 1000);

// //     return () => clearInterval(timer); // Clear interval on component unmount
// //   }, [upcomingElection]);

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     try {
// //       await axios.post('http://localhost:3001/api/time/election-times', newElection);
// //       setNewElection({ startDate: '', endDate: '' });
// //       alert('تمت إضافة موعد الانتخابات بنجاح!');
// //       const response = await axios.get('http://localhost:3001/api/time/election-times');
// //       setElectionTimes(response.data);
// //     } catch (error) {
// //       alert("فشل في إضافة موعد الانتخابات: " + error.message);
// //     }
// //   };

// //   const handleUpdate = async (id, startDate, endDate) => {
// //     try {
// //       await axios.post('http://localhost:3001/api/time/election-times', { id, start_date: startDate, end_date: endDate });
// //       alert('تم تحديث موعد الانتخابات بنجاح!');
// //       const response = await axios.get('http://localhost:3001/api/time/election-times');
// //       setElectionTimes(response.data);
// //     } catch (error) {
// //       alert("فشل في تحديث موعد الانتخابات: " + error.message);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       await axios.delete(`http://localhost:3001/api/time/election-times/${id}`);
// //       alert('تم حذف موعد الانتخابات بنجاح!');
// //       setElectionTimes(electionTimes.filter(election => election.id !== id));
// //     } catch (error) {
// //       alert("فشل في حذف موعد الانتخابات: " + error.message);
// //     }
// //   };

// //   let electionStatus;
// //   if (upcomingElection) {
// //     const now = new Date();
// //     const start = new Date(upcomingElection.start_date);
// //     const end = new Date(upcomingElection.end_date);

// //     if (now < start) {
// //       electionStatus = "الانتخابات لم تبدأ بعد";
// //     } else if (now >= start && now <= end) {
// //       electionStatus = "الانتخابات جارية";
// //     } else {
// //       electionStatus = "الانتخابات انتهت";
// //     }
// //   }

// //   const StatCard = ({ title, icon: Icon, children }) => (
// //     <motion.div 
// //       className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
// //       whileHover={{ scale: 1.03 }}
// //       transition={{ type: "spring", stiffness: 300 }}
// //     >
// //       <div className="flex items-center mb-4">
// //         <Icon className="text-zait ml-4" size={32} />
// //         <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
// //       </div>
// //       {children}
// //     </motion.div>
// //   );

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zait"></div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
// //           <strong className="font-bold">خطأ!</strong>
// //           <span className="block sm:inline"> {error}</span>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8" dir="rtl">
// //       <motion.h1 
// //         className="text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-zait text-center"
// //         initial={{ opacity: 0, y: -20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5, delay: 0.2 }}
// //       >
// //         لوحة المعلومات الانتخابية
// //       </motion.h1>

// //       <AnimatePresence>
// //         {upcomingElection && (
// //           <motion.div 
// //             className="bg-gradient-to-r from-zait to-green-700 text-white p-4 md:p-6 rounded-xl shadow-lg mb-8 text-center"
// //             initial={{ opacity: 0, y: -20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -20 }}
// //             transition={{ duration: 0.5 }}
// //           >
// //             <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">الوقت المتبقي للانتخابات</h2>
// //             <div className="text-lg md:text-xl font-bold flex items-center justify-center space-x-2 md:space-x-4">
// //               <Clock size={24} className="ml-2" />
// //               <span>{countdown}</span>
// //             </div>
// //             <p className="text-lg md:text-xl font-bold mt-2">{electionStatus}</p>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //         <StatCard title="عدد الدوائر المصوتة" icon={Users}>
// //           <p className="text-2xl font-bold text-gray-800">{stats.circleVotedCount}</p>
// //         </StatCard>

// //         <StatCard title="نسبة التصويت في الدوائر" icon={Clock}>
// //           <p className="text-2xl font-bold text-gray-800">{stats.circleVotedPercentage}%</p>
// //         </StatCard>

// //         <StatCard title="عدد الأحزاب المصوتة" icon={UserCheck}>
// //           <p className="text-2xl font-bold text-gray-800">{stats.partyVotedCount}</p>
// //         </StatCard>

// //         <StatCard title="نسبة التصويت للأحزاب" icon={Calendar}>
// //           <p className="text-2xl font-bold text-gray-800">{stats.partyVotedPercentage}%</p>
// //         </StatCard>

// //         <StatCard title="عدد الانتخابات النشطة" icon={AlertCircle}>
// //           <p className="text-2xl font-bold text-gray-800">{stats.activeElections}</p>
// //         </StatCard>
// //       </div>

// //       <div className="mt-8 bg-white p-4 rounded-xl shadow-lg">
// //         <h2 className="text-2xl font-bold mb-4">بيانات الانتخابات</h2>
// //         <form onSubmit={handleSubmit} className="mb-8">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <label htmlFor="startDate" className="block text-gray-700">تاريخ بدء الانتخابات</label>
// //               <input 
// //                 type="date" 
// //                 id="startDate" 
// //                 value={newElection.startDate} 
// //                 onChange={(e) => setNewElection({ ...newElection, startDate: e.target.value })}
// //                 className="mt-1 p-2 border border-gray-300 rounded-md w-full"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label htmlFor="endDate" className="block text-gray-700">تاريخ انتهاء الانتخابات</label>
// //               <input 
// //                 type="date" 
// //                 id="endDate" 
// //                 value={newElection.endDate} 
// //                 onChange={(e) => setNewElection({ ...newElection, endDate: e.target.value })}
// //                 className="mt-1 p-2 border border-gray-300 rounded-md w-full"
// //                 required
// //               />
// //             </div>
// //           </div>
// //           <button 
// //             type="submit"
// //             className="bg-zait text-white px-4 py-2 rounded-md hover:bg-green-700"
// //           >
// //             إضافة موعد الانتخابات
// //           </button>
// //         </form>

// //         <h2 className="text-xl font-bold mb-4">مواعيد الانتخابات الحالية</h2>
// //         <table className="min-w-full divide-y divide-gray-200">
// //           <thead>
// //             <tr>
// //               <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ البدء</th>
// //               <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ الانتهاء</th>
// //               <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
// //             </tr>
// //           </thead>
// //           <tbody className="bg-white divide-y divide-gray-200">
// //             {electionTimes.map((election) => (
// //               <tr key={election.id}>
// //                 <td className="px-6 py-4 whitespace-nowrap">{new Date(election.start_date).toLocaleDateString()}</td>
// //                 <td className="px-6 py-4 whitespace-nowrap">{new Date(election.end_date).toLocaleDateString()}</td>
// //                 <td className="px-6 py-4 whitespace-nowrap">
// //                   <button
// //                     onClick={() => handleUpdate(election.id, election.start_date, election.end_date)}
// //                     className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
// //                   >
// //                     تعديل
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(election.id)}
// //                     className="bg-red-500 text-white px-2 py-1 rounded"
// //                   >
// //                     حذف
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       <div className="mt-8 bg-white p-4 rounded-xl shadow-lg">
// //         <h2 className="text-2xl font-bold mb-4">مشاركة بيانات الانتخابات</h2>
// //         <div className="h-96">
// //           <ResponsiveContainer width="100%" height="100%">
// //             <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="name" />
// //               <YAxis />
// //               <Tooltip />
// //               <Legend />
// //               <Bar dataKey="participation" fill="#82ca9d" />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;
