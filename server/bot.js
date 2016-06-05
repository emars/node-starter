import { EventEmitter } from 'events'

import kue from 'kue'
import winston from 'winston'

import SerialRunner from './runner'
import TaskFetcher from './TaskFetcher'
import TaskValidator from './validators/TaskValidator'

class Bot extends EventEmitter {
  constructor (options) {
    super()

    this._queue = kue.createQueue()

    this._taskFetcher = null

    kue.app.listen(8082, () => {
      console.log('KUE UI LISTENING ON 8082')
      this._taskFetcher = new TaskFetcher()
    })

    this._taskRunners = {}

    this._state = 'STOPPED'
  }

  getTasks () {
    return this._taskFetcher.getTasks()
  }

  getState () {
    return this._state
  }

  isValidTask (task) {
    const validator = new TaskValidator(task)

    return validator.isValid(task)
  }

  isValidTaskRunner () {
    return true
  }

  start () {
    const runner = new SerialRunner(this)

    runner.start()
  }

  getQueue () {
    return this._queue
  }

  addTask (task, options, callback) {
    const opts = Object.assign({
      priority: 'normal',
      ttl: 30000, // 30 second expiry,
      attempts: 1
    }, options)

    if (this.isValidTask(task)) {
      const job = this._queue.create(task.type, task)
        .priority(opts.priority)
        .attempts(opts.attempts)
        .ttl(opts.ttl)
        .save((err) => {
          if (err) return callback(err)

          callback(null, job)
        })
    } else {
      const err = new Error('Invalid Task')

      callback(err)
    }
  }

  runNextTask (callback) {
    this._queue.inactive((err, ids) => {
      console.log(ids)
      const id = ids[0]

      if (! id) return callback()

      kue.Job.get(id, (err, firstJob) => {
        const type = firstJob.type
        this.runTask(type, (err, job) => {
          callback(null, job)
        })
      })
    })
  }

  runTask (type, callback) {
    this._queue.process(type, (job, done) => {
      callback(null, job)

      const log = `task-${job.id}.log`

      job.logger = new (winston.Logger)({
        transports: [
          new (winston.transports.File)({
            filename: log
          })
        ]
      })

      if (this._taskRunners[type]) {
        this._taskRunners[type].run.call(null, job, done)
      } else {
        const err = new Error(`There is not task runner for type: ${type}`)
      }
    })
  }

  register (taskRunner) {
    if (! this.isValidTaskRunner(taskRunner)) {
      throw new Error('Invalid Task Runner')
    }

    const type = taskRunner.getType()
    this._taskRunners[type] = taskRunner
  }

  getTaskRunners () {
    return this._taskRunners
  }
}

export default Bot
