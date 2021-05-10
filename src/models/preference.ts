import { Shipments } from 'mercadopago/models/payment/create-payload.model'
import { PreferenceShipment, PreferenceTrack } from 'mercadopago/models/preferences/create-payload.model'
import { SimpleAddress } from 'mercadopago/shared/address'
import { Currency } from 'mercadopago/shared/currency'

export class PreferenceItemDto {
  title: string
  description: string
  currency_id: Currency
  quantity: number
  unit_price: number
  picture_url: string
  category_id: string
}

export class PayerDto {
  name: string
  surname: string
  email: string
  phone: {
    area_code: string
    number: string
  }
  identification: {
    type: string
    number: string
  }
  address: SimpleAddress
  date_created: string
}

export class BackUrlsDto {
  success: string
  pending: string
  failure: string
}

export class PaymentMethodDto {
  id: string
}

export class FreeMethodDto {
  id: number
}

export class PaymentTypeDto {
  id: string
}

export class TaxDto {
  type: 'IVA' | 'INC'
  value: number
}

export class PreferenceDto {
  id: string
  collector_id?: number
  items: Array<PreferenceItemDto>
  payer: PayerDto
  back_urls?: BackUrlsDto
  payment_methods: {
    excluded_payment_methods: Array<PaymentMethodDto>
    excluded_payment_types: Array<PaymentTypeDto>
    default_payment_method_id: string
    installments: number
    default_installments: number            
  }
  client_id?: number
  marketplace?: string
  marketplace_fee?: number
  shipments: PreferenceShipment
  statement_descriptor?: string
  date_created?: string
  init_point?: string
  sandbox_init_point?: string
  tracks?: Array<PreferenceTrack>
  notification_url: string
  mode?: 'regular_payment' | 'money_transfer'
  additional_info: string
  auto_return?: 'approved' | 'all'
  external_reference: string
  expires?: boolean
  expiration_date_from?: string
  expiration_date_to?: string
  differential_pricing?: {
    id: number
  }
  taxes?: Array<TaxDto>
  binary_mode?: boolean
}