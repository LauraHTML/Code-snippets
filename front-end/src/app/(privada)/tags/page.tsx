"use client";
import { useState, useEffect } from "react";
import { criarTag, listarTags, deletarTag, atualizarTag } from "@/src/services/tagsServices";
import { Tags } from "@/src/types";

import { Trash, Plus, Tag as TagIcon } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

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
import { toast } from "sonner";

import { ModalTag } from '@/src/components/Organisms/modalTag';

export default function TagsPage() {

    const [loading, setLoading] = useState(false);
    const [tagIdSelecionada, setTagIdSelecionada] = useState<string>("");
    const [novaTag, setNovaTag] = useState<string>("");
    const [listaTags, setListaTags] = useState<Tags[]>([]);
    type Cor = "azul" | "amarelo" | "verde" | "roxo";
    const [cor, setCor] = useState<Cor>('azul');

    const coresTag = {
        azul: "#2f81f7",
        amarelo: "#d2991d",
        verde: "#3fb950",
        roxo: "#a371f7"
    };

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

    async function handleCriarTag(e?: React.MouseEvent<HTMLButtonElement>) {
        e?.preventDefault();

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

            toast.error(`Erro ao criar nova tag: ${erro}`, {
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

    async function handleDeletar(id: string) {
        try {
            const response = await deletarTag(id)
            toast.success(response.titulo, {
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
            toast.error(`Erro ao deletar tag: ${erro}`, {
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

    async function handleAtualizarTag(cor: string, titulo: string, id: string) {
        try {
            if (titulo.trim() === '' || typeof titulo === "number") {
                toast.error(`Erro ao deletar tag: título está faltando`, {
                    description: `Adicione um título a tag`, position: "top-center", style: {
                        '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                        '--normal-text': 'var(--destructive)',
                        '--normal-border': 'var(--destructive)'
                    } as React.CSSProperties
                },);
            };

            if (cor.trim() === '' || typeof cor === "number") {
                toast.error(`Cor da tag faltando`, {
                    description: `Adicione uma cor a tag`, position: "top-center", style: {
                        '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                        '--normal-text': 'var(--destructive)',
                        '--normal-border': 'var(--destructive)'
                    } as React.CSSProperties
                },);
            };
            const response = await atualizarTag(titulo = titulo, cor = cor, id = id);

            if (response.status === 'erro') {
                toast.error(`Erro ao deletar tag: ${response.erro}`, {
                    description: `${response.mensagem}`, position: "top-center", style: {
                        '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                        '--normal-text': 'var(--destructive)',
                        '--normal-border': 'var(--destructive)'
                    } as React.CSSProperties
                },);
            };
        }
        catch (erro: any) {
            toast.error(`Erro ao deletar tag: ${erro}`, {
                description: `${erro.mensagem}`, position: "top-center", style: {
                    '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                    '--normal-text': 'var(--destructive)',
                    '--normal-border': 'var(--destructive)'
                } as React.CSSProperties
            },);
        } finally {
            setLoading(false)
        };
    }

    return (<>

        <header className="space-y-2 border-b border-card">
            <h1 className="text-3xl font-bold tracking-tight">Minhas Tags</h1>
            <p>Gerencie as tags usadas para organizar seus trechos de código.</p>
        </header>


        <section className="p-6 rounded-xl border bg-card">
            <div className="grid grid-cols-4 grid-rows-auto gap-5 w-full bg-card py-2 rounded-md ">
                {(Object.entries(coresTag) as [Cor, string][]).map(([corChave, corHex]) => (
                    <Button
                        key={corChave}
                        type="button"
                        onClick={() => setCor(corChave)}
                        className={`w-full h-8 rounded-full border-2 transition-all m-3 ${corChave === cor ? 'border-white ring-2 ring-white' : 'border-background'}`}
                        style={{
                            backgroundColor: corHex
                        }}
                        title={corChave}>
                        Cor da tag
                    </Button>
                ))}
            </div>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                    <Input
                        type="text"
                        value={novaTag}
                        onChange={(e) => setNovaTag(e.target.value)}
                        placeholder="Adicionar nova tag (pressione Enter)"
                        className="w-full pl-9 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 transition-all"
                    />
                </div>
                <Button
                    onClick={handleCriarTag}
                    className="px-4 py-2 rounded-pill text-sm font-medium transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                   {loading ? "Criando..." : "Criar tag"}
                </Button>
            </div>
            <div className="grid grid-flow-col grid-rows-4 gap-8 py-4 min-h-[100px] rounded-lg">
                {listaTags.length === 0 ? (
                    <p className="text-sm w-full text-center my-auto">
                        Nenhuma tag criada ainda.
                    </p>
                ) : (
                    listaTags.map((tag) => (
                        <div key={tag._id} className="flex flex-row justify-between items-center bg-sidebar-accent w-full px-4 py-2 rounded-full">
                            <h2>{tag.titulo}</h2>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon-xs">
                                        <span className="sr-only">Abrir menu</span>
                                        <MoreHorizontal />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <ModalTag atualizar={handleAtualizarTag} tagSelecionada={tag} />
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button aligment={"left"} variant={"destructive"}><Trash />Excluir</Button>
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
                                                <AlertDialogAction onClick={() => handleDeletar(tag._id)}>Excluir</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ))
                )}
            </div>
        </section>

    </>
    );
}