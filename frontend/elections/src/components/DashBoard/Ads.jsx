// src/components/Ads.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [status, setStatus] = useState({});

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/ads');
      setAds(response.data);
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  const handleStatusChange = async (id) => {
    try {
      const response = await axios.put(`/api/ads/${id}/status`, { status: status[id] });
      if (response.status === 200) {
        fetchAds(); // Refresh the list after updating the status
      }
    } catch (error) {
      console.error('Error updating ad status:', error);
    }
  };

  const handleSelectChange = (id, newStatus) => {
    setStatus({ ...status, [id]: newStatus });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Ads Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Candidate</th>
              <th className="py-3 px-6 text-left">Content</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {ads.map(ad => (
              <tr key={ad.id} className="border-b border-gray-200">
                <td className="py-3 px-6">{ad.id}</td>
                <td className="py-3 px-6">{ad.candidate_name}</td>
                <td className="py-3 px-6">{ad.content}</td>
                <td className="py-3 px-6">${ad.price}</td>
                <td className="py-3 px-6">
                  <select
                    className="block w-full bg-gray-50 border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={status[ad.id] || ad.status}
                    onChange={(e) => handleSelectChange(ad.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td className="py-3 px-6">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleStatusChange(ad.id)}
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ads;
