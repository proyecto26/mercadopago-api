<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://avatars.githubusercontent.com/u/28507035?s=200&v=4" width="200" alt="Nest Logo" />
  </a>
  <a href="http://developers.mercadopago.com" target="blank">
    <img src="https://avatars.githubusercontent.com/u/900583?s=200&v=4" width="200" alt="MercadoPago Logo" />
  </a>
  <hr>
</p>

|   | MercadoPago API Template |
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

Link: https://mercadopago-e-commerce.herokuapp.com/ecommerce
![image](https://user-images.githubusercontent.com/2154886/118763210-146aee00-b83d-11eb-97ee-8646df3620c4.png)

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

#### Crear preferencia de pago
Permite iniciar el proceso de pago, al crear una preferencia se obtiene una url `init_point` para redireccionar los usuarios a un flujo de checkout.
Al finalizar el proceso de pago se recibe una notificación por medio de un Webhook que se configura en la creación de la preferencia, con una url `notification_url` de la API de nuestro negocio.

> Link: https://www.mercadopago.com.co/developers/es/reference/preferences/_checkout_preferences/post

#### Notificaciones
Es necesario definir un endpoint donde se notificará el resultado del proceso de pago.
La notificación se realizará a un Webhook el cual es un POST request unidireccional que MercadoPago envía a nuestro endpoint definido al momento de crear la preferencia de pago.

Acciones:
- `payment.created`: Pago creado, pendiente de pago.
- `payment.updated`: Pago aprobado o rechazado.

Es necesario retornar un HTTP Status 200 (OK) o 201 (Created), de lo contrario MercadoPago seguirá reintentando notificar el cambio con su política de reintentos hasta 4 días después del primer intento mediante una cola de notificaciones.

Las notificaciones también se pueden configurar de manera global en el [panel de desarrolladores](http://mercadopago.com/mco/account/webhooks), tanto para modo Sandbox como Producción.

> Link: https://www.mercadopago.com.co/developers/es/guides/notifications/webhooks

#### Back Urls
Reflejan los estados finales de una transacción, las urls a la que serán redireccionados nuestros usuarios:
- `success`: Pagos éxitosos.
- `failure`: Pagos rechazados.
- `pending`: Pagos en estado pendiente.

> `auto_return`: Parámetro por el cual se puede habilitar el retorno automático según el estado de la transacción.

#### Devoluciones
Se permite realizar devoluciones parciales (en el caso de ingresar un monto menor al total del pago) o totales independientemente del medio de pago.

> Link: https://www.mercadopago.com.co/developers/es/guides/manage-account/account/cancellations-and-refunds

#### Medios de Pago
Es posible establecer medios de pago no soportados dependiendo del país, además de obtener la información de montos mínimos y máximos soportados por cada medio de pago.

> Link: https://www.mercadopago.com.co/developers/es/guides/resources/localization/payment-methods

#### Impuestos
Existen consideraciones de impuestos diferentes por país, estos son establecidos en el momento de crear la preferencia de pago.
MercadoPago es un agente de retención y por defecto aplica retención sobre el 19% de la base del monto total de la preferencia generada a menos que se indique lo contrario en la creación de la preferencia.

Ivas en Colombia:
- 0%
- 5%
- 15%
- 19% (Defecto)

> Link: https://www.mercadopago.com.co/developers/es/guides/resources/localization/iva-colombia


### Testing
- [Integración QR - Postman API Collection](https://documenter.getpostman.com/view/7908112/SVfNv9FJ?version=latest)
- [Checkout Pro](https://www.mercadopago.com.co/developers/es/guides/online-payments/checkout-pro/test-integration)
- [Checkout API](https://www.mercadopago.com.co/developers/es/guides/online-payments/checkout-api/testing)
- [Mobile Checkout](https://www.mercadopago.com.co/developers/es/guides/online-payments/mobile-checkout/testing)
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
* **[Mercado Pago SDK for NodeJS](https://mercadopago.github.io/sdk-nodejs)**

## Star History 🌟

[![Star History Chart](https://api.star-history.com/svg?repos=proyecto26/mercadopago-api&type=Date)](https://star-history.com/#proyecto26/mercadopago-api-code&Date)

## Sponsors 💜

This project is free and open source. Sponsors help keep it maintained and growing.

[**Become a Sponsor**](https://github.com/sponsors/proyecto26) | [Sponsorship Program](https://proyecto26.com/sponsors/)

## Contribution 🤝

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change.
 
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated** ❤️.
 
You can learn more about how you can contribute to this project in the [contribution guide](https://github.com/proyecto26/.github/blob/master/CONTRIBUTING.md).

## Happy coding 💯
Made with ❤️ by [Proyecto 26](https://proyecto26.com) - Changing the world with small contributions.

One hand can accomplish great things, but many can take you into space and beyond! 🌌

Together we do more, together we are more ❤️ <img width="150px" src="https://avatars0.githubusercontent.com/u/28855608?s=200&v=4" align="right">
