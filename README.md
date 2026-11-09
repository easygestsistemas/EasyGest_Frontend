# EasyGest Frontend

## Contribuicoes por participante

As atividades abaixo foram organizadas por data, do commit mais antigo ao mais recente. Commits tecnicos automatizados de sessoes de agente nao foram considerados como entregas individuais; somente commits com alteracoes no projeto foram resumidos.

### Leonardo

- **28/05/2026** - iniciou o versionamento do projeto e criou a estrutura inicial de arquivos.
- **29/05/2026** - adicionou a configuracao de deploy na Vercel com o arquivo `vercel.json`.
- **29/05/2026** - configurou o ambiente de execucao e ajustes iniciais do navegador.
- **29/05/2026** - ajustou estilos gerais e corrigiu o `App.css`.
- **29/05/2026** - removeu rotas duplicadas da aplicacao.
- **29/05/2026** - realizou ajustes gerais de inicializacao e funcionamento da aplicacao.
- **29/05/2026** - alterou e refinou o layout da interface em diferentes partes da aplicacao.
- **29/05/2026** - revisou o layout responsivo para dispositivos moveis.
- **31/05/2026** - atualizou dados e comportamento relacionados ao usuario.
- **31/05/2026** - integrou a pagina de clientes com o banco de dados.
- **02/06/2026** - atualizou as paginas de Fornecedores, Prestadores, Produtos e Recursos Humanos.
- **02/06/2026** - corrigiu e ajustou o modulo de Estoque.
- **04/06/2026** - ajustou o Dashboard e a tela de Vendas.
- **05/06/2026** - atualizou os dados e o layout das paginas de Dashboard.
- **05/06/2026** - realizou novos ajustes nas telas de Dashboard.
- **08/06/2026** - ajustou itens, dados e apresentacao das telas de Vendas e Dashboard.
- **27/10/2026** - configurou URLs e o acesso centralizado a APIs por meio das paginas e de `src/utils/api.js`.
- **28/10/2026** - integrou telas ao acesso de banco de dados, centralizou chamadas HTTP e atualizou login, navegacao, layout e documentos.
- **02/11/2026** - substituiu dados simulados por consultas reais e atualizou Financeiro, relatorios, Dashboard principal e configuracoes da aplicacao.
- **03/11/2026** - configurou o frontend local, o proxy do Vite e a documentacao de execucao em rede local.
- **03/11/2026** - ajustou o endpoint da API para funcionar localmente e em ambiente de producao.

### Joao

- **08/11/2026** - ajustou a responsividade da barra lateral (sidebar), adicionou icones do FontAwesome e estilizou o logotipo na interface.

### Caua

- **29/05/2026** - ajustou o layout responsivo em `App.jsx` e nas folhas de estilo; tambem acrescentou ajustes de navegacao e responsividade em componentes compartilhados e no Dashboard.

### Ryan

- **05/11/2026** - atualizou o projeto com configuracoes de ambiente, documentacao, README, `vercel.json`, Vite, dependencias, paginas, componentes, estilos, logotipo, login e utilitarios do frontend.
- **05/11/2026** - reorganizou e corrigiu a estrutura do projeto, preservando configuracoes, assets, telas e componentes React dentro da pasta principal da aplicacao.

### Davi

- **03/11/2026** - criou e aprimorou a tela de Login em `src/components/Login.jsx` e `src/components/Login.css`, incluindo a interface visual e o comportamento da autenticacao.

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