## Configuração do Jest

yarn add jest -dados
yarn jest --init

jest.config.js: arquivo de configuração dos testes em jest

__tests__: pasta onde padrão de criar os arquivos de teste. Arquivos .test.js

No trecho do test match coloco 

 testMatch: [
    "**/__tests__/**/*.test.js"
  ]


## Configuração do projeto e banco de dados

Para ambiente de desenvolvimento usamos o sqlite3 para rodar os testes.
Para produtivo é utilizado o próprio posgres (ou outro cliente de banco de dados como SQLServer).

--ignore __tests__ : faz com que o nodemon não restarte a aplicação caso arquivos de testes sejam alterados


## Sequelize

yarn sequelize init

O sqlite não precisa de usuário e senha, por isso preciso apenas do dialecto dentro do arquivo .env.test

yarn sequelize migration:create --name=create-users: Criar migração para usuário

yarn sequelize db:migrate: Executar a migração


## Testes com Jest

pasta integration: testes de integração: São testes que precisam acessar um banco de dados e uma API específica
pasta unit: testes unitários: São testes que não precisam acessar um banco de dados e nem uma API específica

Describe: categorias de testes
it: para descrever um teste

Cria um teste por vez e vai ate aquele teste funcionar, para ai sim ir para o próximo. (Isso é TDD)

Lib supertest: substitui o axios. Ela consegue fazer requisições para api sem startar o servidor express.

BeforeEach, AfterEach: executa depois de cada teste
beforeAll, afterAll: executa antes e depois de todos os testes

## Factory Girl + Faker

yarn add factory-girl -D

yarn add faker -D: ele gera dados aleatórios para nós

## Mocks

Mock: Simular o comportamento de alguma funcionalidade da nossa aplicação.
Precisamos testar se o comportamento está ocorrendo e não se a funcionalidade está funcionando corretamente

Conseguimos simular como nossa aplicação deve-se comportar de uma forma bem legal e poderosa do jest

## Coverage reports

Na pasta de arquivo gerado tem uma pasta icov-report/index.html que consigo ter mais detalhes do que faltou ser testados e cobrido nas linhas de testes

Isso dá uma visão do que foi testado e o que faltou testar na aplicação
