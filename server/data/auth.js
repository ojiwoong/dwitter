import { db } from '../db/database.js';

export async function findAll() {
  const response = await db.execute('SELECT * FROM users');
  return response[0][0];
}

export async function findByUsername(username) {
  const response = await db.execute('SELECT * FROM users where username=?', [
    username,
  ]);
  return response[0][0];
}

export async function findById(id) {
  const response = await db.execute('SELECT * FROM users where id=?', [id]);
  return response[0][0];
}

export async function createUser(user) {
  const { username, password, name, email, url } = user;
  return db
    .execute(
      'INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)',
      [username, password, name, email, url]
    )
    .then(result => {
      result[0].insertId;
    });
}
