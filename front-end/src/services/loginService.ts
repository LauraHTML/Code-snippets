import { redirect } from 'next/navigation'

export async function login(email: string, senha: string) {
    try {
        const res = await fetch("http://localhost:8080/login", {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            method: "POST",
            body: JSON.stringify({ email, senha }),
        })

        const dados = await res.json();

        // Verificar se há erro na resposta
        if (dados.status === 'erro' || dados.status === 'aviso') {
            const erro = new Error(dados.mensagem);
            (erro as any).titulo = dados.titulo;
            (erro as any).status = dados.status;
            throw erro;
        }

        if (!res.ok) {
            throw new Error(`Erro HTTP ${res.status}`);
        }

        return dados;
    }
    catch (erro: any) {
        throw {
            titulo: erro.titulo || 'Erro ao fazer login',
            mensagem: erro.message || 'Falha ao fazer login',
            status: erro.status || 'erro'
        };
    }
}