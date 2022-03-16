import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';
import { body, param, validationResult } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateTweet = [
  body('text')
    .trim()
    .isLength({ min: 3 })
    .withMessage('내용은 3이상 200이하로 입력해주세요.'),
];

// GET /tweets
// GET /tweets?username=:username
router.get('/', tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', tweetController.getTweet);

// POST /tweets
router.post('/', validateTweet, validate, tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', validateTweet, validate, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;
