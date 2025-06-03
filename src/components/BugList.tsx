'use client';

import React from 'react';
import { Pencil } from 'lucide-react';
import type { Database } from '@/lib/database.types';

type Bug = Database['public']['Tables']['bugs']['Row'];

interface BugListProps {
  bugs: Bug[];
  loading: boolean;
  error: string | null;
  onEdit: (bug: Bug) => void;
}

const getPriorityWeight = (priority: Bug['priority']): number => {
  switch (priority) {
    case 'Critical':
      return 4;
    case 'High':
      return 3;
    case 'Medium':
      return 2;
    case 'Low':
      return 1;
    default:
      return 0;
  }
};

const getPriorityColor = (priority: Bug['priority']): string => {
  switch (priority) {
    case 'Critical':
      return 'bg-red-100 text-red-800';
    case 'High':
      return 'bg-orange-100 text-orange-800';
    case 'Medium':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: Bug['status']): string => {
  switch (status) {
    case 'Open':
      return 'bg-green-100 text-green-800';
    case 'In Progress':
      return 'bg-purple-100 text-purple-800';
    case 'Closed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const BugList = ({ bugs, loading, error, onEdit }: BugListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-800 bg-red-100 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title & Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bugs.map((bug) => (
            <tr key={bug.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button
                    onClick={() => onEdit(bug)}
                    className="p-1 rounded-full hover:bg-gray-100 mr-3"
                    title="Edit bug"
                  >
                    <Pencil className="h-4 w-4 text-gray-500" />
                  </button>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{bug.title}</div>
                    <div className="text-sm text-gray-500">{bug.description}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(bug.priority)}`}>
                  {bug.priority}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(bug.status)}`}>
                  {bug.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(bug.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BugList; 