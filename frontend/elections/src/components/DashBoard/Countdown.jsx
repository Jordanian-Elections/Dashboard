

// // Countdown.js
// import React, { useState, useEffect } from 'react';
// import { Clock } from 'lucide-react'; // Make sure you have this icon package installed

// const Countdown = ({ startDate, endDate }) => {
//   const [countdown, setCountdown] = useState("");

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date();
//       const start = new Date(startDate);
//       const end = new Date(endDate);
//       let timeDiff, message;

//       if (now < start) {
//         timeDiff = start - now;
//         message = "لم تبدأ الانتخابات، المتبقي على بدئها: ";
//       } else if (now >= start && now <= end) {
//         timeDiff = end - now;
//         message = "الوقت المتبقي لانتهاء الانتخابات: ";
//       } else {
//         setCountdown("لقد انتهت الانتخابات");
//         clearInterval(timer);
//         return;
//       }

//       const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

//       setCountdown(`${message} ${days} أيام ${hours} ساعات ${minutes} دقائق ${seconds} ثوانٍ`);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [startDate, endDate]);

//   return (
//     <div className="bg-gradient-to-r from-white to-gray-600 text-zait p-4 md:p-6 rounded-xl shadow-lg text-center">
//       <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">الوقت المتبقي</h2>
//       <div className="text-lg md:text-xl font-bold flex items-center justify-center space-x-2 md:space-x-4">
//         <Clock size={24} className="ml-2" />
//         <span>{countdown}</span>
//       </div>
//     </div>
//   );
// };

// export default Countdown;




import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react'; // Ensure this package is installed

const Countdown = () => {
  const [countdown, setCountdown] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    // Fetch upcoming election data
    const fetchUpcomingElection = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/over/upcoming-election');
        const data = await response.json();
        
        if (response.ok) {
          setStartDate(new Date(data.start_date));
          setEndDate(new Date(data.end_date));
        } else {
          setCountdown("لا توجد انتخابات قادمة");
        }
      } catch (error) {
        console.error('Error fetching upcoming election:', error);
        setCountdown("حدث خطأ أثناء جلب البيانات");
      }
    };

    fetchUpcomingElection();
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const timer = setInterval(() => {
      const now = new Date();
      let timeDiff, message;

      if (now < startDate) {
        timeDiff = startDate - now;
        message = "لم تبدأ الانتخابات، المتبقي على بدئها: ";
      } else if (now >= startDate && now <= endDate) {
        timeDiff = endDate - now;
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

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
        message
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate, endDate]);

  if (typeof countdown === 'string') {
    return (
     
      <div className=" text-zait p-4 md:p-6 rounded-xl  text-center">
        <h2 className="text-xl mb-12 text-zait md:text-4xl font-bold md:mb-12 flex items-center justify-center">
          <Clock size={42} className="mr-2" />
          <span>الوقت المتبقي</span>
        </h2>
        <div className="text-lg md:text-xl font-bold">{countdown}</div>
      </div>
    );
  }

  return (
    <div className=" p-2 md:p-2 rounded-xl  text-center my-16">
     <div className="flex justify-center text-center">

                <Clock size={42} className=" ml-2 text-4xl mb-4" /><h2 className="text-xl mb-4 text-zait md:text-4xl font-bold  md:mb-12  ">الوقت المتبقي</h2>
     </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
        <div className="bg-zait1  p-2 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 ">
          <h3 className="text-lg font-bold text-zait">أيام</h3>
          <p className="text-2xl font-bold">{countdown.days}</p>
        </div>
        <div className="bg-zait1  p-2 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 ">
          <h3 className="text-lg font-bold text-zait">ساعات</h3>
          <p className="text-2xl font-bold">{countdown.hours}</p>
        </div>
        <div className="bg-zait1  p-2 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 ">
          <h3 className="text-lg font-bold text-zait">دقائق</h3>
          <p className="text-2xl font-bold">{countdown.minutes}</p>
        </div>
        <div className="bg-zait1  p-2 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 ">
          <h3 className="text-lg font-bold text-zait">ثوانٍ</h3>
          <p className="text-2xl font-bold">{countdown.seconds}</p>
        </div>
      </div>
    </div>
  );
};

export default Countdown;


// import React, { useState, useEffect } from 'react';
// import { Clock } from 'lucide-react'; // Ensure this package is installed

// const Countdown = () => {
//   const [countdown, setCountdown] = useState("");
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   useEffect(() => {
//     // Fetch upcoming election data
//     const fetchUpcomingElection = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/over/upcoming-election');
//         const data = await response.json();
        
//         if (response.ok) {
//           setStartDate(new Date(data.start_date));
//           setEndDate(new Date(data.end_date));
//         } else {
//           setCountdown("لا توجد انتخابات قادمة");
//         }
//       } catch (error) {
//         console.error('Error fetching upcoming election:', error);
//         setCountdown("حدث خطأ أثناء جلب البيانات");
//       }
//     };

//     fetchUpcomingElection();
//   }, []);

//   useEffect(() => {
//     if (!startDate || !endDate) return;

//     const timer = setInterval(() => {
//       const now = new Date();
//       let timeDiff, message;

//       if (now < startDate) {
//         timeDiff = startDate - now;
//         message = "لم تبدأ الانتخابات، المتبقي على بدئها: ";
//       } else if (now >= startDate && now <= endDate) {
//         timeDiff = endDate - now;
//         message = "الوقت المتبقي لانتهاء الانتخابات: ";
//       } else {
//         setCountdown("لقد انتهت الانتخابات");
//         clearInterval(timer);
//         return;
//       }

//       const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

//       setCountdown({
//         days,
//         hours,
//         minutes,
//         seconds,
//         message
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [startDate, endDate]);

//   if (typeof countdown === 'string') {
//     return (
//       <div className="text-zait p-4 md:p-6 rounded-xl shadow-lg text-center bg-gradient-to-r from-white to-gray-200">
//         <h2 className="text-xl mb-12 text-zait md:text-4xl font-bold md:mb-12 flex items-center justify-center">
//           <Clock size={30} className="mr-2" />
//           <span>الوقت المتبقي</span>
//         </h2>
//         <div className="text-lg md:text-xl font-bold">{countdown}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-6 rounded-xl bg-gradient-to-r from-white to-gray-200 text-center my-16 shadow-lg">
//       <div className="flex justify-center items-center mb-12">
//         <Clock size={42} className="text-4xl text-zait mr-4" />
//         <h2 className="text-xl text-zait md:text-4xl font-bold">الوقت المتبقي</h2>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="bg-zait1 p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
//           <h3 className="text-lg font-bold text-white">أيام</h3>
//           <p className="text-2xl font-bold text-white">{countdown.days}</p>
//         </div>
//         <div className="bg-zait1 p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
//           <h3 className="text-lg font-bold text-white">ساعات</h3>
//           <p className="text-2xl font-bold text-white">{countdown.hours}</p>
//         </div>
//         <div className="bg-zait1 p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
//           <h3 className="text-lg font-bold text-white">دقائق</h3>
//           <p className="text-2xl font-bold text-white">{countdown.minutes}</p>
//         </div>
//         <div className="bg-zait1 p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
//           <h3 className="text-lg font-bold text-white">ثوانٍ</h3>
//           <p className="text-2xl font-bold text-white">{countdown.seconds}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Countdown;
