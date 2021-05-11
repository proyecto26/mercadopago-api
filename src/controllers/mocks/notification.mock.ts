import { NotificationAction, NotificationDto } from '../../models/notification'

export const mockedNotification: NotificationDto = {
  id: 12345,
  liveMode: true,
  type: 'payment',
  dateCreated: '2015-03-25T10:04:58.396-04:00',
  applicationId: '123123123',
  userId: '44444',
  version: 1,
  apiVersion: 'v1',
  action: NotificationAction.PaymentCreated,
  data: {
    id: '999999999'
  }
}
