"use client"

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/src/components/ui/sidebar"

export function NavUser({
  user,iniciais
}: {
  user: {
    name: string
    email: string
    avatar: string
  },
  iniciais:string
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu className="flex border rounded-xl data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-2">
      <SidebarMenuItem className="flex gap-4">
              <Avatar className="h-8 w-8 rounded-lg grayscale bg-foreground text-sm text-[#2f81f7] rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-foreground text-sm text-primary rounded-lg">{iniciais}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              
      </SidebarMenuItem>
      </SidebarMenu>
  )
}
