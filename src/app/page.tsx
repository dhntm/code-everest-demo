'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import BugList from '@/components/BugList';
import BugFilters from '@/components/BugFilters';
import AddBugForm from '@/components/AddBugForm';
import { useBugs } from '@/hooks/useBugs';
import type { Database } from '@/lib/database.types';

type BugStatus = Database['public']['Enums']['bug_status'];
type Bug = Database['public']['Tables']['bugs']['Row'];

const DEFAULT_STATUSES: BugStatus[] = ['Open', 'In Progress'];

export default function Home() {
  const [isAddBugOpen, setIsAddBugOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<BugStatus[]>(DEFAULT_STATUSES);
  const [editBug, setEditBug] = useState<Bug | undefined>(undefined);
  const { bugs, loading, error, refetch } = useBugs();

  const handleBugSaved = () => {
    setIsAddBugOpen(false);
    setEditBug(undefined);
    refetch();
  };

  const handleEdit = (bug: Bug) => {
    setEditBug(bug);
    setIsAddBugOpen(true);
  };

  const handleClose = () => {
    setIsAddBugOpen(false);
    setEditBug(undefined);
  };

  const filteredBugs = bugs.filter(bug => selectedStatuses.includes(bug.status));

  return (
    <main className="min-h-screen bg-gray-50">
      <Header onAddClick={() => setIsAddBugOpen(true)} />
      <div className="container mx-auto px-4 py-8">
        <BugFilters
          selectedStatuses={selectedStatuses}
          onChange={setSelectedStatuses}
        />
        <BugList 
          bugs={filteredBugs} 
          loading={loading} 
          error={error} 
          onEdit={handleEdit}
        />
      </div>
      <AddBugForm 
        isOpen={isAddBugOpen} 
        onClose={handleClose}
        onSuccess={handleBugSaved}
        editBug={editBug}
      />
    </main>
  );
} 