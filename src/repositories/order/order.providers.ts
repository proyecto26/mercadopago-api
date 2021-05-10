import { Connection, Repository } from 'typeorm'

import { Order } from '../../models/order'
import { DATABASE_CONNECTION, REPOSITORIES } from '../../constants'

export const orderProviders = [
  {
    provide: REPOSITORIES.ORDER,
    useFactory: (connection: Connection): Repository<Order> => connection.getRepository(Order),
    inject: [DATABASE_CONNECTION],
  }
]