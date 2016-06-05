import io from 'socket.io-client'

const socket = io('http://localhost:8081')

export function connect () {
  return socket
}

export function addTask (task) {
  socket.emit('task', task)
}
