
// import React, { useEffect, useState } from 'react';

// const Debate = () => {
//   const [debates, setDebates] = useState([]);
//   const [editingCode, setEditingCode] = useState(null);
//   const [newCode, setNewCode] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:3001/api/debate')
//       .then(response => response.json())
//       .then(data => setDebates(data));
//   }, []);

//   const approveDebate = (id) => {
//     fetch(`http://localhost:3001/api/debate/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ isApproved: true }),
//     }).then(() => {
//       setDebates(debates.map(debate => debate.id === id ? { ...debate, isApproved: true } : debate));
//     });
//   };

//   const rejectDebate = (id) => {
//     fetch(`http://localhost:3001/api/debate/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ isApproved: false }),
//     }).then(() => {
//       setDebates(debates.map(debate => debate.id === id ? { ...debate, isApproved: false } : debate));
//     });
//   };

//   const updateDebateCode = (id) => {
//     fetch(`http://localhost:3001/api/debate/${id}/code`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ code: newCode }),
//     }).then(() => {
//       setDebates(debates.map(debate => debate.id === id ? { ...debate, code: newCode } : debate));
//       setEditingCode(null);
//       setNewCode('');
//     });
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-4xl font-sans" dir="rtl">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">المناظرات</h1>
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {debates.map(debate => (
//           <div key={debate.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
//             <div className="p-4 border-b border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-800">{debate.name}</h2>
//               <p className="text-sm mb-2 text-gray-600">
//                 <span className="font-semibold">الوقت: </span>
//                 {debate.start_time} - {debate.end_time}
//               </p>
//               <p className="text-sm mb-2 text-gray-600">
//                 <span className="font-semibold">المرشح 1: </span>
//                 {debate.candidate1_name}
//               </p>
//               <p className="text-sm mb-2 text-gray-600">
//                 <span className="font-semibold">المرشح 2: </span>
//                 {debate.candidate2_name}
//               </p>
//               <p className="text-sm mb-2 text-gray-600">
//                 <span className="font-semibold">الكود: </span>
//                 {debate.code}
//               </p>
//               <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${debate.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                 {debate.isApproved ? 'تمت الموافقة' : 'قيد الانتظار'}
//               </span>
//             </div>
//             <div className="p-4 bg-gray-50 flex justify-between">
//               {editingCode === debate.id ? (
//                 <div className="flex items-center">
//                   <input
//                     type="text"
//                     value={newCode}
//                     onChange={(e) => setNewCode(e.target.value)}
//                     className="px-3 py-1 border border-gray-300 rounded mr-2"
//                     placeholder="أدخل الكود الجديد"
//                   />
//                   <button
//                     onClick={() => updateDebateCode(debate.id)}
//                     className="px-3 py-1 bg-blue-600 text-white border border-blue-600 rounded hover:bg-blue-700 transition-colors duration-300"
//                   >
//                     حفظ
//                   </button>
//                   <button
//                     onClick={() => setEditingCode(null)}
//                     className="px-3 py-1 bg-gray-600 text-white border border-gray-600 rounded hover:bg-gray-700 transition-colors duration-300 ml-2"
//                   >
//                     إلغاء
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex">
//                   <button
//                     onClick={() => approveDebate(debate.id)}
//                     className="px-3 py-1 bg-white text-green-600 border border-green-600 rounded hover:bg-green-50 transition-colors duration-300 flex items-center mr-2"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
//                     </svg>
//                     موافقة
//                   </button>
//                   <button
//                     onClick={() => rejectDebate(debate.id)}
//                     className="px-3 py-1 bg-white text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors duration-300 flex items-center mr-2"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4L13.2 12.067a4 4 0 00.8-2.4z" />
//                     </svg>
//                     رفض
//                   </button>
//                   <button
//                     onClick={() => setEditingCode(debate.id)}
//                     className="px-3 py-1 bg-yellow-600 text-white border border-yellow-600 rounded hover:bg-yellow-700 transition-colors duration-300"
//                   >
//                     تعديل الكود
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Debate;



// import React, { useEffect, useState } from 'react';

// const Debate = () => {
//   const [debates, setDebates] = useState([]);
//   const [editingCode, setEditingCode] = useState(null);
//   const [newCode, setNewCode] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:3001/api/debate')
//       .then(response => response.json())
//       .then(data => setDebates(data));
//   }, []);

//   const approveDebate = (id) => {
//     fetch(`http://localhost:3001/api/debate/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ isApproved: true }),
//     }).then(() => {
//       setDebates(debates.map(debate => debate.id === id ? { ...debate, isApproved: true } : debate));
//     });
//   };

//   const rejectDebate = (id) => {
//     fetch(`http://localhost:3001/api/debate/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ isApproved: false }),
//     }).then(() => {
//       setDebates(debates.map(debate => debate.id === id ? { ...debate, isApproved: false } : debate));
//     });
//   };

//   const updateDebateCode = (id) => {
//     fetch(`http://localhost:3001/api/debate/${id}/code`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ code: newCode }),
//     }).then(() => {
//       setDebates(debates.map(debate => debate.id === id ? { ...debate, code: newCode } : debate));
//       setEditingCode(null);
//       setNewCode('');
//     });
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-5xl font-sans" dir="rtl">
//       <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">المناظرات</h1>
//       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//         {debates.map(debate => (
//           <div key={debate.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
//             <div className="p-6 border-b border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-900 mb-2">{debate.name}</h2>
//               <p className="text-sm mb-4 text-gray-700">
//                 <span className="font-semibold">الوقت: </span>
//                 {debate.start_time} - {debate.end_time}
//               </p>
//               <p className="text-sm mb-2 text-gray-700">
//                 <span className="font-semibold">المرشح 1: </span>
//                 {debate.candidate1_name}
//               </p>
//               <p className="text-sm mb-2 text-gray-700">
//                 <span className="font-semibold">المرشح 2: </span>
//                 {debate.candidate2_name}
//               </p>
//               <p className="text-sm mb-4 text-gray-700">
//                 <span className="font-semibold">الكود: </span>
//                 {debate.code}
//               </p>
//               <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${debate.isApproved ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
//                 {debate.isApproved ? 'تمت الموافقة' : 'قيد الانتظار'}
//               </span>
//             </div>
//             <div className="p-6 bg-gray-50 flex justify-between items-center">
//               {editingCode === debate.id ? (
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="text"
//                     value={newCode}
//                     onChange={(e) => setNewCode(e.target.value)}
//                     className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="أدخل الكود الجديد"
//                   />
//                   <button
//                     onClick={() => updateDebateCode(debate.id)}
//                     className="px-4 py-2 bg-blue-600 text-white border border-blue-600 rounded-lg shadow-sm hover:bg-blue-700 transition-colors duration-300"
//                   >
//                     حفظ
//                   </button>
//                   <button
//                     onClick={() => setEditingCode(null)}
//                     className="px-4 py-2 bg-gray-600 text-white border border-gray-600 rounded-lg shadow-sm hover:bg-gray-700 transition-colors duration-300"
//                   >
//                     إلغاء
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => approveDebate(debate.id)}
//                     className="px-4 py-2 bg-green-600 text-white border border-green-600 rounded-lg shadow-sm hover:bg-green-700 transition-colors duration-300 flex items-center"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
//                     </svg>
//                     موافقة
//                   </button>
//                   <button
//                     onClick={() => rejectDebate(debate.id)}
//                     className="px-4 py-2 bg-red-600 text-white border border-red-600 rounded-lg shadow-sm hover:bg-red-700 transition-colors duration-300 flex items-center"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4L13.2 12.067a4 4 0 00.8-2.4z" />
//                     </svg>
//                     رفض
//                   </button>
//                   <button
//                     onClick={() => setEditingCode(debate.id)}
//                     className="px-4 py-2 bg-yellow-600 text-white border border-yellow-600 rounded-lg shadow-sm hover:bg-yellow-700 transition-colors duration-300"
//                   >
//                     تعديل الكود
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Debate;


// import React, { useEffect, useState } from 'react';
// import { CheckCircle, XCircle, Edit2, Trash2 } from 'lucide-react';
// import { motion } from 'framer-motion';

// const Debate = () => {
//   const [debates, setDebates] = useState([]);
//   const [editingCode, setEditingCode] = useState(null);
//   const [newCode, setNewCode] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:3001/api/debate')
//       .then(response => response.json())
//       .then(data => setDebates(data));
//   }, []);

//   const approveDebate = (id) => {
//     fetch(`http://localhost:3001/api/debate/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ isApproved: true }),
//     }).then(() => {
//       setDebates(debates.map(debate => debate.id === id ? { ...debate, isApproved: true } : debate));
//     });
//   };

//   const rejectDebate = (id) => {
//     fetch(`http://localhost:3001/api/debate/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ isApproved: false }),
//     }).then(() => {
//       setDebates(debates.map(debate => debate.id === id ? { ...debate, isApproved: false } : debate));
//     });
//   };

//   const updateDebateCode = (id) => {
//     fetch(`http://localhost:3001/api/debate/${id}/code`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ code: newCode }),
//     }).then(() => {
//       setDebates(debates.map(debate => debate.id === id ? { ...debate, code: newCode } : debate));
//       setEditingCode(null);
//       setNewCode('');
//     });
//   };
//   const DebateTime = ({ startTime, endTime }) => {
//     return (
//         <div className="flex justify-between items-center p-4 border border-gray-300 rounded-lg bg-gray-100 max-w-sm mx-auto">
//             <span className="font-bold text-blue-700">Start: {startTime}</span>
//             <span className="text-red-600">End: {endTime}</span>
//         </div>
//     );
// };

//   return (
//     <div className="bg-gray-50 min-h-screen p-4 md:p-8">
//       <div className="max-w-6xl mx-auto">
//         <motion.h1 
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-4xl font-bold mb-8 text-zait text-center"
//         >
//           المناظرات
//         </motion.h1>

//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {debates.map(debate => (
//             <motion.div 
//               key={debate.id} 
//               className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="p-6 border-b border-gray-200">
//                 <h2 className="text-xl font-semibold text-gray-900 mb-2">{debate.name}</h2>
//                 <p className="text-sm mb-4 text-gray-700">
//                   <span className="font-semibold">الوقت: </span>
//                   {debate.start_time} - {debate.end_time}
//                 </p>
//                 <div className="min-h-screen flex items-center justify-center bg-gray-200">
//             <DebateTime startTime={debate.start_time} endTime={debate.end_time} />
//         </div>
//                 <p className="text-sm mb-2 text-gray-700">
//                   <span className="font-semibold">المرشح 1: </span>
//                   {debate.candidate1_name}
//                 </p>
//                 <p className="text-sm mb-2 text-gray-700">
//                   <span className="font-semibold">المرشح 2: </span>
//                   {debate.candidate2_name}
//                 </p>
//                 <p className="text-sm mb-4 text-gray-700">
//                   <span className="font-semibold">الكود: </span>
//                   {debate.code}
//                 </p>
//                 <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${debate.isApproved ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
//                   {debate.isApproved ? 'تمت الموافقة' : 'قيد الانتظار'}
//                 </span>
//               </div>
//               <div className="p-6 bg-gray-50 flex justify-between items-center">
//                 {editingCode === debate.id ? (
//                   <div className="flex items-center space-x-2">
//                     <input
//                       type="text"
//                       value={newCode}
//                       onChange={(e) => setNewCode(e.target.value)}
//                       className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zait"
//                       placeholder="أدخل الكود الجديد"
//                     />
//                     <motion.button
//                       onClick={() => updateDebateCode(debate.id)}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-zait text-white p-2 rounded-md hover:bg-gray-600 transition duration-300 flex items-center justify-center"
//                     >
//                       <CheckCircle size={16} />
//                       حفظ
//                     </motion.button>
//                     <motion.button
//                       onClick={() => setEditingCode(null)}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition duration-300 flex items-center justify-center"
//                     >
//                       <XCircle size={16} />
//                       إلغاء
//                     </motion.button>
//                   </div>
//                 ) : (
//                   <div className="flex space-x-2">
//                     <motion.button 
//                       onClick={() => approveDebate(debate.id)}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center"
//                     >
//                       <CheckCircle size={16} />
//                       الموافقة
//                     </motion.button>
//                     <motion.button 
//                       onClick={() => rejectDebate(debate.id)}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center"
//                     >
//                       <Trash2 size={16} />
//                       رفض
//                     </motion.button>
//                     <motion.button 
//                       onClick={() => setEditingCode(debate.id)}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 transition duration-300 flex items-center justify-center"
//                     >
//                       <Edit2 size={16} />
//                       تعديل الكود
//                     </motion.button>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Debate;


import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const DebateTime = ({ startTime, endTime }) => {
  return (
    <div className="flex justify-between items-center p-4 border border-gray-300 rounded-lg bg-gray-100">
      <span className="font-bold text-blue-700">البدء: {startTime}</span>
      <span className="text-red-600">الانتهاء: {endTime}</span>
    </div>
  );
};

const Debate = () => {
  const [debates, setDebates] = useState([]);
  const [editingCode, setEditingCode] = useState(null);
  const [newCode, setNewCode] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/debate')
      .then(response => response.json())
      .then(data => setDebates(data));
  }, []);

  const approveDebate = (id) => {
    fetch(`http://localhost:3001/api/debate/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isApproved: true }),
    }).then(() => {
      setDebates(debates.map(debate => debate.id === id ? { ...debate, isApproved: true } : debate));
    });
  };

  const rejectDebate = (id) => {
    fetch(`http://localhost:3001/api/debate/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isApproved: false }),
    }).then(() => {
      setDebates(debates.map(debate => debate.id === id ? { ...debate, isApproved: false } : debate));
    });
  };

  const updateDebateCode = (id) => {
    fetch(`http://localhost:3001/api/debate/${id}/code`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: newCode }),
    }).then(() => {
      setDebates(debates.map(debate => debate.id === id ? { ...debate, code: newCode } : debate));
      setEditingCode(null);
      setNewCode('');
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center text-zait"
        >
          المناظرات
        </motion.h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {debates.map(debate => (
            <motion.div 
              key={debate.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{debate.name}</h2>
                <DebateTime startTime={debate.start_time} endTime={debate.end_time} />
                <p className="text-sm mb-2 text-gray-700">
                  <span className="font-semibold">المرشح 1: </span>
                  {debate.candidate1_name}
                </p>
                <p className="text-sm mb-2 text-gray-700">
                  <span className="font-semibold">المرشح 2: </span>
                  {debate.candidate2_name}
                </p>
                <p className="text-sm mb-4 text-gray-700">
                  <span className="font-semibold">الكود: </span>
                  {debate.code}
                </p>
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${debate.isApproved ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                  {debate.isApproved ? 'تمت الموافقة' : 'قيد الانتظار'}
                </span>
              </div>
              <div className="p-6 bg-gray-50 flex justify-between items-center">
                {editingCode === debate.id ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newCode}
                      onChange={(e) => setNewCode(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zait"
                      placeholder="أدخل الكود الجديد"
                    />
                    <motion.button
                      onClick={() => updateDebateCode(debate.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-zait text-white p-2 rounded-md hover:bg-gray-600 transition duration-300 flex items-center justify-center"
                    >
                      <CheckCircle size={16} />
                      حفظ
                    </motion.button>
                    <motion.button
                      onClick={() => setEditingCode(null)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition duration-300 flex items-center justify-center"
                    >
                      <XCircle size={16} />
                      إلغاء
                    </motion.button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <motion.button 
                      onClick={() => approveDebate(debate.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center"
                    >
                      <CheckCircle size={16} />
                      الموافقة
                    </motion.button>
                    <motion.button 
                      onClick={() => rejectDebate(debate.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center"
                    >
                      <Trash2 size={16} />
                      رفض
                    </motion.button>
                    <motion.button 
                      onClick={() => setEditingCode(debate.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 transition duration-300 flex items-center justify-center"
                    >
                      <Edit2 size={16} />
                      تعديل الكود
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Debate;
