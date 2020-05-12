<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A simplistic API using NestJS, a Node.js framework for building scalable applications. Unit tests, TypeORM, class-validator, JWT, Passport, bcrypt and more.</p>

## Installation

```bash
$ yarn
```

## Running the app

First, create a .env file and copy content from .env.sample file setting the variables for some value.

Obs: **NODE_ENV** has to be ***development*** or ***production***.

### Development
For development environment, set the **NODE_ENV** variable in .env file to ***development*** and run the command below:
```bash
$ yarn typeorm migration:run && yarn start:dev
```

### Production
For production environment, set the **NODE_ENV** variable in .env file to ***production*** and run the command below:
```bash
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test
```
