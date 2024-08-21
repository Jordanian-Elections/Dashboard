

import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, List } from "lucide-react";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const Revenu = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [monthlyTrends, setMonthlyTrends] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [dailyGrowth, setDailyGrowth] = useState(0);

  useEffect(() => {
    const fetchRevenueData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3001/api/revenue");
        const revenueData = response.data;
        setData(revenueData);

        // Format data for the main chart
        const labels = revenueData.map((item) =>
          new Date(item.created_at).toLocaleDateString("ar-EG")
        );
        const amounts = revenueData.map((item) => parseFloat(item.amount));
        const total = amounts.reduce((sum, amount) => sum + amount, 0);
        setTotalAmount(total);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "الإيرادات",
              data: amounts,
              backgroundColor: "rgba(63,122,94, 0.2)",
              borderColor: "#3F7A5E",
              borderWidth: 1,
            },
          ],
        });

        // Calculate daily growth
        const dailyData = revenueData.reduce((acc, item) => {
          const date = new Date(item.created_at).toLocaleDateString("ar-EG");
          if (!acc[date]) acc[date] = 0;
          acc[date] += item.amount;
          return acc;
        }, {});

        const sortedDates = Object.keys(dailyData).sort();
        const today = sortedDates[sortedDates.length - 1];
        const yesterday =
          sortedDates[sortedDates.length - 2] || null;

        const todayRevenue = dailyData[today];
        const yesterdayRevenue =
          yesterday !== null ? dailyData[yesterday] : 0;

        const growth =
          yesterdayRevenue === 0
            ? 0
            : ((todayRevenue - yesterdayRevenue) /
                yesterdayRevenue) *
              100;

        setDailyGrowth(growth.toFixed(2));

        setError("");
      } catch (error) {
        console.error("Error fetching revenue data:", error);
        setError(
          "فشل في جلب بيانات الإيرادات. يرجى المحاولة مرة أخرى لاحقاً."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchRevenueData();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `الإيرادات: ${tooltipItem.raw.toLocaleString(
              "ar-EG"
            )} دينار أردني`;
          },
        },
      },
    },
  };

  const CardWrapper = ({ children, icon: Icon }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4 rtl:space-x-reverse w-72"
    >
      <div className="bg-zait1 p-3 rounded-full ml-4">
        <Icon className="text-zait" size={24} />
      </div>
      {children}
    </motion.div>
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-center text-zait"
      >
        نظرة عامة على الإيرادات
      </motion.h1>

      {loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-zait text-center"
        >
          جارٍ التحميل...
        </motion.p>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-center"
        >
          {error}
        </motion.p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 pr-20">
        <CardWrapper icon={DollarSign}>
          <div>
            <p className="text-sm text-gray-500">إجمالي الإيرادات</p>
            <p className="text-xl font-semibold">
              {totalAmount.toLocaleString("ar-EG", {
                minimumFractionDigits: 2,
              })}{" "}
              دينار أردني
            </p>
          </div>
        </CardWrapper>
        <CardWrapper icon={TrendingUp}>
          <div>
            <p className="text-sm text-gray-500">نمو الإيرادات اليومية</p>
            <p className={`text-xl font-semibold ${dailyGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {dailyGrowth >= 0 ? `+${dailyGrowth}%` : `${dailyGrowth}%`}
            </p>
          </div>
        </CardWrapper>
        <CardWrapper icon={List}>
          <div>
            <p className="text-sm text-gray-500">إجمالي المعاملات</p>
            <p className="text-xl font-semibold">{data.length}</p>
          </div>
        </CardWrapper>
      </div>

      {chartData.labels && chartData.datasets ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 rounded-lg shadow-md mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">الإيرادات اليومية</h2>
          <Bar data={chartData} options={chartOptions} />
        </motion.div>
      ) : (
        <p className="text-center text-gray-500">لا توجد بيانات متاحة.</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">المعاملات الأخيرة</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="py-3 px-6">التاريخ</th>
                  <th className="py-3 px-6">المبلغ</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 5).map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="py-3 px-6">{new Date(item.created_at).toLocaleDateString("ar-EG")}</td>
                    <td className="py-3 px-6">
                      {parseFloat(item.amount).toLocaleString("ar-EG", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      دينار أردني
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Revenu;
