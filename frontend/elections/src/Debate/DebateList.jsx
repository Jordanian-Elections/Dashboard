import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const DebatesList = () => {
  const [debates, setDebates] = useState([]);

  useEffect(() => {
    const fetchDebates = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/debates");
        setDebates(response.data);
      } catch (error) {
        console.error("Error fetching debates:", error);
      }
    };

    fetchDebates();
  }, []);

  const isDebateActive = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    return now >= start && now <= end;
  };

  const isDebateEnded = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    return now > end;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleJoinClick = (debate) => {
    if (isDebateActive(debate.start_time, debate.end_time)) {
      window.location.href = `http://localhost:5173/Debate-Room/${debate.code}?type=group-call`;
    } else if (isDebateEnded(debate.end_time)) {
      alert("This debate has ended");
    } else {
      alert("This debate has not started yet");
    }
  };

  return (
    <>
      <Header />
      <div className="w-full md:w-2/3 mx-auto mt-10 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-right text-[#274C77]">
          قائمة المناظرات
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {debates.map((debate) => (
            <div
              key={debate.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-right text-[#274C77] mb-2">
                {debate.name}
              </h3>
              <p className="text-right mb-1">
                <strong>المرشح الأول:</strong> {debate.candidate1_name}
              </p>
              <p className="text-right mb-1">
                <strong>المرشح الثاني:</strong> {debate.candidate2_name}
              </p>
              <p className="text-right mb-1">
                <strong>وقت البداية:</strong> {formatDate(debate.start_time)}
              </p>
              <p className="text-right mb-4">
                <strong>وقت النهاية:</strong> {formatDate(debate.end_time)}
              </p>
              <button
                onClick={() => handleJoinClick(debate)}
                className={`w-full py-2 px-4 rounded font-bold text-white transition duration-300 ${
                  isDebateActive(debate.start_time, debate.end_time)
                    ? "bg-[#274C77] hover:bg-[#1E385A]"
                    : isDebateEnded(debate.end_time)
                    ? "bg-[#5E385A] cursor-not-allowed"
                    : "bg-[#6C757D] cursor-not-allowed"
                }`}
                disabled={!isDebateActive(debate.start_time, debate.end_time)}
              >
                {isDebateActive(debate.start_time, debate.end_time)
                  ? "انضم للمناظرة"
                  : isDebateEnded(debate.end_time)
                  ? "انتهت المناظرة"
                  : "لم تبدأ المناظرة بعد"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DebatesList;