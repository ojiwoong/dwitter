import * as tweetRepository from '../data/tweet.js';

export function getTweets(req, res) {
  const username = req.query.username;
  const data = username
    ? tweetRepository.getAllByUsername
    : tweetRepository.getAll;
  res.status(200).json(data);
}

export function getTweet(req, res) {
  const id = req.params.id;
  const tweet = tweetRepository.getAllById;
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.sendStatus(204);
  }
}

export function createTweet(req, res) {
  const { text, name, username } = req.body;
  const tweet = tweetRepository.create(text, name, username);
  res.status(201).json(tweet);
}

export function updateTweet(req, res) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweetRepository.update(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.sendStatus(204);
  }
}

export function deleteTweet(req, res) {
  const id = req.params.id;
  tweetRepository.remove(id);
  res.sendStatus(204);
}
