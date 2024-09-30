import { TSidebarItem } from '@/types/sidebar.types';
import SidebarItem from './sidebar-item';
import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {
  items: TSidebarItem[];
};

export default function Sidebar({ items }: Props) {
  return (
    <ScrollArea className="h-3/4 w-48 rounded-md mt-8">
      <ul className="sidebar my-4 h-full space-y-2 overflow-y-auto">
        {items.map((item: TSidebarItem) => (
          <SidebarItem href={item.href} title={item.title} key={item.title} />
        ))}
      </ul>
    </ScrollArea>
  );
}
