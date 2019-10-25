require('dotenv').config()
import express = require('express')
import morgan = require('morgan')

import routes from './routes/index'
import { Model } from 'objection'
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

const port = process.env.PORT || 3000

const app: express.Application = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello Cruel World!')
})

app.use('/api', routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
