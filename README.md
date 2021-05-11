<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

|   | MyApi Template |
| - | ------------ |
| ⚡️ | **Launch your api instantly** watching changes with live-reload |
| 📈 | **Highly scalable** using [Repository design pattern](https://docs.nestjs.com/techniques/database#repository-pattern) to access the database even easier |
| 😎 | **OpenAPI** with [Swagger](https://docs.nestjs.com/openapi/introduction) to describe your RESTful APIs |
| ✨ | **KISS principle** make everything as simple as possible, but not simpler |
| 📱 | **Mobile friendly** supporting Cross-origin resource sharing (CORS) with a list of domains for restricted resources |
| 🔑 | **Security** using JWT authentication strategy with [Passport](https://docs.nestjs.com/techniques/authentication) and other techniques to increase the security of your applications |
| 👥 | **Made for Users.** Easily validate permissions for specific routes using [Guards](https://docs.nestjs.com/guards) with a Role-based access control
| ⏱ | Don't repeat yourself, Single responsibility principle. |
| 🔗 | **Validation:** provides pipes available right out-of-the-box with [class-validator](https://github.com/typestack/class-validator) to enforce validation rules for all incoming client payloads |
| ⚠️ | **Logger** with [Winston](https://github.com/winstonjs/winston) using different levels to track exceptions easily |
| 🔄 | **Migrations** using [TypeORM](https://github.com/typeorm/typeorm) to apply incremental updates to the database |

## Introduction

Link: [Integración QR - Postman API Collection](https://documenter.getpostman.com/view/7908112/SVfNv9FJ?version=latest)

### Credentials
Son las claves que **MercadoPago** proporciona para poder configurar tus integraciones, es una llave que identifica a tu usario **(No compartir)**.
Ejemplo:
- Public Key
- Access Token
- Client ID (Used with SDKs or plugins)
- Client Secret (Used with SDKs or plugins)

Link: https://www.mercadopago.com.co/settings/account/credentials

Es un dato obligatorio. Sirven para validar la identidad de la cuenta por medio de un token.

### Checkout

- Crear preferencia de pago:
Permite iniciar el proceso de pago, al crear una preferencia se obtiene una url `init_point` para redireccionar los usuarios a un flujo de checkout.
Al finalizar el proceso de pago se recibe una notificación por medio de un Webhook que se configura en la creación de la preferencia, con una url `notification_url` de la API de nuestro negocio.

Link: https://www.mercadopago.com.co/developers/es/reference/preferences/_checkout_preferences/post

- Notificaciones:
Es necesario definir un endpoint donde se notificará el resultado del proceso de pago.

Link: https://www.mercadopago.com.co/developers/es/guides/notifications/webhooks


### Testing
- [Checkout Pro](https://www.mercadopago.com.co/developers/es/guides/online-payments/checkout-pro/test-integration)
- [Checkout API](https://www.mercadopago.com.co/developers/es/guides/online-payments/checkout-api/testing)
- **sandbox_init_point**: Url usada para emular un flujo de pago por medio de una redirección de nuestros usuarios con tarjetas de prueba.

## Installation 📚

```bash
# install dependencies
$ yarn
```

## Running the app ▶

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Running migrations ▶

```bash
# run migration
$ yarn migration

# create migration
$ yarn migration:create

# revert migration
$ yarn migration:revert
```

## Test 🕵️

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Credits 👍
* **typescript-starter:** [Nest framework TypeScript starter repository](https://github.com/nestjs/typescript-starter).

## Supporting 🍻
I believe in Unicorns 🦄
Support [me](http://www.paypal.me/jdnichollsc/2), if you do too.

## Happy coding 💯
Made with ❤️

<img width="150px" src="https://avatars0.githubusercontent.com/u/28855608?s=200&v=4" align="right">
