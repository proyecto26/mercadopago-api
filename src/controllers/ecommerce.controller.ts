import { Controller, Get, Param, Query, ParseIntPipe, Render } from '@nestjs/common'
import * as numeral from 'numeral'
import { Item } from '../models/item'
import { CategoryService, ItemService } from '../repositories'

const formatItem = (item: Item) => ({
  ...item,
  price: numeral(item.price).format('$ 0,0[.]00')
})

@Controller('/ecommerce')
export class ECommerceController {
  constructor(
    private readonly itemService: ItemService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get('detail/:id')
  @Render('ecommerce/detail')
  async getDetail(
    @Param('id', ParseIntPipe) id: number
  ) {
    const item = await this.itemService.findOne(id)
    return {
      item: formatItem(item)
    }
  }

  @Get()
  @Render('ecommerce/index')
  async getHome(
    @Query('category') categoryId: number
  ) {
    const [items, categories] = await Promise.all([
      !categoryId
        ? this.itemService.getAll()
        : this.itemService.findByCategory(categoryId),
      this.categoryService.getAll()
    ])
    return {
      categoryId,
      items: items.map((item) => formatItem(item)),
      categories
    }
  }
}
