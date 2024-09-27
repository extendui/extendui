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

export default function MobileSidebar() {
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
        <Sidebar items={sidebarItemsData} />
      </SheetContent>
    </Sheet>
  );
}
