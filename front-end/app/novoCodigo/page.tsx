"use client";
import { useEffect, useState } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { Tags } from "@/app/page"

import { SiteHeader } from "@/components/site-header";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";

//formulário
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError
} from "@/components/ui/field"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            titulo: "",
            tag: ""
        }
    });

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
    const [codigo, setCodigo] = useState<string>("");
    const [linguagem, setLinguagem] = useState("javascript")


    //tags
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
                toast.success("Tag criada com sucesso", {
                    position: "top-center", style: {
                        '--normal-bg':
                            'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                        '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                        '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                    } as React.CSSProperties
                })

                const handleAdicionarTagLista = (novaTag: string) => {
                    setListaTags((prevLista) => [...prevLista, novaTag]);
                }
                handleAdicionarTagLista(res)
            } else {
                console.error("Erro ao criar tag", res)
            }
        } catch (erro) {
            toast.error("Erro ao criar tag", { position: "top-center",style: {
            '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
            '--normal-text': 'var(--destructive)',
            '--normal-border': 'var(--destructive)'
          } as React.CSSProperties})
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
                setListaTags(tags)

            } catch (error) {
                console.error("Erro detalhado:", error)
            }

        }
        fetchTags()
    }, []);


    const criarCodigo = async (data: any) => {
        // se tag foi selecionada
        if (!data.tag) {
            toast.warning("Selecione uma tag", {
                position: "top-center",
                style: {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
                    '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
                } as React.CSSProperties
            });
            return;
        }

        // se código estiver vazio
        if (!codigo.trim()) {
            toast.warning("Adicione um código", {
                    position: "top-center", style: {
                        '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                        '--normal-text': 'var(--destructive)',
                        '--normal-border': 'var(--destructive)'
                    } as React.CSSProperties
                });
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/codigos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    titulo: data.titulo,
                    codigo: codigo,
                    linguagem: linguagem,
                    tags: data.tag
                })
            });
            if (res.ok) {
                toast.success("Código criado com sucesso!", {
                    position: "top-center", style: {
                        '--normal-bg':
                            'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                        '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                        '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                    } as React.CSSProperties
                })
                console.log("Código criado com sucesso!")
            }
            else {
                const erro = await res.json()
                toast.error("Erro ao criar código", {
                    position: "top-center", style: {
                        '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                        '--normal-text': 'var(--destructive)',
                        '--normal-border': 'var(--destructive)'
                    } as React.CSSProperties
                });
                console.error("Erro do servidor:", res.status, erro)
            }
        }
        catch (erro) {
            toast.error("Erro ao criar código", { position: "top-center",
            style: {
            '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
            '--normal-text': 'var(--destructive)',
            '--normal-border': 'var(--destructive)'
          } as React.CSSProperties});
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
                                    <form onSubmit={handleSubmit(criarCodigo)} className="space-y-8 w-full py-10 bg-card p-4 rounded-md border">
                                        <Field>
                                            <FieldLabel htmlFor="titulo">Título para o trecho de código</FieldLabel>
                                            <Input
                                                id="titulo"
                                                placeholder="Ex: Exercício de python"
                                                {...register("titulo", { required: "Título é obrigatório" })}
                                            />
                                            <FieldDescription>Dê um nome para o trecho de código.</FieldDescription>
                                            {errors.titulo && <FieldError>{errors.titulo.message}</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="tags">Tags</FieldLabel>
                                            <div className="flex flex-row gap-3">
                                                <Input type="text" id="tags" value={novaTag} onChange={(e) => setNovaTag(e.target.value)} placeholder="Ex: MySql" />
                                                <Button type="button" onClick={CriarTags}>Criar tag</Button>
                                            </div>

                                            <Controller
                                                name="tag"
                                                control={control}
                                                rules={{ required: "Selecione uma tag" }}
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Selecione uma tag" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {listaTags && listaTags.length > 0 ? (
                                                                    listaTags.map((item, index) => (
                                                                        <SelectItem key={index} value={item._id}>{item.titulo}</SelectItem>
                                                                    ))) :
                                                                    (<p>Crie uma tag</p>)}

                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />

                                            <FieldDescription>Use as tags para organizar seus códigos.</FieldDescription>
                                            {errors.tag && <FieldError>{errors.tag.message}</FieldError>}
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
                                        <Button type="submit">Enviar</Button>
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
