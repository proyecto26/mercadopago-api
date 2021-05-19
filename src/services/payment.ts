import * as moment from 'moment'
import * as MercadoPago from 'mercadopago'
import { Currency } from 'mercadopago/shared/currency'
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model'
import { UpdatePreferencePayload } from 'mercadopago/models/preferences/update-payload.model'
import { CreatePaymentPayload } from 'mercadopago/models/payment/create-payload.model'
import { UpdatePaymentPayload } from 'mercadopago/models/payment/update-payload.model'
import { DefaultConfigurationOmitQs } from 'mercadopago/models/default-configuration.model'
import { MERCADOPAGO } from '../constants'
import { User } from '../models/user'
import { Order, OrderStatus } from '../models/order'
import { PreferenceDto } from '../models/preference'

MercadoPago.configure({
  access_token: MERCADOPAGO.ACCESS_TOKEN,
  platform_id: MERCADOPAGO.PLATFORM_ID,
  integrator_id: MERCADOPAGO.INTEGRATOR_ID,
  corporation_id: MERCADOPAGO.CORPORATION_ID
})

const currencyId = <Currency>MERCADOPAGO.CURRENCY_ID

export const PaymentOrderStatus = {
  pending: OrderStatus.Created,
  approved: OrderStatus.Fulfilled,
  authorized: OrderStatus.Paid,
  in_process: OrderStatus.Created,
  in_mediation: OrderStatus.Created,
  rejected: OrderStatus.Refunded,
  cancelled: OrderStatus.Refunded,
  refunded: OrderStatus.Refunded,
  charged_back: OrderStatus.Refunded
}

const formatUser = (user: User): Partial<CreatePreferencePayload> => ({
  payer: {
    name: user.firstName,
    surname: user.lastName,
    email: user.email,
    date_created: moment(user.createDate).format(),
    phone: {
      area_code: user.areaCode,
      number: Number(user.phoneNumber) as any // TODO: Remove workaround, issue with types https://github.com/mercadopago/devsite-docs/issues/1173 
    },
    identification: {
      type: 'CC', // Available ID types at https://api.mercadopago.com/v1/identification_types
      number: user.id
    },
    address: {
      street_name: user.address,
      zip_code: user.postalCode,
      street_number: 1602 as any// TODO: Remove workaround, issue with types https://github.com/mercadopago/devsite-docs/issues/1173 
    }
  },
  /*shipments: {
    cost: MERCADOPAGO.SHIPMENTS_COST,
    mode: 'custom',
    receiver_address: {
      zip_code: user.postalCode,
      street_number: '1602',
      street_name: 'Insurgentes Sur',
      floor: '15',
      apartment: '1523',
      city_name: 'Medellin',
      state_name: 'Antioquia'
    }
  }*/
})

const formatOrder = (order: Order): Partial<CreatePreferencePayload> => ({
  external_reference: `jdnichollsc@hotmail.com`, // TODO: use order.id
  items: order.orderItems.map(orderItem => ({
    title: orderItem.item.title,
    description: orderItem.item.description,
    picture_url: orderItem.item.pictureUrl,
    category_id: `others`, // Available categories at https://api.mercadopago.com/item_categories
    quantity: orderItem.quantity,
    currency_id: currencyId,
    unit_price: orderItem.unitPrice
  }))
})

export const createPreference = (user: User, order: Order): Promise<PreferenceDto> => {
  // const currentDate = new Date()
  const preference: CreatePreferencePayload = {
    ...formatUser(user),
    ...formatOrder(order),
    binary_mode: false,
    auto_return: 'approved',
    // expires: true,
    // expiration_date_from: moment(currentDate).format(),
    // expiration_date_to: moment(currentDate).add(1, 'days').format(),
    notification_url: MERCADOPAGO.NOTIFICATION_URL,
    statement_descriptor: MERCADOPAGO.BUSINESS_NAME,
    // additional_info: 'CUSTOM DATA',
    back_urls: {
      success: MERCADOPAGO.SUCCESS_URL,
      failure: MERCADOPAGO.FAILURE_URL,
      pending: MERCADOPAGO.PENDING_URL
    },
    payment_methods: {
      excluded_payment_methods: [
        { id: 'amex' }
      ],
      excluded_payment_types: [
        { id: 'atm' }
      ],
      installments: 6,
      default_installments: 6,
      // default_payment_method_id: null
    },
    taxes: [{
      type: 'IVA',
      value: MERCADOPAGO.TAXES_IVA
    }],
    /* tracks: [
      {
        type: 'facebook_ad',
        values: {
          'pixel_id': 'PIXEL_ID'
        }
      },
      {
        type: 'google_ad',
        values: {
          conversion_id: 'CONVERSION_ID',
          conversion_label: 'CONVERSION_LABEL'
        } 
      }
    ] */
  }
  return MercadoPago.preferences.create(preference).then((res) => res.body)
}

export const updatePreference = (preference: UpdatePreferencePayload) => {
  return MercadoPago.preferences.update(preference) 
}

export const findPayment = (paymentId: number, configuration?: DefaultConfigurationOmitQs) => {
  return MercadoPago.payment.findById(paymentId, configuration).then((res) => res.body)
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

export const refundPayment = (paymentId: number, amount?: number) => {
  return MercadoPago.refund.create({
    payment_id: paymentId,
    amount // partial refunds if an amount less than the total payment is established here.
  }).then((res) => res.body)
}