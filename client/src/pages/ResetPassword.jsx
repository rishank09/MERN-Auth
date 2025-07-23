import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const sendOtp = async () => {
    if (!email) return toast.error("Email is required");

    try {
      const res = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      res.data.success ? (toast.success(res.data.message), setOtpSent(true)) : toast.error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const resetPassword = async () => {
    if (!email || !otp || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post(`${backendUrl}/api/auth/reset-password`, {
        email, otp, newPassword
      });
      res.data.success ? toast.success(res.data.message) : toast.error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
    navigate('/login'); // Redirect to login after password reset
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link to="/">
        <img
          src={assets.logo}
          alt="Logo"
          className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
        />
      </Link>

      <h1 className="text-3xl font-semibold mb-4">Reset Password</h1>

      <div className="bg-gray-800 p-6 rounded-lg w-80 space-y-4">
        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!otpSent ? (
          <button className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded" onClick={sendOtp}>
            Send OTP
          </button>
        ) : (
          <>
            <input
              className="w-full p-2 rounded bg-gray-700 text-white"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              className="w-full p-2 rounded bg-gray-700 text-white"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              className="w-full p-2 rounded bg-gray-700 text-white"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="w-full p-2 bg-green-600 hover:bg-green-700 rounded" onClick={resetPassword}>
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
