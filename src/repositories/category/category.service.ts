import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Category } from '../../models/category'
import { REPOSITORIES } from '../../constants'
import { PUBLIC_TABLES } from '../../database'

@Injectable()
export class CategoryService {
  constructor(
    @Inject(REPOSITORIES.CATEGORY)
    private readonly repository: Repository<Category>,
  ) { }

  async getAll(): Promise<Category[]> {
    return await this.repository.query(
      `SELECT * FROM ${PUBLIC_TABLES.CATEGORY};`
    )
  }

  insert(category: Category) {
    return this.repository.insert(category)
  }

  update(category: Category) {
    return this.repository.update(category.id, category)
  }

  async delete(categoryId: number) {
    return this.repository.delete(categoryId)
  }
}