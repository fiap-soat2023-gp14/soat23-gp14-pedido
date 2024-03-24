# soat23-gp14-pedido

## Description

Este Microserviço permite gerenciar os pedidos que são realizados na lanchonete.
Ele possuis as funções de:
  - Fazer checkout de um pedido
  - Listar pedidos
  - Receber callback de pagamento
  - E solicitar anonimização dos dados de um usuário

## SAGA de pagamento

O serviço é responsavel por integrar de forma async com o MS de Pagamento para solicitar o processamento do pagameto do pedido via SQS e receber feedback também via SQS.
Em caso de error para enviar os dados para a fila, o pedido é cancelado e  o usuario notificado.
Ao receber o feedback, caso seja uma confirmação do sucesso serão disparadas rotinas pra enviar o pedido pra preparação e em caso de erro serão realizadas as rotinas compensatórias que causam o cancelamento do pedido.

## Installation

```bash
$ yarn install
```

## Running the app

Para rodar a aplicação localmente, é necessário possuir o MongoDB rodando e as filas no SQS (order-request e order-response) usadas para coreagrafia da SAGA de pagamento do pedido.

Com o banco disponível, a base fiap criada, e as filas configuradas devemos atualizar o arquivo local.env com as cofigurações.

```bash
# load configs to env
$ source local.env

# development
$ yarn run start
```

## Test

```bash
# unit tests
$ yarn run test

$ yarn run test:e2e

# test coverage
$ yarn run test:cov

# test BDD
$ yarn run test:bdd
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).