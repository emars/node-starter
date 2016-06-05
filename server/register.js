const config = require('../config.json')

export default function register (bot) {
  config.task_runners.forEach((TaskRunner) => {
    console.log(TaskRunner)
    try {
      const TR = require(TaskRunner)
      const tr = new TR.default()
      bot.register(tr)
    } catch(e) {
      if (e.code === 'MODULE_NOT_FOUND') {
        console.log(`ERROR: ${e.code} - Please Ensure that ${taskRunner} Exists`)
      } else {
        throw e
      }
    }
  })
}
