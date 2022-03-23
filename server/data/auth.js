let users = [
  {
    id: '1',
    username: 'wldnd334',
    password: '$2b$12$/EDPw6WAPGWA.EWL5o4GG.Yo5VXL0b/4sAMWuOd3Y6TzaeW2F/1S6',
    name: 'jiwoong',
    email: 'wldnd334@gmail.com',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWHQ7hOOMKa4bIgL41dp7uxkBKlD4k8yHd68A4yTK0UCWpZ6tp9Lfdt56KW9-VW5kK_7Q&usqp=CAU',
    createdAt: new Date(),
    updatedAt: null,
  },
];

export async function findAll() {
  return users;
}

export async function findByUsername(username) {
  return users.find(user => user.username === username);
}

export async function findById(id) {
  return users.find(user => user.id === id);
}

export async function createUser(user) {
  const created = {
    ...user,
    id: Date.now().toString(),
  };

  users.push(created);

  return created.id;
}
