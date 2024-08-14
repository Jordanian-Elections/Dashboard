
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Overview = () => {
  const [stats, setStats] = useState({
    voterParticipation: 0,
    totalVoters: 0,
    activeElections: 0,
    recentElections: []
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsResponse, chartDataResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/stats'),
          axios.get('http://localhost:5000/api/chart-data')
        ]);
        setStats(statsResponse.data);
        setChartData(chartDataResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">لوحة المعلومات</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="مشاركة الناخبين"
          value={`${stats.voterParticipation}%`}
          icon="📊"
          color="bg-blue-500"
        />
        <StatCard
          title="إجمالي الناخبين"
          value={stats.totalVoters.toLocaleString()}
          icon="👥"
          color="bg-green-500"
        />
        <StatCard
          title="الانتخابات النشطة"
          value={stats.activeElections}
          icon="🗳️"
          color="bg-purple-500"
        />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">الانتخابات الأخيرة</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
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
                <tr key={election.id} className="border-b">
                  <td className="p-3">{election.title}</td>
                  <td className="p-3">{new Date(election.start_date).toLocaleDateString()}</td>
                  <td className="p-3">{new Date(election.end_date).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(election.status)}`}>
                      {election.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className={`${color} rounded-lg shadow-md p-6 text-white`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-lg opacity-80">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  </div>
);

const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return 'bg-green-200 text-green-800';
    case 'pending':
      return 'bg-yellow-200 text-yellow-800';
    case 'completed':
      return 'bg-gray-200 text-gray-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

export default Overview;