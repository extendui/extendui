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
      <Card>
        <CardContent className="flex min-h-44 flex-col items-center justify-center space-y-2 p-6">
          {component}
        </CardContent>
        <CardFooter className="flex flex-col items-start border-t py-6">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
}
