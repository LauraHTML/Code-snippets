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
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CodeEditor } from "@/components/Organisms/codeEditor";

export default function NovoCodigo() {
    //linguagens
    const codeSnippets = {
        javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
        typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
        python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
        java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
        csharp:
            'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
        php: "<?php\n\n$name = 'Alex';\necho $name;\n",
    };


    //codigos
    const [codigos, setCodigos] = useState<TCodigos[]>([]);
    const [tituloCodigo, setTituloCodigo] = useState<string>("")
    const [codigo, setCodigo] = useState<string>("");
    const [linguagem, setLinguagem] = useState("javascript")


    //tags
    const [titulo, setTitulo] = useState<string>("");
    const [tag, setTag] = useState<string>("");
    const [novaTag, setNovaTag] = useState<string>("")
    const [listaTags, setListaTags] = useState([])

    const CriarTags = async () => {
        try {
            const res = await fetch('http://localhost:8080/tags', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    titulo: novaTag,
                    cor: "#f4d812"
                })
            });
            if (res.ok) {
                console.log("Tag adicionada com sucesso!")
                const handleAdicionarTagLista = (novaTag: string) => {
                    setListaTags((prevLista) => [...prevLista, novaTag]);
                }
                handleAdicionarTagLista(res)
            } else {
                console.error("Erro ao adicionar tag", res)
            }
        } catch (erro) {
            console.error('Erro ao adicionar tag', erro)
        }

    };

    useEffect(() => {
        async function fetchTags() {
            try {
                const res = await fetch("http://localhost:8080/tags")

                if (!res.ok) {
                    throw new Error("Erro na resposta da API")
                }

                const tags: Tags[] = await res.json()
                console.log(tags)
                setListaTags(tags)

            } catch (error) {
                console.error("Erro detalhado:", error)
            }

        }
        fetchTags()
    }, []);


    const CriarCodigo = async () => {
        try {
            const res = await fetch('http://localhost:8080/codigos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    titulo: tituloCodigo,
                    codigo: codigo,
                    linguagem: linguagem,
                    tags: [tag.id]
                })
            });
            if (res.ok) {
                console.log("Código criado com sucesso!")
            }
            else {
                const erro = await res.json() 
                console.error("Erro do servidor:", res.status, erro)
            }
        }
        catch (erro) {
            console.error('Erro ao criar novo código', erro)
        }
    }

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
                                            <div className="flex flex-row gap-3">
                                                <Input type="text" id="tags" value={novaTag} onChange={(e) => setNovaTag(e.target.value)} placeholder="Ex: MySql" />
                                                <Button type="button" onClick={CriarTags}>Criar tag</Button>
                                            </div>

                                            <Select onValueChange={setTag}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Adicionar á lista" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {listaTags && listaTags.length > 0 ? (
                                                            listaTags.map((item, index) => (
                                                                <SelectItem key={index} value={item.titulo}>{item.titulo}</SelectItem>
                                                            ))) :
                                                            (<p>Crie uma tag</p>)}

                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>

                                            <FieldDescription>Use as tags para organizar seus códigos.</FieldDescription>
                                            <FieldError></FieldError>
                                        </Field>
                                        <Field>
                                            <CodeEditor
                                                codeSnippets={codeSnippets}
                                                onChange={(lang) => {
                                                    setLinguagem(lang);
                                                    setCodigo(codeSnippets[lang]);
                                                }}
                                            />
                                            <FieldError></FieldError>
                                        </Field>
                                        <Button type="button" onClick={CriarCodigo}>Enviar</Button>
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
