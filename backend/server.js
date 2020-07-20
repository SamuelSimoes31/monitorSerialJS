const Koa = require('koa')
const http = require('http')
const socket = require('socket.io')

const app = new Koa()
const server = http.createServer(app.callback())
const io = socket(server)

const SERVER_HOST = 'localhost'
const SERVER_PORT = 8080

const SerialPort = require('serialport')
let port = null;
let portIsOpen = null;

io.on('connection', socket => {
  console.log('[IO] Connection => Server has a new connection')
  
  socket.on('seriaportList', () => {
    SerialPort.list().then(
      ports => io.emit('seriaportList',ports),
      err => console.error(err)
    )
  })

  socket.on('openSerial', ({path, baud}) => {
    port = new SerialPort(path,{baudRate:parseInt(baud)})

    port.on('open', () => {
      console.log(`[SERIAL] ${path} is open`)
      portIsOpen = true;
      io.emit('serialResponse',{status:true,message:'Port is open'})
    })
    port.on('error', function(err) {
      console.log('Error: ', err.message)
      io.emit('serialResponse',{status:false,message:'[ERROR]' + err.message})
    })

    port.on('close', () => {
      console.log(`[SERIAL] ${path} is closed`)
      portIsOpen = false;
      io.emit('serialResponse',{status:false,message:'Porta dechada'})
    })
  })

  socket.on('closeSerial', () => {
    port.close();
  })
  
  socket.on('disconnect', () => {
    console.log('[SOCKET] Disconnect => A connection was disconnected')
    if(port) {
      port.close();
    }
  })
})

server.listen(SERVER_PORT,SERVER_PORT, () => {
  console.log(`[HTTP] Listen => Server is running at http://${SERVER_HOST}:${SERVER_PORT}`)
  console.log(`[HTTP] Listen => Press CTRL+C to stop it`)
})
