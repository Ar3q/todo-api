import * as Knex from "knex";
import { knex } from '../app/app';


export async function up(knex: Knex): Promise<any> {
  return knex.schema.table('tasks', table => {
    table.boolean('done').notNullable().defaultTo(false)
    table.bigInteger('remindAt')
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.table('tasks', table => {
    table.dropColumns('done', 'remindAt')
  })
}

