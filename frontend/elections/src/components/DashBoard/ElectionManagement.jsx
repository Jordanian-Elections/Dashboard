
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function ElectionManagement() {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    // Fetch elections from backend
    // This is a placeholder, replace with actual API call
    setTimeout(() => {
      setElections([
        { id: 1, name: 'انتخابات الرئاسة 2024', startDate: '2024-11-03', endDate: '2024-11-03', status: 'قادم' },
        { id: 2, name: 'انتخابات المجلس المحلي', startDate: '2024-05-15', endDate: '2024-05-15', status: 'نشط' },
        // ... more elections
      ]);
    }, 1000);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">إدارة الانتخابات</h1>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        إضافة انتخابات جديدة
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">الاسم</th>
            <th className="py-2 px-4 border-b">تاريخ البدء</th>
            <th className="py-2 px-4 border-b">تاريخ الانتهاء</th>
            <th className="py-2 px-4 border-b">الحالة</th>
            <th className="py-2 px-4 border-b">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {elections.map(election => (
            <tr key={election.id}>
              <td className="py-2 px-4 border-b">{election.name}</td>
              <td className="py-2 px-4 border-b">{election.startDate}</td>
              <td className="py-2 px-4 border-b">{election.endDate}</td>
              <td className="py-2 px-4 border-b">{election.status}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
                  <FontAwesomeIcon icon={faEdit} className="mr-1" />
                  تعديل
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  <FontAwesomeIcon icon={faTrashAlt} className="mr-1" />
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ElectionManagement;
