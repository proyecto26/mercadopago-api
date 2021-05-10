export class PayerDto {
  entity_type: 'individual' | 'association'
  type: 'customer' | 'registered' | 'guest'
  id: string
  email: string
  identification: {
    type: string
    number: string
  }
  phone: {
    area_code: string
    number: string
    extension: string
  }
  first_name: string
  last_name: string
}

export class AdditionalInfoItemDto {
  id: string
  title: string
  description: string
  picture_url: string
  category_id: string
  quantity: number
  unit_price: number
}

export class AdditionalInfoPayerDto {
  first_name: string
  last_name: string
  phone: {
    rea_code: string
    number: string
  }
  address: {
    zip_code: string
    street_name: string
    street_number: string
  }
  registration_date: string
}

export class AdditionalInfoShipmentsDto {
  zip_code: string
  street_name: string
  street_number: number
  floor: number
  apartment: string
}

export class AdditionalInfoDto {
  ip_address: string
  items: Array<AdditionalInfoItemDto>
  payer: AdditionalInfoPayerDto
  shipments: AdditionalInfoShipmentsDto
}

export class TransactionDetailsDto {
  acquirer_reference: string
  bank_transfer_id: number
  external_resource_url: string
  financial_institution: string
  installment_amount: number
  net_received_amount: number
  overpaid_amount: number
  payable_deferral_period: string
  payment_method_reference_id: string
  total_paid_amount: number
  transaction_cicle: string
}

export class PaymentDto {
  payer: PayerDto
  binary_mode: boolean
  order: {
    type: 'mercadolibre' | 'mercadopago'
    id: number
  }
  external_reference: string
  description: string
  metadata: any
  transaction_amount: number
  coupon_amount: number
  campaign_id: number
  coupon_code: string
  differential_pricing_id: number
  application_fee: number
  capture: boolean
  payment_method_id: string
  issuer_id: string
  token: string
  statement_descriptor: string
  installments: number
  notification_url: string
  callback_url: string
  additional_info: AdditionalInfoDto
  transaction_details: TransactionDetailsDto
}
