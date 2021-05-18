import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Post,
  BadRequestException,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Inject,
  Logger,
  LoggerService,
  Request,
  Body,
  HttpException
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiBody
} from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { DefaultRole } from '../models/role'
import { AuthUser } from '../models/auth'
import { Order, OrderStatus } from '../models/order'
import { ItemDto } from '../models/item'
import { OrderItem } from '../models/orderItem'
import { UserService, ItemService, OrderService } from '../repositories'
import { RolesGuard, Roles } from '../auth'
import { ERRORS } from '../constants'
import { createPreference } from '../services/payment'

@ApiTags('Orders')
@Controller('/api/orders')
export class OrderController {
  constructor(
    private readonly userService: UserService,
    private readonly itemService: ItemService,
    private readonly orderService: OrderService,
    @Inject(Logger) private readonly logger: LoggerService
  ) { }

  @ApiOperation({ summary: 'Get orders' })
  @ApiOkResponse({ description: 'List of orders', isArray: true, type: Order })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Order[]> {
    return this.orderService.getAll()
  }

  @ApiOperation({ summary: 'Create order' })
  @ApiBody({ type: ItemDto, isArray: true, description: 'Items of the order' })
  @ApiOkResponse({ description: 'The order has been created successfully' })
  @ApiBadRequestResponse({ description: 'The order could not be created' })
  @ApiForbiddenResponse({ description: 'You do not have the necessary role to perform this action' })
  //@ApiBearerAuth()
  //@UseGuards(AuthGuard(), RolesGuard)
  //@Roles(
  //  DefaultRole.Admin,
  //  DefaultRole.User
  //)
  @Post()
  @HttpCode(HttpStatus.OK)
  async addOrder(
    @Request() req: { user: AuthUser },
    @Body() itemsDto: ItemDto[],
  ): Promise<void> {
    try {
      if (!itemsDto.length) throw new Error(ERRORS.ORDER_ITEMS_EMPTY)
      // TODO: Enable Auth to avoid using test user
      const userId = req.user?.id || '681094118'
      const items = await this.itemService.findByIds(itemsDto.map(i => i.id))
      if (!items.length) throw new Error(ERRORS.ORDER_ITEMS_EMPTY)

      const orderItems: OrderItem[] = []
      const totalAmount = itemsDto.reduce((total, itemQuantity) => {
        const item = items.find((i) => i.id === itemQuantity.id)
        if (!item) throw new Error(ERRORS.ITEM_NOT_FOUND)
        orderItems.push(new OrderItem({
          item,
          unitPrice: item.price,
          quantity: itemQuantity.quantity,
        }))
        total += itemQuantity.quantity * item.price
        return total
      }, 0)
      const user = await this.userService.findOne(userId)
      const order = await this.orderService.save(new Order({
        userId,
        status: OrderStatus.Created,
        totalAmount,
        orderItems
      }))
      const preference = await createPreference(user, order)
      return preference
    } catch (error) {
      switch (error.code) {
        default:
          this.logger.error(error.message, 'ADD_ORDER')
          throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error.message,
          }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  @ApiOperation({ summary: 'Update order' })
  @ApiOkResponse({ description: 'The order has been updated successfully' })
  @ApiBadRequestResponse({ description: 'The order could not be updated' })
  @ApiForbiddenResponse({ description: 'You do not have the necessary role to perform this action' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(DefaultRole.Admin)
  @Put()
  @HttpCode(HttpStatus.OK)
  async updateOrder(
    @Body() order: Order,
  ): Promise<void> {
    try {
      await this.orderService.update(order)
    } catch (error) {
      switch (error.code) {
        default:
          this.logger.error(error.message, 'UPDATE_ORDER')
          throw new BadRequestException(error.message)
      }
    }
  }

  @ApiOperation({ summary: 'Delete order' })
  @ApiOkResponse({ description: 'The order has been deleted successfully' })
  @ApiBadRequestResponse({ description: 'The order could not be deleted' })
  @ApiForbiddenResponse({ description: 'You do not have the necessary role to perform this action' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(DefaultRole.Admin)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteOrder(
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    try {
      await this.orderService.delete(id)
    } catch (error) {
      switch (error.code) {
        default:
          this.logger.error(error.message, 'DELETE_ORDER')
          throw new BadRequestException(error.message)
      }
    }
  }
}
