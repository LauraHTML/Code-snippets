export async function usuario() {
    try {
        const res = await fetch("http://localhost:8080/usuario", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET",
            credentials: "include",
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
            titulo: erro.titulo || 'Erro pegar os dados do usuário',
            mensagem: erro.mensagem || 'Não foi possíver acessar os dados do usuário',
            status: erro.status || 'erro'
        };
    }
}