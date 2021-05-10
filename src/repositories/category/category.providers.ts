import { Connection, Repository } from 'typeorm'

import { Category } from '../../models/category'
import { DATABASE_CONNECTION, REPOSITORIES } from '../../constants'

export const categoryProviders = [
  {
    provide: REPOSITORIES.CATEGORY,
    useFactory: (connection: Connection): Repository<Category> => connection.getRepository(Category),
    inject: [DATABASE_CONNECTION],
  }
]