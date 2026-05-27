
export async function gemini(conteudo: string) {
  try {
    // Validar que conteudo é uma string
    if (typeof conteudo !== 'string') {
      throw new Error(`Conteúdo deve ser uma string, recebido: ${typeof conteudo}`);
    }

    if (!conteudo || conteudo.trim() === '') {
      throw new Error('Conteúdo vazio');
    }

    const response = await fetch(`/api/gemini`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: conteudo
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    return data.readme;
  } catch (error) {
    console.error("Erro ao tentar pegar resposta do usuário:", error);
    throw error;
  }
};