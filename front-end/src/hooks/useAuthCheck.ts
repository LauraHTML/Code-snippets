import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { verificarAutenticacao } from "@/src/services/authService";

export function useAuthCheck() {
    const router = useRouter();

    const verificarAuth = useCallback(async () => {
        try {
            const autenticado = await verificarAutenticacao();
            if (!autenticado) {
                router.push("/");
            }
        } catch (erro) {
            console.error("auth Erro ao verificar autenticação:", erro);
            router.push("/");
        }
    }, [router]);

    useEffect(() => {
        // Verificar ao montar
        verificarAuth();

        // Verificar periodicamente a cada 5 minutos
        const intervalo = setInterval(verificarAuth, 5 * 60 * 1000);

        return () => clearInterval(intervalo);
    }, [verificarAuth]);
}
