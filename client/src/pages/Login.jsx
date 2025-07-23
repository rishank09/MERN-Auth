import React, { useState } from 'react';
import { assets } from '../assets/assets'; // make sure this path is correct
import { Link , useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContent } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';



export default function Login() {

    const navigate = useNavigate();

  const [state, setState] = useState('Sign Up');
  const [name, setname] = useState('');
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('');

  const { backendUrl, setIsLoggedin ,getUserData} = useContext(AppContent);

  const [loading, setLoading] = useState(false);


const onSubmitHandler = async (e) => {
  e.preventDefault();
  axios.defaults.withCredentials = true;
  setLoading(true);
  try {
    if (state === 'Sign Up') {
      const { data } = await axios.post(backendUrl + '/api/auth/register', {
        name,
        email,
        password
      });

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }

    } else {
      const { data } = await axios.post(backendUrl + '/api/auth/login', {
        email,
        password
      });

      if (data.success) {
        setIsLoggedin(true);
        getUserData()
        navigate('/');
      } else {
        toast.error(data.message);
      }
    }

  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
  setLoading(false);
};



  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative'>
      <Link
        to="/"

      >
        <img
          src={assets.logo}
          alt="Logo"
          className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
        />
      </Link>


      <div className='bg-gray-800 px-8 py-10 rounded-xl shadow-xl w-full max-w-md'>
        <h2 className='text-2xl font-semibold mb-2 text-white'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className='text-gray-400 mb-6'>
          {state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}
        </p>

        <form 
        onSubmit={onSubmitHandler}
        className="space-y-4">
          {/* Full Name - only in Sign Up */}
          {state === 'Sign Up' && (
            <div className='flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-700'>
              <img src={assets.person_icon} alt="" className="w-5 h-5" />
              <input
                onChange={e=> setname(e.target.value)}
                value={name}
                className='bg-transparent outline-none text-white placeholder-gray-400 w-full'
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          {/* Email */}
          <div className='flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-700'>
            <img src={assets.mail_icon} alt="" className="w-5 h-5" />
            <input
             onChange={e=> setemail(e.target.value)}
                value={email}
              className='bg-transparent outline-none text-white placeholder-gray-400 w-full'
              type="email"
              placeholder="Email"
              required
            />
          </div>

          {/* Password */}
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-700'>
              <img src={assets.lock_icon} alt="" className="w-5 h-5" />
              <input
               onChange={e=> setpassword(e.target.value)}
                value={password}
                className='bg-transparent outline-none text-white placeholder-gray-400 w-full'
                type="password"
                placeholder="Password"
                required
              />
            </div>


          </div>

          {/* Submit Button */}
          <button className='w-full py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-all mt-4'>
            {state === 'Sign Up' ? 'Sign Up' : 'Login'}
          </button>

          {/* Forgot Password link */}
          {state === 'Login' && (
            <div className='text-center'>
              <Link
                to="/reset-password"
                className="text-sm text-blue-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          )}
        </form>

        {/* Toggle Login/Sign Up */}
        <div className='text-center text-sm text-gray-400 mt-6'>
          {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
            className='text-blue-400 ml-1 hover:underline'
          >
            {state === 'Sign Up' ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}
