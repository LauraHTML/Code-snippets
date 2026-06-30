"use client"
import { logout } from "@/src/services/logoutService";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button"
import {
  SidebarMenu,
  SidebarMenuItem
} from "@/src/components/ui/sidebar"

import { LogOut } from "lucide-react";
import { toast } from "sonner"

export function NavLogout() {
    const router = useRouter();

  async function handleLogout(e) {
    e.preventDefault()
  try {
      const response = await logout()
      toast.success(response.titulo, {
        position: "top-center", style: {
          '--normal-bg':
            'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
          '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
          '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
        } as React.CSSProperties
      })
    

      router.replace("/")

    } catch (erro: any) {
      toast.error(`Erro no cadastro: ${erro.titulo}`, {
        description: `${erro.mensagem}`, position: "top-center", style: erro.status === 'erro' ? {
          '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
          '--normal-text': 'var(--destructive)',
          '--normal-border': 'var(--destructive)'
        } as React.CSSProperties : {
          '--normal-bg':
            'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
          '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
          '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
        } as React.CSSProperties
      },)
    
    }
}

  return (
    <SidebarMenu>
      <SidebarMenuItem>
          <div className="grid flex-1 text-left text-sm leading-tight p-4 gap-2">
            
            <Button onClick={handleLogout} size={"lg"}>Sair da conta<LogOut /></Button>
          </div>

      </SidebarMenuItem>
    </SidebarMenu>
  )
}
