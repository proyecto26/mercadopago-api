import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

import { Category } from './category'
import { OrderItem } from './orderItem'

@Entity({ schema: 'public' })
export class Item {

  constructor(partial: Partial<Item>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ description: 'Id of the Item', required: false })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: 'Title of the item' })
  @IsNotEmpty({
    message: 'The title is required'
  })
  @Column({ length: 50, type: 'text' })
  title: string

  @ApiProperty({ description: 'Description of the item' })
  @IsNotEmpty({
    message: 'The description is required'
  })
  @Column({ length: 200, type: 'text' })
  description: string

  @ApiProperty({ description: 'Url of the image', required: true })
  @IsNotEmpty({ message: 'The image is required' })
  @Column('text')
  pictureUrl: string

  @ApiProperty({ description: 'Price of the item', required: true })
  @IsNotEmpty({ message: 'Price is required' })
  @Column()
  price: number

  @CreateDateColumn({ type: 'text' })
  createDate: Date

  @UpdateDateColumn({ type: 'text' })
  updateDate: Date

  @Column()
  categoryId?: number

  @ApiProperty({ description: 'Category associated with the item' })
  @ManyToOne(() => Category, category => category.items)
  category?: Category

  @OneToMany(() => OrderItem, orderItem => orderItem.item, {
    cascade: true
  })
  public orderItems!: OrderItem[];
}

export class ItemDto extends Item {
  @ApiProperty({ description: 'Quantity of the item' })
  @IsNotEmpty({
    message: 'The quantity is required'
  })
  quantity: number
}