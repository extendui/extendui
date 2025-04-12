import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';

export default function ComponentShowcaseCard({
  title,
  description,
  href,
  component,
}: {
  title: string;
  description: string;
  href: string;
  component: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <Card className="group hover:border-accent border-2 shadow-none">
        <CardContent className="flex h-44 flex-col items-center justify-center space-y-2 p-6">
          {component}
        </CardContent>
        <CardFooter className="group-hover:border-t-accent group-hover:bg-accent/30 flex flex-col items-start border-t-2 py-6 group-hover:border-t-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
}
