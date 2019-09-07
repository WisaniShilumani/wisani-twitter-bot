
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import twitter, { UPDATE_STATUS, USER_TIMELINE } from './config'

admin.initializeApp(functions.config().firebase)

const cors = require('cors')({
  origin: true,
})

interface ResponseData {
  [key: string]: any;
}

interface User {
  id: number;
  name: string;
}

interface ExtendedTweet {
  full_text: string;
  display_text_range: number[];
  entities: any
}

interface Tweet {
  created_at: string;
  id: number;
  text: string;
  user: User;
  extended_tweet: ExtendedTweet
}

interface TweetsResponse {
  statuses: Tweet[]
}

const USERNAME = '@wisanishilumani'
// const EVERY_MINUTE = '* * * * *'
const EVERY_HOUR = '0 * * * *'

const btoa = (text: string): string => Buffer.from(text).toString('base64').substr(0, 32)

const updateCallback = (onSuccess: any) => (error: any, response: ResponseData) => {
  if (error) throw new Error;
  onSuccess(response)
}

const promiseCallback = (resolve: any, reject: any) => (error: any, response: ResponseData) => {
  if (error) return reject(error)
  resolve(response)
}

const getUserTweets = async (): Promise<TweetsResponse | any> => {
  return new Promise((resolve, reject) => {
    twitter.get(USER_TIMELINE, {
      screen_name: 'wisanishilumani',
      include_rts: false,
      exclude_replies: true
    }, promiseCallback(resolve, reject))
  })
}

const getLastFirebaseObject = (object: any) => {
  const keys = Object.keys(object)
  const key = keys[keys.length - 1]
  return {
    key,
    object: object[key]
  }
}


export const tweetHaiku = functions.pubsub.schedule('5 09 * * *').onRun(async (): Promise<any> => {
  try {
    const haikus = await admin.database().ref(`haikus`).once('value')
    if (!haikus) return null;
    const { key, object } = getLastFirebaseObject(haikus.val())
    const onSuccess = async () => {
      await admin.database().ref(`haikus/${key}`).remove()
    }

    twitter.post(UPDATE_STATUS, {
      status: `${object.line1}\n${object.line2}\n${object.line3}\n\n- ${object.author}\n#haiku`
    }, updateCallback(onSuccess))
  } catch (error) {
    console.error('ENCOUNTERED AN ERROR: ', error)
  }

  return null;
})

export const tweetQuote = functions.pubsub.schedule('every 6 hours from 11:00 to 00:00').onRun(async (): Promise<any> => {
  try {
    const quotes = await admin.database().ref(`quotes`).once('value')
    if (!quotes) return null;
    const { key, object } = getLastFirebaseObject(quotes.val())
    const onSuccess = async () => {
      await admin.database().ref(`quotes/${key}`).remove()
    }

    twitter.post(UPDATE_STATUS, {
      status: `"${object.text}" - \n${object.author}`
    }, updateCallback(onSuccess))
  } catch (error) {
    console.error('ENCOUNTERED AN ERROR: ', error)
  }

  return null;
})

export const quoteMyTweets = functions.pubsub.schedule(EVERY_HOUR).onRun(async () => {
  try {
    const myTweets: Tweet[] = await getUserTweets()
    const excludeMentions = (tweet: Tweet) => tweet.text.indexOf('@') === -1
    const cleanTweets = myTweets.filter(excludeMentions)
    if (!cleanTweets || !cleanTweets.length) return null;
    const latestTweet = cleanTweets[0]
    const tweetKey = btoa(latestTweet.text)
    const tweetArchive = await admin.database().ref(`tweet_history/${tweetKey}`).once('value')
    if (!tweetArchive || !tweetArchive.val()) {
      const onSuccess = async () => {
        await admin.database().ref('tweet_history').update({ [tweetKey]: latestTweet.text})
      }

      twitter.post(UPDATE_STATUS, {
        status: `"${latestTweet.text}" - ${USERNAME}`
      }, updateCallback(onSuccess))
    }
  } catch (error) {
    console.error('ENCOUNTERED AN ERROR: ', error)
  }

  return null
});

export const addHaiku = (req: any, res: any) => cors(req, res, async () => {
  const { line1, line2, line3, author } = req.query
  try {
    await admin.database().ref(`haikus`).push({
      line1,
      line2,
      line3,
      author
    })

    res.send({ line1, line2, line3, author })
  } catch (error) {
    console.error(error)
    res.send({ error })
  }
})

export const addQuote = (req: any, res: any) => cors(req, res, async () => {
  const { text, author } = req.query
  try {
    await admin.database().ref(`quotes`).push({
      text,
      author
    })

    res.send({ text, author })
  } catch (error) {
    console.error(error)
    res.send({ error })
  }
})
