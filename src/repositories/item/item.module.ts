import { Module } from '@nestjs/common'

import { DatabaseModule } from '../../database'
import { itemProviders } from './item.providers'
import { ItemService } from './item.service'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...itemProviders,
    ItemService,
  ],
  exports: [ItemService]
})
export class ItemModule {}