import React from 'react';
import type { Bug } from '../types/bug';

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

const mockBugs: Bug[] = [
  {
    id: 1,
    title: 'Typo on about page',
    description: 'There is a typo in the company description on the about page.',
    priority: 'Low' as const,
    status: 'Closed' as const,
    createdOn: 'Jan 10, 2025'
  },
  {
    id: 2,
    title: 'Broken links in documentation',
    description: 'Several links in the API documentation section are broken or pointing to the wrong pages.',
    priority: 'High' as const,
    status: 'In Progress' as const,
    createdOn: 'Jan 11, 2025'
  },
  {
    id: 3,
    title: 'Profile picture not uploading',
    description: 'Users are unable to upload new profile pictures. The upload process gets stuck at 80%.',
    priority: 'Critical' as const,
    status: 'Open' as const,
    createdOn: 'Jan 14, 2025'
  }
].sort((a, b) => getPriorityWeight(b.priority) - getPriorityWeight(a.priority));

const BugList = () => {
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
              Created On
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockBugs.map((bug) => (
            <tr key={bug.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{bug.title}</div>
                <div className="text-sm text-gray-500">{bug.description}</div>
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
                {bug.createdOn}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BugList; 