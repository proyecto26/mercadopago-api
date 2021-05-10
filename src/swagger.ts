import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { PROD_ENV } from './constants'

export function setupSwagger (app: INestApplication): void {
  const url = process.env.NODE_ENV === PROD_ENV ? 'https' : 'http'
  const options = new DocumentBuilder()
    .setTitle('MercadoPago API')
    .setDescription('This API provides the workflow to use MercadoPago Checkout for your e-commerce.')
    .setVersion('1.0')
    .addTag('Contracts')
    .setContact('Juan David Nicholls', 'https://github.com/jdnichollsc', 'jdnichollsc@hotmail.com')
    .addBearerAuth()
    .addServer(`${url}://`)
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
}