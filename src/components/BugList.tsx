import React from 'react';
import BugCard from './BugCard';
import type { BugCardProps } from './BugCard';

interface Bug extends BugCardProps {
  id: number;
}

const getPriorityWeight = (priority: BugCardProps['priority']): number => {
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
    <div className="space-y-4">
      {mockBugs.map(({ id, ...bugProps }) => (
        <BugCard
          key={id}
          {...bugProps}
        />
      ))}
    </div>
  );
};

export default BugList; 