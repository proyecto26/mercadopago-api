import { Controller, Get, Param, Query, ParseIntPipe, Render, Req } from '@nestjs/common'
import { Request } from 'express'
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

  @Get('success')
  @Render('ecommerce/success')
  getSuccess(
    @Req() request: Request,
    @Query('payment_method_id') paymentMethod: string,
    @Query('external_reference') orderReference: string,
    @Query('payment_id') paymentId: string,
    @Query('collection_id') collectionId: string
  ) {
    return {
      params: request.query,
      paymentMethod,
      orderReference,
      paymentId: paymentId || collectionId
    }
  }

  @Get('pending')
  @Render('ecommerce/pending')
  getPending(
    @Req() request: Request
  ) {
    return {
      params: request.query
    }
  }

  @Get('failure')
  @Render('ecommerce/failure')
  getFailure(
    @Req() request: Request
  ) {
    return {
      params: request.query
    }
  }

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
