import { PropsWithChildren } from 'react';
import { Copy, CircleArrowDown } from "lucide-react";
import ReactMarkdown from "react-markdown";


import { Button } from "@/src/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/src/components/ui/tooltip";

function H1(props) { 
  return <h1 className="text-xl" {...props} />; 
}

function P(props) { 
  return <p className="body-md" {...props} />; 
}

function H3(props) {
    return <h3 className="text-lg"></h3>
}

type Resposta = {
    resposta?: string,
}

export default function Resposta({resposta, children}:PropsWithChildren<Resposta>) {
    return (
        <>
            <div className="w-4xl h-full justify-between bg-[#242b35] border border-border rounded-2xl overflow-auto p-4 min-h-10 max-h-[40vh]">
                <div className="flex flex-row justify-between">
                    <h3>README</h3>
                    <div className="flex flex-row gap-4">
                        <Button className="p-0" variant={"ghost"}><Copy /> </Button>
                        <Button size="icon" variant={"ghost"}><CircleArrowDown /> </Button>
                        
                    </div>
                   
                </div>
                {children}
                <ReactMarkdown components={{ h1: H1, p: P, h3: H3 }}>{resposta}</ReactMarkdown>
            </div>
        </>
    )
}