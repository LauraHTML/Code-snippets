"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
    {
    id: "actions",           // ← ID especial (não usa accessorKey)
    enableHiding: false,     // ← Impede que o usuário esconda essa coluna
    cell: ({ row }) => {
      const payment = row.original  // ← Acesso aos dados da linha

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-xs">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
            <DropdownMenuItem>Excluir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    }
]