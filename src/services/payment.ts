import * as MercadoPago from 'mercadopago'
import { Currency } from 'mercadopago/shared/currency'
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model'
import { UpdatePreferencePayload } from 'mercadopago/models/preferences/update-payload.model'
import { CreatePaymentPayload } from 'mercadopago/models/payment/create-payload.model'
import { UpdatePaymentPayload } from 'mercadopago/models/payment/update-payload.model'
import { MERCADOPAGO } from '../constants'
import { User } from '../models/user'
import { Order } from '../models/order'

MercadoPago.configure({
  access_token: MERCADOPAGO.ACCESS_TOKEN
})

const currencyId = <Currency>MERCADOPAGO.CURRENCY_ID

const formatUser = (user: User): Partial<CreatePreferencePayload> => ({
  payer: {
    name: user.firstName,
    surname: user.lastName,
    email: user.email,
    date_created: user.createDate.toISOString(),
    phone: {
      area_code: '+57',
      number: Number(user.phoneNumber)
    } as any,
    identification: {
      type: 'CC',
      number: user.id
    },
    address: {
      street_name: user.address,
      zip_code: user.postalCode
    } as any
  }
})

const formatOrder = (order: Order): Partial<CreatePreferencePayload> => ({
  external_reference: `${order.id}`,
  items: order.orderItems.map(orderItem => ({
    title: orderItem.item.title,
    description: orderItem.item.description,
    picture_url: orderItem.item.pictureUrl,
    category_id: `${orderItem.item.categoryId}`,
    quantity: orderItem.quantity,
    currency_id: currencyId,
    unit_price: orderItem.unitPrice
  }))
})

export const createPreference = (user: User, order: Order) => {
  const preference: CreatePreferencePayload = {
    ...formatUser(user),
    ...formatOrder(order),
    notification_url: MERCADOPAGO.NOTIFICATION_URL,
    payment_methods: {
      excluded_payment_methods: [
        {
          id: 'banamex'
        }
      ],
      excluded_payment_types: [
        {
          id: 'credit_card'
        }
      ],
      installments: 12,
      default_installments: 1
    },
  }
  return MercadoPago.preferences.create(preference) 
}

export const updatePreference = (preference: UpdatePreferencePayload) => {
  return MercadoPago.preferences.update(preference) 
}

export const createPayment = (payment: CreatePaymentPayload) => {
  return MercadoPago.payment.create(payment)
}

export const updatePayment = (paymentId: number, status: UpdatePaymentPayload['status']) => {
  return MercadoPago.payment.update({
    id: paymentId,
    status
  })
}

export const cancelPayment = (paymentId: number) => {
  return MercadoPago.payment.cancel(paymentId)
}