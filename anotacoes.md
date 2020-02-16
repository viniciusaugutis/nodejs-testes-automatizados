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