import { Card } from '../ui/card';

export const FormsPlaceholder = () => {
  return (
    <Card className="border-accent w-[180px] border-2">
      <div className="flex flex-col justify-center p-4">
        <div className="items-start space-y-2">
          <div className="mb-4 h-1.5 w-2/5 rounded-sm bg-gray-200 dark:bg-gray-200/80" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-1.5 rounded-sm bg-gray-200 dark:bg-gray-200/80" />
            <div className="h-1.5 rounded-sm bg-gray-200 dark:bg-gray-200/80" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-1.5 rounded-sm bg-gray-200 dark:bg-gray-200/80" />
            <div className="h-1.5 rounded-sm bg-gray-200 dark:bg-gray-200/80" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-1.5 rounded-sm bg-gray-200 dark:bg-gray-200/80" />
            <div className="h-1.5 rounded-sm bg-gray-200 dark:bg-gray-200/80" />
          </div>
        </div>
        <div className="flex items-end justify-end space-y-3">
          <div className="bg-accent mt-4 h-2 w-3/12 rounded-xl" />
        </div>
      </div>
    </Card>
  );
};
