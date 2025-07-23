import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] pt-4">
        <Header />
      </div>
    </div>
  );
}