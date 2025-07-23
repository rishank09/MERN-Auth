
import React, { useState, useContext } from 'react';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {

const navigate = useNavigate();

  const { backendUrl, getUserData } = useContext(AppContent);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch(backendUrl + '/api/auth/send-verify-otp', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await res.json();
      data.success ? toast.success(data.message) : toast.error(data.message);
    } catch (error) {
      toast.error('Failed to send OTP');
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    if (!otp) return toast.error('Enter the OTP first');

    setLoading(true);
    try {
      const res = await fetch(backendUrl + '/api/auth/verify-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ otp }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        getUserData(); // refresh user data after successful verification
        setOtp('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Verification failed');
    }
    setLoading(false);

    //doubt ??????????????????????????????????????????????????????????????????????????????????????
    navigate('/'); // redirect to home after verification
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-4">
      <Link
        to="/"

      >
        <img
          src={assets.logo}
          alt="Logo"
          className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
        />
      </Link>
      <h2 className="text-2xl font-semibold mb-4">Verify Your Email</h2>

      <button
        onClick={sendOtp}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded mb-4"
      >
        {loading ? 'Sending OTP...' : 'Send Verification OTP'}
      </button>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="bg-gray-800 border border-gray-600 p-2 rounded w-64 text-white mb-4"
      />

      <button
        onClick={verifyOtp}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded"
      >
        {loading ? 'Verifying...' : 'Verify Email'}
      </button>
    </div>
  );
};

export default EmailVerify;
