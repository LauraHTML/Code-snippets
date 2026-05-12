"use client";
import { useState, useEffect } from "react";

import { AppSidebar } from "@/src/components/app-sidebar";
import { Tags } from "@/src/types";

import { criarCodigo } from "@/src/services/codigosService"
import { criarTag, listarTags } from "@/src/services/tagsServices";

import { SiteHeader } from "@/src/components/site-header";
import {
    SidebarInset,
    SidebarProvider,
} from "@/src/components/ui/sidebar";

//formulário
import { toast } from "sonner";
import {
    FieldSet,
    Field,
    FieldLabel,
    FieldDescription,
    FieldError
} from "@/src/components/ui/field"
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

//criar tag
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";
import { CodeEditor } from "@/src/components/Organisms/codeEditor";

export default function NovoCodigo() {

    //linguagens
    const codeSnippets = {
        javascript: ``,
        typescript: ``,
        python: ``,
        java: ``,
        csharp: '',
        php: '',
    };

    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [loading, setLoading] = useState(false)

    //codigos
    const [codigo, setCodigo] = useState<string>("");
    const [linguagem, setLinguagem] = useState("javascript")
    const [titulo, setTitulo] = useState<string>("");
    const [tag, setTag] = useState<string>("");

    //tags
    // const [novaTag, setNovaTag] = useState<string>("")
    const [listaTags, setListaTags] = useState<Tags[]>([])

    useEffect(() => {
        const carregarTags = async () => {
            try {
                const tags = await listarTags();
                setListaTags(tags);
            } catch (erro) {
                console.error("Erro ao carregar tags:", erro);
            }
        };
        carregarTags();
    }, []);

    //cor
    type Cor = "azul" | "amarelo" | "verde" | "roxo";
    const [cor, setCor] = useState<Cor>('azul');

    const coresTag = {
        azul: "#2f81f7",
        amarelo: "#d2991d",
        verde: "#3fb950",
        roxo: "#a371f7"
    }

    async function listarTags(){
        
    }

    async function handleCriarTag(e: React.MouseEvent<HTMLButtonElement>) {
        console.log('Criar tag payload:', { tag, cor });
        e.preventDefault()
        setErrors({})

        // Validação local
        const newErrors: any = {}
        if (!tag.trim()) newErrors.nome = "Dê um nome para a nova tag"

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setLoading(true)
        try {
            const response = await criarTag(tag, cor)
            console.log('Criar tag response:', response)
            toast.success(response.titulo || 'Tag criada', {
                description: `${response.mensagem}`,
                position: "top-center", style: {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                } as React.CSSProperties
            })
            setTag("")

        } catch (erro: any) {
            toast.error(`Erro no cadastro: ${erro.titulo}`, {
                description: `${erro.mensagem}`, position: "top-center", style: erro.status === 'erro' ? {
                    '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                    '--normal-text': 'var(--destructive)',
                    '--normal-border': 'var(--destructive)'
                } as React.CSSProperties : {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
                    '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
                } as React.CSSProperties
            },)
        } finally {
            setLoading(false)
        }
    }

    async function handleCriarCodigo(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setErrors({})

        // Validação local
        const newErrors: any = {}
        if (!tag.trim()) newErrors.nome = "Dê um nome para a nova tag"

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setLoading(true)
        try {
            const response = await criarCodigo(titulo, tag, linguagem, codigo)
            toast.success(response.titulo, {
                description: `${response.mensagem}`,
                position: "top-center", style: {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                } as React.CSSProperties
            })
            setTag("")

        } catch (erro: any) {
            toast.error(`Erro ao criar código: ${erro.titulo}`, {
                description: `${erro.mensagem}`, position: "top-center", style: erro.status === 'erro' ? {
                    '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                    '--normal-text': 'var(--destructive)',
                    '--normal-border': 'var(--destructive)'
                } as React.CSSProperties : {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
                    '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
                } as React.CSSProperties
            },)
        } finally {
            setLoading(false)
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

                                <FieldSet >
                                    <Field>
                                        <FieldLabel htmlFor="titulo">Título para o trecho de código</FieldLabel>
                                        <Input
                                            id="titulo"
                                            placeholder="Ex: Exercício de python"
                                            onChange={(e) => setTitulo(e.target.value)}
                                        />
                                        <FieldDescription>Dê um nome para o trecho de código.</FieldDescription>

                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="tags">Título da tag</FieldLabel>
                                        <Input className="w-1/2" type="text" id="tags" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Ex: MySql" />
                                        <FieldLabel htmlFor="tags">Cor da tag</FieldLabel>
                                        <div className="grid grid-cols-4 grid-rows-flow w-1/2 bg-input border p-2 rounded-md ">
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
                                                    title={corHex}
                                                />
                                            ))}
                                        </div>
                                        <Button onClick={handleCriarTag} type="button">Criar tag</Button>
                                    </Field>
                                    <Field>
                                        <Select onValueChange={(value: string) => setTag(value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Selecione uma tag" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {listaTags.length === 0 && <p>Crie uma tag</p>}

                                                    {listaTags.map((tag) => (
                                                        <SelectItem key={tag._id} value={tag.titulo}>
                                                            {tag.titulo}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                        <FieldDescription>Use as tags para organizar seus códigos.</FieldDescription>

                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="titulo">Selecione uma linguagem</FieldLabel>
                                        <CodeEditor
                                            codeSnippets={codeSnippets}
                                            onChange={(novoCodigo: string, novaLinguagem: string) => {
                                                setCodigo(novoCodigo);
                                                setLinguagem(novaLinguagem);
                                            }}
                                        />
                                        <FieldError></FieldError>
                                    </Field>
                                    <Button onClick={handleCriarCodigo} >Criar novo código</Button>
                                </FieldSet>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    </>)
}
