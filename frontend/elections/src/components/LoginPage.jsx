
// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     try {
//       const response = await axios.post('http://localhost:3001/login', { email, password });
//       sessionStorage.setItem('token', response.data.token);
//       sessionStorage.setItem('role', response.data.role);
//       sessionStorage.setItem('name', response.data.name);

//       window.location.href = response.data.role === 'super' ? '/' : '/admin-dashboard';
//     } catch (error) {
//       setError('Invalid email or password. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-zait from-zait to-zait p-4">
//       <motion.div 
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md"
//       >
//         <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
//           <div className="p-8 space-y-6">
//             <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
//             <p className="text-center text-gray-600">Please sign in to your Dashboard</p>
//             {error && (
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="bg-red-100 border border-gray-200 text-red-700 px-4 py-3 rounded relative"
//                 role="alert"
//               >
//                 <span className="block sm:inline">{error}</span>
//               </motion.div>
//             )}
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="relative">
//                 <FontAwesomeIcon icon={faEnvelope} className="absolute top-3 left-3 text-gray-400" />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zait"
//                   placeholder="Email Address"
//                   required
//                 />
//               </div>
//               <div className="relative">
//                 <FontAwesomeIcon icon={faLock} className="absolute top-3 left-3 text-gray-400" />
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zait"
//                   placeholder="Password"
//                   required
//                 />
//               </div>
//               <motion.button
//                 type="submit"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full px-4 py-3 bg-zait text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center justify-center"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <svg className="animate-spin h-12 w-5 mr-3" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                   </svg>
//                 ) : (
//                   <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
//                 )}
//                 {isLoading ? 'Signing In...' : 'Sign In'}
//               </motion.button>
//             </form>
//           </div>

//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default LoginPage;

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('role', response.data.role);
      sessionStorage.setItem('name', response.data.name);

      window.location.href = response.data.role === 'super' ? '/AdminDashboard' : '/AdminDashboard';
    } catch (error) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zait from-zait to-zait p-4 rtl">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="p-8 space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800">مرحبا بعودتك</h2>
            <p className="text-center text-gray-600">يرجى تسجيل الدخول إلى لوحة التحكم الخاصة بك</p>
            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-100 border border-gray-200 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FontAwesomeIcon icon={faEnvelope} className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zait  ltr"
                  placeholder="عنوان البريد الإلكتروني"
                  required
                />
              </div>
              <div className="relative">
                <FontAwesomeIcon icon={faLock} className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zait ltr"
                  placeholder="كلمة المرور"
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-3 bg-zait text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg className="animate-spin h-12 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                )}
                {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
