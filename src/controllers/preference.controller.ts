import {
  Controller,
  UseGuards,
  HttpCode,
  HttpStatus,
  Get,
  BadRequestException,
  Put,
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
  ApiBadRequestResponse,
  ApiForbiddenResponse
} from '@nestjs/swagger'

import { ERRORS, POSTGRES } from '../constants'
import { PreferenceDto } from '../models/preference'
import { updatePreference } from '../services/payment'
  
@ApiBearerAuth()
@ApiTags('Preferences')
@UseGuards(AuthGuard())
@Controller('/api/preferences')
export class PreferenceController {
  constructor(
    // private readonly preferenceService: PreferenceService,
    @Inject(Logger) private readonly logger: LoggerService
  ) { }

  @ApiOperation({ summary: 'Get the list of preferences' })
  @ApiOkResponse({ description: 'Preference list' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiForbiddenResponse({ description: 'You do not have the necessary role to perform this action' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<PreferenceDto[]> {
    return []
  }

  @ApiOperation({ summary: 'Update a preference' })
  @ApiBody({ type: PreferenceDto, description: 'Preference information' })
  @ApiOkResponse({ description: 'The preference was updated successfully' })
  @ApiBadRequestResponse({ description: 'The preference could not be updated' })
  @ApiForbiddenResponse({ description: 'You do not have the necessary role to perform this action' })
  @Put()
  @HttpCode(HttpStatus.OK)
  async updatePreference(
    @Body() preferenceDto: PreferenceDto
  ): Promise<void> {
    try {
      await updatePreference(preferenceDto)
      // await this.preferenceService.updatePreference(preference)
    } catch (error) {
      /**
       * Validate database exceptions
       */
      switch(error.code) {
        case POSTGRES.UNIQUE_VIOLATION:
          throw new BadRequestException(ERRORS.UNIQUE_VIOLATION)
        default:
          this.logger.error(error.message, 'UPDATE_PREFERENCE')
          throw new BadRequestException(error.message)
      }
    }
  }
}
