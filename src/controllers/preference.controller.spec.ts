import { Test } from '@nestjs/testing'
import { LoggerService, Logger } from '@nestjs/common'
import { PreferenceCreateResponse } from 'mercadopago/resources/preferences'
import { PreferenceController } from './preference.controller'
import { mockedCreatePreference } from './mocks/preference.mock'
import * as payment from '../services/payment'

jest.mock('../services/payment', () => ({
  createPreference: jest.fn()
}))

describe('PreferenceController', () => {
  let preferenceController: PreferenceController
  let loggerService: LoggerService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [PreferenceController],
        providers: [Logger],
      }).compile()

    preferenceController = moduleRef.get<PreferenceController>(PreferenceController)
    loggerService = moduleRef.get<LoggerService>(Logger)
  })

  describe('createPreference', () => {
    it('should create a preference correctly', async () => {
      const result: PreferenceCreateResponse = {
        body: 123,
        response: 123,
        status: 200,
        idempotency: '123',
        pagination: 1,
        prev: jest.fn(),
        next: jest.fn(),
        hasPrev: jest.fn(() => false),
        hasNext: jest.fn(() => false),
        getExecOptions: jest.fn()
      }
      const spycreatePreference = jest.spyOn(payment, 'createPreference').mockResolvedValueOnce(result)
      await preferenceController.createPreference(mockedCreatePreference)
      expect(spycreatePreference).toHaveBeenCalled()
    })
  })
})
