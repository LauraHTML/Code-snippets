"use client";
import { useEffect, useState } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { Tabela } from "@/components/tabela";
import { columns, TCodigos } from "@/components/colunas";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { TagsSection } from "@/components/Organisms/tagsSection";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export interface Tags {
   _id: string,
  titulo: string,
  cor: string,
}

export default function Home() {

  const [codigos, setCodigos] = useState<TCodigos[]>([])

  useEffect(() => {
    async function fetchSnippets() {
      try {
        const res = await fetch("http://localhost:8080/codigos")

        if (!res.ok) {
          throw new Error("Erro na resposta da API")

        }

        const data: TCodigos[] = await res.json()
        console.log(data)
        setCodigos(data)

      } catch (error) {
        console.error("Erro detalhado:", error)
      }

    }
    fetchSnippets()
  }, [])


  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <TagsSection />
              <div className="px-4 lg:px-5">
               <Tabela columns={columns} data={snippets} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
