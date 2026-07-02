"use client"
import { useState, useEffect } from "react";
import * as React from "react"

import { BookOpen, Keyboard, Bookmark, FilePlus, LayoutGrid } from "lucide-react";

import { usuario } from "@/src/services/userService";

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState({
    name: "Usuário",
    email: "Carregando...",
    avatar: "/img/icone.jpg",
  });
  const [iniciaisNome, setIniciasNome] = useState("")

  const formatarPrimeiroNome = (nome?: string) => {
    if (!nome) return "Usuário";
    return nome.trim().split(/\s+/)[0];
  };

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const res = await usuario();
        
        const nomeUsuario = res?.usuario?.nome;
        setIniciasNome(typeof nomeUsuario === "string" && nomeUsuario.trim() ? nomeUsuario.trim().slice(0, 2).toUpperCase() : "US");

        setUser({
          name: formatarPrimeiroNome(res?.usuario?.nome),
          email: res?.usuario?.email ?? "Email não disponível",
          avatar: "/img/icone.jpg",
        });
      } catch (erro: any) {
        console.error("Erro ao carregar usuário da sidebar:", erro);
        setUser((current) => ({
          ...current,
          name: "Usuário",
          email: "Email não disponível",
        }));
      }
    };

    carregarUsuario();
  }, []);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <NavUser user={user} iniciais={iniciaisNome} />
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
