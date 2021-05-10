import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Item } from '../../models/item'
import { REPOSITORIES } from '../../constants'
import { PUBLIC_TABLES } from '../../database'

@Injectable()
export class ItemService {
  constructor(
    @Inject(REPOSITORIES.ITEM)
    private readonly repository: Repository<Item>,
  ) { }

  async getAll(): Promise<Item[]> {
    return await this.repository.query(
      `SELECT * FROM ${PUBLIC_TABLES.ITEM};`
    )
  }

  findByIds(ids: number[]) {
    return this.repository
      .createQueryBuilder('item')
      .where('item.id IN (:...ids)', { ids })
      .getMany()
  }

  insert(item: Item) {
    return this.repository.insert(item)
  }

  update(item: Item) {
    return this.repository.update(item.id, item)
  }

  delete(itemId: number) {
    return this.repository.delete(itemId)
  }
}