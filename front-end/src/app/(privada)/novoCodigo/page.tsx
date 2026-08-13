"use client";
import { useState, useEffect } from "react";

import { AppSidebar } from "@/src/components/appSidebar";
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
    FieldDescription
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

    const [loading, setLoading] = useState(false);

    //codigos
    const [codigo, setCodigo] = useState<string>("");
    const [linguagem, setLinguagem] = useState("javascript");
    const [titulo, setTitulo] = useState<string>("");

    const [tagIdSelecionada, setTagIdSelecionada] = useState<string>("");
    //tags
    const [novaTag, setNovaTag] = useState<string>("")
    const [listaTags, setListaTags] = useState<Tags[]>([])

    const fetchTags = async () => {
        try {
            const tagsArray = await listarTags();
            setListaTags(tagsArray);

        } catch (erro) {
            console.error(erro);
        }
    };
    useEffect(() => {
        fetchTags();
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

    async function handleCriarTag(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (!novaTag.trim()) toast.error(`Dê um título a nova tag`, {
            description: `Campo para nome da tag está vazio`, position: "top-center", style: {
                '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                '--normal-text': 'var(--destructive)',
                '--normal-border': 'var(--destructive)'
            } as React.CSSProperties
        });

        setLoading(true);
        try {
            const response = await criarTag(novaTag, cor)

            toast.success(response.titulo || 'Tag criada', {
                description: `${response.mensagem}`,
                position: "top-center", style: {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                } as React.CSSProperties
            });
            setNovaTag("");
            await fetchTags();

        } catch (erro: any) {

            toast.error(`Erro no cadastro: ${erro.titulo}`, {
                description: `${erro.mensagem}`, position: "top-center", style: {
                    '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                    '--normal-text': 'var(--destructive)',
                    '--normal-border': 'var(--destructive)'
                } as React.CSSProperties
            },);
        } finally {
            setLoading(false)
        };
    };

    async function handleCriarCodigo(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (!tagIdSelecionada.trim()) toast.error(`Selecione uma tag`, {
            description: `Selecione uma tag para vincular ao seu código atual`, position: "top-center", style: {
                '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                '--normal-text': 'var(--destructive)',
                '--normal-border': 'var(--destructive)'
            } as React.CSSProperties
        })

        if (!linguagem) toast.error(`Selecione uma linguagem`, {
            description: `Selecione uma linguagem para vincular ao seu código atual`, position: "top-center", style: {
                '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                '--normal-text': 'var(--destructive)',
                '--normal-border': 'var(--destructive)'
            } as React.CSSProperties
        })

        setLoading(true)
        try {
            const response = await criarCodigo(titulo, linguagem, codigo, tagIdSelecionada)
            toast.success(response.titulo, {
                description: `${response.mensagem}`,
                position: "top-center", style: {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                } as React.CSSProperties
            });
        } catch (erro: any) {
            toast.error(`Erro ao criar código: ${erro.titulo}`, {
                description: `${erro.mensagem}`, position: "top-center", style: {
                    '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                    '--normal-text': 'var(--destructive)',
                    '--normal-border': 'var(--destructive)'
                } as React.CSSProperties
            },)
        } finally {
            setLoading(false);
            setCodigo("");
            setTagIdSelecionada("");
        }
    };


    return (<>
        <header className="space-y-2 border-b border-card">
            <h1 className="text-3xl font-bold tracking-tight">Adicionar código</h1>
            <p>Adicione um novo trecho de código.</p>
        </header>
        <FieldSet className="w-full max-w-4xl">
            <Field>
                <FieldLabel htmlFor="titulo">Título para o trecho de código</FieldLabel>
                <Input
                    id="titulo"
                    className="w-full"
                    placeholder="Ex: Exercício de python"
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <FieldDescription>Dê um nome para o trecho de código.</FieldDescription>

            </Field>
            <Field>
                <FieldLabel htmlFor="tags">Selecione uma tag: </FieldLabel>
                <Select onValueChange={(value: string) => setTagIdSelecionada(value)}>
                    <SelectTrigger className="w-full max-w-md">
                        <SelectValue placeholder="Selecione uma tag" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup className="w-full p-2 m-0">
                            {listaTags.length === 0 && <p>Crie uma tag</p>}

                            {listaTags.map((tag) => (
                                <SelectItem key={tag._id} value={tag._id}>
                                    {tag.titulo}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <FieldDescription>Use as tags para organizar seus códigos.</FieldDescription>

            </Field>
            <Field>
                <FieldLabel htmlFor="tags">Título da tag</FieldLabel>
                <Input className="w-full max-w-md" type="text" id="tags" value={novaTag} onChange={(e) => setNovaTag(e.target.value)} placeholder="Ex: MySql" />
                <FieldLabel htmlFor="tags">Cor da tag</FieldLabel>
                <div className="grid w-full max-w-md grid-cols-4 gap-2 rounded-md border bg-input p-2">
                    {Object.values(coresTag).map((corHex, index) => (
                        <Button
                            key={index}
                            type="button"
                            onClick={() => setCor(corHex as Cor)}
                            className="h-8 w-full rounded border-2 active:bg-violet-700 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500"
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
                <FieldLabel htmlFor="titulo">Selecione uma linguagem</FieldLabel>
                <div className="w-full min-w-0">
                    <CodeEditor
                        codeSnippets={codeSnippets}
                        onChange={(novoCodigo: string, novaLinguagem: string) => {
                            setCodigo(novoCodigo);
                            setLinguagem(novaLinguagem);
                        }} />
                </div>
            </Field>

            <Button onClick={handleCriarCodigo}>Criar novo código</Button>
        </FieldSet>
    </>)
}