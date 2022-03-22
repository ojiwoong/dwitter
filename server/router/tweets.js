import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';
import { body, param, validationResult } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateTweet = [
  body('text')
    .trim()
    .isLength({ min: 3 })
    .withMessage('내용은 3이상 200이하로 입력해주세요.'),
];

// GET /tweets
// GET /tweets?username=:username
router.get('/', isAuth, tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', isAuth, tweetController.getTweet);

// POST /tweets
router.post('/', isAuth, validateTweet, validate, tweetController.createTweet);

// PUT /tweets/:id
router.put(
  '/:id',
  isAuth,
  validateTweet,
  validate,
  tweetController.updateTweet
);

// DELETE /tweets/:id
router.delete('/:id', isAuth, tweetController.deleteTweet);

export default router;
