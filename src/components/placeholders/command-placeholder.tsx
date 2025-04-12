import { ChevronDown } from 'lucide-react';

import { Card } from '../ui/card';

export const CommandPlaceholder = () => {
  return (
    <Card className="border-accent flex h-9 w-[200px] items-center justify-between border-2 px-2">
      <div className="ml-1 h-1.5 w-24 rounded-sm bg-gray-200 dark:bg-gray-200/80" />
      <div>
        <ChevronDown className="text-accent" size={16} />
      </div>
    </Card>
  );
};
