import { Logger, Module, HttpModule } from '@nestjs/common'

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
  PaymentController,
  ECommerceController
} from './controllers'

@Module({
  imports: [
    HttpModule,
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
    PaymentController,
    ECommerceController
  ],
  providers: [Logger, AppService],
})
export class AppModule {}
