//colunas

"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

//deletar
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export type TCodigos = {
  _id: string
  titulo: string
  linguagem: string
  codigo: string
  tags?: string | { titulo: string; cor: string; _id: string }[]
  dataCriacao: string,
  onDelete: (id: string) => void
}

export const columns = (onDelete: (id: string) => void): ColumnDef<TCodigos>[] => [
  //selecionar
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar tudo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const codigos: TCodigos = row.original  // Dados da linha

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-xs">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Atualizar</DropdownMenuItem>

            {/* confirmar deletar código */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"ghost"}>Excluir</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir código?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação não pode ser desfeita. O código será excluído permanentemente. Tem certeza de que deseja continuar?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(codigos._id)}>Excluir</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },

]