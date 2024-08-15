

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { CheckCircle, XCircle } from 'lucide-react';

// const ElectionsCircle = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchData();
//     // You can also call toggleCandidateStatus here if needed
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:3001/api/circles/circles-lists-candidates');
//       setData(response.data);
//       setError('');
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('Failed to fetch data. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleCandidateStatus = async (circle, list, candidateName, currentStatus) => {
//     try {
//       const response = await axios.post('http://localhost:3001/api/candidates/toggle-status', {
//         circle,
//         list,
//         name: candidateName,
//         isActivate: !currentStatus,
//       });

//       if (response.status === 200) {
//         const updatedData = data.map(c => {
//           if (c.circle === circle) {
//             return {
//               ...c,
//               lists: c.lists.map(l => {
//                 if (l.list === list) {
//                   return {
//                     ...l,
//                     candidates: l.candidates.map(candidate => {
//                       if (candidate.name === candidateName) {
//                         return {
//                           ...candidate,
//                           isActivate: response.data.isActivate,
//                         };
//                       }
//                       return candidate;
//                     }),
//                   };
//                 }
//                 return l;
//               }),
//             };
//           }
//           return c;
//         });
//         setData(updatedData);
//       } else {
//         throw new Error('Server responded with an error');
//       }
//     } catch (error) {
//       console.error('Error updating candidate status:', error);
//       setError('Failed to update candidate status. Please try again.');
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Circles, Lists, and Candidates</h1>
//       {loading && <p className="text-blue-500">Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {data.length > 0 ? (
//         data.map(circle => (
//           <div key={circle.circle} className="mb-6 border p-4 rounded-lg shadow-lg bg-white">
//             <h2 className="text-2xl font-semibold mb-2">Circle: {circle.circle}</h2>
//             {circle.lists.map(list => (
//               <div key={list.list} className="ml-4 mb-4 border-t pt-2">
//                 <h3 className="text-xl font-medium mb-2">List: {list.list}</h3>
//                 {list.candidates.map(candidate => (
//                   <div key={candidate.name} className="flex items-center mb-2">
//                     <p className={`ml-8 px-2 py-1 rounded-full text-xs ${candidate.isActivate ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                       Candidate: {candidate.name} ({candidate.isActivate ? 'Active' : 'Inactive'})
//                     </p>
//                     <button
//                       onClick={() => toggleCandidateStatus(circle.circle, list.list, candidate.name, candidate.isActivate)}
//                       className={`ml-4 px-3 py-1 rounded-md text-white ${candidate.isActivate ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} transition duration-300`}
//                     >
//                       {candidate.isActivate ? (
//                         <>
//                           <XCircle size={16} className="inline mr-1" />
//                           Deactivate
//                         </>
//                       ) : (
//                         <>
//                           <CheckCircle size={16} className="inline mr-1" />
//                           Activate
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         ))
//       ) : (
//         <p>No data available.</p>
//       )}
//     </div>
//   );
// };

// export default ElectionsCircle;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';

const ElectionsCircle = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/circles/circles-lists-candidates');
      setData(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleCandidateStatus = async (circle, list, candidateName, currentStatus) => {
    try {
      const response = await axios.patch('http://localhost:3001/api/candidates/toggle-status', {
        circle,
        list,
        name: candidateName,
        isActivate: !currentStatus,
      });

      if (response.status === 200) {
        // Update the candidate status in the state
        setData(prevData => {
          return prevData.map(c => {
            if (c.circle === circle) {
              return {
                ...c,
                lists: c.lists.map(l => {
                  if (l.list === list) {
                    return {
                      ...l,
                      candidates: l.candidates.map(candidate => {
                        if (candidate.name === candidateName) {
                          return {
                            ...candidate,
                            isActivate: response.data.isActivate,
                          };
                        }
                        return candidate;
                      }),
                    };
                  }
                  return l;
                }),
              };
            }
            return c;
          });
        });
      } else {
        throw new Error('Server responded with an error');
      }
    } catch (error) {
      console.error('Error updating candidate status:', error);
      setError('Failed to update candidate status. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Circles, Lists, and Candidates</h1>
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data.length > 0 ? (
        data.map(circle => (
          <div key={circle.circle} className="mb-6 border p-4 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold mb-2">Circle: {circle.circle}</h2>
            {circle.lists.map(list => (
              <div key={list.list} className="ml-4 mb-4 border-t pt-2">
                <h3 className="text-xl font-medium mb-2">List: {list.list}</h3>
                {list.candidates.map(candidate => (
                  <div key={candidate.name} className="flex items-center mb-2">
                    <p className={`ml-8 px-2 py-1 rounded-full text-xs ${candidate.isActivate ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      Candidate: {candidate.name} ({candidate.isActivate ? 'Active' : 'Inactive'})
                    </p>
                    <button
                      onClick={() => toggleCandidateStatus(circle.circle, list.list, candidate.name, candidate.isActivate)}
                      className={`ml-4 px-3 py-1 rounded-md text-white ${candidate.isActivate ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} transition duration-300`}
                    >
                      {candidate.isActivate ? (
                        <>
                          <XCircle size={16} className="inline mr-1" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <CheckCircle size={16} className="inline mr-1" />
                          Activate
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default ElectionsCircle;
