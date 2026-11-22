# EasyGest

Aplicação web de gestão empresarial desenvolvida como projeto acadêmico do curso de **Desenvolvimento de Software Multiplataforma (DSM)**. O EasyGest reúne informações de diferentes áreas de uma empresa em uma interface única, com o objetivo de apoiar a organização e o acompanhamento de atividades administrativas.

## Objetivos do projeto

- Aplicar conhecimentos de análise, desenvolvimento e integração de sistemas em uma solução prática.
- Centralizar informações empresariais em módulos relacionados entre si.
- Oferecer uma interface acessível e responsiva para consulta e gerenciamento de dados.

## Funcionalidades

- Painel com indicadores e visualizações de dados.
- Cadastro e consulta de clientes, produtos, fornecedores e prestadores de serviço.
- Controle de estoque e acompanhamento financeiro.
- Organização de informações de recursos humanos.
- Relatórios de vendas e de estoque crítico.
- Área institucional com apresentação do sistema e de seus módulos.
- Preferências de acessibilidade visual, incluindo opções de contraste e paleta de cores.

## Tecnologias

- **React** para construção da interface.
- **Vite** para desenvolvimento e geração da versão de produção.
- **React Router** para navegação entre páginas.
- **Chart.js** para visualização de dados.
- **Font Awesome** para ícones.
- **ESLint** para análise estática do código.

O frontend consome uma API para operações de dados. Em desenvolvimento, as requisições com o prefixo `/api` são encaminhadas pelo proxy do Vite ao backend configurado no projeto. Em outros ambientes, a URL da API pode ser definida pela variável `VITE_API_URL`.

## Executar localmente

É necessário ter o Node.js e o npm instalados.

```bash
git clone https://github.com/leognobrega/EasyGest_Frontend.git
cd EasyGest_Frontend
npm install
npm run dev
```

O Vite disponibiliza a aplicação em `http://localhost:5173`. Para verificar o build de produção, execute:

```bash
npm run build
```

## Organização do código

```text
src/
├── components/  # Componentes compartilhados, layouts e autenticação
├── pages/       # Páginas institucionais e módulos do sistema
└── utils/       # Comunicação com a API e funções auxiliares
```

## Contexto acadêmico

O EasyGest foi concebido como um projeto acadêmico para exercitar o desenvolvimento de uma aplicação web orientada à gestão empresarial. A solução integra interface, navegação, visualização de informações e comunicação com serviços de backend, e pode ser ampliada conforme a evolução dos requisitos do projeto.
