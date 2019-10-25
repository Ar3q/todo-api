require('ts-node/register')

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './dev.db',
    },
    migrations: {
      extension: 'ts',
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },

  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './prod.db',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
}
