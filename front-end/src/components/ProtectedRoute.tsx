"use client"
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { TriangleAlert, X, Square, SquareTerminal, Minus } from "lucide-react";
import "@/src/app/globals.css";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAutenticado, setIsAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function verificar() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/usuario`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const dados = await res.json().catch(() => null);

                if (res.status === 401 || res.status === 403) {
                    console.warn("Usuário não autorizado:", dados);
                    setIsAutenticado(false);
                    router.push("/");
                    return;
                }

                if (!res.ok) {
                    console.warn("Erro ao verificar autenticação:", dados);
                    setIsAutenticado(false);
                    router.push("/");
                    return;
                }

                if (dados?.autenticado !== true) {
                    console.warn("Resposta de autenticação inválida:", dados);
                    setIsAutenticado(false);
                    router.push("/");
                    return;
                }

                setIsAutenticado(true);
            } catch (erro) {
                console.error("Erro ao verificar autenticação:", erro);
                setIsAutenticado(false);
                router.push("/");
            } finally {
                setCarregando(false);
            }
        };

        console.log('protected route');

        verificar();
    }, [router]);

    if (carregando) {
        return (
            <section className="flex flex-col w-full md:w-1/2 items-center mx-4">

                <div className="flex flex-row justify-between bg-primary rounded-t-md border border-border w-full p-2">
                    <div className="flex flex-row gap-2">
                        <Minus />
                        <X />
                        <Square />

                    </div>
                </div>
                <div className="overflow-hidden p-4 rounded-b-md flex flex-col items-center justify-around bg-background border border-border w-full gap-3 h-50">

                    <div className="spinner center m-4">
                        <div className="spinner-blade"></div>
                        <div className="spinner-blade"></div>
                        <div className="spinner-blade"></div>
                        <div className="spinner-blade"></div>
                        <div className="spinner-blade"></div>
                        <div className="spinner-blade"></div>
                        <div className="spinner-blade"></div>
                        <div className="spinner-blade"></div>
                        <div className="spinner-blade"></div>
                        <div className="spinner-blade"></div>
                        <div className="spinner-blade"></div>
                        <div className="spinner-blade"></div>
                    </div>
                    <h3>Verificando acesso...</h3>
                </div>

            </section>
        );
    }

    if (isAutenticado) {
        return <>{children}</>;
    }

    return null;
}
