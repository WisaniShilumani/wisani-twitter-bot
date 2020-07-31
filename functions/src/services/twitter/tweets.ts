import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import twitter, { UPDATE_STATUS } from './config';

admin.initializeApp(functions.config().firebase);

const TIMEZONE = 'Africa/Johannesburg';

const handlesToTweet = ['@CyrilRamaphosa', '@PresidencyZA'];

const tweets = [
  'What laws are you putting in place to #EndGBV in South Africa? #VoetsekANC #ANCMustFall',
  'What are you doing to #EndGBV in South Africa? #VoetsekANC #ANCMustFall',
  'What laws are you putting in place to end corruption in South Africa? #VoetsekANC #ANCMustFall',
  'What are you doing to end corruption in South Africa? #VoetsekANC #ANCMustFall',
];

const getTwoRandomHandles = (): string => {
  const shuffledHandles = [...handlesToTweet].sort(() => Math.random() - 0.5);
  return `${shuffledHandles[0]} ${shuffledHandles[1]}`;
};

const getRandomTweet = (): string => tweets[Math.round(Math.random() * (tweets.length - 1))];

export const askGovtAboutGBV = functions.pubsub
  .schedule('every 30 minutes from 06:00 to 00:00')
  .timeZone(TIMEZONE)
  .onRun(
    async (): Promise<any> => {
      try {
        const randomHandles = getTwoRandomHandles();
        const tweet = getRandomTweet();
        await twitter.post(UPDATE_STATUS, {
          status: `${randomHandles} ${tweet}`,
        });
      } catch (error) {
        console.error('ENCOUNTERED AN ERROR: ', error);
      }

      return null;
    }
  );
