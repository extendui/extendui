'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users2,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Sidebar from './sidebar';
import { sidebarItemsData } from '@/constants/sidebarItemsData';
import Logo from './logo';
import { Badge } from '@/components/ui/badge';

type Props = {
  navLinks: { name: string; href: string }[];
};
export default function MobileSidebar({ navLinks }: Props) {
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <Sheet>
      <SheetTrigger asChild className="xl:hidden">
        <Button size="icon" variant={null} className="justify-start">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs xl:hidden">
        <Logo />
        <div className="ml-8 mt-6 flex flex-col items-start justify-start gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={
                link.name === 'Templates'
                  ? 'relative cursor-not-allowed text-muted-foreground'
                  : 'relative text-zinc-600 duration-200 hover:text-zinc-900 dark:text-zinc-200'
              }
            >
              {link.name}
              {link.name === 'Templates' && (
                <Badge
                  variant="outline"
                  className="absolute bottom-2 left-16 rotate-12 border-zinc-500 bg-emerald-400 text-zinc-800"
                >
                  Soon
                </Badge>
              )}
            </Link>
          ))}
        </div>
        <Sidebar items={sidebarItemsData} />
      </SheetContent>
    </Sheet>
  );
}
