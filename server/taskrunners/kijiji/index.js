import { scrapeFeed } from ''
import { scrapePage } from ''

class KijijiTaskRunner {
  run (job, done) {
    if (job.type === 'SCRAPE_KIJIJI_FEED') {
      const feedUrl = job.args[0]

      scrapeFeed(feedUrl)
        .then((data) => {
          const task = {
            type: 'SCRAPE_KIJIJI_PAGE',

          }

          job.bot.addTask(task)
        }, (err) => {
          done(err)
        })
    } else if (job.type === 'SCRAPE_KIJIJI_PAGE') {
    } else {
      done()
    }
  }
  getType () {
    return [
      'SCRAPE_KIJIJI_FEED',
      'SCRAPE_KIJIJI_PAGE'
    ]
  }
}
