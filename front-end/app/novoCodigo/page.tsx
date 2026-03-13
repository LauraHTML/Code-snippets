"use client";
import { useEffect, useState } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { TCodigos } from "@/components/colunas"
import { Tags } from "@/app/page"

import { SiteHeader } from "@/components/site-header";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";

//formulário
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Form } from "@/components/ui/form"
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

//criar tag


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { CodeEditor } from "@/components/Organisms/codeEditor";

export default function NovoCodigo() {

    //codigos
    const [codigos, setCodigos] = useState<TCodigos[]>([]);
    const [tituloCodigo, setTituloCodigo] = useState<string>("")
    //tags
    const [titulo, setTitulo] = useState<string>("");
    const [tituloTag, setTituloTag] = useState<string>("");
    const [listaTags, setListaTags] = useState([])

    const CriarTags = async () => {
        try {
            const res = await fetch('http://localhost:8080/tags', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    titulo: tituloTag,
                    cor: "#f4d812"
                })
            });
            if (res.ok) {
                console.log("Tag adicionada com sucesso!")
                // const handleAdicionarTagLista = (novaTag) => {
                // setListaTags((prevLista) => [...prevLista, novaTag]);
                // }
            } else {
                console.error("Erro ao adicionar tag", res)
            }
        } catch (erro) {
            console.error('Erro ao adicionar tag', erro)
        }

    };

    return (<>
        <SidebarProvider
            style={{ "--sidebar-width": "calc(var(--spacing) * 72)", "--header-height": "calc(var(--spacing) * 12)", } as React.CSSProperties}>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

                            <div className="px-4 lg:px-5">

                                <Form>
                                    <form className="space-y-8 w-full py-10 bg-card p-4 rounded-md border">
                                        <Field>
                                            <FieldLabel htmlFor="titulo">Título para o trecho de código</FieldLabel>
                                            <Input id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex: Exercício de python" />
                                            <FieldDescription>Dê um nome para o trecho de código.</FieldDescription>
                                            <FieldError></FieldError>
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="tags">Tags</FieldLabel>
                                            <Input type="text" id="tags" value={tituloTag} onChange={(e) => setTituloTag(e.target.value)} placeholder="Ex: MySql" />
                                            <FieldDescription>This is your public display name.</FieldDescription>
                                            <FieldError></FieldError>
                                        </Field>
                                        <Field>
                                            <CodeEditor />
                                            <FieldError></FieldError>
                                        </Field>
                                        <Button type="submit">Submit</Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    </>)
}
