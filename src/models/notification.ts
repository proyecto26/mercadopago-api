import { ApiProperty } from '@nestjs/swagger'

export enum NotificationAction {
  PaymentCreated = 'payment.created',
  PaymentUpdated = 'payment.updated',
  AppDeauthorized = 'application.deauthorized',
  AppAuthorized = 'application.authorized'
}

export class NotificationData {
  @ApiProperty({ description: 'If of the payment' })
  id: string
}

export class NotificationDto {
  @ApiProperty({ description: 'Action of the notification', enum: NotificationAction })
  action: NotificationAction

  @ApiProperty({ description: 'Payment data' })
  data: NotificationData

  @ApiProperty({ description: 'Date of the notification', name: 'date_created', type: Date })
  dateCreated: string

  @ApiProperty({ description: 'Id of the notification' })
  id: number

  @ApiProperty({ description: 'Type of notification' })
  type: 'payment' | 'mp-connect' | 'plan' | 'subscription' | 'invoice'

  @ApiProperty({ description: 'Id of the user', name: 'user_id' })
  userId: string

  @ApiProperty({ description: 'Mode of the notification', name: 'live_mode' })
  liveMode: boolean

  @ApiProperty({ description: 'Api version', name: 'api_version' })
  apiVersion: string

  @ApiProperty({ description: 'App id', name: 'application_id' })
  applicationId: string

  @ApiProperty({ description: 'Version' })
  version: number
}
