"use client"

import * as React from "react"

import { BookOpen,Keyboard, Bookmark, FilePlus, LayoutGrid  } from "lucide-react";

import { NavMain } from "@/src/components/navMain";
import { NavLogout } from "./navLogout";
import { NavAction } from "@/src/components/navAction";
import { NavUser } from "@/src/components/navUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/codigos",
      icon: LayoutGrid,
    },
    {
      title: "Novo código",
      url: "/novoCodigo",
      icon: FilePlus,
    },
    {
      title: "Favoritados (em breve)",
      url: "#",
      icon: Bookmark,
    },
    {
      title: "ReadMe",
      url: "/readme",
      icon: BookOpen,
    },
  ],
}

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/img/icone.jpg",
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
      <NavUser user={user} />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Keyboard className="!size-5" />
                <span className="text-base font-semibold">Code</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
       
      </SidebarContent>
      <SidebarFooter>
        <NavAction />
        <NavLogout />
      </SidebarFooter>
    </Sidebar>
  )
}
