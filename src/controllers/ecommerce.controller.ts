import { Controller, Get, Param, Query, ParseIntPipe, Render, Req, Post, Res, Body, BadRequestException, Inject, Logger, LoggerService, ParseBoolPipe } from '@nestjs/common'
import { Request, Response } from 'express'
import * as numeral from 'numeral'
import { ApiExcludeEndpoint } from '@nestjs/swagger'

import { ERRORS } from '../constants'
import { OrderItem } from '../models/orderItem'
import { Item } from '../models/item'
import { Order, OrderStatus } from '../models/order'
import { createPreference } from '../services/payment'
import { CategoryService, ItemService, OrderService, UserService } from '../repositories'

const formatItem = (item: Item) => ({
  ...item,
  price: numeral(item.price).format('$ 0,0[.]00')
})

@Controller('/ecommerce')
export class ECommerceController {
  constructor(
    private readonly itemService: ItemService,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
    private readonly orderService: OrderService,
    @Inject(Logger) private readonly logger: LoggerService
  ) {}

  @Get('success')
  @Render('ecommerce/success')
  @ApiExcludeEndpoint()
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
  @ApiExcludeEndpoint()
  getPending(
    @Req() request: Request
  ) {
    return {
      params: request.query
    }
  }

  @Get('failure')
  @Render('ecommerce/failure')
  @ApiExcludeEndpoint()
  getFailure(
    @Req() request: Request
  ) {
    return {
      params: request.query
    }
  }

  @Get('detail/:id')
  @Render('ecommerce/detail')
  @ApiExcludeEndpoint()
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
  @ApiExcludeEndpoint()
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

  @Post('payment')
  @ApiExcludeEndpoint()
  async payment(
    @Req() req: Request,
    @Res() res: Response,
    @Body('id', ParseIntPipe) id: number,
    @Body('quantity', ParseIntPipe) quantity: number,
    @Body('redirect') redirect?: boolean
  ) {
    try {
      const item = await this.itemService.findOne(id)
      if (!item) throw new Error(ERRORS.ITEM_NOT_FOUND)

      const orderItems: OrderItem[] = [
        new OrderItem({
          item,
          unitPrice: item.price,
          quantity: quantity,
        })
      ]
      const totalAmount = quantity * item.price
      // TODO: Enable Auth to avoid using test user
      const userId = '681094118'
      const user = await this.userService.findOne(userId)
      const order = await this.orderService.save(new Order({
        userId,
        status: OrderStatus.Created,
        totalAmount,
        orderItems
      }))
      const preference = await createPreference(user, order)
      if (Boolean(redirect)) {
        res.redirect(preference.init_point);
      } else {
        res.json(preference).status(200);
      }
    } catch (error) {
      this.logger.error(error.message, 'ECOMMERCE_PAYMENT')
      throw new BadRequestException(error.message)
    }
  }
}
