'use client';

import React from 'react';
import { Listbox } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import type { Database } from '@/lib/database.types';

type BugStatus = Database['public']['Enums']['bug_status'];

const ALL_STATUSES: BugStatus[] = ['Open', 'In Progress', 'Closed'];

interface BugFiltersProps {
  selectedStatuses: BugStatus[];
  onChange: (statuses: BugStatus[]) => void;
}

export default function BugFilters({ selectedStatuses, onChange }: BugFiltersProps) {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className="relative w-72">
        <Listbox value={selectedStatuses} onChange={onChange} multiple>
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <span className="block truncate">
              {selectedStatuses.length === 0
                ? 'Select statuses'
                : selectedStatuses.length === ALL_STATUSES.length
                ? 'All statuses'
                : `${selectedStatuses.join(', ')}`}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {ALL_STATUSES.map((status) => (
              <Listbox.Option
                key={status}
                value={status}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {status}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
    </div>
  );
} 