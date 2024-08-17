// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Request = () => {
//   const [localRequests, setLocalRequests] = useState([]);
//   const [partyRequests, setPartyRequests] = useState([]);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     // Fetch requests
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/requests');
//         setLocalRequests(response.data.localRequests);
//         setPartyRequests(response.data.partyRequests);
//       } catch (error) {
//         console.error('Error fetching requests:', error);
//         setMessage('حدث خطأ أثناء جلب الطلبات');
//       }
//     };

//     fetchRequests();
//   }, []);

//   const handleApprove = async (type, id) => {
//     try {
//       await axios.post(`http://localhost:3001/api/requests/approve/${type}/${id}`);
//       setMessage('تمت الموافقة على الطلب بنجاح');
//       // Refresh requests
//       const response = await axios.get('http://localhost:3001/api/requests');
//       setLocalRequests(response.data.localRequests);
//       setPartyRequests(response.data.partyRequests);
//     } catch (error) {
//       console.error('Error approving request:', error);
//       setMessage('حدث خطأ أثناء الموافقة على الطلب');
//     }
//   };

//   const handleReject = async (type, id) => {
//     try {
//       await axios.post(`http://localhost:3001/api/requests/reject/${type}/${id}`);
//       setMessage('تم رفض الطلب بنجاح');
//       // Refresh requests
//       const response = await axios.get('http://localhost:3001/api/requests');
//       setLocalRequests(response.data.localRequests);
//       setPartyRequests(response.data.partyRequests);
//     } catch (error) {
//       console.error('Error rejecting request:', error);
//       setMessage('حدث خطأ أثناء رفض الطلب');
//     }
//   };

//   const renderRequestCard = (request, type) => (
//     <div key={request.id} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4 rtl">
//       <h3 className="text-xl font-semibold mb-2">رقم الطلب: {request.id}</h3>
//       <p className="text-gray-700 mb-2">
//         رقم الهوية الوطنية: {request.national_id}
//       </p>
//       {type === 'local' ? (
//         <>
//           <p className="text-gray-700 mb-2">اسم القائمة المحلية: {request.local_list_name}</p>
//           <p className="text-gray-700 mb-2">الأعضاء: {JSON.stringify(request.members)}</p>
//         </>
//       ) : (
//         <p className="text-gray-700 mb-2">اسم قائمة الحزب: {request.party_list_name}</p>
//       )}
//       <div className="flex space-x-4 mt-4 rtl">
//         <button
//           className="bg-green-500 text-white py-2 px-4 rounded"
//           onClick={() => handleApprove(type, request.id)}
//         >
//           موافقة
//         </button>
//         <button
//           className="bg-red-500 text-white py-2 px-4 rounded"
//           onClick={() => handleReject(type, request.id)}
//         >
//           رفض
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="container mx-auto p-4 rtl">
//       <h1 className="text-3xl font-bold mb-6">طلبات الانتخابات</h1>

//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">طلبات الانتخابات المحلية</h2>
//         {localRequests.length === 0 ? (
//           <p className="text-gray-700">لا توجد طلبات محلية متاحة</p>
//         ) : (
//           localRequests.map((request) => renderRequestCard(request, 'local'))
//         )}
//       </div>

//       <div>
//         <h2 className="text-2xl font-semibold mb-4">طلبات انتخابات الحزب</h2>
//         {partyRequests.length === 0 ? (
//           <p className="text-gray-700">لا توجد طلبات حزبية متاحة</p>
//         ) : (
//           partyRequests.map((request) => renderRequestCard(request, 'party'))
//         )}
//       </div>

//       {message && (
//         <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md rtl">
//           <p className="text-gray-800">{message}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Request;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Request = () => {
  const [localRequests, setLocalRequests] = useState([]);
  const [partyRequests, setPartyRequests] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch requests
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/requests');
        if (response.data) {
          setLocalRequests(response.data.localRequests || []);
          setPartyRequests(response.data.partyRequests || []);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
        setMessage('حدث خطأ أثناء جلب الطلبات');
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (type, id) => {
    try {
      await axios.post(`http://localhost:3001/api/requests/approve/${type}/${id}`);
      setMessage('تمت الموافقة على الطلب بنجاح');
      // Refresh requests
      const response = await axios.get('http://localhost:3001/api/requests');
      if (response.data) {
        setLocalRequests(response.data.localRequests || []);
        setPartyRequests(response.data.partyRequests || []);
      }
    } catch (error) {
      console.error('Error approving request:', error);
      setMessage('حدث خطأ أثناء الموافقة على الطلب');
    }
  };

  const handleReject = async (type, id) => {
    try {
      await axios.post(`http://localhost:3001/api/requests/reject/${type}/${id}`);
      setMessage('تم رفض الطلب بنجاح');
      // Refresh requests
      const response = await axios.get('http://localhost:3001/api/requests');
      if (response.data) {
        setLocalRequests(response.data.localRequests || []);
        setPartyRequests(response.data.partyRequests || []);
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      setMessage('حدث خطأ أثناء رفض الطلب');
    }
  };

  const renderRequestCard = (request, type) => (
    <div key={request.id} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4 rtl">
      <h3 className="text-xl font-semibold mb-2">رقم الطلب: {request.id}</h3>
      <p className="text-gray-700 mb-2">رقم الهوية الوطنية: {request.national_id}</p>
      {type === 'local' ? (
        <>
          <p className="text-gray-700 mb-2">اسم القائمة المحلية: {request.local_list_name}</p>
          <p className="text-gray-700 mb-2">الأعضاء: {request.members ? JSON.stringify(request.members) : 'لا توجد بيانات'}</p>
        </>
      ) : (
        <p className="text-gray-700 mb-2">اسم قائمة الحزب: {request.party_list_name}</p>
      )}
      <div className="flex space-x-4 mt-4 rtl">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={() => handleApprove(type, request.id)}
        >
          موافقة
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded"
          onClick={() => handleReject(type, request.id)}
        >
          رفض
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 rtl">
      <h1 className="text-3xl font-bold mb-6">طلبات الانتخابات</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">طلبات الانتخابات المحلية</h2>
        {localRequests.length === 0 ? (
          <p className="text-gray-700">لا توجد طلبات محلية متاحة</p>
        ) : (
          localRequests.map(request => renderRequestCard(request, 'local'))
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">طلبات انتخابات الحزب</h2>
        {partyRequests.length === 0 ? (
          <p className="text-gray-700">لا توجد طلبات حزبية متاحة</p>
        ) : (
          partyRequests.map(request => renderRequestCard(request, 'party'))
        )}
      </div>

      {message && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md rtl">
          <p className="text-gray-800">{message}</p>
        </div>
      )}
    </div>
  );
};

export default Request;
