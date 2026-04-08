"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verificarAutenticacao } from "@/services/authService";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAutenticado, setIsAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function verificar() {
            try {
                const autenticado = await verificarAutenticacao();

                if (!autenticado) {
                    // Redireciona para login se não estiver autenticado
                    router.push("/");
                    return;
                }

                setIsAutenticado(true);
            } catch (erro) {
                console.error("Erro ao verificar autenticação:", erro);
                router.push("/");
            } finally {
                setCarregando(false);
            }
        }

        verificar();
    }, [router]);

    // Mostra um carregamento enquanto verifica
    if (carregando) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Verificando acesso...</p>
            </div>
        );
    }

    // Se autenticado, mostra o conteúdo
    if (isAutenticado) {
        return <>{children}</>;
    }

    // Se não autenticado, redirecionou para login
    return null;
}
