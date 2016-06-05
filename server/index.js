import http from 'http'

import express from 'express'
import socketIO from 'socket.io'

import Bot from './bot'
import register from './register'

const config = require('../config.json')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const bot = new Bot()
register(bot)
bot.start()

function syncTasks () {
  io.sockets.emit('tasks', bot.getTasks())
}

function attachEvents (q) {
  q.on('job enqueue', syncTasks)
  q.on('job complete', syncTasks)
}

attachEvents(bot.getQueue())

io.on('connection', (socket) => {
  console.log('CONNECTION')
  socket.emit('tasks', bot.getTasks())
  socket.emit('taskrunners', bot.getTaskRunners())

  socket.on('task', (task) => {
    bot.addTask(task, {}, () => {
      console.log('Task Added')
    })
  })

  // Pause execution of future jobs after this job
  socket.on('pause', () => {
  })

  // Halt execution right now
  socket.on('stop', () => {
  })

  // Unpause
  socket.on('resume', () => {
  })
})

server.listen(8081, () => {
  console.log('Server listening on 8081')
})
