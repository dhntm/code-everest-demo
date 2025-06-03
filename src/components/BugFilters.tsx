import React from 'react';

interface FilterButton {
  label: string;
  count: number;
  active?: boolean;
}

const FilterButton = ({ label, count, active = false }: FilterButton) => (
  <button
    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
      active ? 'bg-gray-200' : 'hover:bg-gray-100'
    }`}
  >
    <span className={`w-2 h-2 rounded-full ${
      label === 'Critical' ? 'bg-red-500' :
      label === 'High' ? 'bg-orange-500' :
      label === 'Medium' ? 'bg-blue-500' :
      'bg-gray-500'
    }`}></span>
    {label}: {count}
  </button>
);

const BugFilters = () => {
  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex gap-2">
        <FilterButton label="Critical" count={2} />
        <FilterButton label="High" count={2} />
        <FilterButton label="Medium" count={2} />
        <FilterButton label="Low" count={2} />
      </div>
      <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
        <span>↕️</span>
        Sort by Criticality
      </button>
    </div>
  );
};

export default BugFilters; 