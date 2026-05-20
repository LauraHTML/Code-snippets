"use client"
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { verificarAutenticacao } from "@/src/services/authService";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const routerRef = useRef(router);
    const [isAutenticado, setIsAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function verificar() {
            try {
                const autenticado = await verificarAutenticacao();

                if (!autenticado) {
                    router.push("/");
                    return;
                }
                else{
                  setIsAutenticado(true);  
                }
                
            } catch (erro) {
                console.error("Erro ao verificar autenticação:", erro);
                router.push("/");
            } finally {
                setCarregando(false);
            }
        }

        verificar();
    }, []);

    if (carregando) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Verificando acesso...</p>
            </div>
        );
    }

    if (isAutenticado) {
        return <>{children}</>;
    }

    return null;
}
