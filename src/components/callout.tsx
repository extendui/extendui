import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type Props = {
  icon?: string;
  title?: string;
  children?: React.ReactNode;
}

export function Callout({ title, children, icon, ...props }: Props) {
  return (
    <Alert {...props}>
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
