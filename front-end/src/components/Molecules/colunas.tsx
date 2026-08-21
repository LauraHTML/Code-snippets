"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/src/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/src/components/ui/dropdown-menu";
import { Trash } from "lucide-react";

import { ModalAtualizar } from "../Organisms/modalAtualizar";

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
} from "@/src/components/ui/alert-dialog";

export type TCodigos = {
  _id: string
  titulo: string
  linguagem: string
  codigo: string
  tags?: string | { titulo: string; cor: string; _id: string }
  dataCriacao: string,
}


export const columns = (atualizar: (codigos: TCodigos) => void, onDelete: (id: string) => void): ColumnDef<TCodigos>[] => [
  {
    id: "select",
    accessorKey: "ações",
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
    cell: ({ row }) => {
      const codigos: TCodigos = row.original;
      const id = codigos._id;
      return (<Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />)
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "titulo",
    header: "Título",
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
    accessorKey: "ações",
    header: "Ações",
    enableHiding: false,
    cell: ({ row, table }) => {
      const codigos: TCodigos = row.original  // Dados da linha

      const deletarSelecionados = () => {
        const selecionados = table.getFilteredSelectedRowModel().rows
        selecionados.forEach((linha) => onDelete((linha.original as TCodigos)._id))
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-xs">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <ModalAtualizar atualizar={atualizar} codigoSelecionado={codigos} />

            {table.getIsSomeRowsSelected() && (
              <DropdownMenuItem asChild>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-destructive hover:text-destructive"><Trash />Excluir</button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir código ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Essa ação não pode ser desfeita. O código será excluído permanentemente. Tem certeza de que deseja continuar?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={deletarSelecionados}>Excluir</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem asChild>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-destructive hover:text-destructive"><Trash />Excluir</button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Excluir código ?</AlertDialogTitle>
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
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },

]