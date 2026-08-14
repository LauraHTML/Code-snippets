export async function cadastro(email: string, senha: string, nome: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/cadastro`, {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            method: "POST",
            body: JSON.stringify({ email, senha, nome }),
        });

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
            throw erro;
        }

        return dados;
    } catch (erro: any) {
        const mensagem = erro?.mensagem || erro?.message || 'Não foi possível concluir o cadastro';
        const titulo = erro?.titulo || 'Erro no cadastro';
        const status = erro?.status || 'erro';

        throw {
            titulo,
            mensagem,
            status,
        };
    }
}