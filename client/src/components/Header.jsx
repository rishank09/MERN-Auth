import React from 'react';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { AppContent } from '../context/AppContext';

const Header = () => {
  const { userData } = useContext(AppContent);

  return (
    <div className="flex flex-col items-center mt-16 px-4 text-center">
      {/* Eye-catching Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-400 drop-shadow mb-5">
        AuthX Playground
      </h1>

     
      {/* Profile Image */}
      <img
        src={assets.header_img}
        alt="User"
        className="w-30 h-30 sm:w-40 sm:h-40 rounded-full border-2 border-gray-600 shadow-lg mb-4"
      />

      {/* Greeting */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-1">
        Hey {userData ? `${userData.name} 👋` : 'Developer 👋'}
      </h2>
 {/* Verified Badge */}
      {userData && userData.isAccountVerified && (
        <span className="text-green-400 text-sm font-medium mb-2">
          ✅ Your account is verified
        </span>
      )}

 {/* Subtitle */}
      <p className="text-gray-400 text-sm sm:text-base max-w-xl mb-8 leading-relaxed">
        A minimal authentication-focused demo project built using <span className="text-yellow-300 font-medium">Express.js</span>.
        Learn how user login, signup, OTP-based email verification, and password reset flows work — with clean UI and backend integration. 🚀
      </p>

     

      {/* Footer Note */}
      <p className="text-gray-500 text-xs mt-4 max-w-md">
        This project doesn't do anything fancy. It’s built purely to help you <span className="text-blue-300">understand how authentication works</span> behind the scenes using Express, MongoDB, and React.
      </p>
    </div>
  );
};

export default Header;
