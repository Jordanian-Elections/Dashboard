

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { Award, MapPin, Star } from "lucide-react";

// const Result = () => {
//   const [electionResults, setElectionResults] = useState([]);
//   const [candidates, setCandidates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCircle, setSelectedCircle] = useState(null);
//   const [expandedCircle, setExpandedCircle] = useState(null);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const [electionRes, candidatesRes] = await Promise.all([
//           axios.get("http://localhost:5000/candidates/similar"),
//           axios.get("http://localhost:5000/candidates/passedf")
//         ]);
//         setElectionResults(electionRes.data);
//         setCandidates(candidatesRes.data);
//         setLoading(false);
//       } catch (err) {
//         setError("حدث خطأ أثناء جلب البيانات");
//         setLoading(false);
//       }
//     };
//     fetchResults();
//   }, []);

//   if (loading) return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zait"></div>
//     </div>
//   );

//   if (error) return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//         <strong className="font-bold">خطأ!</strong>
//         <span className="block sm:inline"> {error}</span>
//       </div>
//     </div>
//   );

//   // Extract unique circles for the navigation
//   const circles = [...new Set(electionResults.map(result => result.circle))];

//   // Filter results based on selected circle
//   const filteredResults = selectedCircle
//     ? electionResults.filter(result => result.circle === selectedCircle)
//     : electionResults;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 md:p-12">
//       <motion.h1
//         className="text-4xl font-bold text-center text-zait mb-8 my-20"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Star className="inline-block mr-2 text-yellow-500" size={36} /> {/* Icon */}
//         نتائج الانتخابات
//       </motion.h1>

//       {/* Navigation Bar for Circles */}
//       <motion.nav
//         className="mb-8"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <ul className="flex space-x-4 justify-center">
//           <li>
//             <button
//               className={`px-4 py-2 mx-6 rounded ${!selectedCircle ? 'bg-zait hover:bg-gray-600 text-white' : 'bg-gray-400 text-white hover:bg-gray-600'}`}
//               onClick={() => setSelectedCircle(null)}
//             >
//               الكل
//             </button>
//           </li>
//           {circles.map((circle, index) => (
//             <li key={index}>
//               <button
//                 className={`px-4 py-2 rounded ${selectedCircle === circle ? 'bg-zait hover:bg-gray-600 text-white' : 'bg-gray-400 text-white hover:bg-gray-600'}`}
//                 onClick={() => setSelectedCircle(circle)}
//               >
//                 {circle}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </motion.nav>

//       <motion.div
//         className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {filteredResults.map((cityResult, index) => (
//           <motion.div
//             key={index}
//             className="bg-zait1 rounded-lg shadow-lg p-6 "
//             // whileHover={{ scale: 1.05 }}
//             // whileTap={{ scale: 0.95 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <motion.h2
//               className="text-3xl font-bold text-gray-800 mb-4 flex justify-center"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <MapPin className="inline-block ml-2 text-zait mb-10" size={32} /> {cityResult.city} - {cityResult.circle}
//             </motion.h2>
//             <div className="mb-4">
//               <p className="text-lg font-medium text-zait bg-gray-200 w-48 rounded-xl p-2 opacity-80">إجمالي المقاعد: <span className="font-bold text-gray-800">{cityResult.totalSeats}</span></p>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={cityResult.passingCandidates}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="list" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="allocatedSeats" fill="#3F7A5E" name="المقاعد المخصصة" />
//               </BarChart>
//             </ResponsiveContainer>
//             <div className="mt-4">
//               <h3 className="text-xl font-semibold text-gray-800 mb-6">المرشحون</h3>
//             <button
//               className="my-4 bg-gray-600 text-white px-4 py-2 rounded-md "
//               onClick={() => setExpandedCircle(expandedCircle === cityResult.city ? null : cityResult.city)}
//               >
//               {expandedCircle === cityResult.city ? "إخفاء التفاصيل" : "عرض التفاصيل"}
//             </button>
//                 {expandedCircle === cityResult.city && (
//                   <div className=" p-4 bg-gray-100 rounded-md">
//               <ul className="space-y-4 ">
//                 {cityResult.passingCandidates.map((candidate, candidateIndex) => (
//                   <motion.li
//                     key={candidateIndex}
//                     className="bg-gray-50 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <div className="flex items-center mb-2">
//                       <Award className="text-yellow-500 mr-3" size={36} />
//                       <span className="text-2xl font-bold text-zait">{candidate.list}</span>
//                     </div>
//                     <li key={candidateIndex} className="bg-white rounded-lg p-6 shadow-md border border-gray-200 transition-transform transform hover:scale-105">
//                       <div className="space-y-4">
//                         <div className="flex items-center">
//                           <span className="text-gray-600 mr-2">📊</span>
//                           <p className="text-gray-800">
//                             إجمالي المقاعد: <span className="font-bold">{candidate.allocatedSeats}</span>
//                           </p>
//                         </div>
//                         <div className="flex items-center">
//                           <span className="text-gray-600 mr-2">⚖️</span>
//                           <p className="text-gray-800">
//                             وزن القائمة: <span className="font-bold">{candidate.listWeight.toFixed(2)}</span>
//                           </p>
//                         </div>
//                         <div className="flex items-center">
//                           <span className="text-gray-600 mr-2">🔢</span>
//                           <p className="text-gray-800">
//                             مقعد العدد الصحيح: <span className="font-bold">{candidate.wholeNumberSeat}</span>
//                           </p>
//                         </div>
//                         <div className="flex items-center">
//                           <span className="text-gray-600 mr-2">🔢</span>
//                           <p className="text-gray-800">
//                             جزء المقعد العشري: <span className="font-bold">{candidate.decimalPartSeat.toFixed(2)}</span>
//                           </p>
//                         </div>
//                         <div className="flex items-center">
//                           <span className="text-gray-600 mr-2">🗳️</span>
//                           <p className="text-gray-800">
//                             أصوات القائمة: <span className="font-bold">{candidate.list_votes}</span>
//                           </p>
//                         </div>
//                         <div className="flex items-center">
//                           <span className="text-gray-600 mr-2">📉</span>
//                           <p className="text-gray-800">
//                             الحد الأدنى: <span className="font-bold">{candidate.threshold.toFixed(2)}</span>
//                           </p>
//                         </div>
//                         <div className="flex items-center">
//                           <span className="text-gray-600 mr-2">✅</span>
//                           <p className="text-gray-800">
//                             الحالة: <span className={`font-bold ${candidate.passStatus ? 'text-green-500' : 'text-red-500'}`}>{candidate.passStatus ? 'نجح' : 'فشل'}</span>
//                           </p>
//                         </div>
//                       </div>
//                     </li>
//                   </motion.li>
//                 ))}
//               </ul>
//                   </div>
//                 )}
//                 <div className="min-h-screen bg-gray-100 py-10">
//       <h2 className="text-3xl font-bold text-center mb-10">نتائج الانتخابات</h2>
//       <div className="container mx-auto px-4">
//         {candidates.map((result, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-xl"
//           >
//             <div className="text-lg font-semibold text-gray-700">
//               {result.city} - {result.circle} - {result.list || result.type}
//             </div>
//             <div className="mt-2 text-sm text-gray-600">
//               مجموع المقاعد: {result.totalSeats || 1}
//             </div>
//             <div className="mt-4">
//               {result.candidates ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                   {result.candidates.map((candidate) => (
//                     <div
//                       key={candidate.name}
//                       className="p-4 border rounded-lg hover:bg-blue-50 transition-colors"
//                     >
//                       <div className="text-gray-800 font-medium">
//                         {candidate.name}
//                       </div>
//                       <div className="text-sm text-gray-600">
//                         الأصوات: {candidate.candidate_votes} - المقاعد المخصصة:{" "}
//                         {candidate.allocatedSeats}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="p-4 border rounded-lg bg-blue-50">
//                   <div className="text-gray-800 font-medium">
//                     الفائز: {result.winner.name}
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     الأصوات: {result.winner.candidate_votes} - المقاعد المخصصة:
//                     1
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default Result;



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Result = () => {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/candidates/similar"
//         );
//         setResults(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Error fetching election results");
//         setLoading(false);
//       }
//     };

//     fetchResults();
//   }, []);

//   if (loading) return <div className="text-center mt-8">Loading...</div>;
//   if (error)
//     return <div className="text-center mt-8 text-red-600">{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6 text-center">Election Results</h1>
//       {results.map((cityResult, index) => (
//         <div
//           key={index}
//           className="mb-8 bg-white shadow-md rounded-lg overflow-hidden"
//         >
//           <h2 className="text-2xl font-semibold bg-gray-100 p-4">
//             {cityResult.city} - {cityResult.circle}
//           </h2>
//           <div className="p-4">
//             <p className="mb-2">
//               <strong>Total Seats:</strong> {cityResult.totalSeats}
//             </p>
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="p-2 text-left">List</th>
//                   <th className="p-2 text-left">Allocated Seats</th>
//                   <th className="p-2 text-left">List Weight</th>
//                   <th className="p-2 text-left">Whole Number Seat</th>
//                   <th className="p-2 text-left">Decimal Part Seat</th>
//                   <th className="p-2 text-left">List Votes</th>
//                   <th className="p-2 text-left">Threshold</th>
//                   <th className="p-2 text-left">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cityResult.passingCandidates.map(
//                   (candidate, candidateIndex) => (
//                     <tr
//                       key={candidateIndex}
//                       className={
//                         candidateIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
//                       }
//                     >
//                       <td className="p-2">{candidate.list}</td>
//                       <td className="p-2">{candidate.allocatedSeats}</td>
//                       <td className="p-2">{candidate.listWeight.toFixed(2)}</td>
//                       <td className="p-2">{candidate.wholeNumberSeat}</td>
//                       <td className="p-2">
//                         {candidate.decimalPartSeat.toFixed(2)}
//                       </td>
//                       <td className="p-2">{candidate.list_votes}</td>
//                       <td className="p-2">{candidate.threshold.toFixed(2)}</td>
//                       <td className="p-2">
//                         <span
//                           className={`px-2 py-1 rounded ${
//                             candidate.status === "pass"
//                               ? "bg-green-200 text-green-800"
//                               : "bg-red-200 text-red-800"
//                           }`}
//                         >
//                           {candidate.status}
//                         </span>
//                       </td>
//                     </tr>
//                   )
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Result;


import React, { useState, useEffect } from "react";
import axios from "axios";

const Result = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/candidates/similar"
        );
        setResults(response.data);
        setLoading(false);
      } catch (err) {
        setError("خطأ في جلب نتائج الانتخابات");
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <div className="text-center mt-8">جارٍ التحميل...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <h1 className="text-4xl font-bold my-6 text-center text-zait">نتائج الانتخابات</h1>
      {results.map((cityResult, index) => (
        <div
          key={index}
          className="mb-8 bg-white shadow-md rounded-lg overflow-hidden"
        >
          <h2 className="text-2xl font-semibold bg-gray-100 p-4">
            {cityResult.city} - {cityResult.circle}
          </h2>
          <div className="p-4">
            <p className="mb-2 text-zait">
              <strong>عدد المقاعد الكلي:</strong> {cityResult.totalSeats}
            </p>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-400 text-zait">
                  <th className="p-2 text-right">القائمة</th>
                  <th className="p-2 text-right">المقاعد المخصصة</th>
                  <th className="p-2 text-right">وزن القائمة</th>
                  <th className="p-2 text-right">المقاعد الكاملة</th>
                  <th className="p-2 text-right">الجزء العشري للمقاعد</th>
                  <th className="p-2 text-right">أصوات القائمة</th>
                  <th className="p-2 text-right">العتبة</th>
                  <th className="p-2 text-right">الحالة</th>
                </tr>
              </thead>
              <tbody className="">
                {cityResult.passingCandidates.map(
                  (candidate, candidateIndex) => (
                    <tr
                      key={candidateIndex}
                      className={
                        candidateIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }
                    >
                      <td className="p-2">{candidate.list}</td>
                      <td className="p-2">{candidate.allocatedSeats}</td>
                      <td className="p-2">{candidate.listWeight.toFixed(2)}</td>
                      <td className="p-2">{candidate.wholeNumberSeat}</td>
                      <td className="p-2">
                        {candidate.decimalPartSeat.toFixed(2)}
                      </td>
                      <td className="p-2">{candidate.list_votes}</td>
                      <td className="p-2">{candidate.threshold.toFixed(2)}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded ${
                            candidate.status === "pass"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {candidate.status === "pass" ? "ناجح" : "راسب"}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Result;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { Award, MapPin, List } from "lucide-react";

// const ElectionResults = () => {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/candidates/similar");
//         setResults(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("حدث خطأ أثناء جلب نتائج الانتخابات");
//         setLoading(false);
//       }
//     };
//     fetchResults();
//   }, []);

//   if (loading) return <div className="text-center text-lg">جاري التحميل...</div>;
//   if (error) return <div className="text-center text-lg text-red-500">{error}</div>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 md:p-12">
//       <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//         نتائج الانتخابات
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//         {results.map((cityResult, index) => (
//           <motion.div
//             key={index}
//             className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
//             whileHover={{ scale: 1.03 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//               <MapPin className="inline-block mr-2" size={24} /> {cityResult.city} - {cityResult.circle}
//             </h2>
//             <div className="mb-4">
//               <p className="text-lg font-medium text-gray-600">إجمالي المقاعد: <span className="font-bold text-gray-800">{cityResult.totalSeats}</span></p>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={cityResult.passingCandidates}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="list" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="allocatedSeats" fill="#4A90E2" />
//               </BarChart>
//             </ResponsiveContainer>
//             <div className="mt-4">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">المرشحون</h3>
//               <ul className="space-y-4">
//                 {cityResult.passingCandidates.map((candidate, candidateIndex) => (
//                   <li key={candidateIndex} className="bg-gray-50 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105">
//                     <div className="flex items-center mb-2">
//                       <Award className="text-yellow-500 mr-3" size={20} />
//                       <span className="text-lg font-bold">{candidate.list}</span>
//                     </div>
//                     <p>إجمالي المقاعد: <span className="font-bold">{candidate.allocatedSeats}</span></p>
//                     <p>وزن القائمة: <span className="font-bold">{candidate.listWeight.toFixed(2)}</span></p>
//                     <p>مقعد العدد الصحيح: <span className="font-bold">{candidate.wholeNumberSeat}</span></p>
//                     <p>جزء المقعد العشري: <span className="font-bold">{candidate.decimalPartSeat.toFixed(2)}</span></p>
//                     <p>أصوات القائمة: <span className="font-bold">{candidate.list_votes}</span></p>
//                     <p>الحد الأدنى: <span className="font-bold">{candidate.threshold.toFixed(2)}</span></p>
//                     <p>الحالة: <span className={`font-bold ${candidate.status === 'Passed' ? 'text-green-600' : 'text-red-600'}`}>{candidate.status === 'Passed' ? 'مقبول' : 'مرفوض'}</span></p>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ElectionResults;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { Award, MapPin, List } from "lucide-react";

// const ElectionResults = () => {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCircle, setSelectedCircle] = useState(null);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/candidates/similar");
//         setResults(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("حدث خطأ أثناء جلب نتائج الانتخابات");
//         setLoading(false);
//       }
//     };
//     fetchResults();
//   }, []);

//   if (loading) return <div className="text-center text-lg">جاري التحميل...</div>;
//   if (error) return <div className="text-center text-lg text-red-500">{error}</div>;

//   // Extract unique circles for the navigation
//   const circles = [...new Set(results.map(result => result.circle))];

//   // Filter results based on selected circle
//   const filteredResults = selectedCircle
//     ? results.filter(result => result.circle === selectedCircle)
//     : results;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 md:p-12 grid justify-center">
//       <h1 className="text-4xl font-bold text-center text-zait mb-8 my-20">
//         نتائج الانتخابات
//       </h1>

//       {/* Navigation Bar for Circles */}
//       <nav className="mb-8">
//         <ul className="flex space-x-4 justify-center">
//           <li>
//             <button
//               className={`px-4 py-2 mx-6 rounded ${!selectedCircle ? 'bg-zait hover:pg-gray-400 text-white' : ' bg-gray-400 text-white hover:pg-gray-400'}`}
//               onClick={() => setSelectedCircle(null)}
//             >
//               الكل
//             </button>
//           </li>
//           {circles.map((circle, index) => (
//             <li key={index}>
//               <button
//                 className={`px-4 py-2 rounded ${selectedCircle === circle ? 'bg-zait hover:pg-gray-400 text-white' : 'bg-gray-400 text-white hover:pg-gray-400'}`}
//                 onClick={() => setSelectedCircle(circle)}
//               >
//                 {circle}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//         {filteredResults.map((cityResult, index) => (
//           <motion.div
//             key={index}
//             className="bg-zait1 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
//             whileHover={{ scale: 1.03 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <h2 className="text-3xl font-bold text-gray-800 mb-4 flex justify-center">
//               <MapPin className="inline-block ml-2 text-zait mb-10" size={32} /> {cityResult.city} - {cityResult.circle}
//             </h2>
//             <div className="mb-4"> 
//               <p className="text-lg font-medium text-zait bg-gray-200 w-48 rounded-xl p-2 opacity-80 ">إجمالي المقاعد: <span className="font-bold text-gray-800">{cityResult.totalSeats}</span></p>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={cityResult.passingCandidates}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="list" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="allocatedSeats" fill="#4A90E2" />
//               </BarChart>
//             </ResponsiveContainer>
//             <div className="mt-4">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">المرشحون</h3>
//               <ul className="space-y-4">
//                 {cityResult.passingCandidates.map((candidate, candidateIndex) => (
//                   <li key={candidateIndex} className="bg-gray-50 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105">
//                     <div className="flex items-center mb-2">
//                       <Award className="text-yellow-500 mr-3" size={20} />
//                       <span className="text-lg font-bold">{candidate.list}</span>
//                     </div>
//                     <p>إجمالي المقاعد: <span className="font-bold">{candidate.allocatedSeats}</span></p>
//                     <p>وزن القائمة: <span className="font-bold">{candidate.listWeight.toFixed(2)}</span></p>
//                     <p>مقعد العدد الصحيح: <span className="font-bold">{candidate.wholeNumberSeat}</span></p>
//                     <p>جزء المقعد العشري: <span className="font-bold">{candidate.decimalPartSeat.toFixed(2)}</span></p>
//                     <p>أصوات القائمة: <span className="font-bold">{candidate.list_votes}</span></p>
//                     <p>الحد الأدنى: <span className="font-bold">{candidate.threshold.toFixed(2)}</span></p>
//                     <p>الحالة: <span className={`font-bold ${candidate.status === 'Passed' ? 'text-green-600' : 'text-red-600'}`}>{candidate.status === 'Passed' ? 'مقبول' : 'مرفوض'}</span></p>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ElectionResults;