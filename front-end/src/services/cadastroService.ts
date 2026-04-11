export async function cadastro(email: string, senha: string, nome: string) {
    try {
        const res = await fetch("http://localhost:8080/cadastro", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ email, senha, nome }),
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
            titulo: erro.titulo || 'Erro ao cadastrar',
            mensagem: erro.message || 'Falha ao criar novo usuário',
            status: erro.status || 'erro'
        };
    }
}