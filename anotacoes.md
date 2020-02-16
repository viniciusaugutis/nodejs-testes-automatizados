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

pasta integration: testes de integração
pasta unit: testes unitários

Describe: categorias de testes
it: para descrever um teste

Cria um teste por vez e vai ate aquele teste funcionar, para ai sim ir para o próximo. (Isso é TDD)

Lib supertest: substitui o axios. Ela consegue fazer requisições para api sem startar o servidor express.