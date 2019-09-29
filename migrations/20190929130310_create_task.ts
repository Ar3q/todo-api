import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('tasks', table => {
    table.increments('id').primary()
    table.string('title')
    table.string('description')
    table.integer('projectId').unsigned().references('id').inTable('projects')
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('projects')
}

