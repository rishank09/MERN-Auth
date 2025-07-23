import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContent } from '../context/AppContext';

export default function Navbar() {
  const { backendUrl, setUserData, userData, setIsLoggedin } = useContext(AppContent);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(backendUrl + '/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      setUserData(null);
      setIsLoggedin(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 bg-gray-900 border-b border-gray-700">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-28 sm:w-32" />
      </Link>

      {userData ? (
        <div className="relative">
          <img
            src={assets.person_icon}
            alt="Settings"
            className="w-8 h-8 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10">
             {!userData.isAccountVerified &&  <Link
                to="/verify-email"
                className="block px-4 py-2 hover:bg-gray-700 text-gray-200"
              >
                Verify Account
              </Link>}
              
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login">
          <button className="flex items-center gap-2 border border-gray-600 text-gray-200 hover:bg-gray-800 rounded-full px-6 py-2 transition-all duration-300">
            Login
            <img src={assets.arrow_icon} alt="→" className="w-4 h-4" />
          </button>
        </Link>
      )}
    </nav>
  );
}
