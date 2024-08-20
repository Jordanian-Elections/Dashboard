


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { CheckCircle, XCircle } from 'lucide-react';
// import AddListForm from './AddListForm'; // Import the AddListForm component

// const ElectionsCircle = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isFormOpen, setIsFormOpen] = useState(false); // State to manage form visibility

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:3001/api/circles/circles-lists-candidates');
//       setData(response.data);
//       setError('');
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('فشل في جلب البيانات. يرجى المحاولة لاحقًا.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleCandidateStatus = async (circle, list, candidateName, currentStatus) => {
//     try {
//       const response = await axios.patch('http://localhost:3001/api/candidates/toggle-status', {
//         circle,
//         list,
//         name: candidateName,
//         isActivate: !currentStatus,
//       });

//       if (response.status === 200) {
//         // Update the candidate status in the state
//         setData(prevData => {
//           return prevData.map(c => {
//             if (c.circle === circle) {
//               return {
//                 ...c,
//                 lists: c.lists.map(l => {
//                   if (l.list === list) {
//                     return {
//                       ...l,
//                       candidates: l.candidates.map(candidate => {
//                         if (candidate.name === candidateName) {
//                           return {
//                             ...candidate,
//                             isActivate: response.data.isActivate,
//                           };
//                         }
//                         return candidate;
//                       }),
//                     };
//                   }
//                   return l;
//                 }),
//               };
//             }
//             return c;
//           });
//         });
//       } else {
//         throw new Error('رد الخادم يحتوي على خطأ');
//       }
//     } catch (error) {
//       console.error('Error updating candidate status:', error);
//       setError('فشل في تحديث حالة المرشح. يرجى المحاولة لاحقًا.');
//     }
//   };

//   const handleSave = () => {
//     fetchData(); // Refresh data after saving
//     setIsFormOpen(false); // Close the form after saving
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center text-zait">الدوائر والقوائم والمرشحون</h1>
    

//       {loading && <p className="text-blue-500 text-center">جارٍ التحميل...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {data.length > 0 ? (
//         data.map(circle => (
//           <div key={circle.circle} className="mb-6 border p-4 rounded-lg shadow-lg bg-white">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-800">الدائرة: {circle.circle}</h2>
//             {circle.lists.map(list => (
//               <div key={list.list} className="ml-4 mb-4 border-t pt-4">
//                 <h3 className="text-xl font-medium mb-2 text-gray-700">القائمة: {list.list}</h3>
//                 {list.candidates.map(candidate => (
//                   <div key={candidate.name} className="flex items-center mb-4">
//                     <p className={`px-2 py-1 rounded-full text-xs ${candidate.isActivate ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} border border-transparent`}>
//                       مرشح: {candidate.name} ({candidate.isActivate ? 'نشط' : 'غير نشط'})
//                     </p>
//                     <button
//                       onClick={() => toggleCandidateStatus(circle.circle, list.list, candidate.name, candidate.isActivate)}
//                       className={`ml-4 px-3 py-1 rounded-md text-white ${candidate.isActivate ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} transition duration-300 flex items-center`}
//                     >
//                       {candidate.isActivate ? (
//                         <>
//                           <XCircle size={16} className="mr-2" />
//                           إلغاء التفعيل
//                         </>
//                       ) : (
//                         <>
//                           <CheckCircle size={16} className="mr-2" />
//                           تفعيل
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
//         <p className="text-center text-gray-600">لا توجد بيانات متاحة.</p>
//       )}

//       {isFormOpen && (
//         <AddListForm
//           onClose={() => setIsFormOpen(false)} // Close the form
//           onSave={handleSave} // Handle save
//         />
//       )}
//     </div>
//   );
// };

// export default ElectionsCircle;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { CheckCircle, XCircle } from 'lucide-react';
// import AddListForm from './AddListForm'; // Ensure this is correct

// const ElectionsCircle = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isFormOpen, setIsFormOpen] = useState(false); // State to manage form visibility

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:3001/api/circles/circles-lists-candidates');
//       setData(response.data);
//       setError('');
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('فشل في جلب البيانات. يرجى المحاولة لاحقًا.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleCandidateStatus = async (circle, list, candidateName, currentStatus) => {
//     try {
//       const response = await axios.patch('http://localhost:3001/api/candidates/toggle-status', {
//         circle,
//         list,
//         name: candidateName,
//         isActivate: !currentStatus,
//       });

//       if (response.status === 200) {
//         setData(prevData => {
//           return prevData.map(c => {
//             if (c.circle === circle) {
//               return {
//                 ...c,
//                 lists: c.lists.map(l => {
//                   if (l.list === list) {
//                     return {
//                       ...l,
//                       candidates: l.candidates.map(candidate => {
//                         if (candidate.name === candidateName) {
//                           return {
//                             ...candidate,
//                             isActivate: response.data.isActivate,
//                           };
//                         }
//                         return candidate;
//                       }),
//                     };
//                   }
//                   return l;
//                 }),
//               };
//             }
//             return c;
//           });
//         });
//       } else {
//         throw new Error('رد الخادم يحتوي على خطأ');
//       }
//     } catch (error) {
//       console.error('Error updating candidate status:', error);
//       setError('فشل في تحديث حالة المرشح. يرجى المحاولة لاحقًا.');
//     }
//   };

//   const handleSave = () => {
//     fetchData(); // Refresh data after saving
//     setIsFormOpen(false); // Close the form after saving
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center text-zait">الدوائر والقوائم والمرشحون</h1>

//       {loading && <p className="text-blue-500 text-center">جارٍ التحميل...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {data.length > 0 ? (
//         data.map(circle => (
//           <div key={circle.circle} className="mb-6 border p-4 rounded-lg shadow-lg bg-white">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-800">الدائرة: {circle.circle}</h2>
//             {circle.lists.map(list => (
//               <div key={list.list} className="ml-4 mb-4 border-t pt-4">
//                 <h3 className="text-xl font-medium mb-2 text-gray-700">القائمة: {list.list}</h3>
//                 {list.candidates.map(candidate => (
//                   <div key={candidate.name} className="flex items-center mb-4">
//                     <p className={`px-2 py-1 rounded-full text-xs ${candidate.isActivate ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} border border-transparent`}>
//                       مرشح: {candidate.name} ({candidate.isActivate ? 'نشط' : 'غير نشط'})
//                     </p>
//                     <button
//                       onClick={() => toggleCandidateStatus(circle.circle, list.list, candidate.name, candidate.isActivate)}
//                       className={`ml-4 px-3 py-1 rounded-md text-white ${candidate.isActivate ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} transition duration-300 flex items-center`}
//                     >
//                       {candidate.isActivate ? (
//                         <>
//                           <XCircle size={16} className="mr-2" />
//                           إلغاء التفعيل
//                         </>
//                       ) : (
//                         <>
//                           <CheckCircle size={16} className="mr-2" />
//                           تفعيل
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
//         <p className="text-center text-gray-600">لا توجد بيانات متاحة.</p>
//       )}

//       {isFormOpen && (
//         <AddListForm
//           onClose={() => setIsFormOpen(false)} // Close the form
//           onSave={handleSave} // Handle save
//         />
//       )}

//       <button
//         onClick={() => setIsFormOpen(true)}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
//       >
//         إضافة قائمة جديدة
//       </button>
//     </div>
//   );
// };

// export default ElectionsCircle;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ChevronDown, ChevronUp, PlusCircle, Loader } from 'lucide-react';
import AddListForm from './AddListForm'; // Ensure this is correct

const ElectionsCircle = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expandedCircles, setExpandedCircles] = useState({});

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
      setError('فشل في جلب البيانات. يرجى المحاولة لاحقًا.');
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
        throw new Error('رد الخادم يحتوي على خطأ');
      }
    } catch (error) {
      console.error('Error updating candidate status:', error);
      setError('فشل في تحديث حالة المرشح. يرجى المحاولة لاحقًا.');
    }
  };

  const handleSave = () => {
    fetchData();
    setIsFormOpen(false);
  };

  const toggleCircleExpansion = (circle) => {
    setExpandedCircles(prev => ({
      ...prev,
      [circle]: !prev[circle]
    }));
  };

  const CircleCard = ({ circle }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-6 border p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
    >
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleCircleExpansion(circle.circle)}
      >
        <h2 className="text-2xl font-semibold text-gray-800">الدائرة: {circle.circle}</h2>
        {expandedCircles[circle.circle] ? <ChevronUp /> : <ChevronDown />}
      </div>
      <AnimatePresence>
        {expandedCircles[circle.circle] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {circle.lists.map(list => (
              <div key={list.list} className="ml-4 mt-4 border-t pt-4">
                <h3 className="text-xl font-medium mb-2 text-gray-700">القائمة: {list.list}</h3>
                {list.candidates.map(candidate => (
                  <motion.div 
                    key={candidate.name} 
                    className="flex items-center justify-between mb-4 bg-gray-50 p-3 rounded-md"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <p className={`px-3 py-1 rounded-full text-sm ${candidate.isActivate ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} border border-transparent`}>
                      مرشح: {candidate.name}
                    </p>
                    <button
                      onClick={() => toggleCandidateStatus(circle.circle, list.list, candidate.name, candidate.isActivate)}
                      className={`px-4 py-2 rounded-md text-white ${candidate.isActivate ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} transition duration-300 flex items-center`}
                    >
                      {candidate.isActivate ? (
                        <>
                          <XCircle size={18} className="mr-2" />
                          إلغاء التفعيل
                        </>
                      ) : (
                        <>
                          <CheckCircle size={18} className="mr-2" />
                          تفعيل
                        </>
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-center text-zait"
      >
        الدوائر والقوائم والمرشحون
      </motion.h1>

      {loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center"
        >
          <Loader className="animate-spin text-blue-500" size={40} />
        </motion.div>
      )}
      
      {error && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-center mb-4"
        >
          {error}
        </motion.p>
      )}

      <AnimatePresence>
        {data.length > 0 ? (
          data.map(circle => (
            <CircleCard key={circle.circle} circle={circle} />
          ))
        ) : (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-600"
          >
            لا توجد بيانات متاحة.
          </motion.p>
        )}
      </AnimatePresence>

      {isFormOpen && (
        <AddListForm
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
        />
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsFormOpen(true)}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 flex items-center justify-center mx-auto"
      >
        <PlusCircle size={20} className="mr-2" />
        إضافة قائمة جديدة
      </motion.button>
    </div>
  );
};

export default ElectionsCircle;