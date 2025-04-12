import { X } from 'lucide-react';

import { Card } from '../ui/card';

export const BannerPlaceholder = () => {
  return (
    <Card className="border-accent flex h-9 w-[200px] items-center justify-between border-2 px-2">
      <div className="flex items-center">
        <div className="ml-1 h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-200/80" />
        <div className="ml-2.5 h-1.5 w-20 rounded-sm bg-gray-200 dark:bg-gray-200/80" />
      </div>

      <X className="text-accent" size={16} />
    </Card>
  );
};
