import { TSidebarItem } from "@/types/sidebar.types";
import SidebarItem from "./sidebar-item";

type Props = {
  items: TSidebarItem[];
};

export default function Sidebar({ items }: Props) {
  return (
    <div className="relative flex h-full w-64 flex-col justify-between rounded-md bg-white  px-4 shadow-[inset_0_0_5px_rgba(0,0,0,0.1)] shadow-slate-400 dark:bg-zinc-800 dark:shadow-none ">
      <ul className="sidebar my-4 h-full space-y-2 overflow-y-auto">
        {items.map((item: TSidebarItem) => (
          <SidebarItem href={item.href} title={item.title} key={item.title} />
        ))}
      </ul>
    </div>
  );
}
