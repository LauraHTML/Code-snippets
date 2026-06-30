"use client";
import { useState } from "react";

import { SiteHeader } from "@/src/components/site-header";
import {
    SidebarInset,
    SidebarProvider,
} from "@/src/components/ui/sidebar";
import { AppSidebar } from "@/src/components/appSidebar";

import PromptForm from "@/src/components/Organisms/promptForm";
import Resposta from "@/src/components/Organisms/resposta";
import { gemini } from "@/src/services/gemini";

import { Skeleton } from "@/src/components/ui/skeleton"


export default function Readme() {
    const [prompt, setPrompt] = useState("");
    const [resposta, setResposta] = useState("");
    const [loading, setLoading] = useState(false);

    const respostaGemini = async (conteudo: string) => {
        setLoading(true);
        try {
            const resposta = await gemini(conteudo);
            if (resposta) {
                setResposta(resposta);

            }
        } catch (erro) {
            console.error("Erro:", erro);
        } finally {
            setLoading(false);
        }
    };

    function gerarReadme(conteudo: string) {
        respostaGemini(conteudo);
    }


    return (<>
        <SidebarProvider
            style={{ "--sidebar-width": "calc(var(--spacing) * 72)", "--header-height": "calc(var(--spacing) * 12)", } as React.CSSProperties}>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col p-4 items-center justify-center gap-4">
                    {resposta ?
                        (<div>
                            <Resposta resposta={resposta} />
                        </div>) : loading ?
                            (<div className="flex flex-col gap-2">
                                <Resposta children={
                                    <div className="flex flex-col gap-4 py-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-3/4" />
                                    </div>
                                } />
                            </div>) :
                            (<p>Descreva o seu projeto para gerar o readme</p>)}
                    <PromptForm enviar={gerarReadme} />

                </div>
            </SidebarInset>
        </SidebarProvider>
    </>)
}