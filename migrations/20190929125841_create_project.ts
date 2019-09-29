import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable('projects', table => {
      table.increments('id').primary(),
        table.string('name')
    })
  ])
}


export async function down(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.dropTable('projects')
  ])
}