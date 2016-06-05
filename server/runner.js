// Get first thing in queue and run teh appropriate task list

class SerialRunner {
  constructor (bot) {
    this.bot = bot
    this.running = false
  }

  start () {
    setInterval(() => {
      this.run()
    }, 1000)
  }

  run () {
    if (! this.running) {
      console.log('Running Next Job')
      this.running = true

      this.bot.runNextTask((err, job) => {
        if (err) throw err

        if (! job) {
          this.running = false
          return
        }

        job.on('complete', () => {
          this.running = false
        })
      })
    }
  }
}

export default SerialRunner
