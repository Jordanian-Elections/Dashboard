// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Countdown = () => {
//   const [electionTime, setElectionTime] = useState(null);

//   useEffect(() => {
//     const fetchElectionTime = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/time/election-times');
//         if (response.data.length > 0) {
//           setElectionTime(response.data[0]); // Assuming there's only one election time record
//         }
//       } catch (error) {
//         console.error('Error fetching election time:', error);
//       }
//     };

//     fetchElectionTime();
//   }, []);

//   const calculateTimeLeft = () => {
//     if (!electionTime) return {};

//     const now = new Date();
//     const endDate = new Date(electionTime.end_date);
//     const timeLeft = endDate - now;

//     if (timeLeft <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

//     const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

//     return { days, hours, minutes, seconds };
//   };

//   const { days, hours, minutes, seconds } = calculateTimeLeft();

//   return (
//     <div className="p-6 text-center">
//       <h2 className="text-3xl font-bold mb-4">Election Countdown</h2>
//       {electionTime ? (
//         <div>
//           <p className="text-lg">Time Remaining:</p>
//           <p className="text-2xl font-semibold">
//             {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
//           </p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Countdown;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Countdown = () => {
  const [election, setElection] = useState(null);
  const [countdown1, setCountdown1] = useState('');

  useEffect(() => {
    fetchCurrentElection();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchCurrentElection = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/time//current-election');
      setElection(response.data);
    } catch (err) {
      console.error('Failed to fetch current election', err);
    }
  };

  const updateCountdown = () => {
    if (!election) return;

    const now = new Date().getTime();
    const start = new Date(election.start_date).getTime();
    const end = new Date(election.end_date).getTime();

    let distance;
    let countdownText = '';

    if (now < start) {
      distance = start - now;
      countdownText = 'تبدأ الانتخابات خلال: ';
    } else if (now < end) {
      distance = end - now;
      countdownText = 'تنتهي الانتخابات خلال: ';
    } else {
      setCountdown1('انتهت الانتخابات');
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setCountdown1(`${countdownText}${days}ي ${hours}س ${minutes}د ${seconds}ث`);
  };

  if (!election) return null;

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-center">{election.title}</h2>
      <p className="text-xl text-center font-semibold">{countdown1}</p>
      <div className="mt-4 text-center">
        <p>تاريخ البدء: {new Date(election.start_date).toLocaleString('ar-SA')}</p>
        <p>تاريخ الانتهاء: {new Date(election.end_date).toLocaleString('ar-SA')}</p>
      </div>
    </div>
  );
};

export default Countdown;