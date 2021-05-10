import { 
  TableForeignKeyOptions
} from 'typeorm/schema-builder/options/TableForeignKeyOptions'
import {
  TableColumnOptions
} from 'typeorm/schema-builder/options/TableColumnOptions'

export const FOREIGN_KEYS = {
  ROLE_ID: 'roleId',
  USER_ID: 'userId',
  DOCUMENT_TYPE_ID: 'documentTypeId',
  CATEGORY_ID: 'categoryId',
  ORDER_ID: 'orderId',
  ITEM_ID: 'itemId'
}
export const INDICES = {
  USER_EMAIL: 'IDX_USER_EMAIL',
  ORDER_ITEM: 'IDX_ORDER_ITEM'
}
export const COLUMN_TYPES = {
  INT: 'INTEGER',
  TEXT: 'TEXT'
}

export const createAndUpdateDates: TableColumnOptions[] = [
  { name: 'createDate', type: COLUMN_TYPES.TEXT, default: "DATE('now')" },
  { name: 'updateDate', type: COLUMN_TYPES.TEXT, default: "DATE('now')" }
]

export const createForeignKeyOption = (
  columnName: string,
  tableName: string,
  columnId = 'id'
): TableForeignKeyOptions => {
  return {
    columnNames: [columnName],
    referencedColumnNames: [columnId],
    referencedTableName: tableName,
    onDelete: "CASCADE"
  }
}

export const PUBLIC_TABLES = {
  USER: 'user',
  ROLE: 'role',
  DOCUMENT_TYPE: 'document_type',
  CATEGORY: 'category',
  ITEM: 'item',
  ORDER: 'order',
  ORDER_ITEM: 'order_item'
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function EnumToArray(enumeration: any): string[] {
  return Object.keys(enumeration).map(key => enumeration[key])
}