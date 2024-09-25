"use client";

import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  title: string;
};

export default function SidebarItem({ href, title }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref>
      <li
        className={`flex w-full cursor-pointer items-center justify-between mb-1 p-1 pl-2  font-normal text-slate-600 hover:text-slate-900 hover:font-semibold ${isActive ? "font-semibold" : ""} dark:text-zinc-200 dark:hover:bg-zinc-700`}
      >
        <span className="ml-3 text-sm">{capitalizeFirstLetter(title)}</span>
      </li>
    </Link>
  );
}
