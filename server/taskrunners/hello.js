class HelloTaskRunner {
  run (job, done) {
    console.log('Hello, World!')

    done()
  }
  getDescription () {
    return 'Logs "Hello, World!" to STDOUT'
  }
  getType () {
    return 'HELLO'
  }
}

export default HelloTaskRunner
