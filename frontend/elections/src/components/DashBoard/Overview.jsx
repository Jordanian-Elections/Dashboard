

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
import Countdown from "./Countdown";

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
          axios.get("http://localhost:3001/api/over/stats"),
          axios.get('http://localhost:3001/api/over/upcoming-election'),
          axios.get('http://localhost:3001/api/over/election-times') // Fetch all election times
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
      await axios.post('http://localhost:3001/api/over/election-times', newElection);
      setNewElection({ startDate: '', endDate: '' });
      alert('تمت إضافة موعد الانتخابات بنجاح!');
      // Refresh the list of elections
      const response = await axios.get('http://localhost:3001/api/over/election-times');
      setElections(response.data);
    } catch (error) {
      alert("فشل في إضافة موعد الانتخابات: " + error.message);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/over/election-times', {
        start_date: selectedElection.start_date,
        end_date: selectedElection.end_date,
        _id: selectedElection._id // Ensure _id is included for update
      });
      setSelectedElection(null);
      alert('تمت تحديث موعد الانتخابات بنجاح!');
      // Refresh the list of elections
      const response = await axios.get('http://localhost:3001/api/over/election-times');
      setElections(response.data);
    } catch (error) {
      alert("فشل في تحديث موعد الانتخابات: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/over/election-times/${id}`);
      alert('تم حذف موعد الانتخابات بنجاح!');
      // Refresh the list of elections
      const response = await axios.get('http://localhost:3001/api/over/election-times');
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
      {upcomingElection && (
        <Countdown
          startDate={upcomingElection.start_date}
          endDate={upcomingElection.end_date}
        />
      )}
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
            <div className="text-sm md:text-base mt-4">
              {stats.electionStatus}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard title="عدد الناخبين في الدائرة" icon={UserCheck}>
          <div className="text-2xl font-bold">{stats.circleVotedCount}</div>
          <div className="text-sm text-gray-600">{stats.circleVotedPercentage}%</div>
        </StatCard>
        <StatCard title="عدد الناخبين في الحزب" icon={Users}>
          <div className="text-2xl font-bold">{stats.partyVotedCount}</div>
          <div className="text-sm text-gray-600">{stats.partyVotedPercentage}%</div>
        </StatCard>
        <StatCard title="حالة الانتخاب   " icon={Calendar}>
          {/* <div className="text-2xl font-bold">{stats.electionStatus}</div> */}
          <div className="text-2xl font-bold">{electionStatus || "لا توجد بيانات"}</div>

        </StatCard>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">مخطط التصويت</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="participation" fill="#3F7A5E" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4">إضافة موعد انتخابات</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="startDate">تاريخ البداية</label>
            <input
              id="startDate"
              type="datetime-local"
              value={newElection.startDate}
              onChange={(e) => setNewElection({ ...newElection, startDate: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-zait focus:border-zait sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="endDate">تاريخ النهاية</label>
            <input
              id="endDate"
              type="datetime-local"
              value={newElection.endDate}
              onChange={(e) => setNewElection({ ...newElection, endDate: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-zait focus:border-zait sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-zait text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            إضافة
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4">تحديث أو حذف موعد انتخابات</h2>
        {elections.length > 0 ? (
          elections.map((election) => (
            <div key={election._id} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <div className="text-lg font-semibold mb-2">
                {new Date(election.start_date).toLocaleString()} - {new Date(election.end_date).toLocaleString()}
              </div>
              <button
                onClick={() => setSelectedElection(election)}
                className="bg-blue-500 text-white py-1 px-3 rounded-md shadow-sm hover:bg-blue-600"
              >
                تحديث
              </button>
              <button
                onClick={() => handleDelete(election._id)}
                className="bg-red-500 text-white py-1 px-3 rounded-md shadow-sm hover:bg-red-600 ml-2"
              >
                حذف
              </button>
            </div>
          ))
        ) : (
          <p>لا توجد مواعيد انتخابات متاحة.</p>
        )}
      </div>

      <AnimatePresence>
        {selectedElection && (
          <motion.div 
            className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
              <h3 className="text-xl font-semibold mb-4">تحديث موعد الانتخابات</h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="startDate">تاريخ البداية</label>
                  <input
                    id="startDate"
                    type="datetime-local"
                    value={selectedElection.start_date}
                    onChange={(e) => setSelectedElection({ ...selectedElection, start_date: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-zait focus:border-zait sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="endDate">تاريخ النهاية</label>
                  <input
                    id="endDate"
                    type="datetime-local"
                    value={selectedElection.end_date}
                    onChange={(e) => setSelectedElection({ ...selectedElection, end_date: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-zait focus:border-zait sm:text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  تحديث
                </button>
                <button
                  onClick={() => setSelectedElection(null)}
                  className="w-full py-2 px-4 bg-gray-500 text-white font-semibold rounded-md shadow-sm hover:bg-gray-600 mt-2"
                >
                  إلغاء
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
