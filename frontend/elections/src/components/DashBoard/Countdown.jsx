

// Countdown.js
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react'; // Make sure you have this icon package installed

const Countdown = ({ startDate, endDate }) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);
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
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate, endDate]);

  return (
    <div className="bg-gradient-to-r from-white to-gray-600 text-zait p-4 md:p-6 rounded-xl shadow-lg text-center">
      <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">الوقت المتبقي</h2>
      <div className="text-lg md:text-xl font-bold flex items-center justify-center space-x-2 md:space-x-4">
        <Clock size={24} className="ml-2" />
        <span>{countdown}</span>
      </div>
    </div>
  );
};

export default Countdown;
