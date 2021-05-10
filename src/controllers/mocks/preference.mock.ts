import { PreferenceDto } from '../../models/preference'

export const mockedCreatePreference: PreferenceDto = {
  id: '123',
  items: [{
    title: 'Dummy Item',
    description: 'Multicolor Item',
    picture_url: 'http://www.myapp.com/myimage.jpg',
    category_id: 'cat123',
    quantity: 1,
    currency_id: 'COP',
    unit_price: 10
  }],
  payer: {
    name: 'J.D',
    surname: 'Nicholls',
    email: 'jdnichollsc@gmail.com',
    date_created: '2020-06-05T03:45:31.636Z',
    phone: {
      area_code: '+57',
      number: '3156208581'
    },
    identification: {
      type: 'CC',
      number: '1152439275'
    },
    address: {
      street_name: 'Cra 84b #4g-75 Apto 1523',
      street_number: '',
      zip_code: '050023'
    }
  },
  shipments: {
    mode: 'not_specified'
  },
  payment_methods: {
    excluded_payment_methods: [{
      id: 'banamex'
    }],
    excluded_payment_types: [{
      id: 'credit_card'
    }],
    installments: 12,
    default_payment_method_id: null,
    default_installments: 1
  },
  external_reference: 'my-database-id',
  additional_info: 'other info...',
  notification_url: ''
}
