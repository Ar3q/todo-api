require('dotenv').config()
import express = require('express')
import morgan = require('morgan')

import routes from './routes/index'
import { Model } from 'objection';
import Knex = require('knex')

//Objectionjs/knex config
const knexConfig = require('../knexfile')
export const knex = Knex(knexConfig.development)

knex.migrate.latest()
Model.knex(knex)

const port = process.env.PORT || 3000

const app: express.Application = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
