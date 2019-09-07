import * as functions from 'firebase-functions';
import * as Twitter from 'twitter'

const { api_key, api_secret, access_token, access_token_secret } = functions.config().twitter

const twitter = new Twitter({
  consumer_key: api_key,
  consumer_secret: api_secret,
  access_token_key: access_token,
  access_token_secret: access_token_secret
})

export const UPDATE_STATUS = 'status/update'
export const RETWEET_STATUS = 'status/retweet'
export const SEARCH_TWEETS = 'search/tweets'

export default twitter
