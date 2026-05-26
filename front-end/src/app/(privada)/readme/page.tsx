"use client";
import { useState } from "react";

import { SiteHeader } from "@/src/components/site-header";
import {
    SidebarInset,
    SidebarProvider,
} from "@/src/components/ui/sidebar";
import { AppSidebar } from "@/src/components/app-sidebar";

import PromptForm from "@/src/components/Organisms/promptForm";
import Resposta from "@/src/components/Organisms/resposta";
import { gemini } from "@/src/services/gemini";

import { Skeleton } from "@/src/components/ui/skeleton"


export default function Readme() {
    const [prompt, setPrompt] = useState("");
    const [resposta, setResposta] = useState("");
    const [loading, setLoading] = useState(false);

    const respostaGemini = async () => {
        try {
            const resposta = await gemini(prompt);
            if (resposta) {
                setResposta(resposta);
                console.log(resposta);
            }
        }
        finally {
            setLoading(false);
        }
    };

    function gerarReadme() {
        gemini(prompt)
        respostaGemini();
        
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
                            (<p><div className="flex w-full max-w-xs flex-col gap-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div></p>) :
                            (<p>Descreva o seu projeto para gerar o readme</p>)}
                    <PromptForm conteudo={prompt} enviar={gerarReadme} />
                </div>
            </SidebarInset>
        </SidebarProvider>
    </>)
}