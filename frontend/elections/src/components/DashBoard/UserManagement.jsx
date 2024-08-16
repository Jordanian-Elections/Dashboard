


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaEdit, FaTimes } from 'react-icons/fa';
import { debounce } from 'lodash';
// import debounce from 'lodash.debounce';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [city, setCity] = useState('');
  const [circle, setCircle] = useState('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3001/api/users', {
        params: { search, role, page, pageSize },
      });
      setUsers(response.data.users);
      setTotal(response.data.total);
    } catch (error) {
      setError('خطأ في جلب بيانات المستخدمين. يرجى المحاولة مرة أخرى لاحقًا.');
    } finally {
      setLoading(false);
    }
  }, [search, role, page, pageSize]);

  useEffect(() => {
    const debouncedFetchUsers = debounce(fetchUsers, 300);
    debouncedFetchUsers();
    return () => debouncedFetchUsers.cancel();
  }, [fetchUsers]);

  const handleEdit = (user) => {
    setEditingUser(user);
    setCity(user.city || '');
    setCircle(user.circle || '');
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3001/api/users/${editingUser.id}`, {
        city,
        circle,
      });
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      setError('خطأ في تحديث بيانات المستخدم. يرجى المحاولة مرة أخرى لاحقًا.');
    }
  };

  const handleCloseModal = () => {
    setEditingUser(null);
    setCity('');
    setCircle('');
  };

  return (
    <div className="user-management-page p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-center text-zait"
      >
        إدارة المستخدمين
      </motion.h1>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-100 text-red-700 p-4 mb-4 rounded-lg shadow"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 mb-4 text-center"
        >
          جاري التحميل...
        </motion.div>
      )}

      <div className="filters mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center border rounded-lg bg-white shadow-md w-full md:w-auto"
        >
          <input
            type="text"
            placeholder="ابحث بالاسم"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none p-3 rounded-l-lg focus:outline-none w-full"
            aria-label="البحث بالاسم"
          />
          <FaSearch className="text-gray-500 p-3" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center border rounded-lg bg-white shadow-md w-full md:w-auto"
        >
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border-none p-3 rounded-l-lg focus:outline-none w-full appearance-none"
            aria-label="تصفية حسب الدور"
          >
            <option value="" className=''>كل الأدوار</option>
            <option value="voter">ناخب</option>
            <option value="candidate">مرشح</option>
            {/* <option value="admin">مدير</option> */}
          </select>
          <FaFilter className="text-gray-500 p-3" />
        </motion.div>
      </div>

      <div className="overflow-x-auto">
        <motion.table
          className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead className="bg-gray-400">
            <tr>
              <th className="py-3 pl-20 text-left text-zait">الرقم</th>
              <th className="py-3 pl-20 text-left text-zait">الاسم</th>
              <th className="py-3 pl-32 text-left text-zait">البريد الإلكتروني</th>
              <th className="py-3 pl-20 text-left text-zait">الدور</th>
              <th className="py-3 pl-20 text-left text-zait">المدينة</th>
              <th className="py-3 pl-20 text-left text-zait">الدائرة</th>
              <th className="py-3 pl-20 text-left text-zait">إجراءات</th>
            </tr>
          </thead>
          <tbody className=''>
            {users.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                // whileHover={{ backgroundColor: '#f3f4f6' }}
                className="border-b border-gray-200 last:border-b-0 even:bg-gray-200 "
              >
                <td className="py-3 px-4">{user.id}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4">{user.city}</td>
                <td className="py-3 px-4">{user.circle}</td>
                <td className="py-3 px-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(user)}
                    className="bg-zait hover:bg-gray-600 text-white p-2 rounded-lg flex items-center transition duration-300"
                  >
                    <FaEdit className="mr-2" />
                    تعديل
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>

      <AnimatePresence>
        {editingUser && (
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
                <h2 className="text-xl font-semibold text-zait">تعديل المستخدم</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-red-800"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">المدينة</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-zait"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">الدائرة</label>
                <input
                  type="text"
                  value={circle}
                  onChange={(e) => setCircle(e.target.value)}
                  className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-zait"
                />
              </div>
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="bg-zait hover:bg-zait text-white p-2 rounded-lg mr-2 transition duration-300"
                >
                  حفظ
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCloseModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg transition duration-300"
                >
                  إلغاء
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pagination flex justify-between items-center mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-gray-300 hover:bg-gray-400 p-2 rounded-lg text-gray-700 transition duration-300 disabled:opacity-50"
        >
          السابق
        </motion.button>
        <span className="text-gray-700">
          صفحة {page} من {Math.ceil(total / pageSize)}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            setPage((prev) => (prev * pageSize < total ? prev + 1 : prev))
          }
          disabled={page * pageSize >= total}
          className="bg-gray-300 hover:bg-gray-400 p-2 rounded-lg text-gray-700 transition duration-300 disabled:opacity-50"
        >
          التالي
        </motion.button>
      </div>
    </div>
  );
};

export default UserManagementPage;