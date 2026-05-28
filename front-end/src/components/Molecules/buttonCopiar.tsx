"use client";
import { Copy } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/src/components/ui/tooltip";
import { toast } from "sonner";

const ButtonCopiar = (readme:string) => {
    const copiarTexto = async() => {
     try {
      await navigator.clipboard.writeText(readme.readme || '');
      toast.success("Texto copiado para a área de transferência", {
              position: "top-center", style: {
                '--normal-bg':
                  'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
              } as React.CSSProperties
            })
    } catch (err) {
        toast.error("Falha ao copiar o texto", {
                position: "top-center", style: {
                  '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                  '--normal-text': 'var(--destructive)',
                  '--normal-border': 'var(--destructive)'
                } as React.CSSProperties
              })
    }
    }   

    return (
        <Tooltip>
            <TooltipTrigger>
                <Button onClick={copiarTexto} className="p-0" variant={"ghost"}><Copy /></Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Copiar readme em formato markdown</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default ButtonCopiar