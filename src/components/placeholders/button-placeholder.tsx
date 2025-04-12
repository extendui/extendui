import { Card } from '../ui/card';

export const ButtonPlaceholder = () => {
  return (
    <Card className="border-accent flex h-9 w-[120px] items-center justify-center border-2">
      <div className="h-1.5 w-16 rounded-sm bg-gray-200 dark:bg-gray-200/80" />
    </Card>
  );
};
