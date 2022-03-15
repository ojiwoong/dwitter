import express from 'express';
import 'express-async-errors';

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
router.get('/', (req, res, next) => {
  const username = req.query.username;
  const data = username
    ? tweets.filter(tweet => tweet.username === username)
    : tweets;
  res.status(200).json(data);
});

// GET /tweets/:id
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const tweet = tweets.find(tweet => tweet.id === id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.sendStatus(204);
  }
});

// POST /tweets
router.post('/', (req, res, next) => {
  const { text, name, username } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };

  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});

// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweets.find(tweet => tweet.id === id);
  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.sendStatus(204);
  }
});

// DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  tweets = tweets.filter(tweet => tweet.id !== id);
  res.sendStatus(204);
});

export default router;
