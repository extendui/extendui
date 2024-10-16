import { Icons } from "@/components/icons/icons"

export type NavItem = {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
}

export type NavItemWithChildren = {
  items: NavItemWithChildren[]
} & NavItem

export type MainNavItem = NavItem

export type SidebarNavItem = NavItemWithChildren & {
  items: (NavItemWithChildren & {
    items?: {
      title: string
      href: string
    }[]
  })[]
}