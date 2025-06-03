import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type Bug = Database['public']['Tables']['bugs']['Row'];
type InsertBug = Database['public']['Tables']['bugs']['Insert'];
type UpdateBug = Database['public']['Tables']['bugs']['Update'];

export function useBugs() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBugs = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bugs')
        .select('*')
        .order('priority', { ascending: false });

      if (error) throw error;
      setBugs(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred while fetching bugs');
    } finally {
      setLoading(false);
    }
  }, []);

  const addBug = async (bug: InsertBug) => {
    try {
      const { data, error } = await supabase
        .from('bugs')
        .insert(bug)
        .select()
        .single();

      if (error) throw error;
      setBugs(prev => [...prev, data]);
      return data;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred while adding the bug');
      throw e;
    }
  };

  const updateBug = async (id: number, updates: UpdateBug) => {
    try {
      const { data, error } = await supabase
        .from('bugs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setBugs(prev => prev.map(bug => bug.id === id ? data : bug));
      return data;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred while updating the bug');
      throw e;
    }
  };

  const deleteBug = async (id: number) => {
    try {
      const { error } = await supabase
        .from('bugs')
        .delete()
        .eq('id', id);

      if (error) throw error;
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