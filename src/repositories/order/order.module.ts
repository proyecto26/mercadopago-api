import { Module } from '@nestjs/common'

import { DatabaseModule } from '../../database'
import { orderProviders } from './order.providers'
import { OrderService } from './order.service'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...orderProviders,
    OrderService,
  ],
  exports: [OrderService]
})
export class OrderModule {}