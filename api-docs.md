# Documentação de uso da API
Todas* as rotas desta API são protegidas com autenticação via Bearer Token, sendo assim, para poder acessar as rotas é necessário adicionar um campo no Header de todas as requisições com o nome `Authorization` com o valor `Bearer <token>` onde `<token>` é o Token, caso contrario a API irá retornar um status 401 (Unauthorized) `{ erro: Token não informado.}`.

*_Exceção para as rotas `/user/register` e `/user/authenticate` que não necessitam de autenticação via Bearer Token, pois estas servem para cadastrar e autenticar usuários respectivamente._

O Token para utilização das rotas protegidas é obtido no retorno da requisição enviada para a rota `/user/authenticate`.

O corpo de todas as requisições e resposta da API utilizam como padrão o formato JSON, logo ao enviar requisições, o corpo deve estar neste formato.

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

