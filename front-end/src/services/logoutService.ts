
export async function logout() {
    try {
        const res = await fetch("http://localhost:8080/logout", {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            method: "POST",
            
        })

        const dados = await res.json();

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
            titulo: erro.titulo || 'Erro ao fazer logout',
            mensagem: erro.mensagem || 'Falha ao fazer logout',
            status: erro.status || 'erro'
        };
    }
}