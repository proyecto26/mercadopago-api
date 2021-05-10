import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, JoinTable, ManyToMany } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty } from 'class-validator'

import { OrderItem } from './orderItem'
import { User } from './user'

export enum OrderStatus {
  Created = 'created',
  Paid = 'paid',
  Fulfilled = 'fulfilled',
  Refunded = 'refunded'
}

@Entity({ schema: 'public' })
export class Order {

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial)
  }

  @ApiProperty({ description: 'Id of the order' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: 'Total amount of the order' })
  @IsNotEmpty({
    message: 'The total amount is required'
  })
  @Column()
  totalAmount: number

  @ApiProperty({ description: 'Status of the order' })
  @IsNotEmpty({
    message: 'The status is required'
  })
  @Column({ length: 50, type: 'text', enum: OrderStatus })
  @IsEnum(OrderStatus)
  status: OrderStatus

  @CreateDateColumn({ type: 'text' })
  createDate: Date

  @UpdateDateColumn({ type: 'text' })
  updateDate: Date

  @OneToMany(() => OrderItem, orderItem => orderItem.order, {
    cascade: true
  })
  public orderItems!: OrderItem[]

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User
  @Column({
    insert: true
  })
  userId: string
}
