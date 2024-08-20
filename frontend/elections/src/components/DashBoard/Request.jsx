

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react';

const Request = () => {
  const [localRequests, setLocalRequests] = useState([]);
  const [partyRequests, setPartyRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/requests');
      if (response.data) {
        setLocalRequests(response.data.localRequests || []);
        setPartyRequests(response.data.partyRequests || []);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      setMessage('حدث خطأ أثناء جلب الطلبات');
    }
  };

  const handleApprove = async (type, id) => {
    try {
      await axios.post(`http://localhost:3001/api/requests/approve/${type}/${id}`);
      setMessage('تمت الموافقة على الطلب بنجاح');
      fetchRequests();
    } catch (error) {
      console.error('Error approving request:', error);
      setMessage('حدث خطأ أثناء الموافقة على الطلب');
    }
  };

  const handleReject = async (type, id) => {
    try {
      await axios.post(`http://localhost:3001/api/requests/reject/${type}/${id}`);
      setMessage('تم رفض الطلب بنجاح');
      fetchRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
      setMessage('حدث خطأ أثناء رفض الطلب');
    }
  };

  const toggleCardExpansion = (id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderRequestCard = (request, type) => (
    <motion.div
      key={request.id}
      className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-6 rtl transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-indigo-700">رقم الطلب: {request.id}</h3>
        <button
          onClick={() => toggleCardExpansion(request.id)}
          className="text-gray-500 hover:text-indigo-700 transition-colors duration-300"
        >
          {expandedCards[request.id] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>
      <p className="text-gray-700 mb-2 text-lg">رقم الهوية الوطنية: {request.national_id}</p>
      {type === 'local' ? (
        <p className="text-gray-700 mb-2 text-lg">اسم القائمة المحلية: {request.local_list_name}</p>
      ) : (
        <p className="text-gray-700 mb-2 text-lg">اسم قائمة الحزب: {request.party_list_name}</p>
      )}
      {expandedCards[request.id] && type === 'local' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <h4 className="font-semibold text-lg mb-2">الأعضاء:</h4>
          <ul className="list-disc list-inside">
            {request.members && request.members.map((member, index) => (
              <li key={index} className="text-gray-700">{member}</li>
            ))}
          </ul>
        </motion.div>
      )}
      <div className="flex space-x-4 mt-6 rtl">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 text-white py-2 px-6 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-green-600"
          onClick={() => handleApprove(type, request.id)}
        >
          <Check size={20} className="mr-2" />
          موافقة
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 text-white py-2 px-6 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-red-600"
          onClick={() => handleReject(type, request.id)}
        >
          <X size={20} className="mr-2" />
          رفض
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto p-8 rtl bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center text-zait">لوحة تحكم طلبات الانتخابات</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zait">طلبات الانتخابات المحلية</h2>
          {localRequests.length === 0 ? (
            <p className="text-gray-700 text-lg">لا توجد طلبات محلية متاحة</p>
          ) : (
            localRequests.map(request => renderRequestCard(request, 'local'))
          )}
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zait">طلبات انتخابات الحزب</h2>
          {partyRequests.length === 0 ? (
            <p className="text-gray-700 text-lg">لا توجد طلبات حزبية متاحة</p>
          ) : (
            partyRequests.map(request => renderRequestCard(request, 'party'))
          )}
        </div>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 p-4 bg-zait1 border border-zait rounded-md rtl"
        >
          <p className="text-zait text-lg">{message}</p>
        </motion.div>
      )}
    </div>
  );
};

export default Request;