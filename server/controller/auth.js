import * as authRepository from '../data/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';

const jwtSecretKey = '3IXpaUOHC@7G73rCVdtIGEX0$SF2ra1t';
const jwtExpiresIndays = '2d';
const bcryptSaltRounds = 12;

export async function getUsers(req, res) {
  const data = await userRepository.findAll();
  console.log(data);
  res.status(200).json(data);
}

export async function me(req, res) {
  console.log('test');
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
  }
  res.status(200).json({ token: req.token, username: user.name });
}

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;

  const user = await userRepository.findByUsername(username);

  if (user) {
    return res.status(409).json({ message: `${username}은 이미 존재한다` });
  }

  const hashed = await bcrypt.hash(password, bcryptSaltRounds);

  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });

  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;

  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res
      .status(401)
      .json({ message: '아이디나 패스워드를 확인해주세요.' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res
      .status(401)
      .json({ message: '아이디나 패스워드를 확인해주세요.' });
  }

  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresIndays });
}
