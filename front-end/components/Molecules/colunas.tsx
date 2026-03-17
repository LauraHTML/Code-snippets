//colunas

"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import {  DropdownMenu,  DropdownMenuContent,  DropdownMenuItem,  DropdownMenuLabel,  DropdownMenuSeparator,  DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

//deletar
import {  AlertDialog,  AlertDialogAction,  AlertDialogCancel,  AlertDialogContent,  AlertDialogDescription,  AlertDialogFooter,  AlertDialogHeader,  AlertDialogTitle,  AlertDialogTrigger} from "@/components/ui/alert-dialog";

import { MoreHorizontal } from "lucide-react"
//atualizar
import {  Dialog,  DialogClose,  DialogContent,  DialogDescription,  DialogFooter,  DialogHeader,  DialogTitle,  DialogTrigger} from "@/components/ui/dialog";

import { FieldGroup } from "../ui/field";
import { Field } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export type TCodigos = {
  _id: string
  titulo: string
  linguagem: string
  codigo: string
  tags?: string | { titulo: string; cor: string; _id: string }[]
  dataCriacao: string,
  onDelete: (id: string) => void
  atualizar: (id: string) => void
}

export const columns = (atualizar: (id: string) => void , onDelete: (id: string) => void): ColumnDef<TCodigos>[] => [
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
    cell: ({ row }) => {
      const codigo = row.original

      return (
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-xs">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">

        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Dialog>
            <DialogTrigger asChild>
              <span className="w-full">Editar</span>
            </DialogTrigger>
            <form>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re
                    done.
                  </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                  <Field>
                    <Label htmlFor="name-1">Name</Label>
                    <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                  </Field>
                  <Field>
                    <Label htmlFor="username-1">Username</Label>
                    <Input id="username-1" name="username" defaultValue="@peduarte" />
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" onClick={() => atualizar(codigo._id)} >Atualizar</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </DropdownMenuItem>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              Excluir
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir código?</AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(codigo._id)}>
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>

          </AlertDialogContent>
        </AlertDialog>

      </DropdownMenuContent>
    </DropdownMenu>
      )
    }
  }

]