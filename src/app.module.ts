import { Logger, Module } from '@nestjs/common'

import { AuthModule } from './auth'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import {
  UserModule,
  RoleModule,
  DocumentTypeModule,
  CategoryModule,
  ItemModule,
  OrderModule
} from './repositories'
import {
  AuthController,
  UserController,
  RoleController,
  DocumentTypeController,
  CategoryController,
  ItemController,
  OrderController,
  PaymentController
} from './controllers'

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
    DocumentTypeModule,
    CategoryModule,
    ItemModule,
    OrderModule
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    RoleController,
    DocumentTypeController,
    CategoryController,
    ItemController,
    OrderController,
    PaymentController
  ],
  providers: [Logger, AppService],
})
export class AppModule {}
