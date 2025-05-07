# 📄 Documentação da API - SISPAR

## Sobre o documento

Este documento apresenta os **requisitos obrigatórios** para o desenvolvimento da API do projeto **SISPAR**.

---

## 👋 Boas-vindas

Primeiramente, queremos **parabenizar sua jornada até aqui**. Você, com maestria, superou todos os desafios e agora chega ao **último desafio técnico do ciclo**.

---

## ✅ Requisitos Obrigatórios

### 🔸 Camada Controller

**Colaborador**  
As rotas de colaboradores devem:
- Cadastrar um novo colaborador
- Fazer login
- Visualizar todos os colaboradores

**Reembolso**  
As rotas de reembolso devem:
- Solicitar um novo reembolso
- Visualizar um reembolso pelo número de prestação de contas

---

### 🔸 Camada Model

**Colaborador**  
A entidade `Colaborador` deve conter:
- nome
- email
- senha
- cargo
- salário

**Reembolso**  
A entidade `Reembolso` deve conter:
- nome do colaborador
- empresa
- número de prestação de contas
- data
- tipo de reembolso
- centro de custo
- ordem interna
- divisão
- pep
- moeda
- distância por km
- valor por km
- valor faturado
- despesa
- id do colaborador
- status

---

### 🔸 Deploy

Utilizaremos o **Render** para realizar o deploy do backend e da instância do banco de dados.  
A **interface (frontend)** será hospedada na **Vercel**, se comunicando com o backend no Render.

---

### 🔸 Github

O código deve ser hospedado no **GitHub**.  
O link do repositório deverá ser entregue até **11/05 às 23h59**.

---

### 🔸 Documentação

A documentação pode ser feita via `README.md` no GitHub e deve conter:
- Como clonar o projeto
- Como instalar as dependências
- Como executar o projeto
- Explicações das rotas importantes da API

---

### 🔸 Organização

- Utilize o padrão **MVC** para organizar o projeto
- Use um arquivo **.env** para variáveis de ambiente
- Disponibilize um **requirements.txt** atualizado

---

## 🏁 Sucesso

Após concluir tudo, você terá finalizado o **último desafio do ciclo Fullstack Be-Digital** 🎉

---

## 💡 Extras (opcional)

Aqui vão sugestões de funcionalidades extras para enriquecer seu projeto:

- 📌 Autorização com Tokens nas rotas
- 📌 Utilizar bibliotecas para validações
- 📌 Documentação de todas as rotas com Swagger
- 📌 Git Flow no GitHub (branch de desenvolvimento e produção)
- 📌 Relacionamentos no banco de dados
- 📌 Rotas de atualização e deleção
- 📌 Funções auxiliares

---

## 🙏 Agradecimentos

Agradecemos por toda a sua **colaboração, comprometimento, dedicação e coragem**.  
Um ciclo está se encerrando, e desejamos que você **continue firme nos estudos e no crescimento profissional**.

> “Ninguém se arrepende do trabalho duro, menos ainda quando ele conduz no caminho do futuro que se quer construir.”
