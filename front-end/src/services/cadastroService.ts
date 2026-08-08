export async function cadastro(email: string, senha: string, nome: string) {
    try {
        const res = await fetch("http://localhost:8080/cadastro", {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            method: "POST",
            body: JSON.stringify({ email, senha, nome }),
        })

        const dados = await res.json();
        if (!res.ok) {
            const erro = new Error(dados?.mensagem || `Erro HTTP: ${res.status}`) as Error & {
                titulo?: string;
                mensagem?: string;
                status?: string;
            };
            erro.titulo = dados?.titulo || 'Erro no cadastro';
            erro.mensagem = dados?.mensagem || 'Não foi possível concluir o cadastro';
            erro.status = dados?.status || 'erro';
        }

        return dados;
    }
    catch (erro: any) {
        throw {
            titulo: 'Erro inesperado',
            mensagem: erro?.message || 'Não foi possível concluir cadastro',
            status: 'erro'
        };
    }
}