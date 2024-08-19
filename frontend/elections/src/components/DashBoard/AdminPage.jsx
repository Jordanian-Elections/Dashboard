
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Edit2, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertDescription } from './Alert';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserDetails, setEditUserDetails] = useState({ name: '', email: '', password: '' });
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdmins();
    checkAdminRole();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/admins');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('خطأ في جلب البيانات:', error);
      setError('حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى.');
      setLoading(false);
    }
  };

  const checkAdminRole = () => {
    const role = sessionStorage.getItem('role');
    setIsSuperAdmin(role === 'super');
  };

  const handleAddAdmin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/admin/admins', newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '', password: '' });
      setError('');
    } catch (error) {
      console.error('خطأ في إضافة المدير:', error);
      setError('حدث خطأ أثناء إضافة المدير. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUserDetails({ ...editUserDetails, [name]: value });
  };

  const handleUpdateAdmin = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/api/admin/admins/${editingUserId}`, editUserDetails);
      setUsers(users.map(user => (user.id === editingUserId ? response.data : user)));
      setEditingUserId(null);
      setError('');
    } catch (error) {
      console.error('خطأ في تحديث المدير:', error);
      setError('حدث خطأ أثناء تحديث المدير. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await axios.post(`http://localhost:3001/api/admin/admins/${id}/deactivate`);
      setUsers(users.map(user => (user.id === id ? { ...user, is_active: false } : user)));
      setError('');
    } catch (error) {
      console.error('خطأ في تعطيل المدير:', error);
      setError('حدث خطأ أثناء تعطيل المدير. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleActivateAdmin = async (id) => {
    try {
      await axios.post(`http://localhost:3001/api/admin/admins/${id}/activate`);
      setUsers(users.map(user => (user.id === id ? { ...user, is_active: true } : user)));
      setError('');
    } catch (error) {
      console.error('خطأ في تفعيل المدير:', error);
      setError('حدث خطأ أثناء تفعيل المدير. يرجى المحاولة مرة أخرى.');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zait"></div>
    </div>
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
          لوحة تحكم المدير
        </motion.h1>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {isSuperAdmin && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">إضافة مدير جديد</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="الاسم"
                value={newUser.name}
                onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-zait focus:outline-none transition duration-300"
              />
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={newUser.email}
                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-zait focus:outline-none transition duration-300"
              />
              <input
                type="password"
                placeholder="كلمة المرور"
                value={newUser.password}
                onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-zait focus:outline-none transition duration-300"
              />
              <motion.button 
                onClick={handleAddAdmin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-zait text-white p-2 rounded-md hover:bg-gray-600 transition duration-300 flex items-center justify-center"
              >
                <PlusCircle className="mr-2" size={20} />
                إضافة مدير
              </motion.button>
            </div>
          </motion.section>
        )}

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <h2 className="text-2xl font-semibold p-6 border-b text-gray-700">قائمة المديرين</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-zait">
                <tr>
                  <th className="py-3 px-4 text-right">الرقم</th>
                  <th className="py-3 px-4 text-right">الاسم</th>
                  <th className="py-3 px-4 text-right">البريد الإلكتروني</th>
                  <th className="py-3 px-4 text-right">الحالة</th>
                  {/* <th className="py-3 px-4 text-right">الإجراءات</th> */}
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <motion.tr 
                    key={user.id} 
                    className={`${user.is_active ? 'bg-white' : 'bg-gray-100'}  transition duration-300 odd:bg-gray-200`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="py-3 px-4 border-b">{user.id}</td>
                    <td className="py-3 px-4 border-b">
                      {editingUserId === user.id ? (
                        <input
                          type="text"
                          name="name"
                          value={editUserDetails.name}
                          onChange={handleEditInputChange}
                          className="w-full p-1 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {editingUserId === user.id ? (
                        <input
                          type="email"
                          name="email"
                          value={editUserDetails.email}
                          onChange={handleEditInputChange}
                          className="w-full p-1 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {user.is_active ? 'نشط' : 'غير نشط'}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b">
                      {editingUserId === user.id ? (
                        <div className="flex space-x-2">
                          <input
                            type="password"
                            name="password"
                            value={editUserDetails.password}
                            onChange={handleEditInputChange}
                            className="flex-1 p-1 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                            placeholder="كلمة المرور الجديدة (اتركها فارغة للاحتفاظ بالحالية)"
                          />
                          <motion.button 
                            onClick={handleUpdateAdmin}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center"
                          >
                            <CheckCircle size={16} />
                          </motion.button>
                          <motion.button 
                            onClick={() => setEditingUserId(null)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition duration-300 flex items-center justify-center"
                          >
                            <XCircle size={16} />
                          </motion.button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          {isSuperAdmin && (
                            <>
                              {user.is_active ? (
                                <motion.button 
                                  onClick={() => handleDeleteAdmin(user.id)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center"
                                >
                                  <Trash2 size={16} />
                                </motion.button>
                              ) : (
                                <motion.button 
                                  onClick={() => handleActivateAdmin(user.id)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center"
                                >
                                  <CheckCircle size={16} />
                                </motion.button>
                              )}
                              <motion.button 
                                onClick={() => {
                                  setEditingUserId(user.id);
                                  setEditUserDetails({ name: user.name, email: user.email, password: '' });
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-400 transition duration-300 flex items-center justify-center"
                              >
                                <Edit2 size={16} />
                              </motion.button>
                            </>
                          )}
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AdminPage;