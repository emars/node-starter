class LogTaskRunner {
  run (job, done) {
    const args = job.data.args

    console.log(job.id, args)

    console.log('logger')
    job.logger.log('info', 'test message')

    done()
  }
  getDescription () {
    return 'Logs the arguments to STDOUT'
  }
  getType () {
    return 'LOG'
  }
}

export default LogTaskRunner
