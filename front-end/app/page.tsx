"use client";

import { useEffect, useState } from "react";

import { AppSidebar } from "@/components/app-sidebar";

export interface Snippet {
  _id: string
  titulo: string
  linguagem: string
  codigo: string
  tags?: string | { titulo: string; cor: string; _id: string }[]
  dataCriacao: string
}


import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { Tabela } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { TagsSection } from "@/components/Organisms/tagsSection";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";


export default function Home() {

  const [snippets, setSnippets] = useState<Snippet[]>([])

  useEffect(() => {
    async function fetchSnippets() {
      try {
        const res = await fetch("http://localhost:8080/codigos")

        if (!res.ok) {
          throw new Error("Erro na resposta da API")

        }

        const data: Snippet[] = await res.json()
        setSnippets(data)

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
              <div className="px-4 lg:px-6">
                <div>
                  <p>olalal</p>
                  {snippets.map(snippet => (
                    <div key={snippet._id}>
                      <h2>{snippet.titulo}</h2>
                      <p>{snippet.linguagem}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Tabela data={snippets} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
