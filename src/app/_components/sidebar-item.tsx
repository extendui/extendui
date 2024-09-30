"use client";

import { cn } from "@/lib/utils";
import { SidebarNavItem } from "@/types/nav.types";
import Link from "next/link";

type Props = {
  items: SidebarNavItem[]
  pathname: string | null
}


export default function SidebarItem({ items, pathname }: Props) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-md">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
              item.disabled && "cursor-not-allowed opacity-60",
              pathname === item.href
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-emerald-400 px-1.5 py-0.5 text-xs leading-none text-white no-underline group-hover:no-underline dark:text-black">
                {item.label}
              </span>
            )}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
              item.disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </span>
        )
      )}
    </div>
  ) : null
}
