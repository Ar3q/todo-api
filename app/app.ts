require('dotenv').config()
import 'reflect-metadata'
import { createExpressServer, useContainer } from 'routing-controllers'
import express = require('express')
import morgan = require('morgan')

import { Container } from 'typedi'

import { Model } from 'objection'
import { ProjectController } from './controllers/ProjectController'
import { TaskController } from './controllers/TaskController'
import Knex = require('knex')

console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)

//Objectionjs/knex config
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knexConfig = require('../knexfile')
export const knex =
  process.env.NODE_ENV === 'production'
    ? Knex(knexConfig.production)
    : Knex(knexConfig.development)

knex.migrate.latest()
Model.knex(knex)

useContainer(Container)

const port = process.env.PORT || 3000

const app: express.Application = createExpressServer({
  routePrefix: '/api',
  // controllers: [__dirname + '/controllers/*.js'],
  //change to exact specifing controllers due to problems with paths not working with npm run dev
  controllers: [ProjectController, TaskController],
})

app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello Cruel World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
