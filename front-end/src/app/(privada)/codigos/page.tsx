"use client";
import { useState, useEffect } from "react";

import { listarCodigos, criarCodigo, atualizarCodigo, deletarCodigo } from "@/src/services/codigosService"

import { AppSidebar } from "@/src/components/appSidebar";
import { Tabela } from "@/src/components/Organisms/tabela";
import { columns, TCodigos } from "@/src/components/Molecules/colunas";
import { toast } from "sonner";

import { SiteHeader } from "@/src/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/src/components/ui/sidebar";
import { LinguagensBadge } from "@/src/components/Molecules/linguagensBadge";

export interface Tags {
  _id: string,
  titulo: string,
  cor: string,
}

export default function Home() {

  const [codigos, setCodigos] = useState<TCodigos[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const Codigos = async () => {
      try {
        setLoading(true);
        const res = await listarCodigos();
        setCodigos(res);
        console.log(codigos)

        if (!res.ok) {
          throw new Error("Erro ao listar códigos");
        }
      }
      catch (erro: any) {
        setErro(`Erro ao listar códigos: ${erro.mensagem}`);
      }
      finally {
        setLoading(false);
      }
    }
    Codigos();
  }, []);

  const DeletarCodigo = async (id: string) => {
    const res = await fetch(`http://localhost:8080/codigos/${id}`, {
      method: 'DELETE',
      credentials: "include",
    });

    if (res.ok) {
      toast.success("Código deletado com sucesso!", {
        position: "top-center", style: {
          '--normal-bg':
            'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
          '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
          '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
        } as React.CSSProperties
      })
      setCodigos(prev => prev.filter(c => c._id !== id))

    } else {
      toast.error("Erro ao deletar código", {
        position: "top-center", style: {
          '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
          '--normal-text': 'var(--destructive)',
          '--normal-border': 'var(--destructive)'
        } as React.CSSProperties
      })
    }
  }

  const AtualizarCodigo = async (data: TCodigos) => {

    const res = await fetch(`http://localhost:8080/codigos/${data._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify({
        titulo: data.titulo,
        codigo: data.codigo,
        linguagem: data.linguagem,
        tags: [data.tags]
      })
    });

    if (res.ok) {
      toast.success("Código atualizado com sucesso!", {
        position: "top-center", style: {
          '--normal-bg':
            'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
          '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
          '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
        } as React.CSSProperties
      })
      setCodigos(prev => prev.map(c => c._id === data._id ? data : c))

    } else {
      toast.error("Erro ao atualizar código", {
        position: "top-center", style: {
          '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
          '--normal-text': 'var(--destructive)',
          '--normal-border': 'var(--destructive)'
        } as React.CSSProperties
      })
    }
  }

  const tableColumns = columns(AtualizarCodigo, DeletarCodigo)

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
          <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-5">

            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

              <div className="grid grid-cols-1 md:grid-cols-[50%_50%] gap-4">
                {/* <TagsSection /> */}

                <div className="bg-card p-4 rounded-md border">
                  <h1 className="text-xl mb-3">Linguagens utilizadas</h1>
                  <div className="flex flex-row w-auto flex-wrap gap-3 rounded-xl">
                    {codigos.map(codigo =>
                      <LinguagensBadge key={codigo._id} linguagem={codigo.linguagem} />
                    )}
                  </div>
                </div>
              </div>

              <Tabela columns={tableColumns} data={codigos} onDelete={DeletarCodigo} atualizar={AtualizarCodigo} />

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
