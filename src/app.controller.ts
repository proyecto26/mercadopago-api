import { Controller, Get, Render, HttpCode, HttpStatus, Query, Req } from '@nestjs/common'
import {
  ApiTags,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiServiceUnavailableResponse
} from '@nestjs/swagger'
import { Request } from 'express'
import { AppService } from './app.service'

@ApiTags('API')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Check API status' })
  @ApiOkResponse({ description: 'The service is operating correctly' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBadRequestResponse({ description: 'Communication error with the server' })
  @ApiServiceUnavailableResponse({ description: 'The service is not available' })
  @HttpCode(HttpStatus.OK)
  @Get('api/help')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getHelp(): void {}

  @Get('success')
  @Render('success')
  @ApiExcludeEndpoint()
  getSuccess(
    @Query('payment_method_id') paymentMethod: string,
    @Query('external_reference') orderReference: string,
    @Query('payment_id') paymentId: string,
    @Query('collection_id') collectionId: string
  ) {
    return {
      paymentMethod,
      orderReference,
      paymentId: paymentId || collectionId
    }
  }

  @Get('pending')
  @Render('pending')
  @ApiExcludeEndpoint()
  getPending(
    @Req() request: Request
  ) {
    return {
      message: this.appService.getHello()
    }
  }

  @Get('failure')
  @Render('failure')
  @ApiExcludeEndpoint()
  getFailure(
    @Req() request: Request
  ) {
    return {
      message: this.appService.getHello()
    }
  }

  @Get()
  @Render('home')
  @ApiExcludeEndpoint()
  getHome(): { message: string } {
    return {
      message: this.appService.getHello()
    }
  }
}
