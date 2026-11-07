# EasyGest Frontend

## Contribuicoes por participante

As atividades abaixo foram organizadas por data, do commit mais antigo ao mais recente.

### Leonardo

- **28/05/2026** - iniciou o versionamento do projeto e criou a estrutura inicial de arquivos.
- **29/05/2026** - adicionou a configuracao de deploy na Vercel; configurou ajustes iniciais e corrigiu estilos e rotas.
- **29/05/2026** - alterou o layout da interface e revisou a responsividade para dispositivos moveis.
- **31/05/2026** - atualizou dados relacionados ao usuario e integrou a pagina de Clientes ao banco de dados.
- **02/06/2026** - atualizou Fornecedores, Prestadores, Produtos e Recursos Humanos; ajustou o modulo de Estoque.
- **04/06/2026** - ajustou o Dashboard e a tela de Vendas.
- **05/06/2026** - atualizou dados e ajustes das telas de Dashboard.
- **08/06/2026** - ajustou itens e apresentacao das telas de Vendas e Dashboard.
- **27/10/2026** - configurou URLs e o acesso centralizado a APIs por meio das paginas e de `src/utils/api.js`.
- **28/10/2026** - integrou telas ao banco, centralizou chamadas HTTP e atualizou login, navegacao, layout e documentacao.
- **02/11/2026** - substituiu dados simulados por consultas reais em Financeiro, relatorios, Dashboard e configuracoes.
- **03/11/2026** - configurou frontend local, proxy do Vite e execucao em rede local.
- **03/11/2026** - ajustou o endpoint da API para funcionar localmente e em producao.

### Joao

- Nenhum commit identificado com o nome Joao no historico Git disponivel.

### Cauã

- **29/05/2026** - ajustou o layout responsivo em `App.jsx`, componentes compartilhados, navegacao e Dashboard.

### Ryan

- **05/11/2026** - atualizou configuracoes, documentacao, dependencias, paginas, componentes, estilos, logotipo, login, utilitarios e `vercel.json`.
- **05/11/2026** - reorganizou e corrigiu a estrutura da aplicacao dentro da pasta principal do frontend.

### Davi

- **03/11/2026** - criou e aprimorou a tela de Login em `src/components/Login.jsx` e `src/components/Login.css`.

## Configuração do backend

Configure `VITE_API_URL` no Vercel somente com a URL pública do backend, sem barra final. Esta variável não contém credenciais.

O frontend não possui usuário ou senha fixos. Quando o backend exigir HTTP Basic, utilize o botão **Entrar**; a credencial digitada fica apenas na `sessionStorage` do navegador atual e é enviada ao backend pelo módulo centralizado de API.

A arquitetura com HTTP Basic compartilhado é adequada apenas como acesso administrativo temporário. Para acesso público, recomenda-se migrar para autenticação individual baseada em sessão segura ou token, mantendo HTTPS, CSRF compatível, CORS restrito e autorização por função.

```text
VITE_API_URL=https://easygest-backend.onrender.com
```

Variáveis de produção do backend configuradas no Render:

```text
SPRING_MONGODB_URI
EASYGEST_SECURITY_USERNAME
EASYGEST_SECURITY_PASSWORD
EASYGEST_CORS_ALLOWED_ORIGINS
```

A origem CORS deve conter explicitamente o domínio real do Vercel, por exemplo `https://easygest.vercel.app`.

## Executar localmente

```bash
npm run dev
```

O Vite ficará acessível em `http://localhost:5173`. Em desenvolvimento, as chamadas `/api` passam pelo proxy do Vite e são encaminhadas ao backend do Render, evitando o bloqueio de CORS enquanto o front roda em localhost. Para acessar pela rede local, use também o endereço de rede exibido pelo Vite no terminal.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
