import React, { useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/forgot-password', { email });
      setMessage(response.data.message); 
    } catch (error) {
      setMessage(error.response?.data.message || "An error occurred"); 
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex items-center justify-center">
        <img
          src="https://i.pinimg.com/736x/66/92/1e/66921e0deca59d97d1a44de11ae987dd.jpg"
          alt="Forgot Password"
          className="object-cover w-10/12 h-10/12 rounded-l-lg"
        />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl"> 
          <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41644A]"
              />
            </div>
            <button type="submit" className="btn w-full bg-[#41644A] text-white py-3 rounded-lg hover:bg-[#0D4715]  transition duration-200">
              Send Reset Link
            </button>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>} 
          </form>
          <div className="mt-6 text-center">
            <Link to="/auth/sign-in" className="text-[#0D4715] hover:underline">Back to Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
