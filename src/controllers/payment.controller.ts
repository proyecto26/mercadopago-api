import {
  Controller,
  UseGuards,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  BadRequestException,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  Inject,
  Logger,
  LoggerService,
  Body
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiParam
} from '@nestjs/swagger'
import { ERRORS, POSTGRES } from '../constants'
import { PaymentDto } from '../models/payment'
import { NotificationAction, NotificationDto } from '../models/notification'
import { PaymentOrderStatus, createPayment, updatePayment, cancelPayment, findPayment, refundPayment } from '../services/payment'
import { OrderService } from '../repositories'
import { Order } from '../models/order'

@ApiTags('Payments')
@Controller('/api/payments')
export class PaymentController {
  constructor(
    private readonly orderService: OrderService,
    @Inject(Logger) private readonly logger: LoggerService
  ) { }

  @ApiOperation({ summary: 'Get the list of payments' })
  @ApiOkResponse({ description: 'Payment list' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiForbiddenResponse({ description: 'You do not have the necessary role to perform this action' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<PaymentDto[]> {
    return []
  }

  @ApiOperation({ summary: 'WebHook for payment notifications' })
  @ApiBody({ type: NotificationDto, description: 'Payment notification' })
  @ApiOkResponse({ description: 'The notification was processed successfully' })
  @ApiBadRequestResponse({ description: 'The notification could not be processed' })
  @ApiForbiddenResponse({ description: 'You do not have the necessary role to perform this action' })
  @Post('notification')
  @HttpCode(HttpStatus.OK)
  async paymentNotification(
    @Body() notification: NotificationDto
  ): Promise<void> {
    try {
      this.logger.log(notification, 'WEBHOOK_NOTIFICATION')
      if (
        notification.action === NotificationAction.PaymentCreated
        || notification.action === NotificationAction.PaymentUpdated
      ) {
        const { status, status_detail, external_reference } = await findPayment(Number(notification.data.id))
        this.logger.debug(status, status_detail)
        // TODO: Validate status_detail: acredited, partially_refunded
        await this.orderService.update(new Order({
          id: external_reference,
          status: PaymentOrderStatus[status]
        }))
      }
    } catch (error) {
      /**
       * Validate exceptions
       */
      switch(error.code) {
        default:
          this.logger.error(error.message, 'WEBHOOK_NOTIFICATION')
          throw new BadRequestException(error.message)
      }
    }
  }

  @ApiOperation({ summary: 'Create a refunds by payment id' })
  @ApiParam({ description: 'The id of the payment', type: Number, name: 'id' })
  @ApiOkResponse({ description: 'The transaction was processed successfully' })
  @ApiBadRequestResponse({ description: 'The transaction could not be processed' })
  @ApiForbiddenResponse({ description: 'You do not have the necessary role to perform this action' })
  @Post('refunds/:id')
  @HttpCode(HttpStatus.OK)
  async refunds(
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    try {
      this.logger.log(id, 'REFUNDS')
      const result = await refundPayment(id)
      return result
    } catch (error) {
      /**
       * Validate exceptions
       */
      switch(error.code) {
        default:
          this.logger.error(error.message, 'REFUNDS')
          throw new BadRequestException(error.message)
      }
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiBody({ type: PaymentDto, description: 'Payment information' })
  @ApiCreatedResponse({ description: 'The payment was created successfully' })
  @ApiBadRequestResponse({ description: 'The payment could not be created' })
  @ApiForbiddenResponse({ description: 'You do not have the necessary role to perform this action' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPayment(
    @Body() paymentDto: PaymentDto
  ): Promise<void> {
    try {
      await createPayment({
        payer: paymentDto.payer,
        transaction_amount: paymentDto.transaction_amount,
        installments: paymentDto.installments,
        payment_method_id: paymentDto.payment_method_id
      })
    } catch (error) {
      /**
       * Validate exceptions
       */
      switch(error.code) {
        case POSTGRES.UNIQUE_VIOLATION:
          throw new BadRequestException(ERRORS.UNIQUE_VIOLATION)
        default:
          this.logger.error(error.message, 'ADD_PAYMENT')
          throw new BadRequestException(error.message)
      }
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Update a payment' })
  @ApiBody({ type: PaymentDto, description: 'Payment information' })
  @ApiOkResponse({ description: 'The payment was updated successfully' })
  @ApiBadRequestResponse({ description: 'The payment could not be updated' })
  @ApiForbiddenResponse({ description: 'You do not have the necessary role to perform this action' })
  @Put()
  @HttpCode(HttpStatus.OK)
  async updatePayment(
    @Body() paymentDto: PaymentDto
  ): Promise<void> {
    try {
      await updatePayment(paymentDto.order.id, 'pending')
    } catch (error) {
      /**
       * Validate exceptions
       */
      switch(error.code) {
        case POSTGRES.UNIQUE_VIOLATION:
          throw new BadRequestException(ERRORS.UNIQUE_VIOLATION)
        default:
          this.logger.error(error.message, 'UPDATE_PAYMENT')
          throw new BadRequestException(error.message)
      }
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Delete a payment' })
  @ApiOkResponse({ description: 'Payment deleted' })
  @ApiBadRequestResponse({ description: 'The payment could not be deleted' })
  @ApiForbiddenResponse({ description: 'You do not have the necessary role to perform this action' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    try {
      await cancelPayment(id)
    } catch (error) {
      this.logger.error(error.message, 'DELETE_PAYMENT')
      throw new BadRequestException(error.message)
    }
  }
}
