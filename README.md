# 💸 Sistema de Solicitação de Reembolsos (Sispar)

## 📝 Sobre o Projeto

Este é um sistema para **solicitação de reembolsos**, que permite ao usuário cadastrar despesas e acompanhar o andamento das análises. Além disso, usuários com permissões específicas podem **avaliar e aprovar** as solicitações feitas, garantindo um fluxo organizado e transparente entre solicitantes e responsáveis.

## ✅ Funcionalidades Principais

- **Cadastro de Usuário:** Permite que novos usuários criem uma conta para acessar o sistema.
- **Solicitação de Reembolso:** Usuários podem registrar suas despesas e enviar pedidos de reembolso.
- **Histórico de Solicitações:** Consulta de todas as solicitações feitas, com detalhes como datas, valores e status.
- **Acompanhamento de Processos:** Visualização do andamento de cada solicitação, incluindo análise, aprovação ou recusa pelos responsáveis.
informações importantes.🔮

## 🛠️ Tecnologias Utilizadas — Backend

O backend do projeto foi desenvolvido com **Python** e utiliza o microframework **Flask**, juntamente com outras bibliotecas e ferramentas para garantir segurança, integração com banco de dados e documentação da API. Abaixo, os principais recursos utilizados:

- **[Flask](https://flask.palletsprojects.com/)** — Framework web leve e flexível.
- **Flask-SQLAlchemy** — ORM para integração com banco de dados relacional.
- **Flask-Bcrypt** — Para hash seguro de senhas.
- **Flask-CORS** — Para permitir comunicação entre frontend e backend.
- **python-dotenv** — Carregamento de variáveis de ambiente a partir de arquivos `.env`.
- **Cloudinary** — Armazenamento e gerenciamento de imagens na nuvem.
- **Flasgger** — Documentação automática da API com Swagger.
- **Gunicorn** — Servidor WSGI para deploy em produção.
- **MySQL / PostgreSQL** — Suporte a ambos os bancos via `mysqlclient` e `psycopg2-binary`.

Além disso, o projeto utiliza o **pytest** para testes.


## 🧩 Tecnologias Utilizadas — Frontend

O frontend do projeto foi desenvolvido com **React** utilizando o **Vite** como bundler, garantindo um ambiente de desenvolvimento rápido e eficiente.

- **[Vite](https://vitejs.dev/)** — Ferramenta moderna de build e desenvolvimento para projetos frontend.
- **[React](https://react.dev/)** — Biblioteca JavaScript para construção de interfaces interativas.
- **React DOM** — Permite a renderização dos componentes React no navegador.
- **React Router DOM** — Gerenciamento de rotas no frontend de forma dinâmica e eficiente.
- **Axios** — Cliente HTTP para consumo da API do backend.
- **Sass (SCSS)** — Pré-processador CSS para estilos mais organizados e reutilizáveis.


## 📂 Estrutura de Pastas

A estrutura do projeto frontend segue o padrão de organização do **Vite** e React, com a separação por componentes, assets e modais. Aqui estão os principais diretórios e arquivos:



```plaintext
├── public
│ └── Arquivos estáticos (ex: barco.png)
├── src
│ ├── assets
│ │ └── Imagens utilizadas em várias partes do sistema (ex: dashboard, login, etc.)
│ ├── components
│ │ └── Componentes reutilizáveis (ex: Historico.jsx, Login.jsx, NavBar.jsx, etc.)
│ ├── modals
│ │ └── Componentes de modais para interações do usuário (ex: CadastroModal.jsx, DescricaoModal.jsx)
│ ├── App.jsx
│ └── main.jsx — Ponto de entrada da aplicação.
├── vite.config.js — Arquivo de configuração do Vite.
└── vercel.json — Arquivo de configuração de deploy na Vercel.

```
# 🔢 Rodando o Backend Localmente 🧑‍💻

Para rodar o backend do projeto localmente, siga os passos abaixo:

## 1. Faça o Fork e Clone do Repositório

Faça o **fork** do repositório para sua conta no GitHub.

- Clone o repositório em sua máquina local usando o seguinte comando:
  ```bash
  git clone https://github.com/seu-usuario/nome-do-repositorio.git

## 2. Crie o Ambiente Virtual
É recomendado usar um ambiente virtual para instalar as dependências do projeto. No terminal, navegue até o diretório do projeto clonado e execute:

Para criar o ambiente virtual (no Linux ou macOS):

```bash
python3 -m venv venv
```

Para criar o ambiente virtual (no Windows):

```bash
python -m venv venv
```

## 3. Ative o Ambiente Virtual

No Linux ou macOS:

```bash
source venv/bin/activate
```

No Windows:

```bash
.\venv\Scripts\activate
```

## 4. Instale as Dependências

Com o ambiente virtual ativado, instale as dependências necessárias para o backend:

```bash
pip install -r requirements.txt
```

## 🗂️ 5. Configure o Banco de Dados 🔑

Certifique-se de ter o banco de dados configurado. Se estiver usando o MySQL ou PostgreSQL, crie um banco de dados e adicione as credenciais no arquivo .env:

### Obs: o arquivo (.env .example) tem o exemplo das keys necessárias. 

```
URL_DATABASE_DEV=mysql://User:Password@Host:Port/Default_database
SECRET_KEY=chave_secreta_da_api
JWT_SECRET=chave_secreta_do_JWT
JWT_ALGORITHM=hash_do_JWT
CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@<cloud_name>
```

## 6. Execute o Backend

Agora que as dependências estão instaladas e as configurações do banco de dados estão prontas, execute o servidor:

```bash
python run.py
```

O servidor backend estará rodando localmente.

# 🎨 Rodando o frontend Localmente 🖥️

Para rodar o frontend localmente, siga os passos abaixo:

## 1. Instalar as Dependências

Após clonar o projeto, navegue até a pasta do frontend e instale as dependências utilizando o npm ou yarn:

Com npm

```bash
npm install
```

Com yarn

```bash
yarn install
```

## 2. Rodar o Projeto

Após instalar as dependências, você pode iniciar o servidor de desenvolvimento. Para isso, basta rodar o seguinte comando:

Com npm:
```bash
npm run dev
```

Com yarn:
```bash
yarn dev
```

## 🚀 Testando o Frontend
Após rodar o projeto localmente, acesse http://localhost:3000 no seu navegador.
Se tudo estiver configurado corretamente, você verá o frontend da aplicação rodando localmente.

## 🔍 Problemas Comuns
Erro de Porta: Se a porta 3000 já estiver sendo usada, o Vite automaticamente escolherá outra porta. Basta verificar a mensagem no terminal para saber qual porta foi atribuída.

Erro de Dependências: Se ocorrer algum erro relacionado às dependências, tente rodar npm install ou yarn install novamente para garantir que todas as dependências estejam corretamente instaladas.