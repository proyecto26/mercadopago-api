import { Module } from '@nestjs/common'

import { DatabaseModule } from '../../database'
import { categoryProviders } from './category.providers'
import { CategoryService } from './category.service'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...categoryProviders,
    CategoryService,
  ],
  exports: [CategoryService]
})
export class CategoryModule {}