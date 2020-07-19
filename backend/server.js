const Koa = require('koa')
const http = require('http')
const socket = require('socket.io')

const app = new Koa()
const server = http.createServer(app.callback())
const io = socket(server)

const SERVER_HOST = 'localhost'
const SERVER_PORT = 8080

const SerialPort = require('serialport')

io.on('connection', socket => {
  console.log('[IO] Connection => Server has a new connection')
  SerialPort.list().then(
    ports => io.emit('seriaList',ports),
    err => console.error(err)
  )
  
  socket.on('disconnect', () => {
    console.log('[SOCKET] Disconnect => A connection was disconnected')
  })
})

server.listen(SERVER_PORT,SERVER_PORT, () => {
  console.log(`[HTTP] Listen => Server is running at http://${SERVER_HOST}:${SERVER_PORT}`)
  console.log(`[HTTP] Listen => Press CTRL+C to stop it`)
})
