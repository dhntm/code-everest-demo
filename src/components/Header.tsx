'use client';

import React from 'react';

interface HeaderProps {
  onAddClick: () => void;
}

const Header = ({ onAddClick }: HeaderProps) => {
  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 text-white">
            <img src="/bunny.svg" alt="Bugs Bunny Logo" className="w-full h-full" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Bugs Bunny</h1>
            <p className="text-sm text-gray-400">Bug Tracker</p>
          </div>
          <div className="flex-grow"></div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            onClick={onAddClick}
          >
            <span className="text-lg">+</span>
            <span>Add New Bug</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 