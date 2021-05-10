import { Connection, Repository } from 'typeorm'

import { Item } from '../../models/item'
import { DATABASE_CONNECTION, REPOSITORIES } from '../../constants'

export const itemProviders = [
  {
    provide: REPOSITORIES.ITEM,
    useFactory: (connection: Connection): Repository<Item> => connection.getRepository(Item),
    inject: [DATABASE_CONNECTION],
  }
]