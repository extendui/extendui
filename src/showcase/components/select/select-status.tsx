'use client';

import { Dot } from 'lucide-react';

import { Select } from '@/components/extendui/select';

const statuses = [
  { value: 'completed', label: 'Completed', color: 'text-emerald-600' },
  { value: 'in_progress', label: 'In Progress', color: 'text-blue-600' },
  { value: 'pending', label: 'Pending', color: 'text-yellow-500' },
  { value: 'cancelled', label: 'Cancelled', color: 'text-gray-500' },
  { value: 'failed', label: 'Failed', color: 'text-red-600' },
];

export const StatusSelect = () => {
  return (
    <div className="space-y-2">
      <Select defaultValue="completed">
        <Select.Trigger id="select-status" className="w-[180px]">
          <Select.Value placeholder="Select status" />
        </Select.Trigger>
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value}>
              <span className="flex items-center gap-2">
                <Dot
                  className={status.color}
                  width={10}
                  height={10}
                  strokeWidth={20}
                />
                <span className="truncate">{status.label}</span>
              </span>
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  );
};
