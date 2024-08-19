// // const express = require('express');
// // const knex = require('./knex'); // Adjust path if necessary
// // const app = express();

// // app.use(express.json());

// // // Route to get election times
// // app.get('http://localhost:3001/api/time/election-times', async (req, res) => {
// //   try {
// //     const electionTimes = await knex('elections_time').select('*');
// //     res.json(electionTimes);
// //   } catch (error) {
// //     res.status(500).json({ error: 'Failed to fetch election times.' });
// //   }
// // });

// // // Route to add or update election time
// // app.post('/api/election-times', async (req, res) => {
// //   const { id, start_date, end_date } = req.body;
// //   try {
// //     if (id) {
// //       // Update existing election time
// //       await knex('elections_time')
// //         .where({ id })
// //         .update({ start_date, end_date });
// //     } else {
// //       // Insert new election time
// //       await knex('elections_time').insert({ start_date, end_date });
// //     }
// //     res.status(200).json({ message: 'Election time saved successfully.' });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Failed to save election time.' });
// //   }
// // });

// // // Route to delete election time
// // app.delete('/api/election-times/:id', async (req, res) => {
// //   const { id } = req.params;
// //   try {
// //     await knex('elections_time').where({ id }).del();
// //     res.status(200).json({ message: 'Election time deleted successfully.' });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Failed to delete election time.' });
// //   }
// // });

// // // Add other routes and middleware as needed...

// // const port = process.env.PORT || 3001;
// // app.listen(port, () => console.log(`Server running on port ${port}`));


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ElectionForm = () => {
//   const [electionTimes, setElectionTimes] = useState([]);
//   const [formData, setFormData] = useState({ start_date: '', end_date: '', id: null });

//   useEffect(() => {
//     const fetchElectionTimes = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/election-times');
//         setElectionTimes(response.data);
//         if (response.data.length > 0) {
//           const [latest] = response.data;
//           setFormData({ start_date: latest.start_date, end_date: latest.end_date, id: latest.id });
//         }
//       } catch (error) {
//         console.error('Error fetching election times:', error);
//       }
//     };

//     fetchElectionTimes();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (formData.id) {
//         await axios.post('http://localhost:3001/api/time/election-times', formData);
//       } else {
//         await axios.post('http://localhost:3001/api/time/election-times', formData);
//       }
//       alert('Election time saved successfully.');
//     } catch (error) {
//       console.error('Error saving election time:', error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Add/Update Election Time</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">Start Date</label>
//           <input
//             type="datetime-local"
//             name="start_date"
//             value={formData.start_date}
//             onChange={handleChange}
//             className="border border-gray-300 p-2 rounded w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">End Date</label>
//           <input
//             type="datetime-local"
//             name="end_date"
//             value={formData.end_date}
//             onChange={handleChange}
//             className="border border-gray-300 p-2 rounded w-full"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ElectionForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ElectionForm = ({ electionId = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    start_date: '',
    end_date: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (electionId) {
      fetchElectionData();
    }
  }, [electionId]);

  const fetchElectionData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/time/elections/${electionId}`);
      const { title, start_date, end_date } = response.data;
      setFormData({
        title,
        start_date: new Date(start_date).toISOString().slice(0, 16),
        end_date: new Date(end_date).toISOString().slice(0, 16),
      });
    } catch (err) {
      setError('Failed to fetch election data');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (electionId) {
        await axios.put(`http://localhost:3001/api/time/elections/${electionId}`, formData);
      } else {
        await axios.post('http://localhost:3001/api/time/elections', formData);
      }
      setLoading(false);
      // Redirect or show success message
    } catch (err) {
      setError('Failed to save election time');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">عنوان الانتخابات</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">تاريخ البدء</label>
        <input
          type="datetime-local"
          id="start_date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">تاريخ الانتهاء</label>
        <input
          type="datetime-local"
          id="end_date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {loading ? 'جاري الحفظ...' : (electionId ? 'تحديث' : 'إضافة')}
      </button>
    </form>
  );
};

export default ElectionForm;