# BluPortas - Sistema de Gerenciamento

Sistema completo para gerenciamento de serviços automotivos da BluPortas, especializada em alarmes, vidros elétricos, travas e portas automáticas.

## Funcionalidades Principais

- **Dashboard Interativo**: Visão geral de serviços, agendamentos e garantias
- **Gerenciamento de Clientes**: Cadastro e histórico completo
- **Controle de Veículos**: Registro detalhado com histórico de serviços
- **Serviços e Garantias**: Acompanhamento de serviços realizados e controle de garantias
- **Busca Inteligente**: Pesquisa rápida de clientes, veículos e serviços
- **Formatação Monetária**: Suporte ao padrão brasileiro de moeda

## Tecnologias Utilizadas

- **Frontend**: React, CSS, React Router
- **Backend**: Node.js, Express, MongoDB
- **Autenticação**: JWT (JSON Web Tokens)
- **Formatação**: Intl para formatação de moeda e datas

## Instalação e Execução

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/bluportas.git
cd bluportas
```

2. Instale as dependências:
```bash
# Instalar dependências do projeto principal
npm install

# Instalar dependências do cliente
cd bluportas-app/client
npm install

# Instalar dependências do servidor
cd ../server
npm install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na pasta `/bluportas-app/server` com:
   ```
   PORT=5000
   MONGODB_URI=sua_uri_do_mongodb
   JWT_SECRET=seu_segredo_jwt
   ```

4. Inicie o projeto:
```bash
# Iniciar servidor (na pasta server)
npm start

# Em outro terminal, iniciar cliente (na pasta client)
npm start
```

## Recursos Implementados

### Dashboard
- Estatísticas de serviços realizados
- Alertas de garantias próximas do vencimento
- Agendamentos do dia/semana
- Busca inteligente unificada

### Clientes
- Cadastro simplificado
- Visualização de veículos associados
- Histórico de serviços

### Veículos
- Registro com informações detalhadas
- Associação com proprietários
- Histórico completo de serviços

### Serviços
- Categorização por tipo (alarme, vidro, trava, porta)
- Controle de garantias com datas de vencimento
- Formatação monetária no padrão brasileiro
- Técnico responsável e observações

## Melhorias Recentes

- Correção na formatação de valores monetários
- Interface de busca aprimorada
- Melhorias de usabilidade no formulário de serviços

## Assistente Virtual "Senninha"

O sistema conta com um assistente virtual chamado "Senninha", inspirado no lendário piloto Ayrton Senna:

- **Interação Contextual**: Oferece ajuda específica para cada seção do sistema
- **Respostas Personalizadas**: Comunica-se de forma amigável e personalizada com o usuário
- **Dicas e Sugestões**: Fornece dicas úteis sobre o uso do sistema
- **Suporte Imediato**: Responde perguntas sobre como realizar tarefas específicas
- **Personalidade Única**: Utiliza linguagem e referências ao mundo automobilístico e de corridas

O Senninha funciona como um co-piloto para os usuários, tornando a experiência mais agradável e eficiente.

## Estrutura do Projeto

```
bluportas/
├── bluportas-app/
│   ├── client/               # Frontend React
│   │   ├── public/           # Arquivos estáticos
│   │   └── src/              # Código fonte React
│   │       ├── components/   # Componentes reutilizáveis
│   │       ├── pages/        # Páginas da aplicação
│   │       ├── services/     # Serviços de API
│   │       └── styles/       # Estilos CSS
│   │
│   └── server/               # Backend Node.js
│       ├── config/           # Configurações
│       ├── middleware/       # Middlewares Express
│       ├── models/           # Modelos Mongoose
│       └── routes/           # Rotas da API
│
└── README.md                 # Este arquivo
```

## Próximos Passos

- Implementação de relatórios exportáveis
- Sistema de notificações para garantias próximas do vencimento
- Aplicativo móvel para técnicos em campo
- Integração com sistemas de pagamento

## Credenciais de Acesso (Desenvolvimento)

- **Email**: admin@bluportas.com
- **Senha**: admin123

## Licença

Este projeto é proprietário e seu uso é restrito à BluPortas.