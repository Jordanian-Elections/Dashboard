

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { PlusCircle, Edit2, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';

const AdList = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState({});
  const [error, setError] = useState('');

  const fetchAds = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/ads');
      setAds(response.data);
      
    } catch (error) {
      console.error('Error fetching ads:', error);
      setError('حدث خطأ أثناء جلب الإعلانات. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  }, []);
  

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const updateAdStatus = async (id, status) => {
    setUpdateLoading(prev => ({ ...prev, [id]: true }));
    try {
      await axios.put(`http://localhost:3001/api/ads/${id}/status`, { status });
      await fetchAds();
      
    } catch (error) {
      console.error('Error updating ad status:', error);
      setError('حدث خطأ أثناء تحديث حالة الإعلان. يرجى المحاولة مرة أخرى.');
    } finally {
      setUpdateLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const ActionButton = ({ onClick, bgColor, hoverColor, icon, text }) => (
    <button
      onClick={onClick}
      className={`${bgColor} text-white px-3 py-1 my-2 rounded mr-2 hover:${hoverColor} transition-colors duration-300 flex items-center text-l w-20`}
    >
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {text}
    </button>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-zait text-center"
        >
          قائمة الإعلانات
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
                  {['الرقم', 'الوصف', 'السعر', 'صورة الإعلان', 'الحالة', 'اسم المرشح', 'الإجراءات'].map((header) => (
                    <th key={header} className="px-6 py-3">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ads.map(ad => (
                  <motion.tr 
                    key={ad.id}
                    className="bg-white border-b  transition-colors duration-300 even:bg-gray-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{ad.id}</td>
                    <td className="px-6 py-4">{ad.description}</td>
                    <td className="px-6 py-4">{ad.price}دينار أردني</td>
                    <td className="px-6 py-4">
                      <img src={ad.image_url} alt="Ad" className="w-32 h-32 object-cover rounded-lg shadow-md" />
                      {/* <img
          src={ad.image_url}
          alt={`Ad for ${ad.candidate_name}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=صورة+غير+متوفرة';
          }}
        /> */}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-l font-semibold
                      ${
                        ad.status === 'approved' ? 'bg-green-200 text-green-800' :
                        ad.status === 'rejected' ? 'bg-red-200 text-red-800' :
                        'bg-yellow-200 text-yellow-800'
                      }`}>
                        {ad.status === 'approved' ? 'تمت الموافقة' :
                         ad.status === 'rejected' ? 'مرفوض' : 'قيد الانتظار'}
                      </span>
                    </td>
                    <td className="px-6 py-4">{ad.candidate_name}</td>
                    <td className="px-6 py-4">
                      {updateLoading[ad.id] ? (
                        <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500" />
                      ) : (
                        <>
                          <ActionButton
                            onClick={() => updateAdStatus(ad.id, 'approved')}
                            bgColor="bg-green-500"
                            hoverColor="bg-green-600"
                            icon={faCheck}
                            text="موافقة"
                          />
                          <ActionButton
                            onClick={() => updateAdStatus(ad.id, 'rejected')}
                            bgColor="bg-red-500"
                            hoverColor="bg-red-600"
                            icon={faTimes}
                            text="رفض"
                          />
                        </>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdList;
