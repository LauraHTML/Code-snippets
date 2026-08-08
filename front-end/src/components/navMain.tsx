"use client"

import * as React from "react"

import Link from "next/link"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    titulo: string
    url: string
    icone?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>

        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.titulo}>
              <SidebarMenuButton tooltip={item.titulo}>
                {item.icone && <item.icone />}
                <Link href={item.url}><span>{item.titulo}</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
