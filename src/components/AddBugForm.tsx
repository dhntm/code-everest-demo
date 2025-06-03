'use client';

import React, { useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/supabaseClient';
import type { Database } from '@/lib/database.types';

type Bug = Database['public']['Tables']['bugs']['Row'];
type BugPriority = Database['public']['Enums']['bug_priority'];
type BugStatus = Database['public']['Enums']['bug_status'];

const PRIORITIES: BugPriority[] = ['Critical', 'High', 'Medium', 'Low'];
const STATUSES: BugStatus[] = ['Open', 'In Progress', 'Closed'];

interface AddBugFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editBug?: Bug;
}

interface FormData {
  title: string;
  description: string;
  priority: BugPriority;
  status: BugStatus;
}

export default function AddBugForm({ isOpen, onClose, onSuccess, editBug }: AddBugFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  useEffect(() => {
    if (editBug) {
      setValue('title', editBug.title);
      setValue('description', editBug.description);
      setValue('priority', editBug.priority);
      setValue('status', editBug.status);
    } else {
      reset({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Open'
      });
    }
  }, [editBug, setValue, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (editBug) {
        const { error } = await supabase
          .from('bugs')
          .update({
            title: data.title,
            description: data.description,
            priority: data.priority,
            status: data.status,
          })
          .eq('id', editBug.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('bugs')
          .insert([{
            title: data.title,
            description: data.description,
            priority: data.priority,
            status: data.status,
          }]);

        if (error) throw error;
      }

      reset();
      onSuccess();
    } catch (error) {
      console.error('Error saving bug:', error);
      alert('Failed to save bug. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded bg-white p-6 w-full">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
            {editBug ? 'Edit Bug' : 'Add New Bug'}
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : ''
                }`}
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : ''
                }`}
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                id="priority"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                {...register('priority')}
              >
                {PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                {...register('status')}
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isSubmitting ? 'Saving...' : editBug ? 'Save Changes' : 'Add Bug'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 