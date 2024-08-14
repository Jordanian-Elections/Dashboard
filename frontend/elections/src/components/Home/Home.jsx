import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { UserCheck, Users, Vote, Calendar, Search, Filter, ChevronLeft, ChevronRight, PlusCircle, Edit2, Trash2, CheckCircle, Activity } from 'lucide-react';

const Home = () => {
  const [stats, setStats] = useState({
    voterParticipation: 0,
    totalVoters: 0,
    activeElections: 0,
    recentElections: []
  });
  const [chartData, setChartData] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API calls
    setTimeout(() => {
      setStats({
        voterParticipation: 65,
        totalVoters: 1000000,
        activeElections: 3,
        recentElections: [
          { id: 1, title: 'انتخابات مجلس النواب', start_date: '2024-09-01', end_date: '2024-09-15', status: 'active' },
          { id: 2, title: 'انتخابات البلدية', start_date: '2024-10-01', end_date: '2024-10-10', status: 'pending' },
          { id: 3, title: 'استفتاء دستوري', start_date: '2024-08-01', end_date: '2024-08-05', status: 'completed' },
        ]
      });
      setChartData([
        { name: 'انتخابات 2020', participation: 62 },
        { name: 'انتخابات 2021', participation: 58 },
        { name: 'انتخابات 2022', participation: 65 },
        { name: 'انتخابات 2023', participation: 70 },
      ]);
      setUsers([
        { id: 1, name: 'أحمد محمود', email: 'ahmed@example.com', role: 'ناخب' },
        { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', role: 'مرشح' },
        { id: 3, name: 'محمد خالد', email: 'mohammed@example.com', role: 'مدير' },
      ]);
      setTotal(100);
      setLoading(false);
    }, 1000);
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
      className={`${color} rounded-lg shadow-md p-6 text-white`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg opacity-80">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <Icon size={48} />
      </div>
    </motion.div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-200 text-green-800';
      case 'pending': return 'bg-yellow-200 text-yellow-800';
      case 'completed': return 'bg-gray-200 text-gray-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen" dir="rtl">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">لوحة المعلومات الانتخابية</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="مشاركة الناخبين" value={`${stats.voterParticipation}%`} icon={UserCheck} color="bg-blue-500" />
        <StatCard title="إجمالي الناخبين" value={stats.totalVoters.toLocaleString()} icon={Users} color="bg-green-500" />
        <StatCard title="الانتخابات النشطة" value={stats.activeElections} icon={Vote} color="bg-purple-500" />
      </div>

      <motion.div 
        className="bg-white rounded-lg shadow-md p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">نسبة المشاركة في الانتخابات الأخيرة</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="participation" fill="#8884d8" name="نسبة المشاركة" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div 
        className="bg-white rounded-lg shadow-md p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-4">الانتخابات الأخيرة</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">العنوان</th>
                <th className="p-3">تاريخ البدء</th>
                <th className="p-3">تاريخ الانتهاء</th>
                <th className="p-3">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentElections.map((election) => (
                <motion.tr 
                  key={election.id} 
                  className="border-b"
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                >
                  <td className="p-3">{election.title}</td>
                  <td className="p-3">{new Date(election.start_date).toLocaleDateString('ar-JO')}</td>
                  <td className="p-3">{new Date(election.end_date).toLocaleDateString('ar-JO')}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(election.status)}`}>
                      {election.status === 'active' ? 'نشط' : election.status === 'pending' ? 'قادم' : 'مكتمل'}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div 
        className="bg-white rounded-lg shadow-md p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-4">إدارة المستخدمين</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center border rounded-lg">
            <input
              type="text"
              placeholder="ابحث بالاسم"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none p-2 rounded-r-lg focus:outline-none"
            />
            <Search className="text-gray-500 mx-2" />
          </div>
          <div className="flex items-center border rounded-lg">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border-none p-2 rounded-r-lg focus:outline-none"
            >
              <option value="">كل الأدوار</option>
              <option value="voter">ناخب</option>
              <option value="candidate">مرشح</option>
              <option value="admin">مدير</option>
            </select>
            <Filter className="text-gray-500 mx-2" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">الاسم</th>
                <th className="p-3">البريد الإلكتروني</th>
                <th className="p-3">الدور</th>
                <th className="p-3">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <motion.tr 
                  key={user.id} 
                  className="border-b"
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                >
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <motion.button whileHover={{ scale: 1.1 }} className="text-blue-500"><Edit2 size={16} /></motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} className="text-red-500"><Trash2 size={16} /></motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-blue-500 text-white p-2 rounded-lg flex items-center"
          >
            <ChevronRight className="mr-2" />
            السابق
          </button>
          <span>صفحة {page} من {Math.ceil(total / pageSize)}</span>
          <button
            onClick={() => setPage((prev) => (prev * pageSize < total ? prev + 1 : prev))}
            disabled={page * pageSize >= total}
            className="bg-blue-500 text-white p-2 rounded-lg flex items-center"
          >
            التالي
            <ChevronLeft className="ml-2" />
          </button>
        </div>
      </motion.div>

      <motion.div 
        className="bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">الجدول الزمني للانتخابات</h2>
        <div className="space-y-4">
          {stats.recentElections.map((election) => (
            <motion.div 
              key={election.id}
              className="flex items-center p-4 border rounded-lg"
              whileHover={{ scale: 1.02 }}
            >
              <Calendar className="text-blue-500 mr-4" size={24} />
              <div>
                <h3 className="font-semibold">{election.title}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(election.start_date).toLocaleDateString('ar-JO')} - {new Date(election.end_date).toLocaleDateString('ar-JO')}
                </p>
              </div>
              <span className={`ml-auto px-2 py-1 rounded-full text-xs ${getStatusColor(election.status)}`}>
                {election.status === 'active' ? 'نشط' : election.status === 'pending' ? 'قادم' : 'مكتمل'}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;