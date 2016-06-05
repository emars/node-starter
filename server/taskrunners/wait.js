class WaitTaskRunner {
  run (job, done) {
    const delay = parseInt(job.data.args[0])

    setTimeout(() => {
      done()
    }, delay)
  }
  getType () {
    return 'WAIT'
  }
}

export default WaitTaskRunner
