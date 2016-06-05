import request from 'request'

const config = require('../config.json')

class TaskFetcher {
  constructor () {
    this._tasks = []
    this.startPoll()
  }

  startPoll () {
    setInterval(() => {
      request.get(`http://localhost:${config.kue_port}/jobs/0..10000`, (req, res, body) => {
        this._tasks = JSON.parse(body)
      })
    }, 1000)
  }

  getTasks () {
    return this._tasks
  }
}

export default TaskFetcher
