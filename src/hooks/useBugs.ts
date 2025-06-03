import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type Bug = Database['public']['Tables']['bugs']['Row'];
type InsertBug = Database['public']['Tables']['bugs']['Insert'];
type UpdateBug = Database['public']['Tables']['bugs']['Update'];
type BugPriority = Database['public']['Enums']['bug_priority'];

const PRIORITY_ORDER: Record<BugPriority, number> = {
  'Critical': 4,
  'High': 3,
  'Medium': 2,
  'Low': 1
} as const;

const sortBugs = (a: Bug, b: Bug) => {
  // First sort by priority
  const priorityDiff = PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
  if (priorityDiff !== 0) return priorityDiff;
  
  // If priority is the same, sort by creation date (newest first)
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
};

export function useBugs() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBugs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('bugs')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      
      // Sort bugs by priority and then by creation date
      const sortedBugs = (data || []).sort(sortBugs);
      setBugs(sortedBugs);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred while fetching bugs');
      setBugs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addBug = async (bug: InsertBug) => {
    try {
      setError(null);
      const { data, error: insertError } = await supabase
        .from('bugs')
        .insert(bug)
        .select()
        .single();

      if (insertError) throw insertError;
      
      // Update local state with proper sorting
      setBugs(prev => {
        const newBugs = [data, ...prev];
        return newBugs.sort(sortBugs);
      });
      return data;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred while adding the bug');
      throw e;
    }
  };

  const updateBug = async (id: number, updates: UpdateBug) => {
    try {
      setError(null);
      const { data, error: updateError } = await supabase
        .from('bugs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;
      
      // Update local state with proper sorting
      setBugs(prev => {
        const newBugs = prev.map(bug => bug.id === id ? data : bug);
        return newBugs.sort(sortBugs);
      });
      return data;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred while updating the bug');
      throw e;
    }
  };

  const deleteBug = async (id: number) => {
    try {
      setError(null);
      const { error: deleteError } = await supabase
        .from('bugs')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      
      // Update local state
      setBugs(prev => prev.filter(bug => bug.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred while deleting the bug');
      throw e;
    }
  };

  useEffect(() => {
    fetchBugs();
  }, [fetchBugs]);

  return {
    bugs,
    loading,
    error,
    addBug,
    updateBug,
    deleteBug,
    refetch: fetchBugs
  };
} 