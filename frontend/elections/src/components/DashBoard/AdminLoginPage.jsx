// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const AdminLoginPage = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');

// //     try {
// //       const response = await axios.post('http://localhost:3001/api/admin/login', { email, password });
// //       // Handle successful login (e.g., save token, redirect)
// //       console.log('Login successful:', response.data);
// //       // For example, you could redirect to the admin dashboard
// //       // window.location.href = '/admin-dashboard';
// //     } catch (error) {
// //       setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
// //       console.error('خطأ في تسجيل الدخول:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="login-page flex items-center justify-center min-h-screen bg-gray-100">
// //       <div className="login-container bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
// //         <h1 className="text-2xl font-semibold mb-4 text-center">تسجيل دخول المدير</h1>
// //         {error && <p className="text-red-500 mb-4">{error}</p>}
// //         <form onSubmit={handleLogin}>
// //           <div className="mb-4">
// //             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
// //             <input
// //               type="email"
// //               id="email"
// //               name="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //               className="border border-gray-300 p-2 w-full rounded-md"
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
// //             <input
// //               type="password"
// //               id="password"
// //               name="password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //               className="border border-gray-300 p-2 w-full rounded-md"
// //             />
// //           </div>
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className={`w-full bg-blue-500 text-white p-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
// //           >
// //             {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminLoginPage;


// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';

// // Replace with your own publishable key
// const stripePromise = loadStripe('pk_test_51PnmyzLnJej27waJMLMa1v5bytDTIMqPrzKtmEsLslorjlsqAe7WKblwcWJ8ZKyKcixgSPtuPQVp5nW9tRTt44s400crytM4qt');

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [processing, setProcessing] = useState(false);
//   const [succeeded, setSucceeded] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setProcessing(true);
//     setError('');

//     // Default amount in cents (200 dollars)
//     const amountInCents = 200;

//     try {
//       const response = await axios.post('http://localhost:3001/payments/create-payment-intent', { amount: amountInCents, currency: 'usd' });
//       const { error: backendError, clientSecret } = response.data;

//       if (backendError) {
//         setError(backendError);
//         setProcessing(false);
//         return;
//       }

//       const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: { email },
//         },
//       });

//       if (stripeError) {
//         setError(stripeError.message);
//       } else if (paymentIntent.status === 'succeeded') {
//         setSucceeded(true);
//       }

//       setProcessing(false);
//     } catch (error) {
//       console.error('Error:', error.message);
//       setError('حدث خطأ أثناء معالجة الدفع.');
//       setProcessing(false);
//     }
//   };

//   return (
//     <div className="checkout-page flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="checkout-container bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-semibold mb-4 text-center">إتمام الدفع</h1>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="border border-gray-300 p-2 w-full rounded-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">تفاصيل بطاقة الدفع</label>
//             <CardElement className="border border-gray-300 p-2 w-full rounded-md" />
//           </div>
//           <button
//             type="submit"
//             disabled={!stripe || processing || succeeded}
//             className={`w-full bg-blue-500 text-white p-2 rounded-md ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {processing ? 'جاري معالجة الدفع...' : 'ادفع الآن'}
//           </button>
//           {succeeded && <p className="text-green-500 mt-4 text-center">تمت عملية الدفع بنجاح!</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// const PaymentComponent = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
// };

// export default PaymentComponent;


// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';

// // Replace with your own publishable key
// const stripePromise = loadStripe('pk_test_51PnmyzLnJej27waJMLMa1v5bytDTIMqPrzKtmEsLslorjlsqAe7WKblwcWJ8ZKyKcixgSPtuPQVp5nW9tRTt44s400crytM4qt');

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [processing, setProcessing] = useState(false);
//   const [succeeded, setSucceeded] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setProcessing(true);
//     setError('');

//     // Default amount in cents (200 dollars)
//     const amountInCents = 200;

//     try {
//       const response = await axios.post('http://localhost:3001/payments/create-payment-intent', { amount: amountInCents, currency: 'usd' });
//       const { error: backendError, clientSecret } = response.data;

//       if (backendError) {
//         setError(backendError);
//         setProcessing(false);
//         return;
//       }

//       const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: { email },
//         },
//       });

//       if (stripeError) {
//         setError(stripeError.message);
//       } else if (paymentIntent.status === 'succeeded') {
//         setSucceeded(true);
//       }

//       setProcessing(false);
//     } catch (error) {
//       console.error('Error:', error.message);
//       setError('حدث خطأ أثناء معالجة الدفع.');
//       setProcessing(false);
//     }
//   };

//   return (
//     <div className="checkout-page flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="checkout-container bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">إتمام الدفع</h1>
//         {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
//         {succeeded && <p className="text-green-600 mb-4 text-center">تمت عملية الدفع بنجاح!</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-6">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="border border-gray-300 p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">تفاصيل بطاقة الدفع</label>
//             <CardElement 
//               className="border border-gray-300 p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               options={{
//                 style: {
//                   base: {
//                     fontSize: '16px',
//                     color: '#424770',
//                     '::placeholder': {
//                       color: '#aab7c4',
//                     },
//                   },
//                   invalid: {
//                     color: '#9e2146',
//                   },
//                 },
//               }}
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={!stripe || processing || succeeded}
//             className={`w-full py-3 px-4 rounded-md text-white ${processing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200`}
//           >
//             {processing ? 'جاري معالجة الدفع...' : 'ادفع الآن'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// const PaymentComponent = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
// };

// export default PaymentComponent;


import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Replace with your own publishable key
const stripePromise = loadStripe('pk_test_51PnmyzLnJej27waJMLMa1v5bytDTIMqPrzKtmEsLslorjlsqAe7WKblwcWJ8ZKyKcixgSPtuPQVp5nW9tRTt44s400crytM4qt');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError('');

    // Default amount in cents (200 dollars)
    const amountInCents = 200;

    try {
      const response = await axios.post('http://localhost:3001/payments/create-payment-intent', { amount: amountInCents, currency: 'usd' });
      const { error: backendError, clientSecret } = response.data;

      if (backendError) {
        setError(backendError);
        setProcessing(false);
        return;
      }

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { email },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === 'succeeded') {
        setSucceeded(true);
      }

      setProcessing(false);
    } catch (error) {
      console.error('Error:', error.message);
      setError('حدث خطأ أثناء معالجة الدفع.');
      setProcessing(false);
    }
  };

  return (
    <div className="checkout-page flex items-center justify-center min-h-screen bg-gray-50 rtl">
      <div className="checkout-container bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">إتمام الدفع</h1>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        {succeeded && <p className="text-green-600 mb-4 text-center">تمت عملية الدفع بنجاح!</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">تفاصيل بطاقة الدفع</label>
            <CardElement 
              className="border border-gray-300 p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!stripe || processing || succeeded}
            className={`w-full py-3 px-4 rounded-md text-white ${processing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200`}
          >
            {processing ? 'جاري معالجة الدفع...' : 'ادفع الآن'}
          </button>
        </form>
      </div>
    </div>
  );
};

const PaymentComponent = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentComponent;
