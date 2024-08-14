// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ElectionsCircle = () => {
//   const [circles, setCircles] = useState([]);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [boundaries, setBoundaries] = useState('');
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     fetchCircles();
//   }, []);

//   const fetchCircles = async () => {
//     try {
//       const response = await axios.get('http://localhost:3001/api/circles');
//       setCircles(response.data);
//     } catch (error) {
//       console.error('Error fetching circles', error);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       if (editingId) {
//         await axios.put(`http://localhost:3001/api/circles/${editingId}`, { name, description, boundaries });
//       } else {
//         await axios.post('http://localhost:3001/api/circles', { name, description, boundaries });
//       }
//       setName('');
//       setDescription('');
//       setBoundaries('');
//       setEditingId(null);
//       fetchCircles();
//     } catch (error) {
//       console.error('Error saving circle', error);
//     }
//   };

//   const handleEdit = (circle) => {
//     setName(circle.name);
//     setDescription(circle.description);
//     setBoundaries(circle.boundaries);
//     setEditingId(circle.id);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3001/api/circles/${id}`);
//       fetchCircles();
//     } catch (error) {
//       console.error('Error deleting circle', error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Election Circle Management</h1>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Circle Name"
//         className="border p-2 mb-2 w-full"
//       />
//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Circle Description"
//         className="border p-2 mb-2 w-full"
//       />
//       <input
//         type="text"
//         value={boundaries}
//         onChange={(e) => setBoundaries(e.target.value)}
//         placeholder="Circle Boundaries"
//         className="border p-2 mb-2 w-full"
//       />
//       <button
//         onClick={handleSave}
//         className="bg-blue-500 text-white p-2 rounded"
//       >
//         {editingId ? 'Update' : 'Add'} Circle
//       </button>

//       <table className="w-full mt-4 bg-white border border-gray-200 rounded">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="py-2 px-4 border-b">Name</th>
//             <th className="py-2 px-4 border-b">Description</th>
//             <th className="py-2 px-4 border-b">Boundaries</th>
//             <th className="py-2 px-4 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {circles.map((circle) => (
//             <tr key={circle.id}>
//               <td className="py-2 px-4 border-b">{circle.name}</td>
//               <td className="py-2 px-4 border-b">{circle.description}</td>
//               <td className="py-2 px-4 border-b">{circle.boundaries}</td>
//               <td className="py-2 px-4 border-b">
//                 <button
//                   onClick={() => handleEdit(circle)}
//                   className="bg-yellow-500 text-white p-1 rounded mr-2"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(circle.id)}
//                   className="bg-red-500 text-white p-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ElectionsCircle;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ElectionsCircle = () => {
  const [circles, setCircles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [boundaries, setBoundaries] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCircles();
  }, []);

  const fetchCircles = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/circles');
      setCircles(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Error fetching circles');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!name || !description || !boundaries) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/api/circles/${editingId}`, { name, description, boundaries });
      } else {
        await axios.post('http://localhost:3001/api/circles', { name, description, boundaries });
      }
      setName('');
      setDescription('');
      setBoundaries('');
      setEditingId(null);
      setError(null); // Clear any previous errors
      fetchCircles();
    } catch (error) {
      setError('Error saving circle');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (circle) => {
    setName(circle.name);
    setDescription(circle.description);
    setBoundaries(circle.boundaries);
    setEditingId(circle.id);
    setError(null); // Clear any previous errors
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3001/api/circles/${id}`);
      fetchCircles();
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Error deleting circle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Election Circle Management</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Circle Name"
        className="border p-2 mb-2 w-full"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Circle Description"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        value={boundaries}
        onChange={(e) => setBoundaries(e.target.value)}
        placeholder="Circle Boundaries"
        className="border p-2 mb-2 w-full"
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {editingId ? 'Update' : 'Add'} Circle
      </button>

      {loading ? (
        <p className="mt-4">Loading...</p>
      ) : (
        <table className="w-full mt-4 bg-white border border-gray-200 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Boundaries</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {circles.map((circle) => (
              <tr key={circle.id}>
                <td className="py-2 px-4 border-b">{circle.name}</td>
                <td className="py-2 px-4 border-b">{circle.description}</td>
                <td className="py-2 px-4 border-b">{circle.boundaries}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEdit(circle)}
                    className="bg-yellow-500 text-white p-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(circle.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ElectionsCircle;


// src/pages/ListsPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListsPage() {
  const [lists, setLists] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [newList, setNewList] = useState({ name: '', description: '' });
  const [candidates, setCandidates] = useState({});
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchLists();
    fetchRequests();
  }, []);

  const fetchLists = async () => {
    const response = await axios.get('/api/lists');
    setLists(response.data);
  };

  const fetchRequests = async () => {
    const response = await axios.get('/api/requests');
    setRequests(response.data);
  };

  const handleAddList = async () => {
    await axios.post('/api/lists', newList);
    setNewList({ name: '', description: '' });
    fetchLists();
  };

  const handleToggleActive = async (id, isActive) => {
    await axios.patch(`/api/lists/${id}`, { active: !isActive });
    fetchLists();
  };

  const handleUpdateList = async (id) => {
    await axios.put(`/api/lists/${id}`, newList);
    setIsEditing(null);
    fetchLists();
  };

  const handleApproveRequest = async (id) => {
    // Approve request and add list
    await axios.post('/api/lists', requests.find(r => r.id === id));
    await axios.delete(`/api/requests/${id}`);
    fetchLists();
    fetchRequests();
  };

  const handleRejectRequest = async (id) => {
    await axios.delete(`/api/requests/${id}`);
    fetchRequests();
  };

  return (
    <div className="container">
      <h1>قوائم الانتخابات</h1>
      <div className="mb-3">
        <h2>إضافة قائمة جديدة</h2>
        <input
          type="text"
          className="form-control"
          placeholder="اسم القائمة"
          value={newList.name}
          onChange={(e) => setNewList({ ...newList, name: e.target.value })}
        />
        <textarea
          className="form-control mt-2"
          placeholder="وصف القائمة"
          value={newList.description}
          onChange={(e) => setNewList({ ...newList, description: e.target.value })}
        />
        <button className="btn btn-primary mt-2" onClick={handleAddList}>
          إضافة قائمة
        </button>
      </div>

      <h2>القوائم الحالية</h2>
      <table className="table">
        <thead>
          <tr>
            <th>اسم القائمة</th>
            <th>الوصف</th>
            <th>الحالة</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {lists.map(list => (
            <tr key={list.id}>
              <td>
                {isEditing === list.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={newList.name}
                    onChange={(e) => setNewList({ ...newList, name: e.target.value })}
                  />
                ) : (
                  list.name
                )}
              </td>
              <td>
                {isEditing === list.id ? (
                  <textarea
                    className="form-control"
                    value={newList.description}
                    onChange={(e) => setNewList({ ...newList, description: e.target.value })}
                  />
                ) : (
                  list.description
                )}
              </td>
              <td>
                <button
                  className={`btn ${list.active ? 'btn-success' : 'btn-secondary'}`}
                  onClick={() => handleToggleActive(list.id, list.active)}
                >
                  {list.active ? 'مفعل' : 'غير مفعل'}
                </button>
              </td>
              <td>
                {isEditing === list.id ? (
                  <>
                    <button className="btn btn-primary" onClick={() => handleUpdateList(list.id)}>
                      حفظ
                    </button>
                    <button className="btn btn-secondary ml-2" onClick={() => setIsEditing(null)}>
                      إلغاء
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-warning" onClick={() => {
                      setIsEditing(list.id);
                      setNewList({ name: list.name, description: list.description });
                    }}>
                      تعديل
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>طلبات إضافة قوائم</h2>
      <table className="table">
        <thead>
          <tr>
            <th>اسم القائمة</th>
            <th>الوصف</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req.id}>
              <td>{req.name}</td>
              <td>{req.description}</td>
              <td>
                <button className="btn btn-success" onClick={() => handleApproveRequest(req.id)}>
                  قبول
                </button>
                <button className="btn btn-danger ml-2" onClick={() => handleRejectRequest(req.id)}>
                  رفض
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListsPage;
