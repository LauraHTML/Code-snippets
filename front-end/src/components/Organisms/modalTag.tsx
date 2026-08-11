//modal
"use client";
import { useEffect, useState } from "react";

import { Tags } from "@/src/app/(privada)/codigos/page";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog"

//formulário
import {
    Field,
    FieldLabel,
    FieldDescription,
} from "@/src/components/ui/field"
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { SquarePen } from "lucide-react";

interface ModalAtualizar {
    tagSelecionada: Tags;
    atualizar: (cor: string, titulo: string, id: string) => void;
};

export function ModalTag({ tagSelecionada, atualizar }: ModalAtualizar) {

    const [titulo, setTitulo] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (tagSelecionada) {
            setTitulo(tagSelecionada.titulo);
        }
    }, [tagSelecionada])


    //cor
    type Cor = "azul" | "amarelo" | "verde" | "roxo";
    const [cor, setCor] = useState<Cor>('azul');

    const coresTag = {
        azul: "#2f81f7",
        amarelo: "#d2991d",
        verde: "#3fb950",
        roxo: "#a371f7"
    }

    return (<>
        <Dialog>
            <DialogTrigger className="text-sm whitespace-nowrap px-4 py-2 hover:bg-accent flex items-center justify-start gap-2 [&_svg:not([class*='size-'])]:size-4"><SquarePen />Atualizar</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Atualizar tag selecionada</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                    <Field className="py-2">
                        <FieldLabel htmlFor="titulo">Título para a tag</FieldLabel>
                        <Input
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            id="titulo"
                            placeholder={tagSelecionada.titulo}
                        />
                        <FieldDescription>Dê um novo título para a tag selecionada.</FieldDescription>
                    </Field>
                    <Field className="grid grid-cols-4 grid-rows-auto gap-2 w-full bg-input py-2 rounded-md ">
                        {Object.values(coresTag).map((corHex, index) => (
                            <Button
                                key={index}
                                type="button"
                                onClick={() => setCor(corHex as Cor)}
                                className="w-full h-8 rounded border-2"
                                style={{
                                    backgroundColor: corHex as Cor,
                                    borderColor: corHex === coresTag[cor] ? '#FFFFFF' : '#21262d'
                                }}
                                title={corHex}>
                            </Button>
                        ))}
                    </Field>
                </DialogHeader>
                <Button onClick={() => atualizar(cor, titulo, tagSelecionada._id)}>Atualizar</Button>
            </DialogContent>
        </Dialog>
    </>)
}