import { db } from '../db/database.js';
import * as userRepository from './auth.js';

// let tweets = [
//   {
//     id: '1',
//     text: 'dwitter project',
//     createdAt: new Date().toString(),
//     userId: '1',
//   },
//   {
//     id: '2',
//     text: 'Hi, my name is Bob',
//     createdAt: new Date().toString(),
//     userId: '1',
//   },
// ];

const SELECT_JOIN =
  'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id';
const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

export async function getAll() {
  try {
    const result = await db.execute(`${SELECT_JOIN} ${ORDER_DESC}`);

    return result[0];
  } catch (error) {
    console.error(error);
  }
}

export async function getAllByUsername(username) {
  try {
    const result = await db.execute(
      `${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`,
      [username]
    );

    return result[0];
  } catch (error) {
    console.error(error);
  }
}

export async function getAllById(id) {
  try {
    const result = await db.execute(`${SELECT_JOIN} WHERE tw.id=?`, [id]);

    return result[0][0];
  } catch (error) {
    console.error(error);
  }
}

export async function create(text, userId) {
  try {
    const result = await db.execute(
      'INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)',
      [text, new Date(), userId]
    );

    return getAllById(result[0].insertId);
  } catch (error) {
    console.error(error);
  }
}

export async function update(id, text) {
  try {
    const result = await db.execute('UPDATE tweets SET text=? WHERE id=?', [
      text,
      id,
    ]);

    return getAllById(id);
  } catch (error) {
    console.error(error);
  }
}

export async function remove(id) {
  const result = await db.execute('DELETE FROM tweets WHERE id=?', [id]);

  return result;
}
