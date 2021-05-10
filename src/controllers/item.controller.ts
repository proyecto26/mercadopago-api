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
  Body
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiForbiddenResponse
} from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { DefaultRole } from '../models/role'
import { Item } from '../models/item'
import { ItemService } from '../repositories'
import { RolesGuard, Roles } from '../auth'

@ApiTags('Items')
@Controller('/api/items')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    @Inject(Logger) private readonly logger: LoggerService
  ) { }

  @ApiOperation({ summary: 'Get items' })
  @ApiOkResponse({ description: 'List of items', isArray: true, type: Item })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Item[]> {
    return this.itemService.getAll()
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create item' })
  @ApiOkResponse({ description: 'The item has been created successfully' })
  @ApiBadRequestResponse({ description: 'The item could not be created' })
  @ApiForbiddenResponse({ description: 'You do not have the necessary role to perform this action' })
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(DefaultRole.Admin)
  @Post()
  @HttpCode(HttpStatus.OK)
  async addItem(
    @Body() item: Item,
  ): Promise<void> {
    try {
      await this.itemService.insert(item)
    } catch (error) {
      switch (error.code) {
        default:
          this.logger.error(error.message, 'ADD_ITEM')
          throw new BadRequestException(error.message)
      }
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update item' })
  @ApiOkResponse({ description: 'The item has been updated successfully' })
  @ApiBadRequestResponse({ description: 'The item could not be updated' })
  @ApiForbiddenResponse({ description: 'You do not have the necessary role to perform this action' })
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(DefaultRole.Admin)
  @Put()
  @HttpCode(HttpStatus.OK)
  async updateItem(
    @Body() item: Item,
  ): Promise<void> {
    try {
      await this.itemService.update(item)
    } catch (error) {
      switch (error.code) {
        default:
          this.logger.error(error.message, 'UPDATE_ITEM')
          throw new BadRequestException(error.message)
      }
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete item' })
  @ApiOkResponse({ description: 'The item has been deleted successfully' })
  @ApiBadRequestResponse({ description: 'The item could not be deleted' })
  @ApiForbiddenResponse({ description: 'You do not have the necessary role to perform this action' })
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(DefaultRole.Admin)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteItem(
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    try {
      await this.itemService.delete(id)
    } catch (error) {
      switch (error.code) {
        default:
          this.logger.error(error.message, 'DELETE_ITEM')
          throw new BadRequestException(error.message)
      }
    }
  }
}
