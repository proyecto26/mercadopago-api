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
import { Category } from '../models/category'
import { CategoryService } from '../repositories'
import { RolesGuard, Roles } from '../auth'

@ApiTags('Categories')
@Controller('/api/categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    @Inject(Logger) private readonly logger: LoggerService
  ) { }

  @ApiOperation({ summary: 'Get categories' })
  @ApiOkResponse({ description: 'List of categories', isArray: true, type: Category })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Category[]> {
    return this.categoryService.getAll()
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create category' })
  @ApiOkResponse({ description: 'The category has been created successfully' })
  @ApiBadRequestResponse({ description: 'The category could not be created' })
  @ApiForbiddenResponse({ description: 'You do not have the necessary role to perform this action' })
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(DefaultRole.Admin)
  @Post()
  @HttpCode(HttpStatus.OK)
  async addCategory(
    @Body() category: Category,
  ): Promise<void> {
    try {
      await this.categoryService.insert(category)
    } catch (error) {
      switch (error.code) {
        default:
          this.logger.error(error.message, 'ADD_CATEGORY')
          throw new BadRequestException(error.message)
      }
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update category' })
  @ApiOkResponse({ description: 'The category has been updated successfully' })
  @ApiBadRequestResponse({ description: 'The category could not be updated' })
  @ApiForbiddenResponse({ description: 'You do not have the necessary role to perform this action' })
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(DefaultRole.Admin)
  @Put()
  @HttpCode(HttpStatus.OK)
  async updateCategory(
    @Body() category: Category,
  ): Promise<void> {
    try {
      await this.categoryService.update(category)
    } catch (error) {
      switch (error.code) {
        default:
          this.logger.error(error.message, 'UPDATE_CATEGORY')
          throw new BadRequestException(error.message)
      }
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete category' })
  @ApiOkResponse({ description: 'The category has been deleted successfully' })
  @ApiBadRequestResponse({ description: 'The category could not be deleted' })
  @ApiForbiddenResponse({ description: 'You do not have the necessary role to perform this action' })
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(DefaultRole.Admin)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    try {
      await this.categoryService.delete(id)
    } catch (error) {
      switch (error.code) {
        default:
          this.logger.error(error.message, 'DELETE_CATEGORY')
          throw new BadRequestException(error.message)
      }
    }
  }
}
