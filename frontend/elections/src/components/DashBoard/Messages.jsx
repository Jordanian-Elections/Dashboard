

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { AlertCircle } from 'lucide-react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/contact-requests');
        setMessages(response.data);
      } catch (error) {
        setError('حدث خطأ أثناء جلب الرسائل. يرجى المحاولة مرة أخرى.');
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id, isRead) => {
    try {
      const response = await axios.patch(`http://localhost:3001/api/contact-requests/${id}`, { isRead: !isRead });
      if (response.status === 200) {
        setMessages(prevMessages => {
          return prevMessages.map(message => 
            message.id === id ? { ...message, isRead: !isRead } : message
          );
        });
      }
    } catch (error) {
      setError('فشل في تحديث حالة الرسالة. يرجى المحاولة لاحقًا.');
      console.error('Error marking message as read:', error);
    }
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-full h-16 bg-gray-200 animate-pulse rounded"></div>
      ))}
    </div>
  );

  // ترتيب الرسائل بحيث تكون الرسائل التي لم تقرأ أولاً
  const sortedMessages = messages.sort((a, b) => a.isRead - b.isRead);

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-zait text-center"
        >
          الرسائل
        </motion.h1>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span>{error}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-blue-500" />
          </div>
        ) : (
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-right text-gray-500 bg-white rounded-lg overflow-hidden">
              <thead className="text-xl text-zait uppercase bg-gray-400">
                <tr>
                  {['رقم', 'الاسم', 'الهاتف', 'الموضوع', 'الرسالة', 'تاريخ'].map((header) => (
                    <th key={header} className="px-6 py-3">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedMessages.length > 0 ? (
                  sortedMessages.map(message => (
                    <tr 
                      key={message.id}
                      className={`bg-white border-b transition-colors duration-300 ${message.isRead ? 'even:bg-gray-200' : 'even:bg-gray-100'}`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{message.id}</td>
                      <td className="px-6 py-4">{message.contact_name}</td>
                      {/* <td className="px-6 py-4">{message.contact_national_id}</td> */}
                      <td className="px-6 py-4">
                        <a 
                          href={`https://wa.me/${message.phone}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
                        >
                          <FontAwesomeIcon icon={faWhatsapp} className="ml-2 text-green-500" />
                          {message.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4">{message.subject}</td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap" title={message.message}>
                          {message.message}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(message.created_at).toLocaleDateString('ar-SA', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      {/* <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={message.isRead}
                          onChange={() => handleMarkAsRead(message.id, message.isRead)}
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-3 px-6 text-center">لا توجد رسائل حالياً</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
