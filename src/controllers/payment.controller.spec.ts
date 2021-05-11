import { Test } from '@nestjs/testing'
import { LoggerService, Logger } from '@nestjs/common'
import { PreferenceCreateResponse } from 'mercadopago/resources/preferences'
import { PaymentController } from './payment.controller'
import { mockedNotification } from './mocks/notification.mock'
import * as payment from '../services/payment'

jest.mock('../services/payment', () => ({
  cancelPayment: jest.fn()
}))

describe('PaymentController', () => {
  let paymentController: PaymentController
  let loggerService: LoggerService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [PaymentController],
        providers: [Logger],
      }).compile()

    paymentController = moduleRef.get<PaymentController>(PaymentController)
    loggerService = moduleRef.get<LoggerService>(Logger)
  })

  describe.skip('Notification', () => {
    it('should receive payment correctly', async () => {
      await paymentController.paymentNotification(mockedNotification)
    })
  })

  describe('cancelPayment', () => {
    it('should cancel payment correctly', async () => {
      const spycreatePreference = jest.spyOn(payment, 'cancelPayment').mockResolvedValueOnce(null)
      await paymentController.delete(123)
      expect(spycreatePreference).toHaveBeenCalled()
    })
  })
})
