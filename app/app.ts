import express = require('express')
import bodyParser = require('body-parser')
import morgan = require('morgan')

import routes from './routes/index'

const port = 3000

const app: express.Application = express()

app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
