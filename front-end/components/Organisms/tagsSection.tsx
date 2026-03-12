"use client";
import * as React from "react"
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile"

import { SectionCards } from "@/components/section-cards"
import { ControlePaginacao } from "@/components/Molecules/paginacao"

export interface Tags {
    _id: string,
    titulo: string,
    cor: string,
}

export function TagsSection() {
    const [tags, setTags] = useState<Tags[]>([])
    const isMobile = useIsMobile()
    const [itemsPorPagina, setItemsPorPagina] = useState<number>(4)

    React.useEffect(() => {
        if (isMobile) {
          setItemsPorPagina(2)
        }
      }, [isMobile])

    useEffect(() => {
        async function fetchTags() {
            try {
                const res = await fetch("http://localhost:8080/tags")

                if (!res.ok) {
                    throw new Error("Erro na resposta da API")
                }

                const data: Tags[] = await res.json()
                console.log(data)
                setTags(data)

            } catch (error) {
                console.error("Erro detalhado:", error)
            }

        }
        fetchTags()
    }, [])

    return (
        <>
        <div className="px-4 lg:px-5">
            <div className="bg-card p-4 rounded-md border">
                <h1 className="text-xl mb-3">Tags</h1>
                <div className="gap-3 rounded-xl">
                        <ControlePaginacao
                            items={tags}
                            renderItem={(tag) => (
                                <SectionCards key={tag._id} TituloTag={tag.titulo} />
                            )}
                            itemsPerPage={itemsPorPagina}
                        />
                </div>
            </div>
        </div>
            
        </>
    )
}