import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Order } from '../../models/order'
import { REPOSITORIES } from '../../constants'
import { PUBLIC_TABLES } from '../../database'

@Injectable()
export class OrderService {
  constructor(
    @Inject(REPOSITORIES.ORDER)
    private readonly repository: Repository<Order>,
  ) { }

  async getAll(): Promise<Order[]> {
    return await this.repository.query(
      `SELECT * FROM ${PUBLIC_TABLES.ORDER};`
    )
  }

  save(order: Order) {
    return this.repository.save(order)
  }

  insert(order: Order) {
    return this.repository.insert(order)
  }

  update(order: Order) {
    return this.repository.update(order.id, order)
  }

  delete(orderId: number) {
    return this.repository.delete(orderId)
  }
}