'use client';

import React from 'react';
import Header from '@/components/Header';
import BugFilters from '../components/BugFilters';
import BugList from '@/components/BugList';
import AddBugForm from '@/components/AddBugForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <BugList />
          </div>
          <div>
            <AddBugForm />
          </div>
        </div>
      </div>
    </main>
  );
} 