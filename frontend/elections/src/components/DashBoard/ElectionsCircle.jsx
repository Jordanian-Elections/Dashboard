import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Inline AddListForm component
const AddListForm = ({ onClose, onSave }) => {
  const [circleName, setCircleName] = useState('');
  const [listName, setListName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!circleName || !listName) {
      setError('يرجى ملء جميع الحقول');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/lists', {
        circle: circleName,
        list: listName,
        
      });

      if (response.status === 201) {
        onSave();
        onClose();
      } else {
        throw new Error('فشل في إضافة القائمة');
      }
    } catch (error) {
      console.error('Error adding list:', error);
      setError('حدث خطأ أثناء إضافة القائمة. يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">إضافة قائمة جديدة</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="circleName" className="block text-sm font-medium text-gray-700 mb-1">
              اسم الدائرة
            </label>
            <input
              type="text"
              id="circleName"
              value={circleName}
              onChange={(e) => setCircleName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="أدخل اسم الدائرة"
            />
          </div>
          <div>
            <label htmlFor="listName" className="block text-sm font-medium text-gray-700 mb-1">
              اسم القائمة
            </label>
            <input
              type="text"
              id="listName"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="أدخل اسم القائمة"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main ElectionsCircle component
const ElectionsCircle = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/circles-lists-candidates');
      setData(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('فشل في جلب البيانات. يرجى المحاولة لاحقًا.');
    } finally {
      setLoading(false);
    }
  };

  const toggleCandidateStatus = async (candidate_national_id) => {
    try {
      const response = await axios.patch(`http://localhost:3001/api/candidates/toggle-status/${candidate_national_id}`);
      if (response.status === 200) {
        setData(prevData => prevData.map(c => ({
          ...c,
          lists: c.lists.map(l => ({
            ...l,
            candidates: l.candidates.map(candidate => 
              candidate.candidate_national_id === candidate_national_id ? response.data : candidate
            ),
          })),
        })));
      } else {
        throw new Error('رد الخادم يحتوي على خطأ');
      }
    } catch (error) {
      console.error('Error updating candidate status:', error);
      setError('فشل في تحديث حالة المرشح. يرجى المحاولة لاحقًا.');
    }
  };

  const handleSave = () => {
    fetchData();
    setIsFormOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-zait">الدوائر والقوائم والمرشحون</h1>
      
      {loading && <p className="text-zait text-center">جارٍ التحميل...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map(circle => (
          <motion.div
            key={circle.circle}
            className="relative bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zait to-zait opacity-60"></div>
            <div className="relative p-6 text-white">
              <h2 className="text-2xl font-semibold mb-4 text-black">الدائرة: {circle.circle} {circle.city}</h2>
              <div className="flex flex-wrap gap-4 w-full">
  {circle.lists.map(list => (
    <motion.div
      key={list.list}
      className="bg-white bg-opacity-20 rounded-lg p-4 flex-1 min-w-[300px] max-w-[400px] lg:max-w-[300px]"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-medium mb-2">القائمة: {list.list}</h3>
      <div className="space-y-2">
        {list.candidates.map(candidate => (
          <motion.div
            key={candidate.candidate_national_id}
            className="flex items-center justify-between bg-white bg-opacity-15 rounded-full p-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm truncate">{candidate.name}</span>
            <button
              onClick={() => toggleCandidateStatus(candidate.candidate_national_id)}
              className={`ml-2 p-1 rounded-full transition-colors duration-300 ${
                candidate.isActivate
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {candidate.isActivate ? (
                <CheckCircle size={20} />
              ) : (
                <XCircle size={20} />
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  ))}
</div>
</div>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsFormOpen(true)}
      >
        <Plus size={24} />
      </motion.button>

      <AnimatePresence>
        {isFormOpen && (
          <AddListForm
            onClose={() => setIsFormOpen(false)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ElectionsCircle;
