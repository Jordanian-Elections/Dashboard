

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { FaSearch, FaFilter, FaEdit, FaTrashAlt } from 'react-icons/fa';

// const UserManagementPage = () => {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState('');
//   const [role, setRole] = useState('');
//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(10);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       fetchUsers();
//     }, 300);

//     return () => clearTimeout(delayDebounceFn);
//   }, [search, role, page]);

//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('http://localhost:3001/api/users', {
//         params: { search, role, page, pageSize },
//       });
//       setUsers(response.data.users);
//       setTotal(response.data.total);
//     } catch (error) {
//       setError('Error fetching users. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="user-management-page p-6">
//       <h1 className="text-2xl font-semibold mb-4 text-center">إدارة المستخدمين</h1>

//       {error && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="bg-red-100 text-red-700 p-4 mb-4 rounded"
//         >
//           {error}
//         </motion.div>
//       )}
//       {loading && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-gray-500 mb-4 text-center"
//         >
//           Loading...
//         </motion.div>
//       )}

//       <div className="filters mb-4 flex items-center justify-between">
//         <div className="flex items-center border rounded-lg">
//           <input
//             type="text"
//             placeholder="ابحث بالاسم"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border-none p-2 rounded-l-lg focus:outline-none"
//             aria-label="Search by name"
//           />
//           <FaSearch className="text-gray-500 p-2" />
//         </div>
//         <div className="flex items-center border rounded-lg">
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="border-none p-2 rounded-l-lg focus:outline-none"
//             aria-label="Filter by role"
//           >
//             <option value="">كل الأدوار</option>
//             <option value="voter">ناخب</option>
//             <option value="candidate">مرشح</option>
//             <option value="admin">مدير</option>
//           </select>
//           <FaFilter className="text-gray-500 p-2" />
//         </div>
//         <button
//           onClick={() => setPage(1)}
//           className="bg-blue-500 text-white p-2 rounded-lg flex items-center"
//         >
//           <FaFilter className="mr-2" />
//           تصفية
//         </button>
//       </div>

//       <motion.table
//       className="w-full border border-gray-200 mb-4 rounded-lg even:bg-red-500"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <thead className="bg-gray-100">
//         <tr>
//           <th className="py-2 px-4 border-b">الرقم</th>
//           <th className="py-2 px-4 border-b">الاسم</th>
//           <th className="py-2 px-4 border-b">البريد الإلكتروني</th>
//           <th className="py-2 px-4 border-b">الدور</th>
//           {/* Removed "الإجراءات" header */}
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user, index) => (
//           <motion.tr
//             key={user.id}
//             whileHover={{ scale: 1.02 }}
//             transition={{ duration: 0.2 }}
//             className={` ${index % 2 === 1 ? 'bg-red-500' : ''}`}
//           >
//             <td className="py-2 px-4 border-b">{user.id}</td>
//             <td className="py-2 px-4 border-b">{user.name}</td>
//             <td className="py-2 px-4 border-b">{user.email}</td>
//             <td className="py-2 px-4 border-b">{user.role}</td>
//             {/* Removed actions cells */}
//           </motion.tr>
//         ))}
//       </tbody>
//     </motion.table>

//       <div className="pagination flex justify-between items-center mt-4 ">
//         <button
//           onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//           disabled={page === 1}
//           className="bg-gray-300 p-2 rounded-lg text-gray-700"
//         >
//           السابق
//         </button>
//         <span className="text-gray-700">
//           صفحة {page} من {Math.ceil(total / pageSize)}
//         </span>
//         <button
//           onClick={() =>
//             setPage((prev) => (total > prev * pageSize ? prev + 1 : prev))
//           }
//           disabled={page * pageSize >= total}
//           className="bg-gray-300 p-2 rounded-lg text-gray-700"
//         >
//           التالي
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserManagementPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaEdit, FaTrashAlt } from 'react-icons/fa';

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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, role, page]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3001/api/users', {
        params: { search, role, page, pageSize },
      });
      setUsers(response.data.users);
      setTotal(response.data.total);
    } catch (error) {
      setError('Error fetching users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setCity(user.city);
    setCircle(user.circle);
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
      setError('Error updating user. Please try again later.');
    }
  };

  return (
    <div className="user-management-page p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">إدارة المستخدمين</h1>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-red-100 text-red-700 p-4 mb-4 rounded"
        >
          {error}
        </motion.div>
      )}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-500 mb-4 text-center"
        >
          Loading...
        </motion.div>
      )}

      <div className="filters mb-4 flex items-center justify-between">
        <div className="flex items-center border rounded-lg">
          <input
            type="text"
            placeholder="ابحث بالاسم"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none p-2 rounded-l-lg focus:outline-none"
            aria-label="Search by name"
          />
          <FaSearch className="text-gray-500 p-2" />
        </div>
        <div className="flex items-center border rounded-lg">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border-none p-2 rounded-l-lg focus:outline-none"
            aria-label="Filter by role"
          >
            <option value="">كل الأدوار</option>
            <option value="voter">ناخب</option>
            <option value="candidate">مرشح</option>
            <option value="admin">مدير</option>
          </select>
          <FaFilter className="text-gray-500 p-2" />
        </div>
        <button
          onClick={() => setPage(1)}
          className="bg-blue-500 text-white p-2 rounded-lg flex items-center"
        >
          <FaFilter className="mr-2" />
          تصفية
        </button>
      </div>

      <motion.table
        className="w-full border border-gray-200 mb-4 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">الرقم</th>
            <th className="py-2 px-4 border-b">الاسم</th>
            <th className="py-2 px-4 border-b">البريد الإلكتروني</th>
            <th className="py-2 px-4 border-b">الدور</th>
            <th className="py-2 px-4 border-b">المدينة</th>
            <th className="py-2 px-4 border-b">المنطقة</th>
            <th className="py-2 px-4 border-b">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <motion.tr
              key={user.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={` ${index % 2 === 1 ? 'bg-gray-100' : ''}`}
            >
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">{user.city}</td>
              <td className="py-2 px-4 border-b">{user.circle}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white p-2 rounded-lg flex items-center"
                >
                  <FaEdit className="mr-2" />
                  تعديل
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>

      {editingUser && (
        <div className="edit-modal fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">تعديل المستخدم</h2>
            <div className="mb-4">
              <label className="block mb-1">المدينة</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">المنطقة</label>
              <input
                type="text"
                value={circle}
                onChange={(e) => setCircle(e.target.value)}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white p-2 rounded-lg mr-2"
              >
                حفظ
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-500 text-white p-2 rounded-lg"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pagination flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-gray-300 p-2 rounded-lg text-gray-700"
        >
          السابق
        </button>
        <span className="text-gray-700">
          صفحة {page} من {Math.ceil(total / pageSize)}
        </span>
        <button
          onClick={() =>
            setPage((prev) => (total > prev * pageSize ? prev + 1 : prev))
          }
          disabled={page * pageSize >= total}
          className="bg-gray-300 p-2 rounded-lg text-gray-700"
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default UserManagementPage;
