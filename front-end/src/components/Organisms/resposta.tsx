import { Copy, CircleArrowDown } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import ReactMarkdown from "react-markdown";

function H1(props) { 
  return <h1 className="text-xl" {...props} />; 
}

function P(props) { 
  return <p className="body-md" {...props} />; 
}

function H3(props) {
    return <h3 className="text-lg"></h3>
}

export default function Resposta({resposta}:{resposta: string}) {
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
                <ReactMarkdown components={{ h1: H1, p: P, h3: H3 }}>{resposta}</ReactMarkdown>
            </div>
        </>
    )
}