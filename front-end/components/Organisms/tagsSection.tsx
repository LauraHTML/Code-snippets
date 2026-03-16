"use client";
import * as React from "react"
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile"

import { Badge } from "@/components/ui/badge";

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
            <div className="bg-card p-4 rounded-md border">
                <h1 className="text-xl mb-3">Tags criadas</h1>
                <div className="flex flex-row w-auto flex-wrap gap-3 rounded-xl">
                    {tags.map((tag) => (
                        <Badge style={{"backgroundColor":tag.cor}} className="text-background">{tag.titulo}</Badge>
                    ))}
                        
                </div>
            </div>
            
        </>
    )
}