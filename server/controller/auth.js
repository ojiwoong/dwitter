import * as authRepository from '../data/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

export async function getUsers(req, res) {
  const username = req.query.username;

  let data;
  if (username) {
    data = await userRepository.findByUsername(username);
  } else {
    data = await userRepository.findAll();
  }

  if (!data) {
    res.status(404).json({ message: '해당 회원은 존재하지 않습니다.' });
  }

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

  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);

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
  console.log(config.jwt.secretKey);
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expriesInSec,
  });
}
