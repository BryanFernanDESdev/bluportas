# BluPortas - Sistema de Controle de Clientes e Veículos

Sistema completo para gerenciamento de serviços automotivos, controle de veículos e acompanhamento de garantias.

## Funcionalidades

- Cadastro e gerenciamento de veículos
- Registro e acompanhamento de serviços
- Controle de garantias com alertas de vencimento
- Dashboard com estatísticas e visão geral
- Relatórios de faturamento

## Tecnologias

### Backend
- Node.js
- Express
- MongoDB
- JWT para autenticação

### Frontend
- React
- Bootstrap 5
- Font Awesome
- Axios

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

# Configure as variáveis de ambiente
# Edite o arquivo .env com suas configurações
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
│       └── services/     # Serviços de API
│
└── server/               # Backend Node.js
    ├── config/           # Configurações
    ├── middleware/       # Middlewares Express
    ├── models/           # Modelos Mongoose
    └── routes/           # Rotas da API
```

## Licença

Este projeto está licenciado sob a licença MIT.

## Contato

Para suporte ou dúvidas, entre em contato através do email: contato@bluportas.com