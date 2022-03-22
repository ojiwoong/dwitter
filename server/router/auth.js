import express from 'express';
import 'express-async-errors';
import * as authController from '../controller/auth.js';
import { body, param, validationResult } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// const validateTweet = [
//   body('text')
//     .trim()
//     .isLength({ min: 3 })
//     .withMessage('내용은 3이상 200이하로 입력해주세요.'),
// ];

const validateCredential = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('유저명은 공백일 수 없습니다.'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('비밀번호는 최소 5자 이상 입력해주세요.'),
  validate,
];

const validateSingup = [
  ...validateCredential,
  body('name').trim().notEmpty().withMessage('이름을 입력해주세요.'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('올바른 이메일을 입력해주세요.'),
  body('url')
    .isURL()
    .withMessage('올바른 URL을 입력해주세요.')
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];

// GET /users
router.get('/users', authController.getUsers);

// POST /singup
router.post('/signup', validateSingup, authController.signup);

// POST /login
router.post('/login', validateCredential, authController.login);

// GET /me
router.get('/me', isAuth, authController.me);

export default router;
