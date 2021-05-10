import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Order } from './order'
import { Item } from './item'

@Entity({ name: 'order_item' })
export class OrderItem {
  constructor(partial: Partial<OrderItem>) {
    Object.assign(this, partial)
  }

  @ApiProperty({ description: 'Id of the order item', required: false })
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public orderId!: number

  @Column()
  public itemId!: number

  @ApiProperty({ description: 'Item Quantity', required: true })
  @IsNotEmpty({ message: 'Quantity is required' })
  @Column()
  public quantity: number

  @ApiProperty({ description: 'Item unit price', required: true })
  @IsNotEmpty({ message: 'Unit price is required' })
  @Column()
  public unitPrice: number

  @ManyToOne(() => Order, order => order.orderItems)
  @JoinColumn({ name: 'orderId' })
  public order!: Order

  @ManyToOne(() => Item, item => item.orderItems)
  @JoinColumn({ name: 'itemId' })
  public item!: Item
}