# 🔐 Issues de Segurança e Funcionalidade - Back-end

## 🔴 CRÍTICAS (P0) - Corrigir Imediatamente

### Issue 1: Rotas de Tags Sem Autenticação
**Severity**: CRITICAL  
**Type**: Security  

**Descrição**: Todas as rotas de tags (`/tags`) são públicas e sem autenticação. Qualquer pessoa pode criar, ler, atualizar e deletar tags de forma não autorizada.

**Impacto**: Comprometimento de dados compartilhados, data tampering.

**Arquivos afetados**: 
- `back-end/src/routes/tagsRoutes.js`
- `back-end/src/controllers/tagController.js`

**Código problemático**:
```javascript
// ❌ VULNERÁVEL - Sem middleware de autenticação
routes.get("/tags", TagController.listarTags);
routes.post("/tags", TagController.inserirTags);
routes.put("/tags/:id", TagController.atualizarTag);
routes.delete("/tags/:id", TagController.excluirTag);
```

**Solução**: Adicionar `verificarToken` middleware em todas as rotas.

---

### Issue 2: Falta de Validação de Proprietário - Atualização de Código
**Severity**: CRITICAL  
**Type**: Security - Broken Authorization

**Descrição**: O endpoint `PUT /codigos/:id` não valida se o código pertence ao usuário logado. Um usuário autenticado consegue atualizar qualquer código de qualquer outro usuário.

**Impacto**: Acesso não autorizado e modificação de dados privados de outros usuários.

**Arquivo afetado**: `back-end/src/controllers/codigoController.js` (linha 21)

**Código problemático**:
```javascript
static async atualizarCodigo(req, res) {
    try {
        const id = req.params.id;
        await codigo.findByIdAndUpdate(id, req.body);  // ❌ Sem validação
        res.status(200).json({ status: 'sucesso', ... });
    }
}
```

**Solução**:
```javascript
static async atualizarCodigo(req, res) {
    try {
        const id = req.params.id;
        const codigoAtualizado = await codigo.findByIdAndUpdate(
            { _id: id, idUsuario: req.usuario.id },  // ✅ Valida proprietário
            req.body
        );
        if (!codigoAtualizado) {
            return res.status(403).json({ 
                status: 'erro', 
                mensagem: 'Acesso não autorizado' 
            });
        }
        res.status(200).json({ status: 'sucesso', ... });
    }
}
```

---

### Issue 3: Inconsistência Fatal no Mapeamento de Usuário
**Severity**: CRITICAL  
**Type**: Bug - Authentication

**Descrição**: O middleware `verificarToken` define `req.usuario`, mas os controllers usam `req.id_usuario` (que é undefined). Essa inconsistência causa falhas silenciosas na autenticação.

**Impacto**: 
- `listarCodigos` retorna resultado vazio ou inesperado
- Autorização quebrada em múltiplos endpoints

**Arquivos afetados**:
- `back-end/src/middleware/autenticacao.js`
- `back-end/src/controllers/codigoController.js`

**Código problemático**:
```javascript
// middleware/autenticacao.js - Define corretamente
req.usuario = decoded;

// controllers/codigoController.js - Usa ERRADO
const listarCodigos = await codigo.find({ idUsuario: req.id_usuario });  // ❌ undefined
```

**Solução**: Usar `req.usuario.id` ou `req.usuario._id` consistentemente em todos os controllers.

---

### Issue 4: NoSQL Injection em Busca de Código
**Severity**: CRITICAL  
**Type**: Security - Injection

**Descrição**: O endpoint `GET /codigos/busca` não sanitiza o parâmetro de query `titulo`. Um atacante pode usar operadores MongoDB como `$ne`, `$regex`, etc. para retornar dados não autorizados.

**Impacto**: Acesso não autorizado a códigos privados de outros usuários.

**Arquivo afetado**: `back-end/src/controllers/codigoController.js` (linha 63)

**Código problemático**:
```javascript
static async buscarCodigoPorTitulo(req, res) {
    const titulo = req.query.titulo;
    try {
        const codigoPorTitulo = await codigo.find({ titulo: titulo });  // ❌ Não sanitizado
        res.status(200).json(codigoPorTitulo);
    }
}
```

**Ataque possível**: 
```
GET /codigos/busca?titulo[$ne]=
// Retorna todos os códigos (query becomes { titulo: { $ne: '' } })
```

**Solução**:
```javascript
static async buscarCodigoPorTitulo(req, res) {
    const titulo = req.query.titulo;
    
    // ✅ Validação e sanitização
    if (!titulo || typeof titulo !== 'string') {
        return res.status(400).json({ 
            status: 'erro', 
            mensagem: 'Título inválido' 
        });
    }
    
    try {
        const codigoPorTitulo = await codigo.find({ 
            titulo: { $regex: titulo, $options: 'i' },
            idUsuario: req.usuario.id  // ✅ Filtro por proprietário
        });
        res.status(200).json(codigoPorTitulo);
    }
}
```

---

### Issue 5: Exposição de Stack Traces em Respostas de Erro
**Severity**: CRITICAL  
**Type**: Security - Information Disclosure

**Descrição**: Todos os endpoints retornam stack traces completos nas respostas de erro. Isso expõe informações sensíveis como: versão do driver MongoDB, endpoints internos, arquitetura do servidor, etc.

**Impacto**: Information disclosure que facilita ataques direcionados.

**Arquivos afetados**: 
- `back-end/src/controllers/codigoController.js`
- `back-end/src/controllers/usuarioController.js`
- `back-end/src/controllers/tagController.js`

**Código problemático**:
```javascript
// ❌ Expõe stack trace completo
res.status(500).json({ 
    mensagem: `${erro} - falha ao criar novo código` 
});
// Retorna: "MongooseError: Connection refused at tcp://db:27017 - falha..."
```

**Solução**: 
```javascript
// ✅ Mensagem genérica em produção
console.error('Erro ao atualizar código:', erro);  // Log interno apenas
res.status(500).json({ 
    status: 'erro',
    mensagem: 'Erro ao processar requisição' 
});
```

---

### Issue 6: Bug Fatal em Deletar Código - Campo Errado
**Severity**: CRITICAL  
**Type**: Bug - Field Name Mismatch

**Descrição**: O método `excluirCodigo` busca pelo campo `userId` mas o schema do MongoDB usa `idUsuario`. Além disso, usa `req.id_usuario` que é undefined. A rota nunca funciona.

**Impacto**: Usuários conseguem deletar códigos que não pertencem a eles (ou dele mesmo dependendo do campo errado).

**Arquivo afetado**: `back-end/src/controllers/codigoController.js` (linha 40)

**Código problemático**:
```javascript
static async excluirCodigo(req, res) {
    try {
        const codigo = await codigo.findByIdAndDelete({
            _id: req.params.id,
            userId: req.id_usuario  // ❌ Campo errado + req.id_usuario é undefined
        });
        // Sempre retorna null porque a query nunca encontra nada
    }
}
```

**Solução**:
```javascript
static async excluirCodigo(req, res) {
    try {
        const codigoDeletado = await codigo.findByIdAndDelete({
            _id: req.params.id,
            idUsuario: req.usuario.id  // ✅ Campo correto
        });
        if (!codigoDeletado) {
            return res.status(403).json({
                status: 'erro',
                mensagem: 'Acesso não autorizado'
            });
        }
        res.status(200).json({ 
            status: 'sucesso', 
            mensagem: 'Código excluído com sucesso!' 
        });
    }
}
```

---

## 🟡 ALTAS (P1) - Corrigir em Breve

### Issue 7: Sem Rate Limiting em Endpoints Sensíveis
**Severity**: HIGH  
**Type**: Security - Brute Force

**Descrição**: Endpoints de login e cadastro (`/login`, `/cadastro`) não possuem rate limiting. Um atacante consegue fazer millions de tentativas de força bruta sem limitação.

**Impacto**: Força bruta viável em senhas, DoS.

**Solução**: Implementar rate limiting com `express-rate-limit`:
```bash
npm install express-rate-limit
```

---

### Issue 8: Sem Endpoint de Logout/Invalidação de Token
**Severity**: HIGH  
**Type**: Security - Session Management

**Descrição**: Não existe endpoint para logout. Token armazenado em cookie persiste por 24 horas. Usuário não consegue fazer logout do servidor.

**Impacto**: Sessões ativas indefinidamente, risco de token comprometido persistir.

**Solução**: Implementar `/logout` que invalida o token (adicionar a uma blacklist ou usar Redis).

---

### Issue 9: Requisitos de Senha Muito Fracos
**Severity**: HIGH  
**Type**: Security - Password Policy

**Descrição**: Senha mínima de 6 caracteres é insuficiente. Sem requisitos de complexidade.

**Arquivo afetado**: `back-end/src/controllers/usuarioController.js` (linha 31)

**Código problemático**:
```javascript
if (senha.length < 6) {  // ❌ 6 caracteres é muito fraco
    return res.status(400).json(...);
}
```

**Solução**: Aumentar para 12+ caracteres ou exigir: maiúscula + minúscula + número + símbolo.

---

### Issue 10: Validação de Input Insuficiente
**Severity**: HIGH  
**Type**: Security - Input Validation

**Descrição**: Falta sanitização e validação rigorosa em múltiplos endpoints. Nenhuma validação de tamanho, tipo ou formato de entrada.

**Impacto**: Possível DoS, injection attacks, data corruption.

**Solução**: Usar biblioteca como `joi` ou `zod` para validação de schema.

---

### Issue 11: CORS Aplicado na Ordem Errada
**Severity**: HIGH  
**Type**: Security - Configuration

**Descrição**: Middleware CORS é aplicado DEPOIS da rota raiz, deixando-a sem proteção.

**Arquivo afetado**: `back-end/src/routes/index.js`

**Código problemático**:
```javascript
app.route("/").get(...);  // ❌ SEM CORS
app.use(cors(...));       // ❌ Muito tarde
app.use(express.json(), ...);
```

**Solução**: Aplicar CORS ANTES de qualquer rota.

---

## 🟢 MÉDIAS (P2) - Considerar Futuramente

### Issue 12: Conexão com Banco Sem Opções de Configuração
**Severity**: MEDIUM  
**Type**: Reliability - Database Connection

**Descrição**: Conexão MongoDB sem timeouts, retry logic, pool size, etc.

**Arquivo afetado**: `back-end/src/config/dbConnect.js`

**Solução**: Adicionar opções de conexão:
```javascript
mongoose.connect(process.env.DB_CONNECTION_STRING, {
    maxPoolSize: 10,
    minPoolSize: 5,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    retryWrites: true
});
```

---

### Issue 13: Sem Paginação em Listagens
**Severity**: MEDIUM  
**Type**: Performance - Scalability

**Descrição**: `GET /codigos` retorna TODOS os códigos do usuário de uma vez. Para usuários com centenas de códigos, performance é ruim.

**Solução**: Implementar paginação com `skip` e `limit`.

---

### Issue 14: Duplicação de Dependência - bcrypt vs bcryptjs
**Severity**: MEDIUM  
**Type**: Code Quality - Unused Dependency

**Descrição**: `package.json` instala ambos `bcrypt` e `bcryptjs`, mas apenas `bcryptjs` é usado.

**Solução**: Remover `bcrypt` do `package.json`.

---

### Issue 15: Rota POST "/" em server.js Nunca Usada
**Severity**: LOW  
**Type**: Code Quality - Dead Code

**Descrição**: Rota POST "/" definida em `server.js` mas não é registrada nas routes, criando confusão.

**Arquivo afetado**: `back-end/server.js`

**Solução**: Remover ou documentar uso.

---

## 📋 Resumo

| Prioridade | Quantidade | Total |
|-----------|-----------|-------|
| 🔴 CRÍTICO (P0) | 6 | **6 issues** |
| 🟡 ALTO (P1) | 5 | **5 issues** |
| 🟢 MÉDIO (P2) | 4 | **4 issues** |
| **Total** | - | **15 issues** |

---

## 🎯 Recomendação de Correção

1. **Hoje (P0)**: Corrigir Issues 1-6 antes de colocar em produção
2. **Esta semana (P1)**: Implementar Issues 7-11
3. **Próximas sprints (P2)**: Tratar Issues 12-15

⚠️ **SISTEMA NÃO ESTÁ SEGURO PARA PRODUÇÃO** enquanto Issues críticas existirem.
