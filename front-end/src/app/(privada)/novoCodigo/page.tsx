"use client";
import { useState, useEffect } from "react";

import { Tags } from "@/src/types";

import { criarCodigo } from "@/src/services/codigosService"
import { criarTag, listarTags } from "@/src/services/tagsServices";

import { toast } from "sonner";
import {
    FieldSet,
    Field,
    FieldLabel,
    FieldDescription
} from "@/src/components/ui/field"
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

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
    const codeSnippets = {
        javascript: ``,
        typescript: ``,
        python: ``,
        java: ``,
        csharp: '',
        php: '',
    };

    const [loading, setLoading] = useState(false);

    const [codigo, setCodigo] = useState<string>("");
    const [linguagem, setLinguagem] = useState("javascript");
    const [titulo, setTitulo] = useState<string>("");

    const [tagIdSelecionada, setTagIdSelecionada] = useState<string>("");
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
        <header className="min-w-0 space-y-2 border-b border-card">
            <h1 className="break-words text-3xl font-bold tracking-tight">Adicionar código</h1>
            <p>Adicione um novo trecho de código.</p>
        </header>

        <FieldSet className="min-w-0 w-full">
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
                <FieldLabel htmlFor="tags">Selecione uma tag: </FieldLabel>
                <Select onValueChange={(value: string) => setTagIdSelecionada(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione uma tag" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup className="p-2 m-0">
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
                <Input type="text" id="tags" value={novaTag} onChange={(e) => setNovaTag(e.target.value)} placeholder="Ex: MySql" />
                <FieldLabel htmlFor="tags">Cor da tag</FieldLabel>
                <div className="grid grid-cols-4 gap-2 p-2">
                    {(Object.entries(coresTag) as [Cor, string][]).map(([corChave, corHex]) => (
                    <Button
                        key={corChave}
                        type="button"
                        onClick={() => setCor(corChave)}
                        className={`h-8 rounded border transition-all m-3 ${corChave === cor ? 'border-white ring-2 ring-white' : 'border-background'}`}
                        style={{
                            backgroundColor: corHex
                        }}
                        title={corChave}>
                        Cor da tag
                    </Button>
                ))}
                </div>
                <Button onClick={handleCriarTag} type="button">Criar tag</Button>
            </Field>

            <Field className="gap-2">
                <FieldLabel htmlFor="titulo">Selecione uma linguagem</FieldLabel>
                <div className="w-full min-w-0 overflow-hidden">
                    <CodeEditor
                        codeSnippets={codeSnippets}
                        onChange={(novoCodigo: string, novaLinguagem: string) => {
                            setCodigo(novoCodigo);
                            setLinguagem(novaLinguagem);
                        }} />
                </div>
            </Field>

            <Button onClick={handleCriarCodigo}>{loading ? "Criando código..." : "Criar código"}</Button>
        </FieldSet>
    </>)
}