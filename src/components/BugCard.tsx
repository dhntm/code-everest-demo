import React from 'react';

export interface BugCardProps {
  title: string;
  description: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Closed';
  createdOn: string;
}

const BugCard = ({ title, description, priority, status, createdOn }: BugCardProps) => {
  const getPriorityColor = (priority: string) => {
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

  const getStatusColor = (status: string) => {
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

  return (
    <div className="border rounded-lg p-4 mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded-md text-sm ${getPriorityColor(priority)}`}>
            {priority}
          </span>
          <span className={`px-2 py-1 rounded-md text-sm ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
      </div>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-sm text-gray-400">Created on {createdOn}</p>
    </div>
  );
};

export default BugCard; 