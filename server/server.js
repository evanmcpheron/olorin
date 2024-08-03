import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import http from 'http'
import connectSockets from './v1/Config/connectSockets.js'
import path from 'path'
import { Server } from 'socket.io'
import routes from './v1/Routes/index.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})
app.io = io
app.set('trust proxy', true)
const PORT = process.env.PORT || 8080

const application = {
  app,
}

const origin =
  process.env.NODE_ENV === 'production'
    ? 'https://www.example.com'
    : 'http://localhost:3000'

const clientPath =
  process.env.NODE_ENV === 'production' ? 'client' : 'clientbuild'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  cors({
    credentials: true,
    origin,
  })
)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
  )
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  )
  next()
})

connectSockets(app, server, io)

app.use('/v1', routes(application))
app.use(express.static(clientPath))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, clientPath, 'index.html'))
})

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, async () => {
    // await connectDB()
    console.log(`Server listening on http://localhost:${PORT}`)
  })
}

export default app
