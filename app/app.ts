require('dotenv').config()
import 'reflect-metadata'
import { createExpressServer, useContainer } from 'routing-controllers'
import express = require('express')
import morgan = require('morgan')

import { Container } from 'typedi'

import { Model } from 'objection'
import Knex = require('knex')

//Objectionjs/knex config
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knexConfig = require('../knexfile')
export const knex = Knex(knexConfig.development)

knex.migrate.latest()
Model.knex(knex)

useContainer(Container)

const port = process.env.PORT || 3000

const app: express.Application = createExpressServer({
  routePrefix: '/api',
  controllers: [__dirname + '/controllers/*.js'],
})

app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
