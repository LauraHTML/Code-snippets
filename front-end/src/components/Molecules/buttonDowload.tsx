"use client";
import { CircleArrowDown } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/src/components/ui/tooltip";
import { toast } from "sonner";

const ButtonCopiar = (readme:string) => {

    const baixarTexto = async() => {
     try {
      const blob = new Blob([readme.readme], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);

       const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'README.md');

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    } catch (err) {
        toast.error("Falha ao baixar o readme", {
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
                <Button onClick={baixarTexto} className="p-0" variant={"ghost"}><CircleArrowDown /></Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Copiar readme em formato markdown</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default ButtonCopiar