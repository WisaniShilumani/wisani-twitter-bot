
import * as functions from 'firebase-functions';
import twitter, { SEARCH_TWEETS } from './config'

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

export const logTweets = functions.pubsub.schedule('every 30 seconds').onRun(async (context) => {
  const tweets = await searchTweets()
  console.log('FOUND TWEETS: ', tweets)
  return null;
});


