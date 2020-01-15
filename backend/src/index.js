const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 3001

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB")
}).catch((err) => {
  console.log(`DB Connection Error: ${err}`)
})

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(routes)

app.listen(port, () => {
  console.log(`Server listen port: ${port}`)
})
