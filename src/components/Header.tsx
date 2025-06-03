import React from 'react';

const Header = () => {
  return (
    <header className="bg-[#1a1b26] text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🐰</span>
        <div>
          <h1 className="text-xl font-bold">Bugs Bunny</h1>
          <p className="text-sm text-gray-400">Bug Tracker</p>
        </div>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
        <span>+</span>
        Add New Bug
      </button>
    </header>
  );
};

export default Header; 