import {
  Table,
  QueryRunner,
  MigrationInterface
} from 'typeorm'
import { plainToClass } from 'class-transformer'
import { encryptPassword } from '../../auth'
import { UserStatus, User } from '../../models/user'
import { DefaultRole, Role } from '../../models/role'
import { DefaultDocumentType, DocumentType } from '../../models/documentType'
import { Category } from '../../models/category'
import { Item } from '../../models/item'
import { DOMAIN } from '../../constants'
import {
  PUBLIC_TABLES,
  COLUMN_TYPES,
  FOREIGN_KEYS,
  createAndUpdateDates,
  createForeignKeyOption,
  INDICES,
  EnumToArray
} from '../utils'

export class Initialize1569118664968 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {

    console.log('************** START MIGRATION **************')

    console.log('************** CREATE PUBLIC SCHEMA **************')
    await queryRunner.createTable(new Table({
      name: PUBLIC_TABLES.ROLE,
      columns: [
        {
          name: 'id',
          type: COLUMN_TYPES.INT,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        { name: 'name', type: COLUMN_TYPES.TEXT, length: '50' }
      ]
    }), true)

    await queryRunner.createTable(new Table({
      name: PUBLIC_TABLES.DOCUMENT_TYPE,
      columns: [
        {
          name: 'id',
          type: COLUMN_TYPES.INT,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        { name: 'name', type: COLUMN_TYPES.TEXT, length: '50' }
      ]
    }), true)
    
    await queryRunner.createTable(new Table({
      name: PUBLIC_TABLES.USER,
      columns: [
        { name: 'id', type: COLUMN_TYPES.TEXT, isPrimary: true, isGenerated: false },
        { name: 'password', type: COLUMN_TYPES.TEXT, isNullable: true },
        { name: 'firstName', type: COLUMN_TYPES.TEXT, length: '50' },
        { name: 'lastName', type: COLUMN_TYPES.TEXT, length: '50' },
        { name: 'email', type: COLUMN_TYPES.TEXT, length: '50' },
        { name: 'status', type: COLUMN_TYPES.TEXT, enum: EnumToArray(UserStatus) },
        { name: 'birthdate', type: COLUMN_TYPES.TEXT, isNullable: true },
        { name: 'address', type: COLUMN_TYPES.TEXT, length: '50', isNullable: true },
        { name: 'postalCode', type: COLUMN_TYPES.TEXT, length: '50', isNullable: true },
        { name: 'phoneNumber', type: COLUMN_TYPES.TEXT, length: '20', isNullable: true },
        { name: 'termsAndConditions', type: COLUMN_TYPES.INT, default: false },
        { name: FOREIGN_KEYS.ROLE_ID, type: COLUMN_TYPES.INT },
        { name: FOREIGN_KEYS.DOCUMENT_TYPE_ID, type: COLUMN_TYPES.INT },
        ...createAndUpdateDates
      ],
      foreignKeys: [
        createForeignKeyOption(FOREIGN_KEYS.ROLE_ID, PUBLIC_TABLES.ROLE),
        createForeignKeyOption(FOREIGN_KEYS.DOCUMENT_TYPE_ID, PUBLIC_TABLES.DOCUMENT_TYPE),
      ],
      indices: [
        { name: INDICES.USER_EMAIL, columnNames: ['email'], isUnique: true }
      ]
    }), true)

    await queryRunner.createTable(new Table({
      name: PUBLIC_TABLES.CATEGORY,
      columns: [
        {
          name: 'id',
          type: COLUMN_TYPES.INT,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        { name: 'name', type: COLUMN_TYPES.TEXT, length: '50' }
      ]
    }), true)

    await queryRunner.createTable(new Table({
      name: PUBLIC_TABLES.ITEM,
      columns: [
        {
          name: 'id',
          type: COLUMN_TYPES.INT,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        { name: 'title', type: COLUMN_TYPES.TEXT, length: '50' },
        { name: 'description', type: COLUMN_TYPES.TEXT, length: '200' },
        { name: 'pictureUrl', type: COLUMN_TYPES.TEXT },
        { name: 'price', type: COLUMN_TYPES.INT },
        { name: FOREIGN_KEYS.CATEGORY_ID, type: COLUMN_TYPES.INT },
        ...createAndUpdateDates
      ],
      foreignKeys: [
        createForeignKeyOption(FOREIGN_KEYS.CATEGORY_ID, PUBLIC_TABLES.CATEGORY)
      ]
    }), true)

    await queryRunner.createTable(new Table({
      name: PUBLIC_TABLES.ORDER,
      columns: [
        {
          name: 'id',
          type: COLUMN_TYPES.INT,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        { name: 'totalAmount', type: COLUMN_TYPES.INT },
        { name: 'status', type: COLUMN_TYPES.TEXT, length: '50' },
        { name: FOREIGN_KEYS.USER_ID, type: COLUMN_TYPES.TEXT },
        ...createAndUpdateDates
      ],
      foreignKeys: [
        createForeignKeyOption(FOREIGN_KEYS.USER_ID, PUBLIC_TABLES.USER)
      ]
    }), true)

    await queryRunner.createTable(new Table({
      name: PUBLIC_TABLES.ORDER_ITEM,
      columns: [
        {
          name: 'id',
          type: COLUMN_TYPES.INT,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: FOREIGN_KEYS.ORDER_ID,
          type: COLUMN_TYPES.INT
        },
        {
          name: FOREIGN_KEYS.ITEM_ID,
          type: COLUMN_TYPES.INT,
        },
        { name: 'quantity', type: COLUMN_TYPES.INT },
        { name: 'unitPrice', type: COLUMN_TYPES.INT }
      ],
      indices: [
        {
          name: INDICES.ORDER_ITEM,
          columnNames: [FOREIGN_KEYS.ORDER_ID, FOREIGN_KEYS.ITEM_ID],
          isUnique: true
        }
      ],
      foreignKeys: [
        createForeignKeyOption(FOREIGN_KEYS.ORDER_ID, PUBLIC_TABLES.ORDER),
        createForeignKeyOption(FOREIGN_KEYS.ITEM_ID, PUBLIC_TABLES.ITEM)
      ]
    }), true)

    console.log('************** INSERT DEFAULT DATA **************')

    // INSERT DATA
    const userRole = new Role({ id: DefaultRole.User })
    userRole.name = 'User'
    await queryRunner.manager.save(userRole)

    const adminRole = new Role({ id: DefaultRole.Admin })
    adminRole.name = 'Admin'
    await queryRunner.manager.save(adminRole)

    const citizenshipCardDocumentType = new DocumentType({ id: DefaultDocumentType.CitizenshipCard })
    citizenshipCardDocumentType.name = 'Citizenship card'
    await queryRunner.manager.save(citizenshipCardDocumentType)

    const passportDocumentType = new DocumentType({ id: DefaultDocumentType.Passport })
    passportDocumentType.name = 'Passport'
    await queryRunner.manager.save(passportDocumentType)

    const encryptedPassword = await encryptPassword('1111')
    const currentdate = new Date()
    const user = new User ({
      id: '1234',
      password: encryptedPassword,
      email: 'juandanichollsc@gmail.com',
      firstName: 'J.D',
      lastName: 'Nicholls',
      address: 'XXX XX XX',
      phoneNumber: '3156208581',
      postalCode: '050023',
      birthdate: currentdate,
      termsAndConditions: true,
      status: UserStatus.Active,
      role: adminRole,
      documentType: passportDocumentType,
      createDate: currentdate,
      updateDate: currentdate
    })
    await queryRunner.manager.save(user)

    const categoryId = 1
    const category = new Category({ id: categoryId, name: 'Desserts' })
    await queryRunner.manager.save(category)

    const items = plainToClass(Item, <Item[]>[
      {
        id: 1,
        title: 'Brownie',
        description: 'Suave y húmedo brownie de chocolate',
        pictureUrl: `${DOMAIN}/assets/images/dessert-1.jpg`,
        price: 2500,
        categoryId
      },
      {
        id: 2,
        title: 'Pan de chocolate',
        description: 'Pan artesanal de chocolate semi-amargo',
        pictureUrl: `${DOMAIN}/assets/images/dessert-2.jpg`,
        price: 2500,
        categoryId
      },
      {
        id: 3,
        title: 'Trufas',
        description: 'Cajas de trufas de chocolate con rellenos surtidos',
        pictureUrl: `${DOMAIN}/assets/images/dessert-3.jpg`,
        price: 2000,
        categoryId
      },
      {
        id: 4,
        title: 'Macaroons',
        description: 'Macaroons de diferentes sabores',
        pictureUrl: `${DOMAIN}/assets/images/dessert-4.jpg`,
        price: 4000,
        categoryId
      },
      {
        id: 5,
        title: 'Galletas',
        description: 'Galletas con chips de chocolate',
        pictureUrl: `${DOMAIN}/assets/images/dessert-5.jpg`,
        price: 4000,
        categoryId
      },
      {
        id: 6,
        title: 'Helado',
        description: 'Helado artesanales sencillo de diferentes sabores.',
        pictureUrl: `${DOMAIN}/assets/images/dessert-6.jpg`,
        price: 4000,
        categoryId
      },
      {
        id: 7,
        title: 'Cupcakes',
        description: 'Cupcakes de chocolate con crema de diferentes sabores.',
        pictureUrl: `${DOMAIN}/assets/images/dessert-7.jpg`,
        price: 8000,
        categoryId
      },
      {
        id: 8,
        title: 'Paletas',
        description: 'Paletas artesanales de diferentes sabores.',
        pictureUrl: `${DOMAIN}/assets/images/dessert-8.jpg`,
        price: 5000,
        categoryId
      },
      {
        id: 9,
        title: 'Donuts',
        description: 'Donuts con rellenos y coberturas de diferentes sabores.',
        pictureUrl: `${DOMAIN}/assets/images/dessert-9.jpg`,
        price: 5000,
        categoryId
      },
      {
        id: 10,
        title: 'Torta',
        description: 'Porción de torta de chocolate.',
        pictureUrl: `${DOMAIN}/assets/images/dessert-10.jpg`,
        price: 4500,
        categoryId
      }
    ])
    await queryRunner.manager.save(items)
    console.log('************** END MIGRATION **************')
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    console.log('************** REVERT MIGRATION **************')

    await queryRunner.dropTable(PUBLIC_TABLES.ORDER_ITEM)
    await queryRunner.dropTable(PUBLIC_TABLES.ORDER)
    await queryRunner.dropTable(PUBLIC_TABLES.ITEM)
    await queryRunner.dropTable(PUBLIC_TABLES.CATEGORY)
    await queryRunner.dropTable(PUBLIC_TABLES.USER)
    await queryRunner.dropTable(PUBLIC_TABLES.DOCUMENT_TYPE)
    await queryRunner.dropTable(PUBLIC_TABLES.ROLE)

    console.log('************** REMOVE PUBLIC SCHEMA **************')
  }
}
