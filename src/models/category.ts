import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

import { Item } from './item'

@Entity({ schema: 'public' })
export class Category {

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ description: 'Id of the category', required: false })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: 'Name of the category' })
  @IsNotEmpty({
    message: 'The name is required'
  })
  @Column({ length: 50, type: 'text' })
  name: string

  @OneToMany(() => Item, (item: Item) => item.category, {
    cascade: true
  })
  items: Item[]
}