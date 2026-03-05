"use client";
import { useEffect, useState } from "react";

import { SectionCards } from "@/components/section-cards"

export interface Tags {
    _id: string,
    titulo: string,
    cor: string,
}

export function TagsSection() {
    const [tags, setTags] = useState<Tags[]>([])

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
            <div className="py-3 px-4">
                <h1 className="text-xl">Tags</h1>
                <div className="gap-3 bg-card p-4 rounded-xl">
                    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-5 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-5 @5xl/main:grid-cols-4"> 
                    
                    {tags.map((tag) => (
                        <SectionCards key={tag._id} TituloTag={tag.titulo} />
                    ))}
                </div>
                </div>
            </div>
        </>
    )
}