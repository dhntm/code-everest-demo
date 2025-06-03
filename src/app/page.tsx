'use client';

import React from 'react';
import Header from '../components/Header';
import BugFilters from '../components/BugFilters';
import BugList from '../components/BugList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-4">Bug Reports</h2>
          <BugFilters />
          <BugList />
        </div>
      </div>
    </main>
  );
} 