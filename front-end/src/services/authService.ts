export async function verificarAutenticacao() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/usuario`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET",
            credentials: "include",
        });

        const dados = await res.json().catch(() => null);

        if (!res.ok) {
            const erro = new Error(dados?.mensagem || `Erro HTTP: ${res.status}`) as Error & {
                titulo?: string;
                mensagem?: string;
                status?: string;
                autenticado?: boolean;
                dados?: unknown;
            };

            erro.titulo = dados?.titulo || 'Erro na autenticação';
            erro.mensagem = dados?.mensagem || 'Não foi possível autenticar o usuário';
            erro.status = dados?.status || 'erro';
            erro.autenticado = false;
            erro.dados = dados;
            throw erro;
        }

        console.log('dados encontrados: ', dados);

        return dados;
    } catch (erro: any) {
        console.error("service auth Erro ao verificar autenticação:", erro);
        throw {
            titulo: erro?.titulo || 'Erro na autenticação',
            mensagem: erro?.mensagem || erro?.message || 'Não foi possível concluir a autenticação',
            status: erro?.status || 'erro',
            autenticado: false,
            dados: erro?.dados || null,
        };
    }
}


