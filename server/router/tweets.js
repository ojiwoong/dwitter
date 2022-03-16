import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';

let tweets = [
  {
    id: '1',
    text: 'dwitter project',
    name: 'Jiwoong',
    username: 'wldnd334',
    createdAt: new Date(),
    url: 'https://media.vlpt.us/images/potter/post/76303932-4916-4c24-9252-7e530a57bf0c/1_XP-mZOrIqX7OsFInN2ngRQ.png',
  },
  {
    id: '2',
    text: 'Hi, my name is Bob',
    name: 'Bob',
    username: 'bob',
    createdAt: new Date(),
    url: 'https://media.vlpt.us/images/potter/post/76303932-4916-4c24-9252-7e530a57bf0c/1_XP-mZOrIqX7OsFInN2ngRQ.png',
  },
];

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get('/', tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', tweetController.getTweet);

// POST /tweets
router.post('/', tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;
