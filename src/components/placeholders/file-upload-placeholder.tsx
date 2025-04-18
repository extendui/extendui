import { Upload } from 'lucide-react';

import { Card } from '../ui/card';

export const FileUploadPlaceholder = () => {
  return (
    <Card className="border-accent w-[180px] border-2">
      <div className="space-y-3 p-6">
        <div className="flex h-10 w-full items-center justify-center rounded border-2 border-dashed border-gray-200 dark:border-gray-200/80">
          <Upload className="text-accent" />
        </div>
      </div>
    </Card>
  );
};
