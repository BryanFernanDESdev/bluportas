# BluPortas - Sistema de Controle de Clientes e Veículos

Sistema completo para gerenciamento de serviços automotivos, controle de veículos e acompanhamento de garantias.

## Funcionalidades Implementadas

- Cadastro e gerenciamento de veículos (carros e vans)
- Registro e acompanhamento de serviços com garantias
- Cadastro simplificado de clientes
- Dashboard com estatísticas e visão geral
- Interface interativa com formatação monetária brasileira

## Páginas Principais

### Dashboard
- Visão geral do sistema
- Estatísticas e informações rápidas

### Veículos
- Listagem com filtros e busca
- Cadastro interativo com seleção visual de tipo e cor
- Edição e exclusão de veículos

### Serviços
- Listagem com filtros por tipo e busca
- Cadastro com seleção visual de tipo de serviço
- Formatação monetária automática
- Controle de garantias com cálculo de datas

### Clientes
- Cadastro simplificado (nome e telefone)
- Visualização detalhada com veículos associados
- Gerenciamento completo (adicionar, editar, excluir)

## Tecnologias

### Backend
- Node.js
- Express
- MongoDB
- JWT para autenticação

### Frontend
- React
- CSS personalizado
- Axios para comunicação com API

## Instalação

### Pré-requisitos
- Node.js (v14+)
- MongoDB (local ou MongoDB Atlas)

### Configuração do Backend

```bash
# Acesse a pasta do servidor
cd bluportas-app/server

# Instale as dependências
npm install

# Configure as variáveis de ambiente no arquivo .env
PORT=5000
MONGODB_URI=sua_uri_do_mongodb
JWT_SECRET=seu_segredo_jwt
```

### Configuração do Frontend

```bash
# Acesse a pasta do cliente
cd bluportas-app/client

# Instale as dependências
npm install
```

## Execução

### Backend
```bash
cd bluportas-app/server
npm start
```

### Frontend
```bash
cd bluportas-app/client
npm start
```

Acesse o sistema em: http://localhost:3000

## Credenciais de Acesso

- **Email**: admin@bluportas.com
- **Senha**: admin123

## Estrutura do Projeto

```
bluportas-app/
├── client/               # Frontend React
│   ├── public/           # Arquivos estáticos
│   └── src/              # Código fonte React
│       ├── components/   # Componentes reutilizáveis
│       ├── pages/        # Páginas da aplicação
│       ├── services/     # Serviços de API
│       └── styles/       # Estilos CSS
│
└── server/               # Backend Node.js
    ├── config/           # Configurações
    ├── middleware/       # Middlewares Express
    ├── models/           # Modelos Mongoose
    └── routes/           # Rotas da API
```