import * as functions from 'firebase-functions'
import { quoteMyTweets, tweetHaiku, tweetQuote, addHaiku, addQuote } from './services/twitter'

exports.tweets = {
  quoteMyTweets,
  tweetHaiku,
  tweetQuote, 
  addHaiku: functions.https.onRequest(addHaiku),
  addQuote: functions.https.onRequest(addQuote),
}
