import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPlus, FaTimes } from 'react-icons/fa';

const AddListForm = ({ onClose, onSave }) => {
  const [circle, setCircle] = useState('');
  const [list, setList] = useState('');
  const [candidates, setCandidates] = useState(['']);

  const handleCandidateChange = (index, value) => {
    const newCandidates = [...candidates];
    newCandidates[index] = value;
    setCandidates(newCandidates);
  };

  const addCandidateField = () => {
    setCandidates([...candidates, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/circles/add-list', {
        circle,
        list,
        candidates,
      });
      onSave();
      onClose();
    } catch (error) {
      console.error('Error adding list and candidates:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white p-6 rounded-lg w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-zait">إضافة قائمة ومرشحين</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-800 text-lg"
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">الدائرة</label>
            <input
              type="text"
              value={circle}
              onChange={(e) => setCircle(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">القائمة</label>
            <input
              type="text"
              value={list}
              onChange={(e) => setList(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">المرشحون</label>
            {candidates.map((candidate, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={candidate}
                  onChange={(e) => handleCandidateChange(index, e.target.value)}
                  className="border border-gray-300 p-2 rounded flex-1"
                  required
                />
                <button
                  type="button"
                  onClick={addCandidateField}
                  className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
                >
                  <FaPlus />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-zait hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              حفظ
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddListForm;