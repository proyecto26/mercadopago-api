import * as jwt from 'jsonwebtoken'

export const PROD_ENV = 'production'
export const DOMAIN = 'https://mercadopago-e-commerce.herokuapp.com'
export const MERCADOPAGO = {
  ACCESS_TOKEN: 'APP_USR-2572771298846850-120119-a50dbddca35ac9b7e15118d47b111b5a-681067803',
  PLATFORM_ID: undefined,
  CORPORATION_ID: undefined,
  INTEGRATOR_ID: 'dev_24c65fb163bf11ea96500242ac130004',
  BUSINESS_NAME: 'Proyecto 26',
  CURRENCY_ID: 'COP',
  TAXES_IVA: 16,
  SHIPMENTS_COST: 1000,
  // NOTIFICATION_URL: `${DOMAIN}/api/payments/notification`,
  NOTIFICATION_URL: `https://hookb.in/DrL8BqPKXXHdNNEwgodd`,
  SUCCESS_URL: `${DOMAIN}/ecommerce/success`,
  FAILURE_URL: `${DOMAIN}/ecommerce/failure`,
  PENDING_URL: `${DOMAIN}/ecommerce/pending`
}
export const AUTH_SECRET_TOKEN = 'my_secret_token';
export const AUTH_JWT_OPTIONS: jwt.SignOptions = {
  expiresIn: '1d'
};

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION'
export const REPOSITORIES = {
  USER: 'USER_REPOSITORY',
  ROLE: 'ROLE_REPOSITORY',
  DOCUMENT_TYPE: 'DOCUMENT_TYPE_REPOSITORY',
  CATEGORY: 'CATEGORY_REPOSITORY',
  ITEM: 'ITEM_REPOSITORY',
  ORDER: 'ORDER_REPOSITORY'
}

export { default as ERRORS } from './errors'
export * as POSTGRES from './postgres'
