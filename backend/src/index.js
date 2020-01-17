const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const http = require('http')

const routes = require('./routes')
const {setupWebsocket} = require('./websocket')

const app = express()
const server = http.Server(app)
setupWebsocket(server)

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

server.listen(port, () => {
  console.log(`Server listen port: ${port}`)
})
