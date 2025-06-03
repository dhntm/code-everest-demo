'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import BugList from '@/components/BugList';
import AddBugForm from '@/components/AddBugForm';
import { useBugs } from '@/hooks/useBugs';

export default function Home() {
  const [isAddBugOpen, setIsAddBugOpen] = useState(false);
  const { bugs, loading, error, refetch } = useBugs();

  const handleBugAdded = () => {
    setIsAddBugOpen(false);
    refetch();
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header onAddClick={() => setIsAddBugOpen(true)} />
      <div className="container mx-auto px-4 py-8">
        <BugList bugs={bugs} loading={loading} error={error} />
      </div>
      <AddBugForm 
        isOpen={isAddBugOpen} 
        onClose={() => setIsAddBugOpen(false)}
        onSuccess={handleBugAdded}
      />
    </main>
  );
} 