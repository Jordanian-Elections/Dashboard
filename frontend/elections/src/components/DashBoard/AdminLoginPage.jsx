import React, { useState } from 'react';
import axios from 'axios';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/api/admin/login', { email, password });
      // Handle successful login (e.g., save token, redirect)
      console.log('Login successful:', response.data);
      // For example, you could redirect to the admin dashboard
      // window.location.href = '/admin-dashboard';
    } catch (error) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
      console.error('خطأ في تسجيل الدخول:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page flex items-center justify-center min-h-screen bg-gray-100">
      <div className="login-container bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-4 text-center">تسجيل دخول المدير</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white p-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
