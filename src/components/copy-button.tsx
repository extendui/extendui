import { Button } from './ui/button';

export default function CopyButton({
  icon,
  onClick,
}: {
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      variant={'outline'}
      size={'icon'}
      className="h-8 w-8 p-1"
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}
