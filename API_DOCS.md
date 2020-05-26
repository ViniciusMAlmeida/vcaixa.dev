# Documentação de uso da API
Todas* as rotas desta API são protegidas com autenticação via Bearer Token, sendo assim, para poder acessar as rotas é necessário adicionar um campo no Header de todas as requisições com o nome `Authorization` com o valor `Bearer <token>` onde `<token>` é o Token retornado pela API ao se autenticar, caso contrario a API irá retornar um status 401 (Unauthorized) `{ erro: Token não informado.}`.

O Token para utilização das rotas protegidas é obtido no retorno da requisição enviada para a rota `/user/authenticate`.

Caso esteja usando a ferramenta [Postman](https://www.postman.com/) para consumir a API, o token pode ser informado na aba **Authorization** selecionando a opção **Bearer Token**, um campo com nome **Token** será exibido, informe neste campo o token retornado pela API ao efetuar uma requisição para a rota `/user/authenticate`.

O corpo de todas as requisições e resposta da API utilizam como padrão o formato JSON, logo ao enviar requisições, o corpo deve estar neste formato.

*_Exceção para as rotas `/user/register` e `/user/authenticate` que não necessitam de autenticação via Bearer Token, pois estas servem para cadastrar e autenticar usuários respectivamente._

Utilizando como url base `http://localhost:3001/api` (ou a porta que foi informada na configuração) podemos prosseguir para a descrição de uso das rotas.

### Rotas de Usuário
Rota: `/user/register`

Descrição: Cadastro de usuário.

Método: `POST`

Campos:
Campo | Tipo | Obrigatório
------------ | ------------- | -------------
name | String | Sim
email | String | Sim
password | String | Sim

Exemplo:
```
{
  "name": "Vinicius Miranda Almeida",
  "email": "vinicius.almeida@gmail.com",
  "password": "12345678"
}
```
---
Rota: `/user/authenticate`

Descrição: Autenticação de usuario, em caso de sucesso recebe o Token no retorno.

Método: `POST`

Campos:
Campo | Tipo | Obrigatório
------------ | ------------- | -------------
email | String | Sim
password | String | Sim

Exemplo:
```
{
  "email": "vinicius.almeida@gmail.com",
  "password": "12345678"
}
```
---
Rota: `/user/me`

Descrição: Retorna informações do usuário.

Método: `GET`

---

### Rotas de Categorias
Rota: `/transactionType`

Descrição: Lista as categorias de movimentação cadastradas com paginação, para navegar entre as páginas acresentar o query param `page` com o valor da página, exemplo `/transactionType?page=2`.

Método: `GET`

---
Rota: `/transactionType/:id`

Descrição: Busca e retorna um registro de categoria passando id do registro, exemplo `/transactionType/5ec92a173d1a4a1e487cf06f`.

Método: `GET`

---
Rota: `/transactionType`

Descrição: Cadastro de categoria.

Método: `POST`

Campos:
Campo | Tipo | Obrigatório
------------ | ------------- | -------------
name | String | Sim

Exemplo:
```
{
  "name": "Venda de Mercadoria"
}
```
---
Rota: `/transactionType/:id`

Descrição: Atulização de categoria, deve ser passado o id do registro como parametro, exemplo `/transactionType/5ec92a173d1a4a1e487cf06f`.

Método: `PUT`

Campos:
Campo | Tipo | Obrigatório
------------ | ------------- | -------------
name | String | Sim

Exemplo:
```
{
  "name": "Compra de Mercadoria"
}
```
---
Rota: `/transactionType/:id`

Descrição: Remoção de categoria, deve ser passado o id do registro como parametro, exemplo `/transactionType/5ec92a173d1a4a1e487cf06f`.

Método: `DELETE`

---
### Rotas de Movimentação
Rota: `/transaction`

Descrição: Lista as movimentações cadastradas com paginação, para navegar entre as páginas acresentar o query param `page` com o valor da página, exemplo `/transaction?page=2`.

Método: `GET`

---
Rota: `/transaction/:id`

Descrição: Busca e retorna um registro de movimentação passando id do registro, exemplo `/transaction/5ec97e87340bdc2308023ee4`.

Método: `GET`

---
Rota: `/transaction`

Descrição: Cadastro de movimentação, caso o campo date não seja passado será registrado a data e hora atual.

Método: `POST`

Campos:
Campo | Tipo | Obrigatório
------------ | ------------- | -------------
type | Enum['Entrada', 'Saída'] | Sim
value | Number | Sim
TransactionType | String | Sim
description | String | Sim
date | Date | Não

Exemplo:
```
{
  "type": "Entrada",
  "value": 380.00,
  "TransactionType": "Venda de Mercadoria",
  "description": "Teclado HyperX"
}
```
---

Rota: `/walletBalance`

Descrição: Retorna a posição atual da carteira, com o saldo e as movimentações do dia.

Método: `GET`
