
import * as functions from 'firebase-functions';
import twitter, { UPDATE_STATUS, SEARCH_TWEETS } from './config'
const cors = require('cors')({
  origin: true,
})

interface ResponseData {
  [key: string]: any;
}

const searchTweets = async (): Promise<boolean | any> => {
  return new Promise((resolve, reject) => {
    twitter.get(SEARCH_TWEETS, { q: '@wisanishilumani' }, (error: any, tweets: ResponseData, response: any) => {
      if (error) reject(error)
      resolve(tweets)
    });
  })
}

// const tweetNewHaiku = () => {
//   twitter.post(UPDATE_STATUS, {
//     status: 'I love cake and twitter bots'
//   }, tweetCallback)
// }

export const logTweets = functions.pubsub.schedule('every 2 minutes').onRun(async () => {
  try {
    const tweets = await searchTweets()
    console.log('FOUND TWEETS: ', tweets)
  } catch (error) {
    console.error('ENCOUNTERED AN ERROR: ', error)
  }

  return null
});

export const firstTweet = (req: any, res: any) => cors(req, res, async () => {
    twitter.post(UPDATE_STATUS, {
      status: `Hi, I'm @wisanishilumani's twitter bot account. Uhm, I'm a bot, so I don't really have interests to share...but if you insist, I would like more processing power?`
    }, (error: any, response: any) => {
      if (error) res.send(error)
      console.log('Tweeted boet!')
      res.send(response)
    })
  })

