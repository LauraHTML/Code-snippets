'use client';
import { TriangleAlert, X, Square, SquareTerminal, Minus } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    function irParaHome() {
        router.replace("/codigos");
    }

    return (
        <section className="flex flex-col w-full md:w-1/2 items-center mx-4">
            <h1 className="text-9xl font-bold mb-4">404</h1>
            <div className="flex flex-row justify-between bg-primary rounded-t-md border border-border w-full p-2">
                <div className="flex flex-row gap-2">
                    <SquareTerminal />
                    <p>NotFound</p>
                </div>

                <div className="hidden md:flex flex-row gap-2">
                    <Minus />
                    <X />
                    <Square />

                </div>
            </div>
            <div className="overflow-hidden p-4 rounded-b-md flex flex-col items-center bg-background border border-border w-full gap-3">
                <TriangleAlert />
                <h3>Página não encontrada</h3>
                <Button onClick={irParaHome} variant={'outline'}>Volta para a página inicial</Button>
            </div>

        </section>
    )

}