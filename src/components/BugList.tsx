import React from 'react';
import BugCard from './BugCard';
import type { BugCardProps } from './BugCard';

interface Bug extends BugCardProps {
  id: number;
}

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
    priority: 'Low' as const,
    status: 'In Progress' as const,
    createdOn: 'Jan 11, 2025'
  },
  {
    id: 3,
    title: 'Profile picture not uploading',
    description: 'Users are unable to upload new profile pictures. The upload process gets stuck at 80%.',
    priority: 'Medium' as const,
    status: 'Open' as const,
    createdOn: 'Jan 14, 2025'
  }
] as const;

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