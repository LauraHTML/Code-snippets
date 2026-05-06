import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useFetchInterceptor() {
    const router = useRouter();

    const fetchComInterceptor = useCallback(
        async (url: string, options: RequestInit = {}) => {
            try {
                const response = await fetch(url, {
                    ...options,
                    credentials: "include",
                });

                // Se receber 401, token expirou
                if (response.status === 401) {
                    console.warn("Token expirado. Redirecionando para login...");
                    router.push("/");
                    return null;
                }

                // Se receber outro erro, propagar
                if (!response.ok) {
                    throw new Error(`Erro HTTP ${response.status}`);
                }

                return response;
            } catch (erro) {
                console.error("Erro na requisição:", erro);
                throw erro;
            }
        },
        [router]
    );

    return { fetchComInterceptor };
}
