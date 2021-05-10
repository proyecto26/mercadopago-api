import * as jwt from 'jsonwebtoken'

export const PROD_ENV = 'production'
export const DOMAIN = 'http://localhost:8001'
export const MERCADOPAGO = {
  ACCESS_TOKEN: 'TEST-849819765734274-030421-f6d2cd03d33e3c96ac6bb0dd768fe216-98687279',
  CURRENCY_ID: 'COP',
  NOTIFICATION_URL: `${DOMAIN}/api/payments/notification`
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
