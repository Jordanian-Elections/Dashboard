

import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Edit2, Trash2, Clock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DebateTime = ({ startTime, endTime }) => {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Clock className="h-4 w-4 text-blue-500" />
        <span className="font-medium text-blue-700">البدء: {startTime}</span>
      </div>
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Clock className="h-4 w-4 text-red-500" />
        <span className="font-medium text-red-600">الانتهاء: {endTime}</span>
      </div>
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isApproved: true }),
    }).then(() => {
      setDebates(debates.map(debate => debate.id === id ? { ...debate, isApproved: true } : debate));
    });
  };

  const rejectDebate = (id) => {
    fetch(`http://localhost:3001/api/debate/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isApproved: false }),
    }).then(() => {
      setDebates(debates.map(debate => debate.id === id ? { ...debate, isApproved: false } : debate));
    });
  };

  const updateDebateCode = (id) => {
    fetch(`http://localhost:3001/api/debate/${id}/code`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: newCode }),
    }).then(() => {
      setDebates(debates.map(debate => debate.id === id ? { ...debate, code: newCode } : debate));
      setEditingCode(null);
      setNewCode('');
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-zait"
        >
          المناظرات
        </motion.h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {debates.map(debate => (
              <motion.div 
                key={debate.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">{debate.name}</h2>
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    debate.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {debate.isApproved ? 'تمت الموافقة' : 'قيد الانتظار'}
                  </span>
                </div>
                <div className="px-6 pb-6 space-y-4">
                  <DebateTime startTime={debate.start_time} endTime={debate.end_time} />
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <User className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">المرشح 1: </span>
                        {debate.candidate1_name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <User className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">المرشح 2: </span>
                        {debate.candidate2_name}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">الكود: </span>
                      {debate.code}
                    </p>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                  {editingCode === debate.id ? (
                    <div className="flex items-center space-x-2 rtl:space-x-reverse w-full">
                      <input
                        type="text"
                        value={newCode}
                        onChange={(e) => setNewCode(e.target.value)}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="أدخل الكود "
                      />
                      <button 
                        onClick={() => updateDebateCode(debate.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
                      >
                        <CheckCircle className="h-3 w-4 m-2" />
                        
                      </button>
                      <button 
                        onClick={() => setEditingCode(null)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300 flex items-center"
                      >
                        <XCircle className="h-3 w-4 m-2 text-xl" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <button 
                        onClick={() => approveDebate(debate.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 flex items-center"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        الموافقة
                      </button>
                      <button 
                        onClick={() => rejectDebate(debate.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        رفض
                      </button>
                      <button 
                        onClick={() => setEditingCode(debate.id)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300 flex items-center"
                      >
                        <Edit2 className="h-4 w-4 mr-2" />
                        أضف الكود
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Debate;

