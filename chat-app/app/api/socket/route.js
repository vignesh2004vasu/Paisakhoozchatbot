import { Server as SocketServer } from 'socket.io'

export function GET(req, res) {
  if (!res.socket.server.io) {
    console.log('Socket is initializing')
    const io = new SocketServer(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on('send-message', msg => {
        io.emit('update-chat', msg)
      })
    })
  }
  res.end()
}