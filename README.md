# API Caixa Virtual
Esta API tem o intuito de registrar movimentos de Entrada e Saída de um Caixa Virtual, as movimentações guardam data, tipo, categoria, valor e descrição. As categorias podem ser cadastradas e mantidas pelos usuários da API, que também podem ser cadastrados.

As movimentações registradas ficam protegidas e só podem ser visualizadas pelo usuário que as gerou.

### Tecnologias utilizadas
* Node.js
* Express.js
* JWT
* MongoDB
* Docker

### Pré-requisitos
Antes de prosseguir para a instalação garanta que você possua instalado em sua maquina local
* [Nodejs](https://nodejs.org/en/download/)
* [MongoDB](https://www.mongodb.com/download-center/community)
* [Docker](https://www.docker.com/get-started)*

*_A arquitetura desta API possibilita o uso com e sem Docker, ambas opções de instalação serão demonstradas logo adiante._

### Instalação

#### Sem Docker
Nesta opção é necessário ter instalado o Node.js e MongoDB

Abra o terminal e digite os seguintes comandos:
```
git clone https://github.com/ViniciusMAlmeida/vcaixa.dev.git
cd vcaixa.dev
npm i
```

#### Com Docker
Nesta opção é necessário ter instalado o Node.js, Docker e docker-compose

Abra o terminal e digite os seguintes comandos:
```
git clone https://github.com/ViniciusMAlmeida/vcaixa.dev.git
cd vcaixa.dev
npm i
docker-compose up -d
```

### Configurações
Acessar o diretório _/src/config_ e renomear o arquivo _.env.exemple_ para _.env_, neste arquivo você precisa informar a url de conexão de seu banco de dados no valor da chave `DB_NAME`.

Neste arquivo também é possivel configurar:
* `PORT`: porta da API
* `JWT_KEY`: API-Key do Token JWT

Caso esteja utilizando Docker, manter o valor `mongodb://mongo:27017/vcaixa-dev` na chave `DB_NAME` pois o arquivo _docker-compose.yml_ provém um serviço de MongoDB para esta url de conexão.

### Executando a API
Após a instalação e configuração podemos inicializar a API rodando o seguinte comando:

`npm start`

Neste momento a API já está diponível para uso no endereço `http://localhost:"porta configurada"`, substituir "porta configurada" pela porta informada(sem as aspas) na chave `PORT` do arquivo _.env_

Caso esteja utilizando Docker, o comando `docker-compose up -d` executado anteriormente já disponibiliza o uso da API.

[Documentação de uso da API](https://github.com/ViniciusMAlmeida/vcaixa.dev/blob/master/API_DOCS.md#documenta%C3%A7%C3%A3o-de-uso-da-api)

Extra: caso esteja usando Docker e tenha interesse de visualizar ou manipular as collections geradas pela API, está disponivel uma interface de administração do MongoDB feita para WEB, para utilizar acesse a url `http://localhost:8081` em seu navegador.
