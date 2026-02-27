"use client"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { CircleQuestionMark } from "lucide-react";
import { toast } from "sonner"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu className="border rounded-xl">
      <SidebarMenuItem>
        <DropdownMenu>
          <div className="grid flex-1 text-left text-sm leading-tight p-4 gap-2">
            <div className="flex flex-row justify-between items-center">
              <span className="truncate font-medium">Seção de foco</span>
              <Button
                variant="ghost"
                onClick={() =>
                  toast.info("Organize seu fluxo de trabalho com a Deadline, da mesma desenvolvedora", { position: "top-center" })
                }
              >
                <CircleQuestionMark />
              </Button>
            </div>
            <Button size={"lg"}><Link href={"https://dashboard-estudo.vercel.app"}>Iniciar seção de foco</Link></Button>
          </div>

        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
