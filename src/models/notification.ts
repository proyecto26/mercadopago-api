import { ApiProperty } from '@nestjs/swagger'

export class NotificationData {
  @ApiProperty({ description: 'If of the payment' })
  id: string
}

export class NotificationDto {
  @ApiProperty({ description: 'Action of the notification' })
  action: 'payment.created'

  @ApiProperty({ description: 'Payment data' })
  data: NotificationData

  @ApiProperty({ description: 'Date of the notification' })
  date_created: string

  @ApiProperty({ description: 'Id of the notification' })
  id: string

  @ApiProperty({ description: 'Type of notification' })
  type: 'payment'

  @ApiProperty({ description: 'Id of the user' })
  user_id: string
}
