import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import Filter from './Filter';
import { FaEdit as IconEdit, FaTimes as IconClose } from 'react-icons/fa';
import { debounce } from 'lodash';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(7);
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
      await axios.put(`http://localhost:3001/api/users/${editingUser.national_id}`, {
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
        <SearchBar search={search} onSearchChange={setSearch} />
        <Filter role={role} onRoleChange={setRole} />
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
              <th className="py-3 pl-20 text-left text-zait">الرقم القومي</th>
              <th className="py-3 pl-20 text-left text-zait">الاسم</th>
              <th className="py-3 pl-32 text-left text-zait">البريد الإلكتروني</th>
              <th className="py-3 pl-20 text-left text-zait">الدور</th>
              <th className="py-3 pl-20 text-left text-zait">المدينة</th>
              <th className="py-3 pl-20 text-left text-zait">الدائرة</th>
              <th className="py-3 pl-20 text-left text-zait">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <motion.tr
                key={user.national_id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-200 last:border-b-0 even:bg-gray-200"
              >
                <td className="py-3 px-4">{user.national_id}</td>
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
                    تعديل<IconEdit />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>

      <Pagination page={page} total={total} pageSize={pageSize} onPageChange={setPage} />

      {editingUser && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-zait">تعديل بيانات المستخدم</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <IconClose />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">المدينة</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border rounded-lg p-2 w-full"
                placeholder="أدخل المدينة"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">الدائرة</label>
              <input
                type="text"
                value={circle}
                onChange={(e) => setCircle(e.target.value)}
                className="border rounded-lg p-2 w-full"
                placeholder="أدخل الدائرة"
              />
            </div>
            <button
              onClick={handleSave}
              className="bg-zait text-white p-2 rounded-lg hover:bg-gray-600 transition duration-300 w-full"
            >
              حفظ
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
