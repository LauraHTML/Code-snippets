"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TSnippets = {
    _id: string
    titulo: string
    linguagem: string
    codigo: string
    tags?: string | { titulo: string; cor: string; _id: string }[]
    dataCriacao: string
}

export const columns: ColumnDef<TSnippets>[] = [
    {
        accessorKey: "titulo",
        header: "Titulo",
    },
    {
        accessorKey: "linguagem",
        header: "Linguagem",
    },
    {
        accessorKey: "codigo",
        header: "Código",
    },
    {
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => {
            const tags = row.getValue("tags");

            if (typeof tags === "string") {
                return <Badge>{tags}</Badge>
            }

            const tagList = Array.isArray(tags) ? tags : tags ? [tags] : [];

            if (tagList.length === 0) {
                return <p>Nenhuma tag</p>
            }

            return (
                <div className="flex flex-wrap gap-1">
                    {tagList.map((tag) => (
                        <Badge className="text-background" key={tag._id} style={{ backgroundColor: tag.cor }}>
                            {tag.titulo}
                        </Badge>
                    ))}
                </div>
            )
        }
    },
]