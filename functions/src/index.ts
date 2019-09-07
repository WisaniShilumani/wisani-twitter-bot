import * as functions from 'firebase-functions';

import { logTweets, firstTweet } from './services/twitter'


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.logTweets = logTweets
exports.firstTweet = functions.https.onRequest(firstTweet);
