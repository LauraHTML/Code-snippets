
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

        if (!res.ok) {
            const erro = new Error(dados?.mensagem || `Erro HTTP: ${res.status}`) as Error & {
                titulo?: string;
                mensagem?: string;
                status?: string;
            };
            erro.titulo = dados?.titulo || 'Erro no login';
            erro.mensagem = dados?.mensagem || 'Não foi possível concluir o login';
            erro.status = dados?.status || 'erro';
        }

        return dados;
    }
    catch (erro: any) {
        throw {
            titulo: erro.titulo,
            mensagem: erro.mensagem,
            status: erro.status
        };
    }
}